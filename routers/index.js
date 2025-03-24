import express from "express";
import userRouter from "./users.js";
import postRouter from "./posts.js";

const router = express.Router();

router.use("/user", userRouter)
router.use("/post", postRouter)
router.get("/", (req, res) => {
    res.render("users/login",);
});


export default router;
