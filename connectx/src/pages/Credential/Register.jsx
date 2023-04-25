import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Register() {

    const navigate = useNavigate();
    const [data, setData] = useState({
        userName: "",
        phone: "",
        password: "",
    })

    const handleData = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData({ ...data, [name]: value })
    }

    const postData = async (e) => {
        e.preventDefault();
        const { userName, phone, password } = data

        const res = await fetch("/registeruser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userName, password, phone
            })
        })
        await res.json()

        console.log(res.status);
        if (res.status === 200) {
            // alert("Login Success")
            toast.success('Login Success 😉', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            navigate("/")
        }
        else if (res.status === 401) {
            // alert("User Alerady exists")
            toast.warn('User Already exists 😐', {
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
        else if (res.status === 400) {
            // alert("fill all credentials")
            toast.error('Please', {
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

    }
    return (
        <>
            <div className="container d-flex align-items-center justify-content-center" style={{ width: "100%", height: "100vh" }}>
                <form>
                    <h2>User Register</h2>
                    <div className="mb-3">
                        <label htmlFor="userName" className="form-label">UserName</label>
                        <input type="text" name='userName' className="form-control" id="userName" aria-describedby="emailHelp" onChange={handleData} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Phone" className="form-label">Phone</label>
                        <input type="number" name='phone' className="form-control" id="Phone" aria-describedby="emailHelp" onChange={handleData} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" name='password' className="form-control" id="exampleInputPassword1" onChange={handleData} />
                    </div>
                    <button type="submit" className="btn btn-primary m-3" onClick={postData}>Register</button>
                    <NavLink to="/">Already Have Account</NavLink>
                </form>
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
    )
}
