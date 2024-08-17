import { Router, json } from "express";
import controller from "@modules/index.crm.module";

import { UserJwtAuth } from "@utils/middlewares/auth.middleware";

const authR: Router = Router();

authR.use(json({ limit: "25mb" }));
authR.use((req, res, next) => {
  console.log(`- ${req.method} | ${req.url}`);
  if (req.body) {
    console.log(`Request Body: ${JSON.stringify(req.body, null, 2)}`);
  }
  next();
});



// #  Auth related APIs
authR.post("/login", controller.crmController.UserLoginController);
authR .post(
  "/add-user",
  UserJwtAuth,
  controller.crmController.UserRegistrationController
);

export default authR;
