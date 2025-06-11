import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Login from './component/Login'

import StudentPage from './component/Student/StudentPage'
import StudentProfile from './component/Student/StudentProfile'
import StudentSetting from './component/Student/StudentSetting'

import TeacherPage from './component/Teacher/TeacherPage'
import ApiTesting from './component/ApiTesting'
import AuthContext from './component/AuthContext'
import Logout from './component/Logout'
import CourseList from './component/Course/CourseList'
import AdminPage from './component/Admin/AdminPage'
import AdminLogin from './component/Admin/AdminLogin'
import Course from './component/Course/Course'
import TeacherProfile from './component/Teacher/TeacherProfile'

import StaffList from './component/Admin/StaffList'
import StudentList from './component/Admin/StudentList'
import TeacherList from './component/Admin/TeacherList'
import LinkAdmin from './component/LinkAdmin'
import LinkStudent from './component/LinkStudent'
import LinkTeacher from './component/LinkTeacher'
import CourseListAdmin from './component/Course/CourseListAdmin'

function App() {

  const [auth, setAuth] = useState({
    isLogin: false,
    role: "",
    id: 0,
    name: ""
  });

  useEffect(()=>{
    if(sessionStorage.getItem("auth")){
      setAuth(JSON.parse(sessionStorage.getItem("auth")))
    }
    
  }, [])


  return (
    <div>
      <BrowserRouter>
        <AuthContext.Provider value={[auth, setAuth]}>
        <div className='navbar' style={getNavColor(auth.role)}>
          { auth.isLogin || 
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/courses">Courses</Link></li>
              </ul>
          }

          { (auth.isLogin && auth.role == "STUDENT") && <LinkStudent role={auth.role} name={auth.name}></LinkStudent> }
          { (auth.isLogin && auth.role == "TEACHER") && <LinkTeacher role={auth.role} name={auth.name}></LinkTeacher> }
          { (auth.isLogin && auth.role == "ADMIN") && <LinkAdmin role={auth.role} name={auth.name}></LinkAdmin> }
        </div>

          <Routes>
            <Route path='/' element={<Login/>}></Route>
            <Route path='/test' element={<ApiTesting/>}/>

            <Route path='/student' element={<StudentPage></StudentPage>}></Route>
            <Route path='/student/profile' element={<StudentProfile/>}></Route>
            <Route path='/student/setting' element={<StudentSetting/>}></Route>

            <Route path='/teacher' element={<TeacherPage></TeacherPage>}></Route>
            <Route path='/teacher/profile' element={<TeacherProfile/>}></Route>

            <Route path='/admin' element={<AdminPage></AdminPage>}></Route>
            <Route path='/adminlogin' element={<AdminLogin></AdminLogin>}></Route>
            <Route path="/admin/staff" element={<StaffList></StaffList>}></Route>
            <Route path="/admin/teacher" element={<TeacherList/>}></Route>
            <Route path="/admin/student" element={<StudentList></StudentList>}></Route>
            <Route path='/admin/course' element={<CourseListAdmin></CourseListAdmin>}></Route>

            <Route path='/courses' element={<CourseList/>}></Route>
            <Route path='/courses/:cid' element={<Course/>}></Route>

            <Route path='/logout/:role' element={<Logout/>}/>
          </Routes>
          </AuthContext.Provider>
      </BrowserRouter>
    </div>
  )
}

function getNavColor(role){
  if(role == "TEACHER")
    return {background:"rgb(240, 125, 125)"}
  else if(role == "ADMIN")
    return {background:"rgb(226, 241, 139)"}
  else
    return {background:"rgb(100, 149, 237)"}
}

export default App
