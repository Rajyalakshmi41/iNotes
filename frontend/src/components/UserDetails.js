import React,{useContext} from 'react'
import context from '../context/notes/NotesContext'
function UserDetails() {
    const {loginStat,userDetails}=useContext(context)
    console.log(loginStat,userDetails)
    if(loginStat){
  return (
    <div>{userDetails.user}</div>
  )
    }
}

export default UserDetails