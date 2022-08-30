import React, { useEffect } from 'react'
import Unavb from './Unavbar'
import { Navigate } from 'react-router-dom';

const Profile = () => {

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

      if(!res.status === 200){
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
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
        <form method='GET'>
        </form>
    </div>
    </>
  )
}

export default Profile