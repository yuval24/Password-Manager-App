import {React, useState} from 'react';
import { useNavigate } from 'react-router-dom';


const Login = ({ handleEnter }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState(''); 
    const navigate = useNavigate();
    
    async function handleLogin(e) {
      e.preventDefault();
      try{
        const response = await fetch('http://localhost:3001/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
        if(!response.ok){
          throw new Error('Network response was not ok');
        }
        const body = await response.json();
  
        if(body.success === true && body.expires === '1d'){
          
          const expiry = Date.now() + (24 * 60 * 60 * 1000); // 1 day in milliseconds
          localStorage.setItem('expiry', expiry);
          localStorage.setItem('token', body.token);
          handleEnter();
          navigate('/');
        } else {
          console.error('Registration failed' + body.error);
        }
      } catch (error){
        console.error('There was an error', error);
      }
  
    }
  
    return (
      
        <div className="form-container">
          <h2>Log in</h2>
          <form onSubmit={handleLogin}>
            <div className='form-group'>
              <label>
                Name:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
              </label>
            </div>
            <div className='form-group'>
              <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
              </label>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      
    );
};

export default Login;