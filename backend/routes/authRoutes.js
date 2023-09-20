import { Router } from "express";
const authRouter = Router()

import * as authCtrl from '../controller/authController'

authRouter.post("./signup",authCtrl.signup)
authRouter.post("./signin",authCtrl.signin)

export default authRouter
