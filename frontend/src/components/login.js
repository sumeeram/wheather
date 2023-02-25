import React, { useState } from "react";
import "./login.css";
import Logo from "./assests/Weatherios15beta.webp";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [available, setAvailable] = useState("");
  const [loading, setLoading] = useState(false); //additional
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const loginHandler = async (e) => {
    //handler method for login
    setLoading(true);
    setIsError(false); //additional

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/login",
        { email: email, password },
        config
      );

      localStorage.setItem("authToken", data.token); //set the browser caching or local storage for globally accessed anywhere in the application
      localStorage.setItem("firstName", data.firstName);
      localStorage.setItem("email", data.email);
      localStorage.setItem("id", data?.empId);

      setTimeout(() => {
        navigate(`/wheather`);
        setLoading(false);
        window.location.reload();
      }, 5000);
    } catch (error) {
      setError(error.response.data.error);
      setAvailable(error.response.data.available);
      setLoading(false);
      setIsError(true);
      setTimeout(() => {
        setError("");
        setAvailable("");
      }, 5000); //5s
    }
  };

  const showPassword = () => {
    //show password method when check box is enabled
    let x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  return (
    <div className="container px-4 py-5 mx-auto">
      <div className="card card0">
        <div className="d-flex flex-lg-row flex-column-reverse">
          <div className="card card1">
            <div className="row justify-content-center my-auto">
              <div className="col-md-8 col-10 my-1">
                <div className="row justify-content-center px-3 mb-3">
                  <img src={Logo} alt="" width={50} />
                </div>
                <h6 className="msg-info fs-4">Please login to your account</h6>
                <center>
                  {error && (
                    <span style={{ color: "white", background: "orange" }}>
                      {error}
                    </span>
                  )}
                  {available && (
                    <span style={{ color: "white", background: "red" }}>
                      {available}
                    </span>
                  )}
                </center>
                <form onSubmit={loginHandler}>
                  <div className="form-group">
                    <label className="form-control-label fs-6">Username</label>
                    <input
                      type="email"
                      id="email"
                      name={"email"}
                      placeholder="Email"
                      className="form-control"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-control-label text-muted fs-6">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name={"password"}
                      placeholder="Password"
                      className="form-control"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div class="form-check d-flex gap-2 align-items-center">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      onClick={showPassword}
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      Show Password
                    </label>
                  </div>
                  <div className="row justify-content-center px-3">
                    {isError && (
                      <small style={{ color: "red" }}>
                        Something went wrong. Please try again later.
                      </small>
                    )}
                    <button className="btn-block btn-color">Submit</button>
                  </div>
                </form>
              </div>
            </div>
            <div className="bottom text-center mb-5">
              <p href="#" className="sm-text mx-auto mb-3">
                Don't have an account?
                <button className="btn btn-white ml-2 ms-2">Create new</button>
              </p>
            </div>
          </div>
          <div className="card card2">
            <div className="my-auto mx-md-5 px-md-5 right">
              <h3 className="text-white">We are more than just a company</h3>
              <small className="text-white">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
