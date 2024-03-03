import {React, useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './routes/ProtectedRoute';  
import './App.css';
import PasswordManager from './pages/PasswordManager';
import GeneratePassword from './pages/GeneratePassword';

const App = () => {

    const [isAuth, setIsAuth] = useState(false);

    const handleEnter = () => {
        setIsAuth(true);
        localStorage.setItem('isAuth', true);
    };

    useEffect(() => {
        const storedIsAuth = localStorage.getItem('isAuth');
        setIsAuth(storedIsAuth === 'true');
    }, []);

    const handleLogOut = () => {
        setIsAuth(false);
        localStorage.removeItem('expiry');
        localStorage.removeItem('token');
        localStorage.setItem('isAuth', false);
    };
    return (
        <Router>
            <div>
                <nav>
                    <Link to="/">Home</Link>
                    {!isAuth ?(
                        <>
                            <Link to="/register">Register</Link>
                            <Link to="/login">Login</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/password-manager">Password Manager</Link>
                            <button onClick={handleLogOut}> Log Out</button>
                        </>
                    )}
                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register handleEnter={handleEnter} />} />
                    <Route path="/login" element={<Login handleEnter={handleEnter}/>} />
                    <Route element={<ProtectedRoute />}>
                        <Route element={<PasswordManager /> } path="/password-manager"/>
                        <Route element={<GeneratePassword />} path="/password-manager/generate-password"/>
                    </Route>
                </Routes>
            </div>
        </Router>
    );
};

export default App;