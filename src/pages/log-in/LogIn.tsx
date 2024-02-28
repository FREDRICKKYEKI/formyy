import { useState } from "react";
import { routes } from "../../App";
import { FormGroup } from "../../components/FormGroup";
import { Header } from "../../components/Header";
import { useSearchParams } from "react-router-dom";

const LogIn: React.FC = () => {
  const [loading, setLoading] = useState(false);
  let [searchParams, _setSearchParams] = useSearchParams();

  const createURl = (url: string) => {
    // check if there are any query params and if there are, append them to the url
    return url + "?" + searchParams.toString();
  };

  const handleLogIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    fetch("http://localhost:5173/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.error) {
          alert("Invalid Username or Password");
          setLoading(false);
          return;
        }
        alert("Logged in successfully!");
        setLoading(false);
        localStorage.setItem("userInfo", JSON.stringify(data.userInfo));
        localStorage.setItem("authToken", data.authToken);
        document.cookie = `authToken=${data.authToken}; path=/`;
        window.location.href = searchParams.get("redirectFrom") || routes.home;
      })
      .catch((err) => {
        setLoading(false);
        alert(err.message);
      });
  };
  return (
    <>
      <Header />
      <form
        onSubmit={handleLogIn}
        className="container mw-500 form card p-4 mt-3"
      >
        <h4>Log In</h4>
        <FormGroup>
          <label className="mt-4" htmlFor="email">
            Email:
          </label>
          <input
            className="form-control"
            name="email"
            type="email"
            id="email"
            required
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="password">Password:</label>
          <input
            className="form-control"
            name="password"
            type="password"
            id="password"
            required
          />
        </FormGroup>
        <button disabled={loading} type="submit" className="btn btn-primary">
          Log In
        </button>
        <hr />
        <p>
          Do not have an account ? Feel free to{" "}
          <a href={createURl(routes.signUp)}>Sign Up</a>
        </p>
      </form>
    </>
  );
};

export default LogIn;
