import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Login = (props) => {
  const history = useHistory();
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <div class="text-center">
        <h1>Logging In</h1>
      </div>
      <form
        onSubmit={(e) => {
          actions
            .createNewSession(email, password)
            .then((session) => history.push("/"));
          e.preventDefault();
        }}
        className="container"
      >
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          ></input>
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          ></input>
        </div>
        <div class="d-flex">
          <button className="btn btn-primary">Login</button>
          <Link class="noStyle ms-auto" to="/signup">
            <div className="btn btn-primary ms-auto">Create Account</div>
          </Link>
        </div>
      </form>
    </>
  );
};
