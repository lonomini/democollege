import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import url from '../Config'
import AuthContext from '../AuthContext';
import { useNavigate } from 'react-router-dom';

export default function CourseApplyButton({sid, cid, status, setResult, setButtonDisplay}) {

    const navigate = useNavigate()
    const [auth, setAuth] = useContext(AuthContext);

    const applyCourse = () => {
        if(auth.id == 0 || !auth.isLogin){
            navigate("/")
            return
        }            

        axios({
            method:"post",
            url: url+"/student/addcourse",
            data:{
                studentId: sid,
                courseId: cid
            },
            headers:{
                "Content-Type": "application/json",
                "Authorization" : "Bearer "+sessionStorage.getItem("token")
            }
        })
        .then((resp) => {
            setResult(resp.data)
            setButtonDisplay(true)
        })
        .catch(error => {
                console.log("Error")
            }
        )
    }

  return (
    <div>
        {
            status ? 
            <button disabled style={buttonStyleDisable}>Already Registered</button>
            :
            <button onClick={applyCourse} style={buttonStyle}>Register Course</button>
        }        
    </div>
  )
}

const buttonStyle = {
    width: "200px", 
    border: "solid 1px", 
    borderRadius: "15px",
    background: "rgb(56, 56, 233)", 
    color: "white",
    fontStyle: "italic",
    height: "35px",
    margin: "5px 0px",
    cursor:"pointer"
}

const buttonStyleDisable = {
    width: "200px", 
    border: "solid 1px", 
    borderRadius: "15px",
    background: "#7970f5", 
    color: "black",
    fontStyle: "italic",
    height: "35px",
    margin: "5px 0px",
    cursor:"pointer"
}
