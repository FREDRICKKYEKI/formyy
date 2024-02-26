import { Route, Routes } from "react-router-dom";
import FormMaker from "./pages/form-maker/FormMaker";
import SignUp from "./pages/sign-up/SignUp";
import "react-responsive-modal/styles.css";
import LogIn from "./pages/log-in/LogIn";

export const routes = {
  home: "/",
  signUp: "/signup",
  login: "/login",
  forms: "/forms/:id",
};

function App() {
  return (
    <div>
      <Routes>
        <Route path={routes.home} element={<FormMaker />} />
        <Route path={routes.signUp} element={<SignUp />} />
        <Route path={routes.login} element={<LogIn />} />
        {/* <Route path={routes.forms} element={<FormMaker />} /> */}
        <Route path="*" element={<h1>Oops page not found!</h1>} />
      </Routes>
    </div>
  );
}

export default App;
