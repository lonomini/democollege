import React, {useContext, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from './AuthContext';

export default function Logout() {
    const [auth, setAuth] = useContext(AuthContext);
    const navigate = useNavigate();
    let params = useParams()


    useEffect(()=>{
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("auth")
    
        setAuth({
            isLogin: false,
            role: "",
            id: 0,
        })
    
        if(params.role == "ADMIN"){
            navigate("/adminlogin")
        }else{
            navigate("/")
        }        
    },[])


    return (
        <div>
        </div>
    )
}
