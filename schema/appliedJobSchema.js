import mongoose from "mongoose";

const appliedJobsSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "jobSchema",
    required: true
  }
}, { timestamps: true });

const AppliedJobsdb = mongoose.model("AppliedJobs", appliedJobsSchema);
export default AppliedJobsdb;