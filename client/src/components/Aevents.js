import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Anavbar from './Anavbar';

function Aevents() {
  let myStyle = {
      minHeight: "70vh",
      margin: "40px auto"
  }
  const [events,setEvents]=useState([])



  const callEventsData = async () => {
    
    try {
      const res = await fetch('/events',{
        method: "GET",
        headers:{
          Accept:"application/json",
          "Content-Type": "application/json",
        },
        credentials:"include"
        
      });

      const events = await res.json();
      console.log(events.data);
      setEvents(events.data);

      if(!res.status === 200){
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    callEventsData();
  },[])

  const Record = (props) => (
    <div className='container' style={myStyle}>
    <h3 className="my-3">Event list</h3>
        <div>
           <h1>{props.record.title}</h1>
           <h3>{props.record.detail}</h3>
           <h3>{props.record.date}</h3>
           <h3>{props.record.time}</h3>
           <h3>{props.record.venue}</h3>
           <button className="btn btn-sm btn-danger">Delete</button> 
        </div>
        <hr/> 
    </div>
  )
  return (
    <>
    <Anavbar/>
    <div>
        {
          events.map(eve => (<Record record={eve} key={eve._id}/>))
        }
    </div>
    </>
  )
}

export default Aevents