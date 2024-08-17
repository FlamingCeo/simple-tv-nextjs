import { Express } from "express";
import seriesRoutes from "./routes/series.routes";
import authRoutes from "./routes/auth.routes";
import paymentRoutes from "./routes/payment.routes" ;
import generalRoutes from "./routes/general.routes";



const setupRouters = (app: Express) => {
	app.use("/api/", authRoutes);
	app.use("/api/", seriesRoutes);
	app.use("/api/", generalRoutes);
	app.use("/api/", paymentRoutes);

};

export default setupRouters;
