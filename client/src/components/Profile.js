import React, { useEffect, useState } from 'react'
import Unavb from './Unavbar'
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  let navigate = useNavigate();
  const [userData, setUserData] = useState('');

  const callProfilePage = async () => {
    
    try {
      const res = await fetch('/about',{
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
    <Unavb/>
    <div>
        <h1>Profile Page!</h1>
        <h1>{userData.name }</h1>
        
        <form method='GET'>
        </form>
    </div>
    </>
  )
}

export default Profile