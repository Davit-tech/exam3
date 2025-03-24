import Users from '../models/usersTable.js';
import authUtils from "../utils/authUtils.js";

export default {
    async getLoginView(req, res) {
        res.render("users/login");
    },
    async getRegisterView(req, res) {
        res.render("users/register");
    },
    async getUserProfileView(req, res) {
        res.render("users/profile");
    },
    usersListView: (req, res) => {
        res.render("users/users", {
            title: "user List",
        });
    },


    async register(req, res) {
        const {firstname, lastname, email, password} = req.body;

        const existingUser = await Users.findByEmail(email);
        if (existingUser) {
            return res.status(422).json({

                message: "User with this email already exists. Please try another one",

            });
        }

        try {
            await Users.createUsers(firstname, lastname, email, password);

            res.status(200).json({

                message: "Registration successful!",

            });
        } catch (err) {
            console.error(err);
        }
    },
    async login(req, res) {
        const {password, email} = req.body;
        try {
            const existingUser = await Users.findByEmail(email);
            if (!existingUser) {
                return res.status(422).json({
                    message: "User not found",

                });
            }
            const result = authUtils.validatePasswordAndGenerateToken(existingUser, password);

            if (result.success) {
                return res.status(200).json({
                    token: result.token,
                    expiresIn: result.expiresIn,
                    success: true,
                    message: "Login successful!",
                    messageType: "success",
                    userId: existingUser.id,
                });
            }

            return res.status(401).json({


                message: result.message,
            });
        } catch (err) {
            console.log(err)
        }


    },
    async getUserProfileData(req, res) {
        const id = req.userId;

        try {
            const user = await Users.findById(id);
            if (!user) {
                console.log("error")
            }
            res.json({
                user,
            });
        } catch (err) {
            console.log(err)
        }


    },
    async usersListData(req, res) {
        try {
            const users = await Users.findAll();

            res.json({
                users,
            });
        } catch (err) {
            console.log(err)
        }


    },
    async getEditProfileView(req, res) {

        res.render("users/editProfile");
    },

    async editProfile(req, res) {
        const userId = req.userId;
        const {firstname, lastname, email} = req.body;

        try {

            const user = await Users.findById(userId);
            if (!user) {
                console.log("post not found");
                return res.status(404).json({ message: "Post not found" });
            }



            await Users.updateUserById(userId, {firstname, lastname, email});


            res.json({
                message: "Profile updated successfully",
            });
        } catch (error) {
            console.log(error);
        }
    }, async deleteUser(req, res) {
        const userId = req.userId;

        try {

            const result = await Users.deleteUserById(userId);
            if (!result) {
                return res.status(404).json({
                    message: "User not found",
                });
            }

            res.status(200).json({

                message: "User deleted successfully",
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Failed to delete user",
            });
        }
    },


}