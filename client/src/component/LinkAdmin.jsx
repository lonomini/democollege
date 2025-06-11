import React from 'react'
import { Link } from 'react-router-dom'

export default function LinkAdmin({role,name}) {
  return (
    <>
      <ul>
        <li><Link to="/admin">Home ({name})</Link></li>
        <li><Link to="/admin/staff">Staff</Link></li>
        <li><Link to="/admin/teacher">Teacher</Link></li>
        <li><Link to="/admin/student">Student</Link></li>
        <li><Link to="/admin/course">Courses</Link></li>
        <li><Link to={`logout/${role}`}>Logout</Link></li>
      </ul>
    </>
  )
}
