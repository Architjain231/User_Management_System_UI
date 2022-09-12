import React from "react";
import { useState ,useEffect } from "react";

const EditUser = ({userId, setRefresh , setVisible}) => {

    const USER_API_BASE_URL="http://localhost:8080/api/user";
  const [user, setUser] = useState({
      id:"",
    firstName: "",
    lastName: "",
    emailId: "",
  });


 useEffect(() => {
  const fetchData=async ()=>{
    try{
    const response= await fetch(USER_API_BASE_URL+"/"+userId,{
        method:"GET" ,
        headers:{
            "Content-Type":"application/json"
        }
     });
     const _user=await response.json();
     setUser(_user);
    }
    catch(error)
    {
        console.log(error);
    }
  }
   fetchData();
   document.getElementById("hasToClick").click();
 }, [userId])
 
  const handleChange = (e) => {
      const value=e.target.value;
      setUser({...user,[e.target.name]:value});
     
  };
  const handleSubmit = async (e) => {
     e.preventDefault();
    const response=await fetch(USER_API_BASE_URL+"/"+userId,{
        method:"PUT",
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
          id="hasToClick"
          style={{display:"none"}}
        >
          Add User
        </button>
      </div>

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
                Edit User
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={()=>{setVisible(false);}}
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
                  Update
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

export default EditUser;
