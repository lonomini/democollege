import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

import AuthContext from '../AuthContext';
import url from '../Config'

export default function TeacherProfile() {

    const navigate = useNavigate()
    const [auth, setAuth] = useContext(AuthContext);
    const [detail, setDetail] = useState({})
    const [courses, setCourses] = useState([])
  
    const getUser = async (id) => {
      await axios({
        method:"get",
        url: url+"/teacher/list/"+id,
        headers:{
            "Content-Type": "application/json",
            "Authorization" : "Bearer "+sessionStorage.getItem("token")
        }
      })
      .then(
          (resp) => {
            setDetail({
              id: resp.data.id,
              name: resp.data.name,
              email: resp.data.email,
              gender: resp.data.gender,
              dob: resp.data.dob,
              telephone: resp.data.telephone
            })
            
            resp.data.courses.map(item=>{
              setCourses(prevItem => [...prevItem, item])
            })
  
          }
      ).catch(error=>{
        alert("Token expire.")
        navigate("/logout/TEACHER")
      })
    }
  
    useEffect(()=>{
      let session_auth = JSON.parse(sessionStorage.getItem("auth"));
      setAuth(session_auth)
  
      let id = session_auth.id || auth.id;
      let isLogin = session_auth.isLogin || auth.isLogin;
  
      if(!isLogin){
        navigate("/")
      }else{
        getUser(id);
      } 
    }, []);
  
  
    return (
      <div>
        <table className='tabletype1'>
        <caption><h2>Profile:</h2></caption>
          <tbody>
            <tr><td>Name: </td><td>{detail.name}</td></tr>
            <tr><td>Email: </td><td>{detail.email}</td></tr>
            <tr><td>Gender: </td><td>{detail.gender}</td></tr>
            <tr><td>Date of birth: </td><td>{detail.dob}</td></tr>
            <tr><td>Telephone</td><td>{detail.telephone}</td></tr>
          </tbody>
        </table>
        <hr />
        <table>
          <tbody>
            {
              courses.map((item, index)=>{
                <tr key={index}><td>item.name</td></tr>
              })
            }
          </tbody>
        </table>
      </div>
    )
}
