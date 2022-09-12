import React from "react";
import Navbar from "./Navbar";
import About from "../images/about.png";
import About1 from "../images/about1.png";
import Footer from "./Footer";

const home = () => {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="bgcolor-1">
      <div className="img-bg">
        Eventive
      </div>
      <div className="main-container">
        <div className="sub-container1">
          <div className="eventive-container1">
            Eventive
          </div>
          <div className="eventive-container2">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde sapiente, aliquid culpa illo accusamus veritatis sint. Beatae adipisci magni iusto quis saepe harum, amet ab perferendis illum. Deserunt et non delectus, enim illo dignissimos accusamus.
          </div>
          <img src={About} alt = "about image" className="aboutimg" />
        </div>
        <div className="sub-container2">
          <img src={About1} alt = "about image" className="evntimg" />
          <div className="about-container1">
            About US
          </div>
          <div className="about-container2">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde sapiente, aliquid culpa illo accusamus veritatis sint. Beatae adipisci magni iusto quis saepe harum, amet ab perferendis illum. Deserunt et non delectus, enim illo dignissimos accusamus.
          </div>
        </div>
        
      </div>
      </div>
      <Footer/>
    </>
  );
};

export default home;
