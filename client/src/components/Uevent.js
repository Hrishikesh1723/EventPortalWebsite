import React, { useEffect, useState } from "react";
import Unavbar from "./Unavbar";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';


const Uevent = () => {
  let navigate = useNavigate();
  const [userData, setUserData] = useState("");

  const callProfilePage = async () => {
    try {
      const res = await fetch("/uevents", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);
      setUserData(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  };
  // // set states of calendar date
  // const [calDate, setCalDate] = useState(new Date());

  // function onChange(calDate) {
  //   // change results based on calendar date click
  //   setCalDate(calDate);
  // }

  useEffect(() => {
    callProfilePage();
  }, []);

  let myStyle = {
    minHeight: "70vh",
    margin: "40px auto",
  };
  const [events, setEvents] = useState([]);

  const callEventsData = async () => {
    try {
      const res = await fetch("/events", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const events = await res.json();
      console.log(events.data);
      setEvents(events.data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    callEventsData();
  }, []);

  // sending data of registerd event
  const registerdEvent = async (title,detail,date,time,venue) => {    
    const res = await fetch('/registerevent',{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        title,detail,date,time,venue
      })
    });

    const resp = await fetch("/sendemail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        toemail:userData.email,
        uname:userData.name,
        subject:"Event Registration successful!",
        message:`You Have register For Event
        ${title}
        Detail: ${detail}
        Date: ${date}
        Time: ${time}
        Venue: ${venue}`,
        name:"Eventive"
      }),
    });

    const data = await res.json();

    if(!data){
      console.log("event not register");
    }else{
      alert("Event registered")
    }
  }

  const Record = (props) => (
    <div className="container" style={myStyle}>
      <h3 className="my-3">Event list</h3>
      <div>
        <h1>{props.record.title}</h1>
        <h3>{props.record.detail}</h3>
        <h3>{props.record.date}</h3>
        <h3>{props.record.time}</h3>
        <h3>{props.record.venue}</h3>
        <button className="btn btn-sm btn-danger" onClick={() => registerdEvent(props.record.title,props.record.detail,props.record.date,props.record.time,props.record.venue)}>Register</button>
      </div>
      <hr />
    </div>
  );
  return (
    <>
      <Unavbar />
      {/* <div className="result-calendar">
        <Calendar onChange={onChange} value={calDate} />
      </div> */}
      <div>
        {events.map((eve) => (
          <Record record={eve} key={eve._id} />
        ))}
      </div>
    </>
  );
};

export default Uevent;
