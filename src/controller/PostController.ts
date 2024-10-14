// import createError from 'http-errors';
// import Post from '../model/Post';
// import { NextFunction } from 'express';

// // Create a new post
// export const createPost = async (req:Request, res:Response, next:NextFunction) => {
//   try {
//     const { title, content } = req.body;
//     const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

//     const newPost = new Post({
//       title,
//       content,
//       imageUrl,
//       user: req.user._id,  // Save logged-in user ID
//     });

//     await newPost.save();
//     res.status(201).json({ message: 'Post created successfully', post: newPost });
//   } catch (error) {
//     next(createError(500, error.message));
//   }
// };

// // Update or delete user-specific posts
// export const updatePost = async (req, res, next) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (!post) return res.status(404).json({ message: 'Post not found' });

//     if (post.user.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ message: 'You can only edit your own posts' });
//     }

//     post.title = req.body.title || post.title;
//     post.content = req.body.content || post.content;

//     if (req.file) {
//       post.imageUrl = `/uploads/${req.file.filename}`;  // Update image if uploaded
//     }

//     await post.save();
//     res.status(200).json({ message: 'Post updated successfully', post });
//   } catch (error) {
//     next(createError(500, error.message));
//   }
// };

// // Delete a post
// export const deletePost = async (req, res, next) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (!post) return res.status(404).json({ message: 'Post not found' });

//     if (post.user.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ message: 'You can only delete your own posts' });
//     }

//     await post.remove();
//     res.status(200).json({ message: 'Post deleted successfully' });
//   } catch (error) {
//     next(createError(500, error.message));
//   }
// };
