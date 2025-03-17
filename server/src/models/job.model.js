import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    tite: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
    status: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JobStatus",
    }
  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema);
