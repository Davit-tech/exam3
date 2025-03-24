
import Posts from "../models/postsTable.js";


const title = "createPOst";
export default {
    async getPostsView(req, res) {
        const title = "Posts";
        res.render("posts/posts", {
            title,
        });
    },

    async getPostsData(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 4;
            const offset = (page - 1) * limit;
            console.log(req.query);

            const totalPosts = await Posts.countPosts();
            const totalPages = Math.ceil(totalPosts / limit);

            const posts = await Posts.findPaginatedPosts(offset, limit);
            res.json({
                posts,
                totalPages,
                currentPage: page,
            });
        } catch (error) {
            console.error("Error fetching posts data:", error);
            res.status(500).json({message: `Error fetching posts data${error.message}`});
        }
    }
    ,
    async getCreatePostView(req, res) {
        res.render("posts/createPost", {title});
    },
    async createPostData(req, res) {
        const {title, author, text, date} = req.body;
        const id = req.userId;

        try {
            await Posts.createPosts(title, author, text, date, id);
            const posts = await Posts.findPaginatedPosts(0, 5);
            res.json({
                success: true,
                message: "Post successfully created",
                posts,
            });
        } catch (error) {
            console.log(error);
        }
    },
    async getEditPost(req, res) {
        const {id} = req.params;

        try {
            const post = await Posts.findById(id);

            if (!post) {
                console.log("Post not found");
            }

            res.render("posts/editPost", {post, title: "Edit Post"});
        } catch (error) {
            console.error("Error fetching post:", error);

        }
    }
    ,
    async updatePost(req, res) {
        const {id} = req.params;
        const {title, author, text, date} = req.body;


        try {
            const post = await Posts.findById(id);
            if (!post) {
                console.log("post not found");
                return res.status(404).json({ message: "Post not found" });
            }

            await Posts.editPostById(id, title, author, text, date);


            res.json({
                message: "Post updated successfully",

            });
        } catch (error) {
            console.log(error);
        }
    },
    async deletePost(req, res) {
        const {id} = req.params;

        try {

            const post = await Posts.findById(id);

            if (!post) {
                return res.status(404).json({message: "Post not found"});
            }
            await Posts.deletePostById(id);

            res.status(204).send();
        } catch (error) {
            console.log(error);
        }
    },
    async searchPosts(req, res) {
        const {q} = req.query;

        if (!q) {
            return res.status(400).json({message: "Search query is required"});
        }

        try {
            const results = await Posts.searchPosts(q);
            res.json({posts: results});
        } catch (error) {
            console.log(error);
        }
    }


};
