import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import url from '../Config'
import CourseEle from './CourseEle'
import AuthContext from '../AuthContext';
import CourseApplyButton from './CourseApplyButton';
import { Link } from 'react-router-dom';

export default function CourseList() {
    const [courses, setCourses] = useState([])
    const [cid, setCid] = useState()
    const [auth, setAuth] = useContext(AuthContext);
    const [buttonDisplay, setButtonDisplay] = useState(false)
    const [result, setResult] = useState(0)

    const [displayList, setDisplayList] = useState(true)
    const [displayDetail, setDisplayDetail] = useState(false)

    const getCourseList = () => {
        axios({
            method:"get",
            url: url+"/course/list",
            headers:{
                "Content-Type": "application/json",
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
                console.log("Error")
            }
        )
    }

    useEffect(()=>{
        getCourseList();
    }, []);

    const checkCourseAppliedByStduent = (sid, cid) => {
        axios({
            method:"GET",
            url: url+`/student/checkCourseApplied?sid=${sid}&cid=${cid}`
        })
        .then(resp => {
            if(parseInt(resp.data) > 0)
                setButtonDisplay(true)
        })
    }

    const showCourseDetail = (cid) => {
        setDisplayDetail(true)
        setDisplayList(false)
        setButtonDisplay(false)
        setResult(0)
        setCid(cid)
        checkCourseAppliedByStduent(auth.id, cid) > 0 ? setButtonDisplay(true) : setButtonDisplay(false)
    }
    
    const showCourseList = () => {
        setDisplayDetail(false)
        setDisplayList(true)
    }

    return (        
        <div>
            {
                displayList &&
                <>
                    <table className='tabletype1'>
                        <thead>
                            <tr><th>Name</th><th>View</th></tr>
                        </thead>
                        <tbody>
                        {
                            courses.map( (item, index) => 
                                {
                                    return <tr key={index}>
                                        <td>{item.name}</td>
                                        <td><a className='viewDetail' onClick={()=>showCourseDetail(item.id)}>Detail</a></td>
                                    </tr>
                                })
                        }
                        </tbody>
                    </table>
                </>
            }
            {
                displayDetail && 
                <>
                    <button className='sectionButton' onClick={showCourseList}>Course List</button>
                    {cid && <CourseEle course={courses.filter( item => item.id==cid)}></CourseEle>}     

                    {
                        cid && auth.role != "TEACHER" &&
                        <CourseApplyButton sid={auth.id} cid={cid} status={buttonDisplay} setResult={setResult} setButtonDisplay={setButtonDisplay}></CourseApplyButton>
                    }

                    {
                        result == 1 && <div className='message'>Registered Successfully, <Link style={{color:"blue", textDecoration:"underline"}} to="/student">Check</Link></div>
                    }
                </>
            }

        </div>
    )
}
