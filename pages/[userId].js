/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import getSingleUser from '../utils/api/userAPI';
import UserProfile from '../components/userProfile';

const UserProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { user_id } = router.query;
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getSingleUser(user_id);
        setUser(userData);
      } catch (err) {
        setError(err.message || 'Error fetching user details');
      }
    };

    if (user_id) {
      fetchUserData();
    }
  }, [user_id]);

  return (
    <div>
      <h1>User Profile Page</h1>
      {error && <div>Error: {error}</div>}
      {user && <UserProfile {...user} />}
      {!error && !user && <div>Loading...</div>}
    </div>
  );
};

export default UserProfilePage;
