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


//getAll Post with Pagination
export const getPosts = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const category = req.query.category;
  

  const search = req.query.page || 1;

  const filter = {}

  //filter By Search
  if(search){
    filter.title = {
      $regex: search,
      $options: 'i'
    }
  }

  //Filter By Category
  if(category){
    filter.category = category;
  }

  try {
    const posts = await Post.find(filter)
      .populate("category")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);


    const total = await Post.countDocuments();


    res.status(201).json({
      success: true,
      total,
      page,
      pages: Math.ceil(total/limit),
      posts,
    })

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getSinglePost = async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await Post.findOne({ slug }).populate("category");
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Post Update
export const updatePost = async (req, res) => {
  console.log("Params", req.params);
  const { id } = req.params;
  try {
    const post = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

//Post Delete
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findByIdAndDelete(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: false,
      message: "Post Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
