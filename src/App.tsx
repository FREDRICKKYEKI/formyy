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

export const routes = {
  home: "/",
  signUp: "/signup",
  login: "/login",
  editForm: "/form/edit/:id/",
  forms: "/form/:id",
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
        <Route path="*" element={<h1>Oops page not found!</h1>} />
      </Routes>
    </div>
  );
}

export default App;
