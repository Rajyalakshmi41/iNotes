import React, { useState } from 'react'
import NotesContext from './NotesContext'

function NotesState(Props) {
  const [loginStat,setLoginStat]=useState(false)
  const [loader,setLoader]=useState(false)
  const [alert,setAlert]=useState(null)
  const [note,setNote]=useState({
    _id:"",
    title:"",
    description:"",
    tag:""
  })
  const [userDetails,setUserDetails]=useState({user:"",email:"",status:false})
  // const [title,setTitle]=useState(null)
  // const [description,setDescription]=useState(null)
  // const [tag,setTag]=useState(null)
  return (
    <NotesContext.Provider value={{alert,loader,loginStat,note,userDetails,setLoader,setAlert,setLoginStat,setNote,setUserDetails}}>
        {Props.children}
    </NotesContext.Provider>
  )
}

export default NotesState