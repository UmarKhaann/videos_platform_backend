import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
  
    if (!token) throw new ApiError(401, "Unauthorized request");
  
    const decodedInfo = jwt.verify(token, process.env.ACESS_TOKEN_SECRET);
  
    const user = await User.findById(decodedInfo?._id).select(
      "-password -refreshToken",
    );
  
    if (!user) throw new ApiError(401, "Invalid access token");
  
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token")
  }
});

export default verifyJWT;
