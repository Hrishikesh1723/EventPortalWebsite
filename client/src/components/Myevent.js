import React,{useState,useEffect} from 'react'
import Unavbar from './Unavbar'
import { useNavigate } from 'react-router-dom';

const Myevent = () => {
  let navigate = useNavigate();
  const [userData, setUserData] = useState('');

  const callProfilePage = async () => {
    
    try {
      const res = await fetch('/myevent',{
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
      navigate('/login')
    }
  }

  let myStyle = {
    minHeight: "70vh",
    margin: "40px auto",
  };

  const Record = (props) => (
    <div className="container" style={myStyle}>
      <h3 className="my-3">Event list</h3>
      <div>
        <h1>{props.record.title}</h1>
        <h3>{props.record.detail}</h3>
        <h3>{props.record.date}</h3>
        <h3>{props.record.time}</h3>
        <h3>{props.record.venue}</h3>
      </div>
      <hr />
    </div>
  );
  useEffect(() =>{
    callProfilePage();
  }, [])
  return (
    <>
    <Unavbar/>
      <div>
        {userData.events?.map((eve) => (
          <Record record={eve} key={eve._id} />
        ))}
      </div>
    </> 
  )
}

export default Myevent