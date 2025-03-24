import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom"
import { addJob } from "../../Features/Slices/JobData/JobDataSlice";
import { openSignupForm } from "../../Features/Slices/ui/uiSlice";
import "./AddJob.css";

function AddJobForm({ setIsOpen }) {
  const dispatch = useDispatch();

  const [jobForm, setJobForm] = useState({ Status: "Applied" });
  const auth = useSelector((state) => state.userAuth.user.auth);

  function handleSubmit(e) {
    e.preventDefault();

    if (auth) {
      dispatch(addJob(jobForm));
      setIsOpen(false);
    } else {
      setIsOpen(false)
      dispatch(openSignupForm())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="formWrapper">
        <div className="formFirstSection">
          <p>Add a Job Posting</p>
          <button className="closeBtn" onClick={() => setIsOpen(false)}>
            <svg
              fill="#FFFFFF"
              height="10px"
              width="10px"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 490 490"
              xml:space="preserve"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <polygon points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490 489.292,457.678 277.331,245.004 489.292,32.337 "></polygon>{" "}
              </g>
            </svg>
          </button>
        </div>

        <div className="inputContainer">
          <span>Title</span>
          <input
            onChange={(e) =>
              setJobForm((prev) => ({ ...prev, Title: e.target.value }))
            }
            className="jobInput"
            placeholder="Add the job title"
          />
        </div>
        <div className="inputContainer">
          <span>Company Name</span>
          <input
            onChange={(e) =>
              setJobForm((prev) => ({ ...prev, Company: e.target.value }))
            }
            className="jobInput"
            placeholder="Add the name of the company"
          />
        </div>
        <div className="inputContainer">
          <span>Status</span>
          <select
            value={jobForm.Status}
            onChange={(e) =>
              setJobForm((prev) => ({
                ...prev,
                Status: e.target.value,
              }))
            }
            className="jobInput"
            placeholder="Default: Applied"
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Updates">Updates</option>
            <option value="Follow Up">Follow Up</option>
          </select>
        </div>
        <div className="inputContainer">
          <span>Category</span>
          <input
            onChange={(e) =>
              setJobForm((prev) => ({ ...prev, Category: e.target.value }))
            }
            className="jobInput"
            placeholder="Add a category"
          />
        </div>
        <div className="inputContainer">
          <span>notes</span>
          <input className="jobInput" placeholder="Add some notes, or a url" />
        </div>

        <button type="submit" className="addBtn">
          +
        </button>
      </div>
    </form>
  );
}

export default AddJobForm;
