import { asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import { UserDetail } from "../models/userDetails.model.js";





const userDetails = asyncHandler( async (req,res) => {
    const {user , age, gender, interestedIn, personality, interests, relationshipType} = req.body;

    if (!age) {
        throw new ApiError(400, "Age is required")
    }
    if(!gender){
        throw new ApiError(400, "Gender is required")
    }
    
    if(!interestedIn){
        throw new ApiError(400, "Insterested in is required")
    }

    if(!personality){
        throw new ApiError(400, "Personality is required")
    }
    if(!interests){
        throw new ApiError(400, "Interests are required")
    }
    if(!relationshipType){
        throw new ApiError(400, "Relationship type is required")
    }

    const userDetails = await UserDetail.create({
        user,
        age,
        gender,
        interestedIn,
        personality,
        interests,
        relationshipType,
    })
    if(!userDetails){
        throw new ApiError(500, "User Details creation failed")
    }
    else{
        res.status(201).json(new ApiResponse(201, "User Details created successfully", userDetails))
    }
    })




export {userDetails}