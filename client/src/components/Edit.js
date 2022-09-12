import React,{useState,useEffect} from 'react';
import Anavbar from './Anavbar';
import login from "../images/login.jpg";
import AddEvent from "../images/Addevent.png";
import { useNavigate,useParams } from 'react-router-dom';
import { MdSubtitles } from "react-icons/md";
import { BiMessageDetail } from "react-icons/bi";
import { BsCalendarDate } from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import Footer from './Footer';

const Edit = () => {
  let navigate = useNavigate('');
  const [userData, setUserData] = useState('');
  const params = useParams('');

  useEffect(()=>{
    console.log(params);
    getEventDetail();
  },[])

  const getEventDetail = async () => {
    console.log(params)
    let resp = await fetch(`/event/${params.id}`)
    resp = await resp.json();
    console.log(resp);
    setEvent({...event,title:resp.title,detail:resp.detail,date:resp.date,time:resp.time,venue:resp.venue})
  } 

  const callProfilePage = async () => {
    
    try {
      const res = await fetch('/adminhome',{
        method: "GET",
        headers:{
          Accept:"application/json",
          "Content-Type": "application/json",
        },
        credentials:"include"
        
      });

      const data = await res.json();
      console.log(data);
      setUserData(data);

      if(!res.status === 200){
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      navigate('/admin')
    }
  }

  useEffect(() =>{
    callProfilePage();
  }, [])

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

  const updateData = async (e) => {
    e.preventDefault();
    
    const { title,detail,date,time,venue } = event;
    
    try {
        let resp = await fetch(`/event/${params.id}`,{
            method:"PUT",
            body: JSON.stringify({
                title,
                detail,
                date,
                time,
                venue   
            }),
            headers:{
                "Content-Type": "application/json",
            }
        });
        resp = await resp.json();
        window.alert("Event Updated successfully!");
        navigate("/aevents");
    } catch (error) {
        console.log(error)
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
            <div className="login-page">update Event</div>
            <form method='PUT'>
              <div className="firstInput">
                <MdSubtitles size={25}/>
                <input
                  type="text"
                  value={event.title}
                  placeholder="Title"
                  className="name"
                  onChange={handleInput}
                  name="title"
                />
              </div>
              <div className="secondInput">
                <BiMessageDetail size={25}/>
                <input
                  type="textarea"
                  value={event.detail}
                  placeholder="Details"
                  className="name"
                  onChange={handleInput}
                  name="detail"
                />
              </div>
              <div className="secondInput">
                <BsCalendarDate size={25}/>
                <input
                  type="text"
                  value={event.date}
                  placeholder="Date"
                  className="name"
                  onChange={handleInput}
                  name="date"
                />
              </div>
              <div className="secondInput">
                <BiTimeFive size={25}/>
                <input
                  type="text"
                  value={event.time}
                  placeholder="Time"
                  className="name"
                  onChange={handleInput}
                  name="time"
                />
              </div>
              <div className="secondInput">
                <HiHome size={25}/>
                <input
                  type="text"
                  value={event.venue}
                  placeholder="Venue"
                  className="name"
                  onChange={handleInput}
                  name="venue"
                />
              </div>
              <div className="padding1">
                <input
                  type="submit"
                  name="Edit"
                  className="login-button"
                  onClick={updateData}
                  value="Update"
                />
              </div>
            </form>
          </div>
        </div>
          <div className='container-flaot3'>
            <img src={AddEvent} alt="Login Image" className="Loginimg"/>
          </div>
      </div>
      <Footer/>
    </> 
  )
}

export default Edit