import React, { useEffect ,useState } from 'react'
import Hero from '../Components/Hero/Hero'
import axios from 'axios';  //Fix: Import axios


const Dashboard = () => {
  const [userData, setUserData] = useState("");

  useEffect(()=>{
    fetchUserDetails()
  },[]);
  const fetchUserDetails = async () =>{
    try {
      const token = localStorage.getItem("token");

      console.log("Token before sending request:", token);


      if (!token) {
        console.warn("No token found! User might not be logged in.");
        return; // Stop function execution if no token is found
      }

      const response = await axios.get("http://localhost:3001/api/auth/getUserData",{
          headers:{
            Authorization:`Bearer ${token}`,
          },
        });

      console.log("Response Data", response.data);
      if(response.data.success){
        console.log("User Data", response.data);
        setUserData(response.data.data)
        let userInfo = {
          isLoggedIn:true,
          userData:response.data
        }
        localStorage.setItem('userData', JSON.stringify(userInfo));
      }else{
        console.log(response.data.message || "Failed to fetch User Details");
      }
    } catch (error) {
      console.error("Error fetching user Details:", error);
      console.log(error.response?.data?.message || "An error occurred");
    }
  };
  return (
    <div>
    {  <h1 className='Identifier'> {/* Name : {userData.name} */} <br/>{userData.email} </h1>}
      <Hero/>
    </div>
  )
}

export default Dashboard
