import { Router } from "express";
import { userDetails } from "../controllers/userDetails.controller.js";


const UserDetailRouter = Router()

UserDetailRouter.route("/userDetails").post(
    userDetails
)

export default UserDetailRouter