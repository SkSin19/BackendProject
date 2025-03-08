import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import {loginUser} from "../controllers/user.controller.js";
import { logoutUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const UserRouter = Router()

UserRouter.route("/register").post(
    // upload.fields([                                //upload.fields is for injecting middleware just before registerUser function
    //     {name: "avatar", maxCount: 1},
    //     {name: "coverImage", maxCount: 1},
    // ]),
    registerUser
)

UserRouter.route("/login").post(
    loginUser
)

UserRouter.route("/logout").post(
    verifyJWT,
    logoutUser    
)



export default UserRouter