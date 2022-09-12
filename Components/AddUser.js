import React from "react";
import { useState } from "react";
import UserList from "./UserList";
const AddUser = () => {

    const USER_API_BASE_URL="http://localhost:8080/api/user";
  const [user, setUser] = useState({
      id:"",
    firstName: "",
    lastName: "",
    emailId: "",
  });

  const  [refresh, setRefresh] = useState({
    id:"",
    firstName: "",
    lastName: "",
    emailId: "",
  });

  const handleChange = (e) => {
      const value=e.target.value;
      setUser({...user,[e.target.name]:value});
     
  };
  const handleSubmit = async (e) => {
     e.preventDefault();
    const response=await fetch(USER_API_BASE_URL,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    })
    if(!response.ok)
    {
        console.log("Something went wrong");
    }
    const _user=response.json();
     setRefresh(_user);
    reset(e);
};

  const reset=(e)=>{
      e.preventDefault();
      setUser({
        id:"",
        firstName: "",
        lastName: "",
        emailId: "",
      });
  }

  return (
    <div>
      <div className=" px-5 pt-3">
        <button
          type="button"
          className="btn btn-primary  mx-4 px-4 py-2 my-2"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          Add User
        </button>
      </div>

      <UserList refresh={refresh} setRefresh={setRefresh}/>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Add New User
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={(e)=>{handleSubmit(e)}}>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onChange={(e)=>{handleChange(e);}}
                    value={user.firstName}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onChange={(e)=>{handleChange(e);}}
                    value={user.lastName}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Email Id
                  </label>
                  <input
                    type="email"
                    name="emailId"
                    className="form-control"
                    id="exampleInputPassword1"
                    onChange={(e)=>{handleChange(e);}}
                    value={user.emailId}
                  />
                </div>

                <button type="submit" className="btn btn-success mx-3 px-3">
                  Add
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={()=>{reset();}}
                 >
                  Clear
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
