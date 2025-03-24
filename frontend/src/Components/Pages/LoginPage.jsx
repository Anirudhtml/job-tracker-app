import React, { useState } from "react";
import {useSelector, useDispatch} from "react-redux"
import { loginUser } from "../../Features/Slices/UserAuth/UserAuth";
import { openSignupForm, closeLoginForm } from "../../Features/Slices/ui/uiSlice";
import "./Page.css";


const LoginPage = ({closeForm}) => {

  const dispatch = useDispatch()

  const [user, setUser] = useState({})

  function handleSubmit(e) {
      e.preventDefault()
      dispatch(loginUser(user))

      closeForm()
  }

  const hanleNewUserForm = () => {
    dispatch(closeLoginForm())
    dispatch(openSignupForm())
  }

  return (
    <div className="signinFormContainer">
      <button onClick={closeForm} className="closeBtn">
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
      <form onSubmit={(e) => handleSubmit(e)} className="form">
      <div className="flex-column">
          <label>Username or Email</label>
        </div>
        <div className="inputForm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 32 32"
          >
            <g data-name="Layer 3" id="Layer_3">
              <path d="M30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455z"></path>
            </g>
          </svg>
          <input onChange={(e) => setUser((prev) => ({...prev, userName: e.target.value}))} placeholder="Enter your name / email" className="input" type="text" />
        </div>
        <div className="flex-column">
          <label>Password</label>
        </div>
        <div className="inputForm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="-64 0 512 512"
          >
            <path d="M336 512H48c-26.453 0-48-21.523-48-48V240c0-26.477 21.547-48 48-48h288c26.453 0 48 21.523 48 48v224c0 26.477-21.547 48-48 48zM48 224c-8.813 0-16 7.168-16 16v224c0 8.833 7.187 16 16 16h288c8.813 0 16-7.167 16-16V240c0-8.832-7.187-16-16-16z"></path>
          </svg>
          <input
          onChange={(e) => setUser((prev) => ({...prev, password: e.target.value}))}
            placeholder="Enter your Password"
            className="input"
            type="password"
          />
        </div>

        <div className="flex-row">
          <div>
            <input type="radio" />
            <label>Remember me</label>
          </div>
          <span className="span">Forgot password?</span>
        </div>
        <button type="submit" className="button-submit">Sign In</button>
        <p className="p">
          Don't have an account? <span onClick={hanleNewUserForm} className="span">Sign Up</span>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
