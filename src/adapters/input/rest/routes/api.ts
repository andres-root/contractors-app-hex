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


apiRouter.post("/balances/deposit/:userId", getProfile, async (req: RequestWithProfile, res: Response) => {
  // TODO: Fix inconcistency with balance ammount after udpate
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

apiRouter.get("/admin/best-profession", async (req: Request, res: Response) => {
  const startDate = req.query.start;
  const endDate = req.query.end;

  if (!startDate || !endDate) {
    return res.status(400).send({ error: "start and end date are required" });
  }

  if (typeof startDate !== 'string' || typeof endDate !== 'string') {
    return res.status(400).send({ error: "start and end dates must be strings" });
  }

  try {
    const bestProfession = await apiApp.getBestProfession(startDate, endDate);
    res.status(200).json(bestProfession);

  } catch (error) {
    return res.status(500).send({ error: "failed to get best profession" });
  }
});

apiRouter.get("/admin/best-clients", async (req: Request, res: Response) => {
    const startDate = req.query.start;
    const endDate = req.query.end;
    const limit = req.query.limit || 2;

    if (!startDate || !endDate) {
      return res.status(400).send({ error: "start and end date are required" });
    }

    if (typeof startDate !== 'string' || typeof endDate !== 'string') {
      return res.status(400).send({ error: "start and end dates must be strings" });
    }

    try {
      const bestClients = await apiApp.getBestClients(startDate, endDate, Number(limit));
      res.status(200).json(bestClients);
    } catch (error) {
      return res.status(500).send({ error: "failed to get best clients" });
    }
});

export default apiRouter;
