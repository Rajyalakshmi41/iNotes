import React,{useContext,useEffect} from 'react'
import { Link } from 'react-router-dom'
import context from '../context/notes/NotesContext'


export default function Navbar(Props) {
  const {loginStat,setLoginStat}=useContext(context)
  useEffect(()=>{
  
  setLoginStat(localStorage.getItem("status"))},[])
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to={"/"}>{Props.title}</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to={"/login"}>Home</Link>
            </li>
            

          </ul>
          <form className="d-flex">

            {loginStat ? <div>
              <button className="btn  btn-secondary btn-lg mx-2" disabled>{localStorage.getItem("user")}</button>
              <button className="btn  btn-secondary btn-lg " disabled>{localStorage.getItem("email")}</button>
              <Link to="/signout" style={{ color: "white" }}>
              <button type="button" className="btn btn-primary btn-lg mx-2">Sign Out</button>
              </Link>
            </div> :
              <>
              <Link to="/login" style={{ color: "white" }}>
              <button type="button" className="btn btn-primary mx-2">Log In</button>
              </Link>
              <Link to="/signup" style={{ color: "white" }}>
              <button type="button" className="btn btn-primary mx-2">Sign Up</button>
              </Link>
              </>
            }
          </form>
        </div>
      </div>
    </nav>
  )
}
