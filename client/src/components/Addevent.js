import React,{useState} from 'react';
import Anavbar from './Anavbar';
import login from "../images/login.jpg";
import { useNavigate } from 'react-router-dom';

const Addevent = () => {
  let navigate = useNavigate();

  const [event, setEvent] = useState({
    title:"",
    detail:"",
    date:"",
    time:"",
    venue:"",
  });

  let name, value;
  const handleInput = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setEvent({ ...event, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();

    const { title,detail,date,time,venue } = event;

    const res = await fetch("/addevent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        detail,
        date,
        time,
        venue,
      }),
    });

    const data = await res.json();

    if (res.status === 422 || !data) {
      window.alert("Failed!");
      console.log("Failed!");
    } else {
      window.alert("Event added");
      console.log("Event added");
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
            <div className="login-page">Add Event</div>
            <form method="POST">
              <div className="firstInput">
                <label>
                    Event Title
                </label>
                <input
                  type="text"
                  value={event.title}
                  placeholder="Title"
                  className="name"
                  onChange={handleInput}
                  name="title"
                  autocomplete="off"
                />
              </div>
              <div className="secondInput">
                <label>
                    Event Details
                </label>
                <input
                  type="text"
                  value={event.detail}
                  placeholder="Details"
                  className="name"
                  onChange={handleInput}
                  name="detail"
                  autocomplete="off"
                />
              </div>
              <div className="secondInput">
                <label>
                    Evenet Date
                </label>
                <input
                  type="text"
                  value={event.date}
                  placeholder="Date"
                  className="name"
                  onChange={handleInput}
                  name="date"
                  autocomplete="off"
                />
              </div>
              <div className="secondInput">
                <label>
                    Event Time
                </label>
                <input
                  type="text"
                  value={event.time}
                  placeholder="Time"
                  className="name"
                  onChange={handleInput}
                  name="time"
                  autocomplete="off"
                />
              </div>
              <div className="secondInput">
                <label>
                    Event Venue
                </label>
                <input
                  type="text"
                  value={event.venue}
                  placeholder="Venue"
                  className="name"
                  onChange={handleInput}
                  name="venue"
                  autocomplete="off"
                />
              </div>
              <div className="padding1">
                <input
                  type="submit"
                  name="Addevent"
                  className="login-button"
                  onClick={postData}
                  value="Add Event"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </> 
  )
}

export default Addevent