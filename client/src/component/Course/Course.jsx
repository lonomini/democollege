import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import url from '../Config'

export default function Course(prop) {

    const [teacher, setTeacher] = useState("")
    const [detail, setDetail] = useState({})
    let params = useParams()

    
    useEffect(()=>{
        let id = params.cid || prop.cid;
        axios({
            method:"get",
            url: url+"/course/list/"+id,
            headers:{
                "Content-Type": "application/json"
            }
        })
        .then(
            (resp) => {
                setDetail({
                    id: resp.data.id,
                    name: resp.data.name,
                    description: resp.data.description
                })
                let teacher_name = resp.data.teacher ? resp.data.teacher.name : "No teacher arranged yet."
                setTeacher(teacher_name)
            }
        )

    }, []);


  return (
    <div>
        <table>
            <tbody>
                <tr><td>Course:</td><td>{detail.name}</td></tr>
                <tr><td>Decription:</td><td>{detail.description}</td></tr>
                <tr><td>Teacher: </td><td>{teacher}</td></tr>
            </tbody>
        </table>
    </div>
  )
}
