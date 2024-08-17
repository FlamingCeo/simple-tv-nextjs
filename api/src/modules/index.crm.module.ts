import { crmController } from "./controllers/auth.crm.controller";
import { seriesController} from "./controllers/series.crm.controller";
import { paymentController } from "./controllers/payment.crm.controller";


const handler = {
  crmController,
  seriesController,
  paymentController,
};

export default handler;
