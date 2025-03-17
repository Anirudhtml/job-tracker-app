import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  jobData: [
    {
      id: 1,
      DateApplied: "today",
      Title: "Software Engineer Intern",
      Company: "Deloitte",
      Status: "Applied",
      Category: "Software Dev",
    },
  ],
};

const today = new Date();

const formattedDate = today.toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
});

const dayOfWeek = today.toLocaleDateString("en-US", {
  weekday: "long",
});

export const jobDataSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    addJob: (state, action) => {
      const job = {
        id: nanoid(),
        DateApplied: `${formattedDate}, ${dayOfWeek}`,
        Title: action.payload.Title,
        Company: action.payload.Company,
        Status: action.payload.Status,
        Category: action.payload.Category,
      };

      state.jobData.push(job);
    },
    removeJob: () => {},
    editJob: () => {},
  },
});

export const { addJob } = jobDataSlice.actions;
export default jobDataSlice.reducer;
