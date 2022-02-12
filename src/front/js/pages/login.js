import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = (props) => {
  const history = useHistory();
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
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
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
        ></input>
        <label className="form-check-label" for="exampleCheck1">
          Check me out
        </label>
      </div>
      <button className="btn btn-primary">Login</button>
    </form>
  );
};
