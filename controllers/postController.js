import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import postModel from "../models/postModel.js";

const getAllPosts = async (req, res) => {
  try {
    const posts = await postModel.find({}); ////////////////////
    res.status(200).json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching posts", error: error.message });
  }
};
const createPost = async (req, res) => {
  console.log("Controller: Request User Object:", req.user);
  try {
    const { title, content } = req.body;

    const newPost = new postModel({
      title,
      content,
      author: req.user.id,
    });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating post", error: error.message });
  }
};
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const post = await postModel.findById(id);
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const updatedPost = await postModel.findByIdAndUpdate(
      id,
      { title, content },
      { new: true },
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating post", error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postModel.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    await postModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ success: true, message: "post deleted" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred",
    });
  }
};

export { getAllPosts, createPost, updatePost, deletePost };
