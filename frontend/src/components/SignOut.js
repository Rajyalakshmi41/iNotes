import React,{useContext,useEffect} from 'react'
import Home from './Home'
import context from '../context/notes/NotesContext'
function SignOut() {
    const {setLoginStat,loginStat}=useContext(context)
    useEffect(()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("email")
    localStorage.removeItem("status")
    setLoginStat(false)
    },[])
    

  return (
    <div>
        <Home/>
    </div>
  )
}

export default SignOut