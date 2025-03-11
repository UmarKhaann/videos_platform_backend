import { Router } from "express";
import registerUser from "../controllers/auth/user/register.js";
import loginUser from "../controllers/auth/user/login.js";
import logoutUser from "../controllers/auth/user/logout.js";
import refreshAccessToken from "../controllers/auth/user/refreshAccessToken.js";
import upload from "../middlewares/multer.middleware.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser,
);

router.route("/login").post(loginUser);

// secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);

export default router;
