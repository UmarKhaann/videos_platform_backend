import { Router } from "express";
import registerUser from "../controllers/auth/user.auth.register.controller.js";
import loginUser from "../controllers/auth/user.auth.login.controller.js";
import logoutUser from "../controllers/auth/user.auth.logout.controller.js";
import refreshAccessToken from "../controllers/auth/user.auth.refreshAccessToken.controller.js";
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
