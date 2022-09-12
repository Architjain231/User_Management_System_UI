import React from "react";
import { useState ,useEffect } from "react";
import EditUser from "./EditUser";
const UserList = ({refresh ,setRefresh}) => {

  const USER_API_BASE_URL="http://localhost:8080/api/user";
   const [users, setUsers] = useState(null);
   const [loading, setLoading] = useState(false);
   const [userId, setUserId] = useState(null);
   const [visible, setVisible] = useState(false);

   useEffect(() => {
    
    const fetchData= async ()=>{
      setLoading(true);
      try{
      const response =await fetch(USER_API_BASE_URL,{
        method: "GET",
        headers : {
          "Content-Type":"application/json"
        }
      });
      const user=await response.json();
      setUsers(user);
      setLoading(false);
    }
    catch(error)
    {}
  }
     fetchData();
   }, [refresh])
   
   const deleteUser=(e,id)=>{
    e.preventDefault();
    fetch(USER_API_BASE_URL+"/"+id,{
      method:"DELETE"
    }).then((res)=>
    {
       if(users)
       {
        setUsers((prevElement)=>{
           return prevElement.filter((user)=> user.id !== id);
        });
       }
     
    });
   };

   const editUser=(e,id)=>{
    e.preventDefault();
     setUserId(id);
   }

  return (
    <>
    <div className="mt-5 mx-5 px-5">
      <table className="table">
        <thead className="table-dark">
          <tr >
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email Id</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {!loading &&
         users? users.map((user)=>{
            return(  <tr key={user.id}>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.emailId}</td>
            <td>
           
                <button onClick={(e,id)=>{
                  setVisible(true);
                  editUser(e,user.id)}} className="btn btn-success" style={{cursor:"pointer"}}>Edit</button>
                <button onClick={(e,id)=>deleteUser(e,user.id)} className=" mx-3 btn btn-danger" style={{cursor:"pointer"}}>Delete</button>
            </td>
          </tr>)
          })
          :""
          }
        </tbody>
      </table>
    </div>
    {visible&&<EditUser userId={userId} setVisible={setVisible} setRefresh={setRefresh}/>}
    </>
  );
};

export default UserList;
