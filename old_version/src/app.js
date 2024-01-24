const express = require('express');
const bodyParser = require('body-parser');
const { Op } = require('sequelize');
const {sequelize} = require('./model')
const {getProfile} = require('./middleware/getProfile')
const app = express();
app.use(bodyParser.json());
app.set('sequelize', sequelize)
app.set('models', sequelize.models)


app.get('/contracts/:id',getProfile ,async (req, res) =>{
    const { Contract } = req.app.get('models')

    const profile = req.profile;
    const contract = await Contract.findOne({where: {ClientId: profile.id}})
    if(!contract) return res.status(404).end()
    res.json(contract)
})


app.get('/contracts',getProfile ,async (req, res) =>{
    const { Contract } = req.app.get('models')
    const profile = req.profile;
    const contracts = await Contract.findAll({
        where: {
          [Op.or]: [
            { ContractorId: profile.id },
            { ClientId: profile.id }
          ]
        }
      });
    res.json(contracts)
});

app.get('/jobs',getProfile ,async (req, res) =>{
    const { Job } = req.app.get('models')
    const jobs = await Job.findAll()
    res.json(jobs)
});

app.get('/jobs/unpaid',getProfile ,async (req, res) =>{
    try {
        const { Job, Contract } = req.app.get('models')
        const profile = req.profile;
        const jobs = await Job.findAll({
            where: {
              paid: null
            },
            include: [{
              model: Contract,
              where: {
                [Op.or]: [
                  { ContractorId: profile.id },
                  { ClientId: profile.id }
                ]
              }
            }]
          });

        if (!jobs) {
            return res.status(404).json({"data": "not found"});
        }
        return res.json(jobs)
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});


app.post('/jobs/:job_id/pay', getProfile, async (req, res) =>{
    const { Job, Profile, Contract } = req.app.get('models')
    const profile = req.profile;
    const job = await Job.findOne({where: {id: req.params.job_id}})

    if(!job) return res.status(404).end()
    if(profile.type !== 'client') return res.status(401).end()
    if(profile.balance < job.price) return res.status(402).end()


    try {
        const result = await sequelize.transaction(async (t) => {
            const job = await Job.findOne({where: {id: req.params.job_id}});
            const contract = await Contract.findOne({ where: { id: job.ContractId } }, { transaction: t });
            const contractor = await Profile.findOne({ where: { id: contract.ContractorId } }, { transaction: t });

            if (!contractor) {
                throw new Error('Contractor not found');
            }

            await profile.update({ balance: profile.balance - job.price }, { transaction: t });
            await contractor.update({ balance: contractor.balance + job.price }, { transaction: t });
            await job.update({ paid: true, paymentDate: new Date() }, { transaction: t });
            return { profile, contractor, job };

        });

        console.log('Transaction has been committed', result);
        return res.json({data: result});
      } catch (error) {
        console.error('Transaction was rolled back due to an error', error);
        res.status(500).json({error: error.message});
      }
});

app.post('/balances/deposit/:userId', getProfile, async (req, res) =>{
    const profile = req.profile;
    const deposit = req.body.deposit;
    if(profile.type !== 'client') {return res.status(401).json({error: 'Unauthorized'})}
    if(deposit > profile.balance * 0.25) return res.status(402).json({error: 'Deposit limit exceeded'})

    try {
        const result = await sequelize.transaction(async (t) => {
            await profile.update({ balance: profile.balance + deposit }, { transaction: t });
            return { profile };
        });

        console.log('Transaction has been committed', result);
        return res.json({data: result});
      } catch (error) {
        console.error('Transaction was rolled back due to an error', error);
        res.status(500).json({error: error.message});
      }

});

app.get('/admin/best-profession', async (req, res) =>{
    const { Job, Profile, Contract } = req.app.get('models')
    const startDate = req.query.start;
    const endDate = req.query.end;

    const result = await Job.findAll({
        attributes: [
          [sequelize.fn('SUM', sequelize.col('price')), 'total_earnings']
        ],
        include: [{
          model: Contract,
          attributes: [],
          include: [{
            model: Profile,
            as: 'Contractor',
            attributes: ['profession'],
            where: {
              type: 'contractor'
            }
          }]
        }],
        where: {
          paid: true,
          paymentDate: {
            [Op.between]: [startDate, endDate]
          }
        },
        group: ['Contract->Contractor.profession'],
        order: [[sequelize.literal('total_earnings'), 'DESC']],
        limit: 1,
        raw: true
    });

    return res.json(result);
});

app.get('/admin/best-clients', async (req, res) =>{
    // TODO: Fix output format to match requirements
    const { Job, Profile, Contract } = req.app.get('models')
    const startDate = req.query.start;
    const endDate = req.query.end;
    const limit = req.query.limit || 2;

    const result = await Job.findAll({
        attributes: [
          'Contract->Client.id',
          [sequelize.fn('SUM', sequelize.col('Job.price')), 'paid']
        ],
        include: [{
          model: Contract,
          attributes: [],
          include: [{
            model: Profile,
            as: 'Client',
            attributes: [[sequelize.fn('concat', sequelize.col('firstName'), ' ', sequelize.col('lastName')), 'fullName']],
          }]
        }],
        where: {
          paid: true,
          paymentDate: {
            [Op.between]: [startDate, endDate]
          }
        },
        group: ['Contract->Client.id'],
        order: [[sequelize.literal('paid'), 'DESC']],
        limit: limit,
        raw: true
      });

    return res.json(result);
});


module.exports = app;
