import AsyncResponse from "../utlis/AsyncResponse.js";
import { ApiError } from "../utlis/ApiError.js";
import {User} from "../models/user.model.js";


const registerUser = AsyncResponse(async (req, res) => {

  const { email, password, userName } = req.body;

  if (
    [email, password, userName].some((field) => !field || field.trim() === "")
  ) {
    throw new ApiError("Email, password and username is required", 400);
  }

  const existingUser = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (existingUser) {
    throw new ApiError("User Already exists", 400);
  }

  const user = await User.create({
    email,
    password,
    userName: userName.toLowerCase(),
  });

  if (!user) {
    throw new ApiError("could not create user", 409);
  }

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return res
    .status(201)
    .json(new ApiResponse(200, "User Registered successflly", createdUser));
});

const loginUser = AsyncResponse(async (req, res) => {

  const {userName, email, password} = req.body

  if([userName, email, password].some((field) => !field || field.trim() === "")) {
      throw new ApiError("email, userName , password is required", 409)
  }

  const existingUser = await User.findOne({
    $or: [email, userName]
  })

  if(!existingUser) {
    throw new ApiError("user does not exist, Try signing in", 409)
  }

  const isPasswordCorrect = User.isPasswordCorrect()
  if(isPasswordCorrect) {
    console.log("users password is correct")
  }

    
  res.status(200).json({
    success: true,
    message: "user loggedIn",
  });
});

export { registerUser, loginUser };
