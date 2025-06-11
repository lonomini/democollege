import React from 'react'
import { Link } from 'react-router-dom'

export default function LinkStudent({role,name}) {
  return (
    <>
        <ul>
          <li><Link to="/student">My Course - Student</Link></li>
          <li><Link to="/student/profile">Profile ({name})</Link></li>
          <li><Link to="/courses">Courses</Link></li>
          <li><Link to="/student/setting">Setting</Link></li>
          <li><Link to={`logout/${role}`}>Logout</Link></li>
        </ul>          
    </>
  )
}
