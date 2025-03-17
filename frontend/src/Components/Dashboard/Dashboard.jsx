import React, { useState } from "react";
import "./Dashboard.css";
import GridExample from "./Table";
import JobStatusBar from "./StatusBar/StatusBar";
import AddJobForm from "../AddJobForm/AddJob";

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dashContainer">
      <div className="leftDash">
        <p>Feb 18, Tueday</p>
        <div className="reportDash">
          <div className="reportDashInside">
            <div className="dashHeader">
              <p>
                <i>Dash</i>
              </p>
              <div onClick={() => setIsOpen(!isOpen)} className="plusBtn">
                ﹢
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="rightDash">
        <JobStatusBar />
        <GridExample />
        {isOpen && (
          <div className="overlay">
            <AddJobForm setIsOpen={setIsOpen} />
          </div>
        )}
        <div className="chartDash"></div>
      </div>
    </div>
  );
}

export default Dashboard;
