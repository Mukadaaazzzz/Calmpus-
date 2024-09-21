import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) {
        console.error('Error fetching user:', error);
      }

      setUser(user);
      setLoading(false);
    };

    fetchUser();
  }, []);

  // If loading, return a loading state or a spinner
  if (loading) {
    return <div>Loading...</div>;
  }

  // If no user is present, redirect to sign-in
  if (!user) {
    return <Navigate to="/signin" />;
  }

  // Render the protected route if user is present
  return children;
};

export default ProtectedRoute;
