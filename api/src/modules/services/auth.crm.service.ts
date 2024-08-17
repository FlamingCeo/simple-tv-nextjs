import { User } from "@models/user.crm.model";
import { NextFunction, Request, Response } from "express";
import { PasswordValidator, ValidationHelper as VH } from "@utils/helpers/validation.helper";
import { ErrorResponses as ER } from "@utils/helpers/errors.helper";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import configs from "@lib/config/default.config";
import { v4 } from "uuid";


const UserLoginService = async (req: Request, res: Response) => {
  const vh: any = VH.checkRequestBody(User.getAttributes(), req.body, ["email", "password"]);
  if (Array.isArray(vh)) return ER.return400(res, vh);
  const pv: any = PasswordValidator.validatePassword(vh.password);
  if (pv.length) return ER.return400(res, pv);

  const user: User | null = await User.findOne({
    where: { email: vh.email },

  });

  if (!user) return ER.return404(res, ["Account with this email doesn't exist!"]);

  const isPasswordValid: boolean = bcrypt.compareSync(vh.password, user.password);
  if (!isPasswordValid) return ER.return401(res, ["Password is invalid!"]);


  let user_object: any = {
    user_id: user.user_id,
    email: user.email,
  };

  let delay = 7 * 86400 * 1000;
  const expiresIn = new Date(new Date().getTime() + delay);
  const token = jwt.sign(user_object, configs.JWT_SECRET, { expiresIn: "7d" });
  user_object.email = user.email;

  return res.json({ user: user_object, token: token, expiresIn: expiresIn });
};

const UserRegistrationService = async (req: Request, res: Response) => {
  const vh: any = VH.checkRequestBody(User.getAttributes(), req.body, ["email", "password"]);

  vh.user_password = v4();
  if (Array.isArray(vh)) return ER.return400(res, vh);
  const pv: any = PasswordValidator.validatePassword(vh.user_password);
  if (pv.length) return ER.return400(res, pv);

  {
    const user: User | null = await User.findOne({
      where: { email: vh.user_email },
    });
    if (user) return ER.return401(res, ["User already exists."]);
  }
  const user: User | null = await User.create(vh);
  return res.json({ status: 200, message: "User created successfully!" });
};



export default {
  UserLoginService,
  UserRegistrationService,

};