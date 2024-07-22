import React,{useContext} from 'react'
import context from '../context/notes/NotesContext'
function Alerts() {
    const {alert}=useContext(context);
    return (
        <div style={{ height: "20px", display: "flex", justifyContent: "center" }} className="container">
            {
                 alert&&
                <div className={`alert alert-${alert.type} alert-dismissible fade show`} style={{ paddingBottom:"40px" }} role="alert">
                    <strong>{alert.msg}</strong>
                </div>
            }

        </div>
    )
}

export default Alerts