import mongoose from 'mongoose'

const jobSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    company: {
        require: true,
        type: String
    },
    description: {
        require: true,
        type: String
    },
    location: {
        require: true,
        type: String
    },
    salaryFrom: {
        require: true,
        type: Number
    },
    salaryTo: {
        require: true,
        type: Number
    },
    type: {
        require: true,
        type: String
    },

})

const Jobsdb = mongoose.model('jobSchema', jobSchema)
export default Jobsdb