import React, { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext.jsx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import badbankIcon from "../assets/JAGbadbank.png";
import depositIcon from "../assets/deposit.png";
import withdrawIcon from "../assets/withdraw.png";
import createaccountIcon from "../assets/createAccount.png";
import alldataIcon from "../assets/alldata.png";
import homeIcon from "../assets/home.png";
import avatarImg from "../assets/avatar.png";
import "../styles/Navbar.css";

function Navbar() {
  const location = useLocation();
  const { users, userLoggedInIndex, logOut } = useContext(UserContext);
  const navigate = useNavigate();

  const loggedInUser =
    userLoggedInIndex !== null ? users[userLoggedInIndex] : null;

  const isLoggedIn = userLoggedInIndex !== null;

  function handleLogout() {
    logOut();
    navigate("/");
  }

  function getNavLinkClass(path) {
    if (
      path === "/" &&
      (location.pathname === "/" ||
        location.pathname === "/index.html" ||
        location.pathname == undefined)
    ) {
      return "nav-link active hover";
    }
    return location.pathname === path
      ? "nav-link active hover"
      : "nav-link hover";
  }
  // function getNavLinkClass(path) {
  //   return location.pathname === path
  //     ? "nav-link active hover"
  //     : "nav-link hover";
  // }

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={badbankIcon} className="icon rounded" alt="BadBank" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className={getNavLinkClass("/")}
                  title="Go to Home page"
                  aria-current="page"
                  to="/"
                >
                  <img
                    src={homeIcon}
                    className="navbaricon rounded"
                    alt="Create Account"
                  />
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={getNavLinkClass("/create-account")}
                  title="Create a New Account"
                  to="/create-account"
                >
                  <img
                    src={createaccountIcon}
                    className="navbaricon rounded"
                    alt="Create Account"
                  />
                  Create Account
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={getNavLinkClass("/deposit")}
                  title="Deposit into your account"
                  to="/deposit"
                >
                  <img
                    src={depositIcon}
                    className="navbaricon rounded"
                    alt="Deposit"
                  />
                  Deposit
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={getNavLinkClass("/withdraw")}
                  title="Withdraw from your account"
                  to="/withdraw"
                >
                  <img
                    src={withdrawIcon}
                    className="navbaricon rounded"
                    alt="Withdraw"
                  />
                  Withdraw
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={getNavLinkClass("/all-data")}
                  title="Show all your transactions"
                  to="/all-data"
                >
                  <img
                    src={alldataIcon}
                    className="navbaricon rounded"
                    alt="Withdraw"
                  />
                  All Data
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <button
                  className="btn btn-dark dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={avatarImg}
                    className="navbar-avatar rounded-circle"
                    alt="User Avatar"
                  />{" "}
                  {!isLoggedIn ? "Sign In" : users[userLoggedInIndex].name}
                </button>
                <ul className="dropdown-menu dropdown-menu-dark">
                  {!isLoggedIn ? (
                    <li>
                      <Link
                        className="dropdown-item"
                        title="Withdraw from your account"
                        to="/login"
                      >
                        <img
                          src={withdrawIcon}
                          className="navbar-avatar rounded-circle"
                          alt="Withdraw"
                        />
                        Login
                      </Link>
                    </li>
                  ) : (
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        <img
                          src={withdrawIcon}
                          className="navbar-avatar rounded-circle"
                          alt="Withdraw"
                        />
                        Logout
                      </button>
                    </li>
                  )}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default React.memo(Navbar);

{
  /*
//Dropdown en Navbar
<div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
<ul class="navbar-nav">
  <li class="nav-item dropdown">
    <button class="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
      Dropdown
    </button>
    <ul class="dropdown-menu dropdown-menu-dark">
      <li><a class="dropdown-item" href="#">Action</a></li>
      <li><a class="dropdown-item" href="#">Another action</a></li>
      <li><a class="dropdown-item" href="#">Something else here</a></li>
    </ul>
  </li>
</ul>
</div> 

Sin DropDown pero se alinea a la derecha

        <div className="d-flex align-items-center">
          {isLoggedIn ? (
            <>
              <img
                src={avatarImg}
                className="navbar-avatar rounded-circle"
                alt="User Avatar"
              />
              <Link to="/">Profile</Link>
              {/* Ejemplo de link al perfil del usuario */
}
{
  /*
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>

        Si funciona
                      <Link
                        className="dropdown-item"
                        title="Withdraw from your account"
                        onClick={handleLogout}
                      >
                        <img
                          src={withdrawIcon}
                          className="navbar-avatar rounded-circle"
                          alt="Withdraw"
                        />
                        Logout
                      </Link>

*/
}
