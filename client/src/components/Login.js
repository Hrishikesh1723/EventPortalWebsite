import React,{useState} from "react";
import { NavLink,useNavigate } from "react-router-dom";
import login from "../images/login.jpg";
import loginImage from "../images/Mobile-login-Cristina-removebg-preview.png";
import Navbar from "./Navbar";
import { BiLock } from "react-icons/bi";
import { MdOutlineMail } from "react-icons/md";

const Login = () => {
  let navigate = useNavigate();

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch('/login',{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        email,
        password
      })
    });

    const data = res.json();
    if(res.status === 400 || !data){
      window.alert("Invalid credential");
    }else{
      window.alert("Login Successful!");
      navigate("/userhome");
    }
  }


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
            <div className="login-page">Login Page</div>
            <form method="POST">
            <div className="firstInput">
              <MdOutlineMail size={25} />
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="name" />
            </div>
            <div className="secondInput">
              <BiLock size={25} />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="name" />
            </div>
              <div className="padding1">
                <input
                  type="submit"
                  name="SignUp"
                  className="login-button"
                  onClick={loginUser}
                  value="Login"
                />
              </div>
            </form>
            <div className="signuplink">
              <NavLink to="/signup">Don't Have an account?</NavLink>
            </div>
          </div>
        </div>
          <div>
            <img src={loginImage} alt="Login Image" className="Loginimg"/>
          </div>
      </div>
    </>
  );
};

export default Login;