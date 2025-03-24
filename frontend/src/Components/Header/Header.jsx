import React, { useState } from "react";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LoginPage from "../Pages/LoginPage";
import SignupPage from "../Pages/SignupPage";
import { closeLoginForm, closeSignupForm, openSignupForm } from "../../Features/Slices/ui/uiSlice";
import avatar from "/7309681.jpg"

function Header() {
  const dispatch = useDispatch();

  const isSignupFormOpen = useSelector((state) => state.uiSlice.isSignupFormOpen);
  const isLoginFormOpen = useSelector((state) => state.uiSlice.isLoginFormOpen);
  const user = useSelector((state) => state.userAuth.user);
  const auth = user?.auth || false
  const name = user?.name 

  return (
    <>
      <div className={`headerContainer`}>
        <div>
          <div className="logo">
            <NavLink className="logoLink" to="/">
              <div>
                <span className="firstLetterLogo">t</span>
                <span className="secondLetterLogo">oday</span>
              </div>
            </NavLink>
            <span className="subTitle">Track. Organize. Succeed.</span>
          </div>
        </div>

        <div className="HeaderNav">
          {auth ? (
            <>
              <div className="navBtn">Hi, {`${name}`}</div>
            </>
          ) : (
            <>
              <NavLink onClick={() => dispatch(openSignupForm())} className="navBtn">
                Join
              </NavLink>
              <div className="navBtn">Pricing</div>
              <img className="avatarImg" src={avatar}/>
            </>
          )}
        </div>
      </div>

      {isSignupFormOpen && (
        <>
          <div className="model">
            <div className="modelContent">
              <SignupPage closeForm={() => dispatch(closeSignupForm())} />
            </div>
          </div>
        </>
      )}

      {isLoginFormOpen && (
        <>
        <div className="model">
          <div className="modelContent">
            <LoginPage closeForm={() => dispatch(closeLoginForm())} />
          </div>
        </div>
      </>
      )}
    </>
  );
}

export default Header;
