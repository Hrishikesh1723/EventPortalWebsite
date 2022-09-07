import React,{useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Anavbar from './Anavbar';

function Aevents() {
  let navigate = useNavigate();
  const [userData, setUserData] = useState();

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
  const deleteEve = async (id) => {
    if(window.confirm ("Do you really want to delete the event")){
      const res = await fetch(`/event/${id}`, { method: 'DELETE' });
    if(res===400){
      console.log(res)
    }else{
      console.log(res)
    }
    }
    window.location.reload(true)
    
}

  useEffect(() =>{
    callProfilePage();
  }, [])
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
  
  const num = 10;
  const Record = (props) => (
    <div className='container' style={myStyle}>
    <h3 className="my-3">Event list</h3>
        <div>
           <h1>{props.record.title}</h1>
           <h3>{props.record.detail}</h3>
           <h3>{props.record.date}</h3>
           <h3>{props.record.time}</h3>
           <h3>{props.record.venue}</h3>
           <button className="btn btn-sm btn-danger" onClick={() => deleteEve(props.record._id)}>Delete</button>
           <Link to={`/edit/${props.record._id}`}>Edit</Link>
           <Link to={`/registrations/${props.record._id}`}>Registrations</Link>
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