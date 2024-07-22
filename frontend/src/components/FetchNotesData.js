import React from 'react'

function fetchNotesData(Props) {
    
  return (
    <div className="card" >
  {/* <img src="..." className="card-img-top" alt="..."/> */}
  <div className="card-body">
    <div className="d-flex align-items-center">
    <h5 className="card-title">{Props.obj.title}</h5>
    <i className="fa-solid fa-trash mx-5" onClick={()=>{Props.deleteNote(Props.obj._id)}}></i>
    <i className="fa-solid fa-pen-to-square" onClick={()=>{Props.updateNote(Props.obj)}}></i>
    </div>
    <p className="card-text">{Props.obj.description}</p>
    <h5 href="#" className="btn btn-primary">{Props.obj.tag}</h5>
  </div>
</div>
  )
}

export default fetchNotesData