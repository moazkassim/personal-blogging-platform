import express from "express";

import {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
import authenticate from "../middleware/authenticate.js";
const postRouter = express.Router();
postRouter.get("/posts", getAllPosts);
postRouter.post("/posts", authenticate, createPost);
postRouter.put("/posts/:id", authenticate, updatePost);
postRouter.delete("/posts/:id", authenticate, deletePost);

export default postRouter;
