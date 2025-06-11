import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

import AuthContext from '../AuthContext';
import url from '../Config'

import CourseMaterial from '../Course/CourseMaterial';

export default function TeacherPage() {

  const navigate = useNavigate()
  const [auth, setAuth] = useContext(AuthContext);
  const [courses, setCourses] = useState([])
  const [cid, setCid] = useState([])

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
    <div className='content'>
      <div>
        <table border="1" className='tabletype1'>
        <caption><h3>Your courses: </h3></caption>
          <thead>
                <tr><th>Course</th><th>View</th></tr>
              </thead>
          <tbody>
            {
              courses.map((item, index)=>{
                return(
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td><a className='viewDetail' onClick={()=> {
                      setCid([item.id, item.name])
                    }}>Detail</a></td>
                </tr>
                )
              })
            }
          </tbody>
        </table>
        <hr />
        {
          cid[0] && <CourseMaterial name={cid[1]} />
        }

      </div>

    </div>
  )
}
