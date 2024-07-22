import React, { useState, useContext, useEffect, useRef } from 'react'
import NotesContext from '../context/notes/NotesContext'
import LoginUser from './LoginUser'
import FetchNotesData from './FetchNotesData'
import img from '../Iphone-spinner-2.gif'
import Spinner from './Spinner'
export default function Login() {
    const host = 'http://localhost:2000'
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [fetchNotes, setfetchNotes] = useState(null)
    const loginStat = useContext(NotesContext)
    const { userDetails,loader, setUserDetails, setAlert,setLoader} = useContext(NotesContext)
    const ref = useRef(null)
    const { setNotes, notes } = useContext(NotesContext)

    // const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleChange = (event) => {
        setNotes({ ...notes, [event.target.name]: event.target.value })
        console.log(notes)
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

    // fetch notes when notes added 
    async function handlefetch() {
        let handleToken = localStorage.getItem("token")
        console.log(handleToken)
        if (handleToken) {
            let response3 = await fetch(`${host}/api/notes/fetchnotes`
                , {
                    method: 'GET',
                    headers: {
                        "content-type": "application/json",
                        "auth-token": handleToken
                    }
                })
            let data3 = await response3.json()
            if (response3.status === 200) {
                setfetchNotes(data3)
                loginStat.setLoginStat('true')
            }
        }
    }

    useEffect(() => {

        
        async function handlefetch() {
            setLoader(true)
            let handleToken = localStorage.getItem("token")
            // console.log(handleToken)
            if (handleToken) {
                let response3 = await fetch(`${host}/api/notes/fetchnotes`
                    , {
                        method: 'GET',
                        headers: {
                            "content-type": "application/json",
                            "auth-token": handleToken
                        }
                    })
                let data3 = await response3.json()
                if (response3.status === 200) {
                    setfetchNotes(data3)
                    loginStat.setLoginStat(true)
                }
            }
            // console.log(loginStat.userDetails)
            setLoader(false)
        }
        handlefetch()
        
        // eslint-disable-next-line 
    }, [])

    let handleAdd = async () => {
        try{
        if (loginStat.note.title && loginStat.note.description) {
            await fetch(`${host}/api/notes/addnotes`
                , {
                    method: 'POST',
                    body: JSON.stringify({
                        "title": loginStat.note.title,
                        "description": loginStat.note.description,
                        "tag": loginStat.note.tag
                    }),
                    headers: {
                        "content-type": "application/json",
                        "auth-token": localStorage.getItem("token")
                    }
                }
            )
            loginStat.setNote(null)
            handlefetch()
        }
        else
        console.log("empty")
        }
        catch(err){
            console.log(err)
        }
    }

    // update notes
    let HandleUpdate = async (currentNote) => {
        ref.current.click()
        setNotes(currentNote)
    }
    let modifyNote = async () => {
        console.log(notes)
        await fetch(`${host}/api/notes/updatenotes/${notes._id}`
            , {
                method: 'PUT',
                body: JSON.stringify({
                    "title": notes.title,
                    "description": notes.description,
                    "tag": notes.tag
                }),
                headers: {
                    "content-type": "application/json",
                    "auth-token": localStorage.getItem("token")
                }
            }
        )
        ref.current.click()
        handlefetch();
    }

    // delete the note
    let handleDelete = async (currentId) => {
        await fetch(`${host}/api/notes/deletenotes/${currentId}`, {
            method: 'DELETE',
            headers: {
                "content-type": "application/json",
                "auth-token": localStorage.getItem("token")
            }
        })
        handlefetch();
    }

    let handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let response = await fetch(`${host}/api/auth/login`
                , {
                    method: 'POST',
                    body: JSON.stringify({
                        "email": email,
                        "password": password
                    }),
                    headers: {
                        "content-type": "application/json",
                        "auth-token": ""
                    }
                })
            let data = await response.json()
            if (response.status === 200) {
    
                loginStat.setLoginStat(true)
                userDetails.user = data.name
                userDetails.email = data.email
                userDetails.status = true
                setUserDetails({ ...userDetails })
                localStorage.setItem("user", userDetails.user)
                localStorage.setItem("email", userDetails.email)
                localStorage.setItem('status', userDetails.status)
                localStorage.setItem("token", data.token)
                let response2 = await fetch(`${host}/api/notes/fetchnotes`
                    , {
                        method: 'GET',
                        headers: {
                            "content-type": "application/json",
                            "auth-token": data.token
                        }
                    })
                let data2 = await response2.json()
                setfetchNotes(data2)
    
            }
    
            else if (response.status === 400||response.status === 404) {
                showAlert(data.result, "warning")
            }    
        } catch (error) {
            console.log(error);
        }
        

    }
    let emailFun = (event) => {
        setEmail(event.target.value)

    }

    let passwordFun = (event) => {
        setPassword(event.target.value)

    }
    if(loader)
    {
       return <Spinner/>
    }
    else{
    if (!localStorage.getItem("status"))
        return (
            <div className="container my-5">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" required className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={emailFun} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label" >Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" required onChange={passwordFun} />

                    </div>

                    <button type="submit" className="btn btn-primary" >Submit</button>
                </form>
            </div>
        )
    else if (loginStat.loginStat)
        return (<>
            <div className="my-5">

                <LoginUser />
                <div className="container">
                    <button className='btn btn-primary' onClick={handleAdd}>Add note</button>
                </div>
            </div>
            {/* model */}
            {/* <!-- Button trigger modal --> */}
            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="container">
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                                    <input value={notes.title} type="text" className="form-control" name='title' id="exampleFormControlInput1" onChange={handleChange} placeholder="Enter title here" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                                    <textarea value={notes.description} className="form-control" name='description' id="exampleFormControlTextarea1" onChange={handleChange} rows="3"></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Tag</label>
                                    <input value={notes.tag} type="text" className="form-control" name='tag' onChange={handleChange} id="exampleFormControlInput1" />
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={modifyNote}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container my-2">
                <div className="row">
                    {fetchNotes && fetchNotes.map((fetchNotes, index) => {
                        return (
                            <div className="col-md-3" key={fetchNotes._id} id={index}>
                                <FetchNotesData obj={fetchNotes} deleteNote={handleDelete} updateNote={HandleUpdate} />
                            </div>)
                    })}
                </div>
            </div>
        </>
        )
                }
}