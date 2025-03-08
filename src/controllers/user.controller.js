import { asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import { User} from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js";

const generateAccessAndRefreshTokens = async(userId) => {
    try {
        const user = await User.findById(userId) 
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        const accessToken = user.generateAccessToken() // Correct method name
        const refreshToken = user.generateRefreshToken() // Correct method name

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})

        return {accessToken, refreshToken}

    } catch (error) {
        console.error("Token Generation Error:", error);
        throw new ApiError(500, "Refresh and Access Token generation failed")
    }
}



const registerUser = asyncHandler( async (req,res) => {
    const {email, fullName, password} = req.body;

    if (fullName === "") {
        throw new ApiError(400, "Full name is required")
    }
    if(email === ""){
        throw new ApiError(400, "Email is required")
    }
    
    if(password === ""){
        throw new ApiError(400, "Password is required")
    }

    const existedUser = await User.findOne({
        $or: [{email}]
    })

    if (existedUser){
        throw new ApiError(409, "User already exists")
    }

    const user = await User.create({
        fullName,
        email : email.toLowerCase(),
        password,
    })

    const createdUser = await User.findById(user._id).select("-password  -refreshToken")

    if( !createdUser){
        throw new ApiError(500, "Something went wrong while registering the user")
    }


    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
        
    )
    })



const loginUser = asyncHandler(async (req, res) => {
    const {email, username, password} = req.body;

    if( !email && !username){
        throw new ApiError(400, "Email or username is required")
    }

    const user = await User.findOne({
        $or: [{username},{email}]
    })

    if(!user){
        throw new ApiError(404, "User not found")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid){
        throw new ApiError(401, "Invalid credentials")
    }



    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly : true,
        secure: true,
    }

    return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options).json(
        new ApiResponse(200, {
            user: loggedInUser,
            accessToken,
            refreshToken
        },    "User logged in successfully"
    ))
})

const logoutUser = asyncHandler(async (req, res) => {

    await User.findByIdAndUpdate (
        req.user._id,
        {
            $set: {refreshToken: undefined}
        },
        {
            new: true,
        }
    )

    const options = {
        httpOnly : true,
        secure: true,
    }

    return res.status(200).clearCookie("accessToken", options).clearCookie("refreshToken", options).json(new ApiResponse(200, {}, "User logged out successfully"))
})

export {registerUser, loginUser, logoutUser}