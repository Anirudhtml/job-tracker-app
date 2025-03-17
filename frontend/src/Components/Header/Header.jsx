import React, { useState } from "react";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LoginPage from "../Pages/LoginPage";
import { openForm, closeForm } from "../../Features/Slices/ui/uiSlice";

function Header() {
  const dispatch = useDispatch();

  const openLoginForm = useSelector((state) => state.uiSlice.isLoginFormOpen);
  const user = useSelector((state) => state.userAuth.user);
  const auth = user.auth
  const name = user.name

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
              <NavLink onClick={() => dispatch(openForm())} className="navBtn">
                Join
              </NavLink>
              <div className="navBtn">Pricing</div>
            </>
          )}
        </div>
      </div>

      {openLoginForm && (
        <>
          <div className="model">
            <div className="modelContent">
              <LoginPage closeForm={() => dispatch(closeForm())} />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Header;
