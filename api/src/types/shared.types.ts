import { Request, Response } from "express";
import { Transaction } from "sequelize";

export type ReqResType = {
  req: Request;
  res: Response;
};

export type RRType = {
  req: Request;
  res: Response;
  t: Transaction | null;
};
