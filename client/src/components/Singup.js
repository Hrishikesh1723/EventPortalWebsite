import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import login from "../images/login.jpg";
import Signup from "../images/signup.png";
import Navbar from "./Navbar";
import { BiLock } from "react-icons/bi";
import { MdOutlineMail } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { FaLock } from "react-icons/fa";

const Singup = () => {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();

    const { name, email, password, cpassword } = user;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        cpassword,
      }),
    });

    const resp = await fetch("/sendemail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        toemail:email,
        uname:name,
        subject:"Registration successful!",
        message:"You are successfully registered to our Eventive Event portal, Thanks for choosing us hope you Enjoy our service!",
        name:"Eventive"
      }),
    });

    const data = await res.json();

    if (res.status === 422 || !data) {
      window.alert("Registration Failed!");
      console.log("Registration Failed!");
    } else {
      window.alert("Registration successful!");
      console.log("Registration successful!");
      navigate("/login");
    }
  };

  return (
    <>
      <Navbar />
      <div className="containerBox">
        <div className="container-flaot">
          <div>
            <div className="img">
              <div className="img-container">
                <img src={login} atl="login img" className="login" />
              </div>
            </div>
            <div className="login-page">SignUp Page</div>
            <form method="POST">
              <div className="firstInput">
                <FiUser size={25} />
                <input
                  type="text"
                  placeholder="Username"
                  className="name"
                  name="name"
                  autocomplete="off"
                  value={user.name}
                  onChange={handleInputs}
                />
              </div>
              <div className="secondInput">
                <MdOutlineMail size={25} />
                <input
                  type="text"
                  placeholder="Email"
                  className="name"
                  name="email"
                  autocomplete="off"
                  value={user.email}
                  onChange={handleInputs}
                />
              </div>
              <div className="secondInput">
                <BiLock size={25} />
                <input
                  type="password"
                  placeholder="Password"
                  className="name"
                  name="password"
                  autocomplete="off"
                  value={user.password}
                  onChange={handleInputs}
                />
              </div>
              <div className="secondInput">
                <FaLock size={25} />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="name"
                  name="cpassword"
                  autocomplete="off"
                  value={user.cpassword}
                  onChange={handleInputs}
                />
              </div>
              <div className="padding1">
                <input
                  type="submit"
                  name="SignUp"
                  className="login-button"
                  onClick={postData}
                  value="register"
                />
              </div>
            </form>
            <div className="signuplink">
              <NavLink to="/login">Already Have an account?</NavLink>
            </div>
          </div>
        </div>
          <div>
            <img src={Signup} alt="Login Image" className="Loginimg"/>
          </div>
      </div>
    </>
  );
};

export default Singup;
