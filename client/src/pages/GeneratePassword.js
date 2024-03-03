import ReactSwitch from 'react-switch';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function GeneratePassword() {
    let navigate = useNavigate();
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [title, setTitle] = useState("");
    const [username, setUsername] = useState("");
    const [checked, setChecked] = useState(true);
    const [password, setPassword] = useState("");
    const [length, setLength] = useState(10);

    function generatePassword(){
        let newPassword = "";
        const printableMin = 32; // Minimum ASCII value for printable characters
        const printableMax = 126; // Maximum ASCII value for printable characters
    
        for (let i = 0; i < length; i++) {
          let ascii = Math.floor(Math.random() * (printableMax - printableMin + 1)) + printableMin;
          let char = String.fromCharCode(ascii);
          if(!checked){
            if((ascii >= 48 && ascii <=57) || (ascii >= 65 && ascii <= 90) ||  (ascii >= 97 && ascii <= 122)){
              newPassword += char;
            } else {
              i--;
            }
          } else{
            newPassword += char;
          }
    
        }
        return newPassword;
    }

    useEffect(() => {
      setPassword(generatePassword());
    }, []);


    function checkButtonDisabled(){
      if(username && title && password){
        setIsButtonDisabled(false);
      } else {
        setIsButtonDisabled(true);
      }
    }

    
    const handleChange = val => {
      setChecked(val)
    }
     
    const createLogin = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch('http://localhost:3001/passwords/insert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ title, username, password }),
            });
    
            if(response.ok){
                navigate('/password-manager');
            } else {
                console.error('There was an error');
            } 
        } catch (error){
            console.error('There was an error', error);
        }
    }

  
  
    return (
      <div className="generatePasswordPage">
        <div className='inputGp'>
          <label> Title:</label>
          <input placeholder='Title...' 
            onChange={(event) =>{
              setTitle(event.target.value);
              checkButtonDisabled();
            }}
          />
        </div>
        <div className='cpContainer'>
          <div className='inputGp'>
            <label> Username:</label>
            <input placeholder='username...' 
            onChange={(event) =>{
              setUsername(event.target.value);
              checkButtonDisabled();
              }}
            />
          </div>
          <div className='inputGp'>
            <label> Password:</label>
            <input placeholder='password...' 
              onChange={(event) =>{
                setPassword(event.target.value);
                checkButtonDisabled();
                }}
              />
          </div>
        
          <button onClick={() => setPassword(generatePassword())}>Generate Password</button>
          <h1>{password}</h1>
          <div className='div1'>
            <button onClick={() => {
              if(length < 25){
                setLength(length + 1)
              }
            }}>+</button>
            <h2>The current length is : {length}</h2>
            <button onClick={() => {
              if(length > 5){
                setLength(length - 1)
              }
            }}>-</button>
          </div>
          <div className='div2'>
            <h2>Include Symbols :</h2>
            <ReactSwitch
              checked={checked}
              onChange={handleChange}
            />
          </div>
          <button onClick={createLogin} disabled={isButtonDisabled}>Create Login</button>
        </div>
      </div>
      
    );
  }

  export default GeneratePassword;