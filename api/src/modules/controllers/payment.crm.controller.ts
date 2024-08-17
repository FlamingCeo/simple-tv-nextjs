import { NextFunction, Request, Response } from "express";
import { Series } from "@models/series.crm.model";
import { Season } from "@models/season.crm.model";
import { Episode } from "@models/episode.crm.model";
import { Payment } from "@models/payment.crm.model";
import { User } from "@models/user.crm.model";

import { UserAccess } from "@models/useraccess.crm.model";
import { ValidationHelper as VH } from "@utils/helpers/validation.helper";
import { Op,fn,col } from "sequelize";

// Get all series with seasons and episodes
const GetPayment= async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user_id = req.query.user_id as string;




const payments = await Payment.findAll({
  attributes: [
    "id",
    [col("Payment.series_id"), "series_id"],
    [col("Payment.season_id"), "season_id"],
    [col("Payment.user_id"), "user_id"],
    [col("series.name"), "series_name"],
    [col("season.name"), "season_name"],
    [col("user.email"), "email"],
    [col("Payment.amount"), "amount"],
    [col("Payment.grant_status"), "status"],
  ],

  include: [
    {
      model: Series,
      as: "series",
      attributes: ["name"],
    },
    {
      model: Season,
      as: "season",
      attributes: ["name"],
    },
    {
      model: User,
      as: "user",
      attributes: ["user_id", "email"],
    },
  ],
  raw: true,
  order: [[col("Payment.id"), "ASC"]], // Using col() to refer to Payment.id
});

    return res.json({
      payments,
      // access: userAccess,
    });
  } catch (err) {
    console.log('eeeeeee',err)
    next(err);
  }
};

// Add Payment and Grant Access
const AddPayment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { series_id, user_id, season_id, payment_date, amount } = req.body;

    // Validate the request
    const vh: any = VH.checkRequestBody(Payment.getAttributes(), req.body, [
      "series_id",
      "user_id",
      "season_id",
      "payment_date",
      "amount",
    ]);

    // Create a new Invoice record
    const newInvoice = await Payment.create(vh);
    vh.status = true;
    // Grant access to the series and season for the user
    const userAccess = await UserAccess.create(vh);

    return res.status(201).json({
      message: "Payment successful and access granted.",
      invoice: newInvoice,
      access: userAccess,
    });
  } catch (err) {
    next(err);
  }
};

// Update Payment
const UpdatePayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    console.log(req.body);
    const { amount } = req.body;
    const payment = await Payment.findByPk(id);

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    payment.amount = amount;
    await payment.save();

    return res.json(payment);
  } catch (err) {
    next(err);
  }
};
// Update Grant 
const UpdateGrant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id ,status} = req.body;
    const payment = await Payment.findByPk(id);

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    payment.grant_status = !req.body.status;
    await payment.save();

    return res.json(payment);
  } catch (err) {
    next(err);
  }
};


const DeletePayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const invoice = await Payment.findByPk(id);

    if (!invoice) {
      return res.status(404).json({ message: "Pamynet not found" });
    }

    await invoice.destroy();
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};

// Get Payment by ID
const GetPaymentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const invoice = await Payment.findByPk(id);

    if (!invoice) {
      return res.status(404).json({ message: "Payment not found" });
    }

    return res.json(invoice);
  } catch (err) {
    next(err);
  }
};

export const paymentController = {
  GetPayment,
  AddPayment,
  UpdateGrant,
  UpdatePayment,
  DeletePayment,
  GetPaymentById,
};
