import Post from "../model/Post.js";

export const createPosts = async (req, res) => {
  try {
    const post = await Post.create({ ...req.body, createdBy: req.user.id });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("category")
      .sort({ createdAt: -1 });
    res.status(201).json(posts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getSinglePost = async (req, res) => {
  try {
    const { slug } = req.params.slug;
    const posts = await Post.find(slug).populate("category");
    res.status(201).json(posts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



// Post Update 

export const updatePost = async (req, res) => {
  const { id } = req.params.id;
  try {
    const post = Post.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if(!post){
      return res.status(404).json({success: true, message: "Post not found"})
    }

    res.status(200).json({
      success: true,
      post
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false
    })
  }
};


//Post Delete

export const deletePost = async(req, res) =>{
  try {
    const {id} = req.params.id;

    const post = await Post.findByIdAndDelete(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: false,
      message: "Post Deleted Successfully"
    })
  } catch (error) {
     res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
