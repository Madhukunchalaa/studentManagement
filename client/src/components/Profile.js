import axios from "axios";
import { useState,useEffect, use } from "react";

 export default function Profile() {
  const[user,setUser]=useState('')
  const[message,setMsg]=useState('')
  const[error,setError]=useState('')
  const[email,setEmail]=useState('')
  const[hallticket,setHallticket]=useState('')
  const [branch,setBranch]=useState('')
  useEffect(() => {
      const fetchProfile = async () => {
        const token = localStorage.getItem('token');
  
        if (!token) {
          setError('Token not found. Please log in.');
          return;
        }
  
        try {
          const response = await axios.get('http://localhost:5000/user/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          setUser(response.data.user.name);
          setEmail(response.data.user.email)
          setBranch(response.data.user.branch)
          setHallticket(response.data.user.hallticketNO)
          setMsg(response.data.msg);
        } catch (err) {
          if (err.response && err.response.status === 401) {
            setError('Unauthorized. Please log in again.');
          } else {
            setError('Error fetching profile.');
          }
        }
      };
  
      fetchProfile();
    }, []);




  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Student Profile</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">Name</label>
          <p className="text-gray-800">{user}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Student ID</label>
          <p className="text-gray-800">STU001</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Email</label>
          <p className="text-gray-800">{email}</p>
        </div>
      </div>
    </div>
  );
}
