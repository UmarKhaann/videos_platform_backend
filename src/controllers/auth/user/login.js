import asyncHandler from "../../../utils/asyncHandler.js";
import User from "../../../models/user.model.js";
import ApiError from "../../../utils/apiError.js"
import ApiResponse from "../../../utils/apiResponse.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong generating access and refresh token",
    );
  }
};

const loginUser = asyncHandler(async (req, res) => {
  // req body => data
  const { email, username, password } = req.body;

  // check username || email
  if (!username && !email) {
    throw new ApiError(400, "username or email is required");
  }

  // find the user
  const user = await User.findOne({
  $or: [{ email: email }, { username: username }],
});


  if (!user) {
    throw new ApiError(404, "User does not exist.");
  }

  // check password
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) throw new ApiError(401, "Incorrect password");

  // access and refresh token
  const { refreshToken, accessToken } = await generateAccessAndRefreshTokens(
    user._id,
  );

  // send cookies
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully",
      ),
    );
});

export default loginUser;
