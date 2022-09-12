import React,{useEffect,useState} from 'react'
import Unavbar from './Unavbar'
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const UserHome = () => {
  let navigate = useNavigate();
  const [userData, setUserData] = useState();

  const callProfilePage = async () => {
    
    try {
      const res = await fetch('/userhome',{
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

  useEffect(() =>{
    callProfilePage();
  }, [])
  return (
    <>
    <Unavbar/>
    <div>UserHome</div>
    <Footer/>
    </>    
  )
}

export default UserHome