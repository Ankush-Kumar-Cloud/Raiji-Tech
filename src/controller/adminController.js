import cloudinary from "../config/cloudinary.js";
import Post from "../model/Post.js";


export const getPosts = async (req, res) => {
  try {
    const search = req.query.search || "";
    const categorySlug = req.query.category || "";

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    // Public API: only published posts
    let filter = {
      status: "published",
    };

    // Search
    if (search) {
      filter.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          shortDescription: {
            $regex: search,
            $options: "i",
          },
        },
        {
          content: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // Category filter
    if (categorySlug) {
      const category = await Category.findOne({
        slug: categorySlug,
      });

      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }

      filter.category = category._id;
    }

    const total = await Post.countDocuments(filter);

    const posts = await Post.find(filter)
      .populate("category", "name slug")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      totalPosts: total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const deleteAdminPost = async(req, res) =>{

  try {
    
    const {id} = req.params;

    const post = await Post.findById(id)

    if(!post){
      return res.status(404).json({
        message: "Post not found",
        success: false

      })
    }

        // Delete thumbnail from Cloudinary
    if (post.thumbnailPublicId) {
      await cloudinary.uploader.destroy(
        post.thumbnailPublicId,
        {
          resource_type: "image",
        }
      );
    }

    // Delete PDF from Cloudinary
    if (post.pdfPublicId) {
      await cloudinary.uploader.destroy(
        post.pdfPublicId,
        {
          resource_type: "raw",
        }
      );
    }


    //delete post from mongoDB

    await Post.findByIdAndDelete(id)

    res.status(200).json({
      success: true,
      message: "Post and uploaded File deleted sucessfully"
    })

    

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}



export const updatePostStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    const allowedStatuses = [
      "draft",
      "published",
      "archived",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid status. Use draft, published or archived.",
      });
    }

    // Find and update post
    const post = await Post.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    ).populate("category", "name slug");

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: `Post ${status} successfully`,
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};






