import { FC } from "react";
import { Link } from "react-router-dom";
import { routes } from "../App";

export const Header: FC = () => {
  const handleSignOut = () => {
    if (confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("authToken");

      document.cookie =
        "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.reload();
    }
  };
  const handleSchemaSave = () => {
    // fetch(serverUrl+"/forms/")
  };
  return (
    <header className="nav px-2">
      <nav className="d-flex justify-content-between align-items-center w-100">
        <Link to={routes.home} className="nav-brand text-decoration-none">
          <h1>
            Formy<small>y</small>
          </h1>
        </Link>
        <div className="me-3 d-flex gap-2 align-items-center">
          <button onClick={handleSchemaSave} className="px-2 btn btn-success">
            <i className="fa fa-save "></i> Save
          </button>
          <button className="btn btn-primary">
            <i className="fa fa-plus"></i> New Form
          </button>
          <Link to={routes.signUp}>
            <button className="btn ">Sign Up | Log In</button>
          </Link>
          <a href="#">
            <button onClick={handleSignOut} className="btn text-danger">
              Log Out
            </button>
          </a>
        </div>
      </nav>
    </header>
  );
};
