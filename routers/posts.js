import express from "express";
import postController from "../controllers/postControllers.js";
import auth from "../middlewares/auth.js";
import schemas from "../schemas/posts.js";
import validatePost from "../middlewares/validation.js";

const router = express.Router();

router.get("/posts", postController.getPostsView);
router.get("/posts/create", postController.getCreatePostView);
router.get("/posts/:id/edit", postController.getEditPost);

router.get("/posts/data", auth, postController.getPostsData);
router.post("/posts/create/data", auth, validatePost(schemas.createPost, "body"), postController.createPostData);
router.put("/posts/:id/data", auth, postController.updatePost);
router.delete("/posts/:id/data", auth, postController.deletePost);



router.get("/search", postController.searchPosts);


export default router;
