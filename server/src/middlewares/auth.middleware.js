import { ApiError } from "../utlis/ApiError.js";
import AsyncResponse from "../utlis/AsyncResponse.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const authCheck = AsyncResponse(async (req, res, next) => {
  try {
    const accessToken =
      req.cookies?.accessToken ||
      req.headers("authorization")?.replace("Bearer", "");

    if (!accessToken) {
      throw new ApiError("Unauthorized Token", 401);
    }

    const decodedInfo = jwt.verify(
      accessToken,
      process.env.SECRET_ACCESS_TOKEN
    );
    const user = await User.findById(decodedInfo._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError("Invalid Token", 401);
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError("Invalid Token", 401);
  }
});
