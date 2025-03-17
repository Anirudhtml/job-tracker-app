import React from "react";
import "./StatusBar.css";

import { useSelector } from "react-redux";

const JobStatusBar = () => {

  const jobStatus = useSelector((state) => state.job.jobData)

  function calcStatus(Status) {
    const filterArray = jobStatus.filter((job) => job.Status == Status)

    return filterArray.length
  }

  return (
    <div className="status-bar-container">
      <div className="status-step status-applied">
        <p>Applied</p>
        <p>{calcStatus("Applied")}</p>
      </div>
      <div className="status-step status-interview">
        <p>Interview</p>
        <p>{calcStatus("Interview")}</p>
      </div>
      <div className="status-step status-updates">
        <p>Updates</p>
        <p>{calcStatus("Updates")}</p>
      </div>
      <div className="status-step status-followup">
        <p>Follow Up</p>
        <p>{calcStatus("Follow Up")}</p>
      </div>
      <div className="status-step status-close">
        <p>Close</p>
        <p>{calcStatus("Close")}</p>
      </div>
    </div>
  );
};

export default JobStatusBar;
