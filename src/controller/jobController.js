import Job from "../model/job.js"

export const createJob = async(req, res)=>{
  try {
    const job = await Job.create(req.body);
    console.log("All jobs ", job)

    res.status(201).json(job)
  } catch (error) {

    res.status(500).json({
      message: error.message
    })
    
  }
}

export const getJob = async(req, res) =>{
  try {
    const jobs = await Job.find({createdAt: -1});

    res.status(201).json(jobs)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}