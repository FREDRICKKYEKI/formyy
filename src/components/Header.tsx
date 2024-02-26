import React, { FC, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { routes } from "../App";
import { useSelector } from "react-redux";
import { RootState } from "../state-management/store";
import { Modal } from "react-responsive-modal";
import { FormGroup } from "./FormGroup";

export const Header: FC = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const formElements = useSelector((state: RootState) => state.formElements);

  const isFormPage = () => {
    return location.pathname.split("/").includes("edit");
  };

  const handleSignOut = () => {
    if (confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("authToken");

      document.cookie =
        "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.reload();
    }
  };

  const handleCreateNewForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const formData = {
      title: form.get("formTitle"),
      description: form.get("formDescription"),
    };
    fetch("http://localhost:5173/forms/new", {
      method: "POST",
      body: JSON.stringify({ ...formData, formElements }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    })
      .then((res) => res.json())
      .then(({ form }: any) => {
        console.log(form.id);
        window.location.href = `/form/edit/${form.id}`;
      })
      .catch((e) => {
        console.log("Something went wrong !", e);
      });
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
          <button
            disabled={!isFormPage()}
            onClick={handleSchemaSave}
            className="px-2 btn btn-success"
          >
            <i className="fa fa-save "></i> Save
          </button>
          <button onClick={() => setOpen(true)} className="btn btn-primary">
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
      <Modal open={open} onClose={() => setOpen(!open)} center>
        <h2 className="mt-4">Create New Form</h2>
        <form onSubmit={handleCreateNewForm}>
          <FormGroup>
            <label htmlFor="formTitle">Form Title</label>
            <input
              type="text"
              name="formTitle"
              className="form-control"
              id="formTitle"
              required
              placeholder="Enter form title"
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="formDescription">Form Description</label>
            <textarea
              className="form-control"
              id="formDescription"
              name="formDescription"
              rows={5}
              required
              placeholder="Enter form description"
            ></textarea>
          </FormGroup>

          <button type="submit" className="btn btn-primary w-100">
            Create
          </button>
        </form>
      </Modal>
    </header>
  );
};
