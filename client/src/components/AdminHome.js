import React,{useEffect,useState} from 'react'
import Anavbar from './Anavbar'
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {
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

  useEffect(() =>{
    callProfilePage();
  }, [])
  return (
    <>
    <Anavbar/>
    <div>UserHome</div>
    </> 
  )
}

export default AdminHome 