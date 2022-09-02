import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    let navigate = useNavigate();
    useEffect(() => {
        fetch('/logout',{
            method: "GET",
            headers:{
              Accept:"application/json",
              "Content-Type": "application/json",
            },
            credentials:"include"
        }).then((res) => {
            navigate('/',{replace:true});
            if(!res.status===200){
                const err = new Error(res.error);
                throw err;
            }
        }).catch((error) => {
            console.log(error);
        })
    }); 
  return (
    <div>Logout Page</div>
  )
}

export default Logout