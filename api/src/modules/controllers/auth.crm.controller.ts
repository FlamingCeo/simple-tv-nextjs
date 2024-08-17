import { NextFunction, Request, Response } from "express";
import authService from "../services/auth.crm.service";


const UserLoginController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const resp = await authService.UserLoginService(req, res);
	} catch (err) {
		console.log("ooooooooo",err)
		next(err);
	}
};

const UserRegistrationController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const resp = await authService.UserRegistrationService(req, res);
	} catch (err) {
		next(err);
	}
};


export const crmController = {
  UserLoginController,
  UserRegistrationController,
};
