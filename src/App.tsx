import { Route, Routes } from "react-router-dom";
// import FormMaker from "./pages/form-maker/FormMaker"
import SignUp from "./pages/sign-up/SignUp";
import "react-responsive-modal/styles.css";
import LogIn from "./pages/log-in/LogIn";
import Home from "./pages/home/Home";
import FormMaker from "./pages/form-maker/FormMaker";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsClient } from "./state-management/store";
import Form from "./pages/form/Form";
import Success from "./pages/success/Success";
import Submissions from "./pages/submissions/Submissions";

export const routes = {
  home: "/",
  signUp: "/signup",
  login: "/login",
  success: "/success",
  form: "/form/:id/",
  editForm: "/form/edit/:id/",
  all_submissions: "form/submissions",
  form_submissions: "/form/:id/submissions/",
};

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsClient(true));
  }, []);

  return (
    <div>
      <Routes>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.signUp} element={<SignUp />} />
        <Route path={routes.login} element={<LogIn />} />
        <Route path={routes.editForm} element={<FormMaker />} />
        <Route path={routes.form} element={<Form />} />
        <Route path={routes.success} element={<Success />} />
        <Route path={routes.form_submissions} element={<Submissions />} />
        <Route
          path="*"
          element={
            <h3 className="m-5">
              😢Oops page not found! <a href="/">Go back to home</a>
            </h3>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
