import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';

import AuthContext from '../AuthContext';
import url from '../Config';
import CourseEle from '../Course/CourseEle';
import CourseMaterial from '../Course/CourseMaterial';

export default function StudentPage() {

  const navigate = useNavigate()
  const [auth, setAuth] = useContext(AuthContext);
  const [detail, setDetail] = useState({})
  const [courses, setCourses] = useState([])
  const [cid, setCid] = useState()

  const [displayList, setDisplayList] = useState(true)
  const [displayDetail, setDisplayDetail] = useState(false)

  const getUser = async (id) => {
    await axios({
      method:"get",
      url: url+"/student/list/"+id,
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

          setCourses([])
          resp.data.courses.map(item=>{
            setCourses(prevItem => [...prevItem, item])
          })
        }
    ).catch(error=>{
      alert("Token expired.")
      navigate("/logout/STUDENT")
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

  const showCourseDetail = (id) => {
    setCid(id)
    setDisplayDetail(true)
    setDisplayList(false)
  }

  const showCourseList = () => {
    setDisplayDetail(false)
    setDisplayList(true)
  }

  return (
    <div className='content'>
      <div>  
        {
          displayList && 
          <>            
            <table border="1" className='tabletype1'>
              <caption><h3>Your current courses: </h3></caption>
              <thead>
                <tr><th>Course</th><th>View</th></tr>
              </thead>
              <tbody>     
                {courses.map( (item, index) =>{
                  return(
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td><a className='viewDetail' onClick={()=>showCourseDetail(item.id)}>Detail</a></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </>
        }

        {
          displayDetail &&
          <>
            <button className='sectionButton' onClick={showCourseList}>Course List</button>
            {
              cid && <CourseEle role="teacher" course={courses.filter( item => item.id==cid)}></CourseEle>
            }
            <br />
            {
              cid && <CourseMaterial />
            }
          </>
        }

      </div>
    </div>
  )
}
