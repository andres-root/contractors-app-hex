import express, { Request, Response } from "express";
import { ApiApp } from "../../../../core/apps/api";
import { ApiRepository } from "../../../output/repositories/api";

const homeRouter = express.Router();
const apiRepository = new ApiRepository();
const apiApp = new ApiApp(apiRepository);


homeRouter.get("/contracts/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const contracts = await apiApp.getContractsById(id);
  res.json(contracts);
});

homeRouter.get("/contracts", async (req: Request, res: Response) => {
  const contracts = await apiApp.getAllContracts();
  res.json(contracts);
});

homeRouter.get("/jobs/unpaid/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const jobs = await apiApp.getUnpaidJobs(id);
  res.json(jobs);
});

homeRouter.put("/jobs/:id/pay", async (req: Request, res: Response) => {
  const { id } = req.params;
  const job = await apiApp.payJob(id);
  res.json(job);
});

homeRouter.put("/balance/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { deposit } = req.body;
  const balance = await apiApp.deposit(id, deposit);
  res.json(balance);
});

homeRouter.get("/best-profession", async (req: Request, res: Response) => {
  const { start, end } = req.query;
  const profession = await apiApp.bestProfession(start, end);
  res.json(profession);
});

homeRouter.get("/best-clients", async (req: Request, res: Response) => {
  const { start, end } = req.query;
  const clients = await apiApp.bestClients(start, end);
  res.json(clients);
});

export default homeRouter;
