import express, { Request, Response } from "express";
import { ApiApp } from "../../../../core/apps/api";
import { ApiRepository } from "../../../output/repositories/api";
import { getProfile, RequestWithProfile } from "../middlewares"

const apiRouter = express.Router();
const apiRepository = new ApiRepository();
const apiApp = new ApiApp(apiRepository);


apiRouter.get("/contracts/:id?", getProfile, async (req: RequestWithProfile, res: Response) => {
  try {
    const { id } = req.params;
    const profile = req.profile;

    if (req.params.id) {
      const contract = await apiApp.getContractsById(Number(id), Number(profile?.id));
      return res.status(200).send({
        data: contract
      });
    }

    const contracts = await apiApp.getAllContracts(Number(profile?.id));
    return res.status(200).send({
      data: contracts
    });

  } catch (error) {
    return res.status(500).send({ error: "failed to find job" });
  }
});

apiRouter.get("/jobs/unpaid", getProfile, async (req: RequestWithProfile, res: Response) => {
  try {
    const { id } = req.params;
    const profile = req.profile;
    const jobs = await apiApp.getUnpaidJobs(Number(profile?.id));
    return res.status(200).send({
      data: jobs
    });
  } catch (error) {
    return res.status(500).send({ error: "failed to find job" });
  }
});

apiRouter.post("/jobs/:job_id/pay", getProfile, async (req: RequestWithProfile, res: Response) => {
  try {
    const { job_id } = req.params;
    const profile = req.profile;
    const job = await apiApp.payJob(Number(job_id), Number(profile?.id));
    return res.status(200).send({
      data: job
    });
  } catch (error) {
    return res.status(500).send({ error: "failed to pay job" });
  }
});


apiRouter.put("/balance/deposit/:userId", getProfile, async (req: RequestWithProfile, res: Response) => {
    const { userId } = req.params;
    const { deposit } = req.body;
    const profile = req.profile;

    if(profile?.type !== 'client') {return res.status(401).json({error: 'Unauthorized'})}
    if(deposit > profile?.balance * 0.25) return res.status(402).json({error: 'Deposit limit exceeded'})

    try {
      const profile = await apiApp.depositBalance(Number(userId), deposit);
      return res.status(200).send({
        data: profile
      });
    } catch (error) {
      return res.status(500).send({ error: "failed to deposit balance" });
    }
});

// apiRouter.get("/best-profession", async (req: Request, res: Response) => {
//   return res.json({"data": "It works!"})
//   const { start, end } = req.query;
//   const profession = await apiApp.bestProfession(start, end);
//   res.json(profession);
// });

// apiRouter.get("/best-clients", async (req: Request, res: Response) => {
//   return res.json({"data": "It works!"})
//   const { start, end } = req.query;
//   const clients = await apiApp.bestClients(start, end);
//   res.json(clients);
// });

export default apiRouter;
