import React, {use, useEffect, useState} from 'react'
import axios from 'axios'
import url from '../Config'
import { useNavigate } from 'react-router-dom';

export default function StudentList() {
    const navigate = useNavigate()
    const [list, setList] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [showList, setShowList] = useState(true)

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [email, setEmail] = useState()
    const [gender, setGender] = useState()
    const [telephone, setTelephone] = useState()
    const [dob, setDob] = useState()

    const [showCoursesRegistered, setShowCourseRegistered] = useState(false)
    const [studentCourseList, setStudentCoursesList] = useState([])
    const [selectStudentName, setSelectedStudentName] = useState([])

    const [message, setMessage] = useState({
        usernameError: [false, ""],
        emailError : [false, ""],
        passwordError : [false, ""],
        genderError : [false, ""],
        telephoneError : [false, ""],
        dobError : [false, ""]
    })

    function validate(){
        let result = true;
        
        let tempMessage = {
            usernameError: [false, ""],
            emailError : [false, ""],
            passwordError : [false, ""],
            genderError : [false, ""],
            telephoneError : [false, ""],
            dobError : [false, ""]
        }

        if(username == "" || username == null || username.length < 6 || username.length > 12){
            tempMessage.usernameError = [true, "Length of username is between 6 to 12 character."];
            result = false;
        }

        if(email == "" || email == null){
            tempMessage.emailError = [true, "Email is empty."];
            result = false;
        }

        if(password == "" || password == null || password.length < 6 || password.length > 12){
            tempMessage.passwordError = [true, "Length of password is between 6 to 12 character."];
            result = false;
        }

        if(gender == "" || gender == null){
            tempMessage.genderError = [true, "Gender is missing."];
            result = false;
        }

        if(telephone == "" || telephone == null){
            tempMessage.telephoneError = [true, "Telephone number is missing."];
            result = false;
        }

        if(dob == "" || dob == null){
            tempMessage.dobError = [true, "Date of birth is missing."];
            result = false;
        }

        setMessage(tempMessage)
        return result;
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if(validate()){

            let data = {
                email: email,
                password: password,
                name: username,
                dob: dob,
                telephone: telephone,
                gender: gender,
                authorities: ['student']
            }
    
            axios({
                method:"post",
                url: url+"/student/add",
                data: data,
                headers:{
                    "Content-Type": "application/json",
                    "Authorization" : "Bearer "+sessionStorage.getItem("token")
                }
            })
            .then(resp=>{
                if(resp.status = 200){
                    alert(resp.data);
                    getStudentList();
                    showStudentList();

                    // setUsername(null)
                    // setPassword(null)
                    // setEmail(null)
                    // setGender(null)
                    // setTelephone(null)
                    // setDob(null)
                }else{
                    alert(resp.data)
                }
            })
            .catch(error => {
                console.log("System error.")
                navigate("/logout/ADMIN")
            })
        }
    }

    const getStudentList = () => {
        axios({
            method:"get",
            url: url+"/student/list",
            headers:{
                "Content-Type": "application/json",
                "Authorization" : "Bearer "+sessionStorage.getItem("token")
            }
        })
        .then(
            (resp) => {
                setList([])
                resp.data.map(item=>{
                    setList(prevItem => [...prevItem, item])
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
        getStudentList();
    }, [])
  
    const showAddForm = () => {
        setShowForm(true)
        setShowList(false)
        setShowCourseRegistered(false)
    }
    
    const showStudentList = () => {
        setShowForm(false)
        setShowList(true)
        setShowCourseRegistered(false)
    }

    const showStudentCourses = (courses, name) => {
        setSelectedStudentName(name)
        setStudentCoursesList(courses)
        setShowCourseRegistered(true)
        setShowForm(false)
        setShowList(false)
    }

    return (
    <div className='content'>
        <div>  
            <button className='sectionButton' onClick={showStudentList}>Student List</button>
            <button className='sectionButton' onClick={showAddForm}>Add new student</button>

            {
                showForm &&
                <div className='adminFormContent'>
                    <form onSubmit={handleSubmit}>
                        <div className='message'># All fields required.</div>
                        <div className='inputField'>
                            <label className='inputLabel' htmlFor='username'>Username: </label>
                            <div className='inputDiv'>
                                <input className={message.usernameError[0] ? "emptyInput" : ""} type='text' name='username' value={username} id='username' onChange={(event)=>setUsername(event.target.value)} autoComplete="false"/>
                                <span className='message'>{message.usernameError[0] && message.usernameError[1]}</span>
                            </div>                            
                        </div>
                        <div className='inputField'>
                            <label className='inputLabel' htmlFor='email'>Email: </label>
                            <div className='inputDiv'>
                                <input className={message.emailError[0] ? "emptyInput" : ""} type='email' name='email' id='email' onChange={(event)=>setEmail(event.target.value)} autoComplete="false"/>
                                <span className='message'>{message.emailError[0] && message.emailError[1]}</span>
                            </div>
                        </div>
                        <div className='inputField'>
                            <label className='inputLabel' htmlFor="password">Password: </label>
                            <div className='inputDiv'>
                                <input className={message.passwordError[0] ? "emptyInput" : ""} type='password' name='Password' id='password' onChange={(event)=>setPassword(event.target.value)}/>
                                <span className='message'>{message.passwordError[0] && message.passwordError[1]}</span>
                            </div>
                        </div>
                        <div className='inputField'>
                            <span className='inputLabel'>Gender: </span>
                            <div className='inputDiv'>                            
                                <div style={{display:"flex", flexDirection:"row"}}>
                                    <input type='radio' value="male" name='gender' id='gender_male' onChange={(event)=>setGender(event.target.value)}/>
                                    <label htmlFor="gender_male">Male</label>
                                    <input type='radio' value="female" name='gender' id='gender_female' onChange={(event)=>setGender(event.target.value)}/>
                                    <label htmlFor="gender_female">Female</label>
                                </div>
                                <span className='message'>{message.genderError[0] && message.genderError[1]}</span>     
                            </div>
                        </div>
                        <div className='inputField'>
                            <label className='inputLabel' htmlFor='dob'>Date of birth:</label>
                            <div className='inputDiv'>
                                <input className={message.dobError[0] ? "emptyInput" : ""} type='date' name='dob' id='dob' onChange={(event)=>setDob(event.target.value)}/> 
                                <span className='message'>{message.dobError[0] && message.dobError[1]}</span>
                            </div>                            
                        </div>
                        <div className='inputField'>
                            <label className='inputLabel' htmlFor="telephone">Telephone</label>
                            <div className='inputDiv'>
                                <input className={message.telephoneError[0] ? "emptyInput" : ""} type='text' name='telephone' id='telephone' onChange={(event)=>setTelephone(event.target.value)}/>
                                <span className='message'>{message.telephoneError[0] && message.telephoneError[1]}</span>
                            </div>                            
                        </div>
                        <div className='inputField'>
                            <button className='submitButton' type='submit'>Add New</button>
                            <button className='submitButton' type='reset'>Reset</button>
                        </div>
                    </form>
                </div>
            }

            {
                showList &&
            
                <table border={1} className='tabletype1' style={{width:"100%"}}>
                    <thead>
                        <tr style={{backgroundColor: "yellow"}}><th>Name</th><th>Email</th><th>Gender</th><th>Date of Birth</th><th>Telephone</th><th>Course</th></tr>
                    </thead>
                    <tbody>
                        {                
                            list.map((item, index) => {
                                return(
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.gender}</td>
                                        <td>{new Date(item.dob).toLocaleDateString()}</td>
                                        <td>{item.telephone}</td>
                                        <td><button onClick={() => {
                                            showStudentCourses(item.courses, item.name)
                                        }}>View Courses</button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            }

            {
                showCoursesRegistered &&

                    <div>
                    {
                        studentCourseList.length > 0 ?
                        <>
                        <h4><span style={{color:"red"}}>{selectStudentName}</span>'s registered courses:</h4>
                        <table border={1} className='tabletype1'>
                            <thead>
                                <tr><th>Id</th><th>Course</th></tr>
                            </thead>
                            <tbody>
                                {
                                    studentCourseList.map( (item, index) => {
                                        return(
                                            <tr key={index}><td>{item.id}</td><td>{item.name}</td></tr>
                                        )
                                    })
                                } 
                            </tbody>
                        </table>
                        </>

                        : "No course registered yet."
                    }

                </div>
            }
        </div>
    </div>
    )
}
