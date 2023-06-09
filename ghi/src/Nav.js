import { NavLink, useNavigate } from "react-router-dom";
import { useToken } from "./Authentication.js";
import React, { useState, useEffect} from "react";

function Nav() {
  const { token, logout } = useToken();
  const [role_id, SetRoleId] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(token));
  const navigate = useNavigate();


  function parseJwt (data) {
  const base64Url = data.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  const info = JSON.parse(window.atob(base64));
  SetRoleId(info.account.role_id);
  return info.account.id
  }


  async function therapistProfileClick(token){
    const acc_id = parseJwt(token);
    const response = await fetch(`${process.env.REACT_APP_THERAPYHUB_API_HOST}therapistacc?account_id=${acc_id}`)

    if (response.ok) {
      var therapistData = await response.json();
      navigate(`/therapist/detail/${therapistData.id}`);
    }
  }


  useEffect(() => {
      if (token) {
        parseJwt(token);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    
  }, [token]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-info">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          TherapyHub
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/client/login">
                    Client Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/therapist/login">
                    Therapist Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/account">
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}
            {isLoggedIn && role_id === 1 && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="client/detail/:id">
                    Profile
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="client/update">
                    Update Profile
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/Wishlist/">
                    Wishlist
                  </NavLink>
                </li>
              </>
            )}
            {isLoggedIn && role_id === 2 && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    onClick={() => therapistProfileClick(token)}
                    className="nav-link"
                  >
                    Profile
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="therapist/update">
                    Update Profile
                  </NavLink>
                </li>
              </>
            )}
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" onClick={logout}>
                    Logout
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
