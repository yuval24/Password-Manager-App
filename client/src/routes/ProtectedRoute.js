import React, { useEffect , useState} from 'react';
import { Outlet, Navigate } from 'react-router-dom';



const ProtectedRoute = () => {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      try{
        const response = await fetch('http://localhost:3001/users/verify', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if(response.ok){
          if(localStorage.getItem('expiry') > Date.now()){
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem('expiry');
            localStorage.removeItem('token');
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
      
    };
    
    verifyToken();
  }, []);

  if(isLoading){
    return <h1>Loading...</h1>;
  }

  return (
    isAuthenticated ? <Outlet/> : <Navigate to="/login"/>
  );
};

 
export default ProtectedRoute;