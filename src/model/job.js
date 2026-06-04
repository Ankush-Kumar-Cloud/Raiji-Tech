import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  department: String,

  totalPosts: Number,

  qualification: String,

  ageLimit: String,

  applicationFee: String,

  applyLink: String,

  notificationPDF: String,

  lastDate: Date,


},

{timestamps: true}

)
const Job = mongoose.model("Job", jobSchema);

export default Job;