import React, { useContext } from 'react'
import NotesContext from '../context/notes/NotesContext'
export default function LoginUser() {
  const {setNotes,notes}=useContext(NotesContext)
  const handleChange=(event)=>{
        
        setNotes({...notes,[event.target.name]:event.target.value})
  }
  return (
    <div className="container ">
      <div className="mb-3"> 
        <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
        <input type="text" className="form-control" name='title' id="exampleFormControlInput1" onChange={handleChange} placeholder="Enter title here" />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
        <textarea className="form-control" name='description' id="exampleFormControlTextarea1" onChange={handleChange} rows="3"></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">Tag</label>
        <input type="text" className="form-control" name='tag' onChange={handleChange} id="exampleFormControlInput1" />
      </div>
    </div>

  )
}
