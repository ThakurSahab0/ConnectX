import { NavLink, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./login.scss"
export default function Login() {

  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    userName: "", password: ""
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginData({ ...loginData, [name]: value })
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const { userName, password } = loginData;
    try {
      const res = await fetch("/loginuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          password,
        }),
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      console.log(res.status);
      if (res.status === 200) {
        // alert("Login Success");
        toast.success('Login Success', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate("/home");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error occurred:", error.message);
      //   alert("Error occurred: " + error.message);
      toast.error('Please fill all credentials', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

    }
  };

  return (
    <>
      {/* <div className="container d-flex align-items-center justify-content-center" style={{ width: "100%", height: "100vh", backgroundColor: "burlywood" }}>
        <form style={{ border: "2px solid red" }}>
          <h2>User Login</h2>
          <div className="mb-3">
            <label htmlFor="userName" className="form-label">UserName</label>
            <input type="text" className="form-control" id="userName" aria-describedby="emailHelp" name='userName' onChange={handleInput} />
            <div id="emailHelp" className="form-text">fnk.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name='password' onChange={handleInput} />
          </div>
          <button type="submit" className="btn btn-primary m-3" onClick={handleLogin}>Login</button>
          <NavLink to="/register">Create Account</NavLink>
        </form>
      </div> */}

      <div className="login">
        <div className="card">
          <div className="left">
            <h1>ConnectX</h1>
            <p>
            ConnectX is a secure and reliable web-based video conferencing tool that enables user's to connect, communicate and collaborate seamlessly, from anywhere in the world.
            </p>
            <span>Don't you have an account?</span>
            {/* <NavLink to="/register" className="button">Create Account</NavLink> */}
            <NavLink to="/register">
              <button>Register</button>
            </NavLink>
          </div>
          <div className="right">
            <h1>Login</h1>
            <form>
              <input type="text" placeholder="Username" name='userName'  onChange={handleInput} />
              <input type="password" placeholder="Password" name='password' onChange={handleInput} />
              <button onClick={handleLogin}>Login</button>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};
