import React from 'react'
import { Link } from 'react-router-dom'

export default function LinkTeacher({role,name}) {
  return (
    <div>
      <ul>
        <li><Link to="/teacher">My Course - Teacher</Link></li>
        <li><Link to="/teacher/profile">Profile ({name})</Link></li>
        <li><Link to="/courses">Courses</Link> </li>
        <li><Link to={`logout/${role}`}>Logout</Link></li>
      </ul>
    </div>
  )
}
