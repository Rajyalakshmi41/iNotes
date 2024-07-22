import React from 'react'
import { Link } from 'react-router-dom'
export default function Home() {
  const status=localStorage.getItem('status')
  return (
  <>
  
  <div className="d-flex align-items-center justify-content-center my-5">
            <div className="text-center">
            <h1>Designed and Developed by Rajya Lakshmi</h1>
                <h1 className="display-1 fw-bold">iNOTES</h1>
                <p className="fs-3"> <span className="text-danger">Welcomes you</span> here</p>
                <p className="lead">
                    Your Personal note keeper
                  </p>
                  {status?<button>{localStorage.getItem("user")}</button>:
                <Link to={"/login"} className="btn btn-primary">Login</Link>
                  }
            </div>
        </div> 
        </>
  )
}
