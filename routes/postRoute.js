import express from "express";
import { validate } from "../middleware/validate.js";
import { postSchema } from "../validators/postValidator.js";

import {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
import authenticate from "../middleware/authenticate.js";
const postRouter = express.Router();
postRouter.get("/posts", getAllPosts);
postRouter.post("/posts", authenticate, validate(postSchema), createPost);
postRouter.put("/posts/:id", authenticate, validate(postSchema), updatePost);
postRouter.delete("/posts/:id", authenticate, deletePost);

export default postRouter;
