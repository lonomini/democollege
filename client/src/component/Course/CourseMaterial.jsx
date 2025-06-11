import React from 'react'

export default function CourseMaterial({name}) {
  return (
    <div style={{
      padding: "20px 0px"
    }}>
      <h3 style={{fontWeight: "bold"}}>{name} - Course Materials: </h3>
      <div style={{
        border: "solid 1px",
        background: "#FFF",
        minHeight: "200px",
        padding: "5px 10px",
        color:"gray"
        }}>
        <p>No course materials found.</p>
      </div>        
    </div>
  )
}
