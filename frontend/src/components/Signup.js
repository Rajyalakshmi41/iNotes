import React,{useState,useContext} from 'react'
import {useNavigate } from 'react-router-dom'
import context from '../context/notes/NotesContext'
function Signup() {
  const {setAlert}=useContext(context);
  const navigate = useNavigate();
    const host='https://i-notes-server-five.vercel.app'
    const [data,setData]=useState({
        name:"",
        email:"",
        password:""
    })
    const handleChange = (event) => {

        setData({ ...data, [event.target.name]: event.target.value })
    }
    function showAlert(message, type) {

      setAlert({
          msg: message,
          type: type

      })
      setTimeout(() => {
          setAlert(null)
      }, 3000)
  }

    const handleSubmit=async(event)=>{
      event.preventDefault();
        try{
          
          let response=await fetch(`${host}/api/auth/createUser`
        , {
            method: 'POST',
            body:JSON.stringify({
                "name":data.name,
                "email":data.email,
                "password":data.password
            }),
            headers: {
                "content-type": "application/json",
                "auth-token": localStorage.getItem("token")
            }
        })
        let data2=await response.json();
        
          if(response.status===200)
          {
            navigate('/login', {replace: true});
          }
          else if(response.status===400)
          {
            
            if(data2.error===11000)
              {
                showAlert("Email already exist","warning")
              }
              else 
              showAlert(data2.errors[0].msg,"warning")
          }
      }
        catch(error){
            console.log(error)
        }
    }
  return (
    <div className="container my-5">
    <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label  className="form-label">Name</label>
            <input type="name" name="name" required className="form-control" aria-describedby="emailHelp" onChange={handleChange} />
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" required name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleChange} />
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1"  className="form-label" >Password</label>
            <input type="password" name="password" className="form-control" id="exampleInputPassword1" required onChange={handleChange} />

        </div>

        <button type="submit" className="btn btn-primary" >Submit</button>
    </form>
</div>

  )
}

export default Signup