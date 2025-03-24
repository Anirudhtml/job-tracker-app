import React, { useState, useEffect } from "react";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LoginPage from "../Pages/LoginPage";
import SignupPage from "../Pages/SignupPage";
import {
  closeLoginForm,
  closeSignupForm,
  openSignupForm,
} from "../../Features/Slices/ui/uiSlice";

function Header() {
  const dispatch = useDispatch();

  const isSignupFormOpen = useSelector(
    (state) => state.uiSlice.isSignupFormOpen
  );
  const isLoginFormOpen = useSelector((state) => state.uiSlice.isLoginFormOpen);
  const user = useSelector((state) => state.userAuth.user);
  const auth = user?.auth || false;
  const userName = user?.userName;
  const avatarUrl = useSelector((state) => state.userAuth.avatar);

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
              <div className="navBtn">Hi, {`${userName}`}</div>
              <img className="avatarImg" src={avatarUrl} />
            </>
          ) : (
            <>
              <NavLink
                onClick={() => dispatch(openSignupForm())}
                className="navBtn"
              >
                Join
              </NavLink>
              <div className="navBtn">Pricing</div>
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
