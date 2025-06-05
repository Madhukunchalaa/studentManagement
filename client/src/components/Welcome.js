// Profile.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import PunchInOut from './PunchInOut';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

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

        setUser(response.data.user);
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
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Profile</h1>
      <PunchInOut/>

      {error && <p className="text-red-500">{error}</p>}
      {msg && <p className="text-green-700">{msg}</p>}

      {user && (
        <div className="bg-white shadow rounded p-4 mt-4">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Hallticket Number:</strong> {user.hallticketNo}</p>
          <p><strong>Branch:</strong> {user.branch}</p>
          <p><strong>Year:</strong> {user.year}</p>
        </div>
      )}
    </div>
  );
}
