import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../AuthContext'

export default function AdminPage() {

  const [auth, setAuth] = useContext(AuthContext);

  return (
    <div className='content' style={{display:"flex", flexDirection:"column"}}>
      <h1>Welcome, {auth.name}</h1>
      <div className='adminPageDiv'>
        <div className='adminPageLink'><Link to="/admin/staff">Staff Page</Link></div>
        <div className='adminPageLink'><Link to="/admin/teacher">Teacher Page</Link></div>
        <div className='adminPageLink'><Link to="/admin/student">Student Page</Link></div>
        <div className='adminPageLink'><Link to="/admin/course">Course Page</Link></div>
      </div>
    </div>
  )
}
