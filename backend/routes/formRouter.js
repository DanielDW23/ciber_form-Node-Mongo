import express from "express";
import {
  createForm,
  deleteform,
  updateForm,
  getForms,
  getFormid,
} from "../controller/formController.js";
import { authRole } from "../middlewares/authRole.js";
import { limiter2 } from "../middlewares/rateLimiter.js";
import recaptchaMiddleware from "../middlewares/recaptchaMiddleware.js";

const formRouter = express.Router();

formRouter.post ('/',/*limiter2,*/ recaptchaMiddleware, createForm )
formRouter.get("/", authRole("user"), getForms);
formRouter.get("/:id", authRole("user"), getFormid);
formRouter.put("/:id", authRole("admin"), updateForm);
formRouter.delete("/:id", authRole("admin"), deleteform);

export default formRouter;
