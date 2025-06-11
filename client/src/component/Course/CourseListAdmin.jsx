import React, { useEffect, useState } from 'react'
import axios from 'axios'
import url from '../Config'
import CourseEle from './CourseEle'

export default function CourseListAdmin() {

    const [courses, setCourses] = useState([])
    const [cid, setCid] = useState()
    const [displayCourseForm, setDisplayCourseForm] = useState(false)
    const [displayCourseList, setDisplayCourseLlist] = useState(true)
    const [teacherList, setTeacherList] = useState([]);

    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [teacher, setTeacher] = useState();

    const [message, setMessage] = useState({
        courseError: [false, ""],
        descriptionError : [false, ""]
    })

    function validate(){
        let result = true;
        
        let tempMessage = {
            courseError: [false, ""],
            descriptionError : [false, ""]
        }

        if(name == "" || name == null){
            tempMessage.courseError = [true, "Course name is empty."];
            result = false;
        }

        if(description == "" || description == null){
            tempMessage.descriptionError = [true, "Description is empty."];
            result = false;
        }

        setMessage(tempMessage)
        return result;
    }


    const getTeacherList = () => {
        if(teacherList.length > 0){
            return;
        }           

        axios({
            method:"get",
            url: url+"/teacher/list",
            headers:{
                "Content-Type": "application/json",
                "Authorization" : "Bearer "+sessionStorage.getItem("token")
            }
        })
        .then(
            (resp) => {
                setTeacherList([])
                resp.data.map(item=>{
                    setTeacherList(prevItem => [...prevItem, item])
                })
            }
        ).catch(
            error => {
                console.log("Error, token expired or no authorization. ")
                navigate("/logout/ADMIN")
            }
        )
    }

    const getCourseList = () => {
        axios({
            method:"get",
            url: url+"/course/list",
            headers:{
                "Content-Type": "application/json",
                "Authorization" : "Bearer "+sessionStorage.getItem("token")
            }
        })
        .then(
            (resp) => {                
                setCourses([])
                resp.data.map(item=>{
                    setCourses(prevItem => [...prevItem, item])
                  })
            }
        ).catch(
            error => {
                console.log("Error, token expired or no authorization. ")
                navigate("/logout/ADMIN")
            }
        )
    }

    useEffect(()=>{
        getCourseList();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        if(validate()){
            let data = {
                name: name,
                description: description,
                teacherId: teacher
            }
            axios({
                method: "post", 
                url: url+"/course/add", 
                data: data,
                headers:{
                    "Content-Type": "application/json",
                    "Authorization" : "Bearer "+sessionStorage.getItem("token")
                }
            }).then((resp)=>{
                if(resp.status = 200){
                    getCourseList();
                    showCourseList();
                }else{
                    console.log(resp.message)
                    console.log("Error, token expired or no authorization. ")
                    navigate("/logout/ADMIN")
                }
            })
        }
    }

    const showAddCourseForm = () => {
        setDisplayCourseForm(true)
        setDisplayCourseLlist(false)
        getTeacherList()
    }

    const showCourseList = () => {
        setDisplayCourseForm(false)
        setDisplayCourseLlist(true)
    }

    return (
        <div className='content'>
            <div>
                <button className='sectionButton' onClick={showCourseList}>Courses List</button>
                <button className='sectionButton' onClick={showAddCourseForm}>Add New Courses</button>
                {
                    displayCourseForm &&
                    <div className='adminFormContent'>
                        <form onSubmit={handleSubmit}>
                            <div className='inputField'>
                                <div className="inputLabel">
                                    <label>Name: </label>
                                </div>
                                <div className='inputDiv'>
                                    <input className={message.courseError[0] ? "emptyInput" : ""} type='text' name='courseName' id='courseName' onChange={event=>setName(event.target.value)} />
                                    <span className='message'>{message.courseError[0] && message.courseError[1]}</span>
                                </div>                                
                            </div>
                            <div className='inputField'>
                                <div className="inputLabel">
                                    <label htmlFor='courseDetail'>Description: </label>
                                </div>    
                                <div className='inputDiv'>
                                    <textarea className={message.descriptionError[0] ? "emptyInput" : ""} name='courseDetail' id='courseDetail' onChange={event=>setDescription(event.target.value)}></textarea>
                                    <span className='message'>{message.descriptionError[0] && message.descriptionError[1]}</span>
                                </div>
                            </div>
                            <div className='inputField'>
                                <div className="inputLabel">
                                    <label htmlFor='courseTeacher'>Teacher</label>
                                </div>   
                                <div className='inputDiv'>
                                    <select id='courseTeacher' name='courseTeacher' onChange={event=>setTeacher(event.target.value)}>
                                        <option>Not available</option>
                                        {
                                            teacherList.map( (item, index) => <option key={index} value={item.id}>{item.name}</option>)
                                        }
                                    </select>
                                </div> 
                            </div>
                            <div className='inputField'>
                                <button className='submitButton' type='submit'>Add</button>
                                <button className='submitButton' type='reset'>Reset</button>
                            </div>
                        </form>
                    </div>
                }

                { 
                    displayCourseList &&
                    
                    <div>
                        <table className='tabletype1'>
                            <thead>
                                <tr><th>Name</th><th>Details</th></tr>
                            </thead>
                            <tbody>
                            {
                                courses.map( (item, index) => 
                                    {
                                        return <tr key={index}>
                                            <td>{item.name}</td>
                                            <td><a className='viewDetail' onClick={()=>setCid(item.id)}>Detail</a></td>
                                        </tr>
                                    })
                            }
                            </tbody>
                        </table> 
                        {
                        cid && <CourseEle course={courses.filter( item => item.id==cid)}></CourseEle>
                        } 
                    </div>                
                } 

            </div>        
        </div>
    )
}
