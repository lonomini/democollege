import React from 'react'

export default function CourseEle(prop) {

  return (
    <div>
        <h3>Courses Detail: </h3>
        {
            prop.course.map(
                (item, index) => {
                    let teacher = item.teacher ? item.teacher.name : "No teacher arranged yet.";
                    return(
                        <table key={index} className='tabletype1'>
                            <tbody>
                                <tr key={index}><td>Course:</td><td>{item.name}</td></tr>
                                <tr><td style={{width: "120px"}}>Decription:</td><td>{item.description}</td></tr>
                                <tr><td>Teacher:</td><td>{teacher}</td></tr>
                            </tbody>
                        </table>
                    )
                }
            )
        }
    </div>
  )
}
