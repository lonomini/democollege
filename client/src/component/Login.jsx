import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import AuthContext from './AuthContext';
import url from './Config'

export default function Login() {

    const [auth, setAuth] = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState();
    const [role, setRole] = useState("STUDENT");
    const [message, setMessage] = useState({
        emailEmpty : [false, ""],
        passwordEmpty : [false, ""],
        loginError : [false, ""]
    })

    const emailInput = useRef()
    const passwordInput = useRef()
    const navigate = useNavigate()
    
    function validate(){
        let result = true;
        
        let tempMessage = {
            emailEmpty : [false, ""],
            passwordEmpty : [false, ""],
            loginError : [false, ""]
        }

        if(email == "" || email == null){
            tempMessage.emailEmpty = [true, "Email is empty."];
            result = false;
        }

        if(password == "" || password == null){
            tempMessage.passwordEmpty = [true, "Password is empty."];
            result = false;
        }

        setMessage(tempMessage)
        return result;
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("auth")

        if(validate()){
            await axios({
                method:"post",
                url: url+"/login", 
                data: {
                    email: email,
                    password: password,
                    role: role
                }
            })
            .then(
                (resp) => {
                    if(resp.status == 200) {
                        sessionStorage.setItem("token", resp.data.token);
                        let auth_temp = {
                            isLogin: true,
                            role: role,
                            id: resp.data.id,
                            name: resp.data.name
                        }
                        setAuth(auth_temp);                    
    
                        sessionStorage.setItem("auth", JSON.stringify(auth_temp))
    
                        if(role == "STUDENT"){
                            navigate("/student")
                        }else if(role == "TEACHER"){
                            navigate("/teacher")
                        }else if(role == "ADMIN"){
                            navigate("/admin")
                        }else{
                            navigate("/")
                        }                    
                    }
                }
            ).catch(error=>{
                if(error.status == 403){
                    let tempMessage = {
                        emailEmpty : [false, ""],
                        passwordEmpty : [false, ""],
                        loginError : [false, ""]
                    }
                    tempMessage.loginError = [true, "Invalid user name or incorrect password."];
                    setMessage(tempMessage)
                }else{
                    console.log(error)
                }            
            })
        }
    }

    return (
        <div className='formContent'>
            
        <form onSubmit={handleSubmit}>
            <h2>Sign in online account</h2>
            <div className='inputField'>
                <div className="inputLabel">
                    <label htmlFor='useremail'>Email</label>
                </div>                
                <div className='inputDiv'>
                    <input className={message.emailEmpty[0] ? "emptyInput" : ""} type='text' name='useremail' id='useremail' onChange={ (e)=> setEmail(e.target.value)}></input>
                    <span className='message'>{message.emailEmpty[0] && message.emailEmpty[1]}</span>
                </div>
                  
            </div>
            <div className='inputField'>
                <div className="inputLabel">
                    <label htmlFor='password'>Password</label>
                </div>
                <div className='inputDiv'>
                    <input className={message.passwordEmpty[0] ? "emptyInput" : ""} type='password' name='password' id='password' onChange={ (e)=> setPassword(e.target.value)}></input>
                    <span className='message'>{message.passwordEmpty[0] && message.passwordEmpty[1]}</span>
                </div>                    
            </div>

            <div className='inputField'>
                <div className="inputLabel">
                    <label htmlFor='role'>Role</label>
                </div>
                <div className='inputDiv'>
                    <select id='role' onChange={ (e)=> setRole(e.target.value)}>
                        <option value="STUDENT">Student</option>
                        <option value="TEACHER">Teacher</option>
                    </select>      
                </div>         

            </div>
            <div>
                <button type='submit' className='signInButton'>Sign in</button>
            </div>
            <span className='message'>{message.loginError[0] && message.loginError[1]}</span>
        </form>
        </div>
    )
}
