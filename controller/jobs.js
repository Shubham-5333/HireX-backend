import AppliedJobsdb from "../schema/appliedJobSchema.js";
import Jobsdb from "../schema/jobsSchema.js";



const createJobs = (req, res) => {
    const { title, company, description, location, salaryFrom, salaryTo, type } = req.body
    console.log("resach jobs", title, company, description, location, salaryFrom, salaryTo, type);
    if (!title || !company || !description || !location || !salaryFrom || !salaryTo || !type) {
        return res.status(400).json({ message: 'Please enter all details' })
    }
    const jobsData = Jobsdb.create({
        title: title,
        company: company,
        description: description,
        location: location,
        salaryFrom: salaryFrom,
        salaryTo: salaryTo,
        type: type

    })
    res.status(200).json({ message: 'job created', jobsData: jobsData })

}
const findJob = async (req, res) => {
    console.log("reaching here");

    try {
        const foundData = await Jobsdb.find()
        console.log("yes foundjobs", foundData);
        res.status(200).json({ message: "found data", foundData: foundData })
    } catch (error) {
        console.log(error);

    }

}

const applyJob = async (req, res) => {  
  const { jobId } = req.body;

  try {
    const exists = await AppliedJobsdb.findOne({ jobId });

    if (exists) {
      return res.status(400).json({ message: "Already applied" });
    }
    await AppliedJobsdb.create({ jobId });

    res.status(200).json({ message: "Applied successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error applying job" });
  }
};
 
const getAppliedJobs = async (req, res) => {
    console.log("hi");
    
  try {
    const appliedJobs = await AppliedJobsdb.find()
      .populate("jobId"); 

    const formattedJobs = appliedJobs.map(item => ({
      ...item.jobId.toObject(),
      appliedDate: item.createdAt.toLocaleDateString()
    }));
    res.status(200).json({allAppliedJobs: formattedJobs});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error" });
  }
};
export {
    createJobs, findJob, applyJob, getAppliedJobs
}