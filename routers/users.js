import express from "express";
import userController from "../controllers/userControllers.js";
import schemas from "../schemas/users.js";
import auth from "../middlewares/auth.js";
import validateUser from "../middlewares/validation.js";

const router = express.Router();

router.get("/register", userController.getRegisterView);
router.get("/login", userController.getLoginView);
router.get("/profile", userController.getUserProfileView);
router.get("/users", userController.usersListView);
router.get("/profile/edit", userController.getEditProfileView);


router.post("/register", validateUser(schemas.register, "body"), userController.register);


router.get("/profile/data", auth, userController.getUserProfileData);
router.get("/users/data", auth, userController.usersListData);
router.post("/login", validateUser(schemas.login, "body"), userController.login);
router.put("/profile/edit", auth, validateUser(schemas.loginEdit, "body"), userController.editProfile);
router.delete("/profile/delete", auth, userController.deleteUser);


export default router;



