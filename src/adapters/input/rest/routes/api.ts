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

apiRouter.get("/jobs/unpaid", getProfile, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const jobs = await apiApp.getUnpaidJobs(Number(id));
    return res.status(200).send({
      data: jobs
    });
  } catch (error) {
    return res.status(500).send({ error: "failed to find job" });
  }
});

// apiRouter.put("/jobs/:id/pay", async (req: Request, res: Response) => {
//   return res.json({"data": "It works!"})
//   const { id } = req.params;
//   const job = await apiApp.payJob(id);
//   res.json(job);
// });

// apiRouter.put("/balance/:id", async (req: Request, res: Response) => {
//   const { id } = req.params;
//   return res.json({"data": "It works!"})
//   const { deposit } = req.body;
//   const balance = await apiApp.deposit(id, deposit);
//   res.json(balance);
// });

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
