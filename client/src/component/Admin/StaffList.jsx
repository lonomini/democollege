import React, {useEffect, useState} from 'react'
import axios from 'axios'
import url from '../Config'
import { useNavigate } from 'react-router-dom';

export default function StaffList() {

    const navigate = useNavigate()
    const [list, setList] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [showList, setShowList] = useState(true)

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [email, setEmail] = useState()
    const [telephone, setTelephone] = useState()

    const [message, setMessage] = useState({
        usernameError: [false, ""],
        emailError : [false, ""],
        passwordError : [false, ""],
        telephoneError : [false, ""]
    })

    function validate(){
        let result = true;
        
        let tempMessage = {
            usernameError: [false, ""],
            emailError : [false, ""],
            passwordError : [false, ""],
            telephoneError : [false, ""]
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

        if(telephone == "" || telephone == null){
            tempMessage.telephoneError = [true, "Telephone number is missing."];
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
                telephone: telephone,
                authorities: ['admin']
            }

            axios({
                method:"post",
                url: url+"/staff/add",
                data: data,
                headers:{
                    "Content-Type": "application/json",
                    "Authorization" : "Bearer "+sessionStorage.getItem("token")
                }
            })
            .then(resp=>{
                if(resp.status = 200){
                    alert(resp.data);
                    getStaffList();
                    showStaffList();

                    setUsername(null)
                    setPassword(null)
                    setEmail(null)
                    setTelephone(null)

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

    
    const getStaffList = () => {
        axios({
            method:"get",
            url: url+"/staff/list",
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
        getStaffList();
    }, [])

    const showAddForm = () => {
        setShowForm(true)
        setShowList(false)
    }
    
    const showStaffList = () => {
        setShowForm(false)
        setShowList(true)
    }
    
    
      return (
        <div className='content'>
            <div>                     
                <button className='sectionButton' onClick={showStaffList}>Staff List</button>
                <button className='sectionButton' onClick={showAddForm}>Add new Staff</button>

                {
                    showForm &&
                    <div className='adminFormContent'>
                        <form onSubmit={handleSubmit}>
                            <div className='message'># All fields required.</div>
                            <div className='inputField'>
                                <label className='inputLabel' htmlFor='username'>Username: </label>
                                <div className='inputDiv'>
                                    <input className={message.usernameError[0] ? "emptyInput" : ""} type='text' name='username' id='username' onChange={(event)=>setUsername(event.target.value)} autoComplete="false"/>
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

                    <table border={1} className='tabletype1'>
                        <thead>
                            <tr><th>Name</th><th>Email</th><th>Telephone</th></tr>
                        </thead>
                        <tbody>
                            {
                                list.map((item, index) => {
                                    return(
                                        <tr key={index}>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.telephone}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>

                }            

            </div>
        </div>
      )
}
