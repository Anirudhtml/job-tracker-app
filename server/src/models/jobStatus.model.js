import mongoose from "mongoose";


const jobStatusSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ["Applied", "Follow-up", "Interview", "Updates" , "Offer", "Closed"],
        default: "Applied",
    },
    isClosed: {
        type: Boolean,
        default: false,
    }
}, {timestamps: true});

export const JobStatus = mongoose.model("JobStatus", jobStatusSchema);