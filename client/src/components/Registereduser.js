import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Anavbar from "./Anavbar";

const Registereduser = () => {
  let navigate = useNavigate("");
  const [userData, setUserData] = useState("");
  const params = useParams("");
  const [event, setEvent] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log("rtfygk");
    console.log(params);
    getEventDetail();
  }, []);

  const getEventDetail = async () => {
    console.log(params);
    let resp = await fetch(`/event/${params.id}`);
    resp = await resp.json();
    console.log(resp);
    setUsers(resp.registeredUsers);
    setEvent({
      ...event,
      title: resp.title,
      detail: resp.detail,
      date: resp.date,
      time: resp.time,
      venue: resp.venue,
      id: params.id,
    });
  };

  const callProfilePage = async () => {
    try {
      const res = await fetch("/adminhome", {
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
      navigate("/admin");
    }
  };

  useEffect(() => {
    callProfilePage();
  }, []);

  const sendEmail = async (e) => {
    e.preventDefault();
    const res = await fetch(`/sendEmail/${event.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject:content.subject,
        message:content.message
      }),
    });

    const data = await res.json();

    if (res.status === 422 || !data) {
      window.alert("Mail Failed!");
      console.log("Mail Failed!");
    } else {
      window.alert("Mail successful!");
      console.log("Mail successful!");
    }
  };
  
  const [content, setContent] = useState({
    subject: "",
    message: "",
  });

  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setContent({ ...content, [name]: value });
  };

  const Record = (props) => (
    <div className="container">
      <h3 className="my-3">Event list</h3>
      <div>
        <h1>{props.record.name}</h1>
        <h3>{props.record.email}</h3>
      </div>
      <hr />
    </div>
  );

  return (
    <>
      <Anavbar />
      <div>
        {users?.map((eve) => (
          <Record record={eve} key={eve._id} />
        ))}
      </div>
      <form method="POST">
        <div>
        <input
          type="text"
          placeholder="Subject"
          name="subject"
          autocomplete="off"
          value={content.subject}
          onChange={handleInputs}
        />
        </div>
        <div>
        <input
          type="text"
          placeholder="Subject"
          name="message"
          autocomplete="off"
          value={content.message}
          onChange={handleInputs}
        />
        </div>
        <div>
        <input
          type="submit"
          name="SignUp"
          className="btn btn-sm btn-danger"
          onClick={sendEmail}
          value="SEND MAIL"
        />
        </div>
      </form>
    </>
  );
};

export default Registereduser;
