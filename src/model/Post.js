import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
    },

    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
      required: true,
    },

    shortDescription: String,

    content: String,

    thumbnail: String,

    pdfLink: String,

    applyLink: String,

    lastDate: Date,

    views: {
      type: Number,
      default: 0,
    },

    isPublished: {
      type: Number,
      default: true,
    },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },

  { timestamps: true },
);



const Post = mongoose.model("Post", postSchema);

export default Post;