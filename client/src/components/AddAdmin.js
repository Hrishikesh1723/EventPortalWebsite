import React,{useState} from 'react'
import Anavbar from './Anavbar'
import login from "../images/login.jpg";
import Addadmin from "../images/Addadmin.png";
import { BiLock } from "react-icons/bi";
import { MdOutlineMail } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

const AddAdmin = () => {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
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

    const { name, email, password } = user;

    const res = await fetch("/addadmin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await res.json();

    if (res.status === 422 || !data) {
      window.alert("Registration Failed!");
      console.log("Registration Failed!");
    } else {
      window.alert("Registration successful!");
      console.log("Registration successful!");
      navigate("/adminhome");
    }
  };
  return (
    <>
    <Anavbar/>
      <div className="containerBox">
        <div className="container-flaot">
          <div>
            <div className="img">
              <div className="img-container">
                <img src={login} atl="login img" className="login" />
              </div>
            </div>
            <div className="login-page">Add Admin</div>
            <form method='POST'>
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
              <div className="padding1">
                <input
                  type="submit"
                  name="SignUp"
                  className="login-button"
                  onClick={postData}
                  value="Add Admin"
                />
              </div>
            </form>
          </div>
        </div>
          <div>
            <img src={Addadmin} alt="Login Image" className="Loginimg"/>
          </div>
      </div>
    </> 
  )
}

export default AddAdmin