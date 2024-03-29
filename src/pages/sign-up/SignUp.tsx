import { FC, FormEvent, useRef, useState } from "react";
import { FormGroup } from "../../components/FormGroup";
import { routes } from "../../App";
import { Header } from "../../components/Header";
import { useSearchParams } from "react-router-dom";

const SignUp: FC = () => {
  const passwordRef = useRef<HTMLInputElement>(null);
  const [valid, setValid] = useState<boolean | any>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  let [searchParams, _setSearchParams] = useSearchParams();

  const createURl = (url: string) => {
    // check if there are any query params and if there are, append them to the url
    return url + "?" + searchParams.toString();
  };

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    if (!valid) {
      alert("Passwords do not match");
    }
    fetch("/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: e.currentTarget.email.value,
        password: e.currentTarget.password.value,
      }),
    })
      .then((res) => res.json())
      .then((_data: unknown) => {
        setLoading(false);
        alert("User created successfully!");
        window.location.href = createURl(routes.login);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        alert("Oops! Something went wrong. Please try again.");
      });
  }

  return (
    <div className="">
      <Header />
      <form
        onSubmit={handleSubmit}
        className="form card p-4 mt-3 container mw-500"
        method="POST"
        // action="/auth/signup"
      >
        <h3>Sign Up</h3>
        <strong>
          Welcome to <i>Formyy</i>. Please sign up to continue
        </strong>
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
            ref={passwordRef}
            required
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="password">Confirm Password:</label>
          <input
            className={`form-control ${
              valid !== undefined ? (valid ? "is-valid" : "is-invalid") : ""
            }`}
            name="confirmpassword"
            type="password"
            id="confirmpassword"
            required
            onBlur={(e) => {
              if (e.currentTarget.value !== passwordRef.current?.value) {
                setValid(false);
              } else {
                setValid(true);
              }
            }}
            onInput={(e) => {
              if (e.currentTarget.value !== passwordRef.current?.value) {
                setValid(false);
              } else {
                setValid(true);
              }
            }}
          />
          <small className="text-danger">
            {valid !== undefined ? (valid ? "" : "Passwords not matching") : ""}
          </small>
        </FormGroup>

        <button
          disabled={loading}
          className="btn btn-primary mt-3"
          type="submit"
        >
          Sign Up
        </button>
        <hr />
        <p>
          Already have an account ? Feel free to{" "}
          <a href={createURl(routes.login)}>Log In</a>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
