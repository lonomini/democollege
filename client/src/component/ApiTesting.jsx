import React, {useState} from 'react'
import axios from 'axios'

export default function ApiTesting() {
    
    const [message, setMessage] = useState();

    const test2 = () => {
        sessionStorage.removeItem("token")
        setMessage("")
        axios({
            method:"post",
            url: "http://localhost:8080/login", 
            data: {
                email: "amy@abc.com",
                password: "123123",
                role: "STUDENT"
            }
        })
        .then(
            (resp) => {
                sessionStorage.setItem("token", resp.data);
                console.log(sessionStorage.getItem("token"));
            }
        )
    }

    const test3 = () => {
        setMessage("")
        axios({
            method:"get",
            url: "http://localhost:8080/student/list",
            headers:{
                "Content-Type": "application/json",
                "Authorization" : "Bearer "+sessionStorage.getItem("token")
            }
        })
        .then(
            (resp) => console.log(resp.data)
        ).catch(
            error => {
                setMessage("Error, token expired or no authorization. ")
            }
        )
    }

    const test4 = () => {
        sessionStorage.removeItem("token")
        setMessage("")
        axios({
            method:"post",
            url: "http://localhost:8080/login", 
            data: {
                email: "mrderek@abc.com",
                password: "123123",
                role: "TEACHER"
            }
        })
        .then(
            (resp) => {
                sessionStorage.setItem("token", resp.data);
                console.log(sessionStorage.getItem("token"));
            }
        )
    }

    const test5 = () => {
        setMessage("")
        axios({
            method:"get",
            url: "http://localhost:8080/teacher/list",
            headers:{
                "Content-Type": "application/json",
                "Authorization" : "Bearer "+sessionStorage.getItem("token")
            }
        })
        .then(
            (resp) => console.log(resp.data)
        ).catch(
            error => {
                setMessage("Error, token expired or no authorization. ")
            }
        )
    }

    const test6 = () => {
        sessionStorage.removeItem("token")
        setMessage("Logout")
    }


    const test7 = () => {
        sessionStorage.removeItem("token")
        setMessage("")
        axios({
            method:"post",
            url: "http://localhost:8080/login", 
            data: {
                email: "derekcheung@abc.com",
                password: "123123",
                role: "ADMIN"
            }
        })
        .then(
            (resp) => {
                sessionStorage.setItem("token", resp.data);
                console.log(sessionStorage.getItem("token"));
            }
        )
    }

    const test8 = () => {
        setMessage("")
        axios({
            method:"get",
            url: "http://localhost:8080/staff/list",
            headers:{
                "Content-Type": "application/json",
                "Authorization" : "Bearer "+sessionStorage.getItem("token")
            }
        })
        .then(
            (resp) => console.log(resp.data)
        ).catch(
            error => {
                setMessage("Error, token expired or no authorization. ")
            }
        )
    }

    const test9 = () => {
        setMessage("")
        axios({
            method:"get",
            url: "http://localhost:8080/student/list/2",
            headers:{
                "Content-Type": "application/json",
                "Authorization" : "Bearer "+sessionStorage.getItem("token")
            }
        })
        .then(
            (resp) => console.log(resp.data)
        ).catch(
            error => {
                setMessage("Error, token expired or no authorization. ")
            }
        )
    }   

    const test10 = () => {
        setMessage("")
        axios({
            method:"get",
            url: "http://localhost:8080/student/home",
            headers:{
                "Content-Type": "application/json",
                "Authorization" : "Bearer "+sessionStorage.getItem("token")
            }
        })
        .then(
            (resp) => console.log(resp.data)
        ).catch(
            error => {
                setMessage("Error, token expired or no authorization. ")
            }
        )
    }  

  return (
    <div>
        <button onClick={test2}>Test 2 "/login/(student)"</button>
        <button onClick={test3}>Test 3 "/students"</button>
        <button onClick={test4}>Test 4 "/login (teacher)"</button>
        <button onClick={test5}>Test 5 "/teachers"</button>
        <button onClick={test7}>Test 7 "/login (Admin)"</button>
        <button onClick={test8}>Test 8 "/admin"</button>
        <button onClick={test9}>Test 9 "Get 1 student"</button>
        <button onClick={test10}>Test 10 "Student Home"</button>
        <button onClick={test6}>Test 6 "/logout"</button>
        <p>{message}</p>
    </div>
  )
}
