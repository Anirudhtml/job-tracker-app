import AsyncResponse from "../utlis/AsyncResponse.js";
import { ApiError } from "../utlis/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utlis/ApiResponse.js";
import jwt from "jsonwebtoken";

async function generateAcessAndRefreshToken(userId) {
  const user = await User.findById(userId);
  const accessToken = user.generateAcessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  user.save();

  return { accessToken, refreshToken };
}

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

  console.log(user);

  if (!user) {
    throw new ApiError("could not create user", 409);
  }

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  console.log(createdUser);

  return res
    .status(201)
    .json(new ApiResponse(201, "User Registered successflly", createdUser));
});

const loginUser = AsyncResponse(async (req, res) => {

  const { email, userName, password } = req.body;

  if ([email || userName].some((field) => !field || field.trim() === "")) {
    throw new ApiError("Email, password and username is required", 400);
  }

  const existingUser = await User.findOne({
    $or: [{ email }, { userName }],
  });

  if (!existingUser) {
    throw new ApiError("Please register first", 400);
  }

  const isPasswordCorrect = existingUser.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError("Invalid password", 400);
  }

  const { accessToken, refreshToken } = await generateAcessAndRefreshToken(
    existingUser._id
  );
  const loggedInUser = await User.findById(existingUser._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(200, "User logged in successfully", {
        user: loggedInUser,
        accessToken,
        refreshToken,
      })
    );
});

// Secured Routes

const logout = AsyncResponse(async (req, res) => {
  const user_id = req.user._id;
  const user = await User.findByIdAndUpdate(
    user_id,
    {
      $unset: {
        refreshToken: "",
      },
    },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, "User logged out successfully", {}));
});

const verifyAndRefreshTokens = AsyncResponse( async (req, res) => {

  try {
    const incomingRefreshToken = req.cookies?.refreshToken || req.body.refreshToken
    if(!incomingRefreshToken) {
      throw new ApiError("Token not provided", 400)
    }
    
    const decodedUser = jwt.verify(incomingRefreshToken, process.env.SECRET_REFRESH_TOKEN)
  
    const user = await User.findById(decodedUser._id)
    if(!user) {
        throw new ApiError("Invalid or expired Token", 400)
    }
  
    if(incomingRefreshToken !== user.refreshToken) {
      throw new ApiError("Token is not valid", 403)
    }
  
    const {refreshToken, accessToken} = await generateAcessAndRefreshToken(user._id)
  
    user.refreshToken = refreshToken;
    await user.save()
  
    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "None"
    }
  
    res
    .status(201)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(200, "refreshed both the token", {})
    )
  } catch (error) {
      throw new ApiError(error.message, 401)
  }

})

export { registerUser, loginUser, logout, verifyAndRefreshTokens };
