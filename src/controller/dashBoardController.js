import Category from "../model/Category.js";
import Post from "../model/Post.js";
import User from "../model/user.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalPosts = await Post.countDocuments();

    const totalUsers = await User.countDocuments();

    const totalCategories = await Category.countDocuments();

    const latestPost = await Post.find({ createdAt: -1 }).limit(-5);

    res.status(200).json({
      success: true,
      stats: {
        totalPosts,
        totalUsers,
        totalCategories,
      },
      latestPost, 
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
