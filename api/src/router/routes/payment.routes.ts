
import { Router, json } from "express";
import controller from "@modules/index.crm.module";

const paymentR: Router = Router();

paymentR.use(json({ limit: "25mb" }));

paymentR.get("/payments", controller.paymentController.GetPayment); // Fetch all payments and user access details
paymentR.post("/payments", controller.paymentController.AddPayment); // Add a new payment
paymentR.put("/payments/:id", controller.paymentController.UpdatePayment); // Update payment by ID
paymentR.delete("/payments/:id", controller.paymentController.DeletePayment); // Delete payment by ID
paymentR.get("/payments/:id", controller.paymentController.GetPaymentById); // Fetch payment details by ID
paymentR.post("/grant", controller.paymentController.UpdateGrant); // Fetch payment details by ID
export default paymentR;
