import { Router } from "express";
import UserRouter from "./user.routes.js";
import UserDetailRouter from "./userDetails.router.js";

const router = Router()

router.use(UserRouter)
router.use(UserDetailRouter)

export default router