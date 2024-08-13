import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './../assets/css/login.css'; 
import Navbar from '../components/AppAppBar';
import { useAuth } from './Authorization'; // Import useAuth hook

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth(); // Access the login function from AuthContext

    useEffect(() => {
        const slides = document.querySelectorAll('.slide');
        let currentIndex = 0;

        const showSlide = (index) => {
            slides.forEach((slide, i) => {
                slide.style.opacity = i === index ? '1' : '0';
            });
        };

        const nextSlide = () => {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        };

        showSlide(currentIndex);
        const interval = setInterval(nextSlide, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval); // Clean up interval on component unmount
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (username === 'password' && password === 'admin') {
            login(); // Set authentication state to true
            navigate('/dashboard'); // Redirect to dashboard
        } else {
            alert('Invalid username or password');
        }
    };

    return (
        <div className='container'>
            <Navbar showLogout={false} /> {/* Hide logout button on login page */}
            <div className='slideshow-container'>
                <div className='slide fade'>
                    <img src={require("../../src/logo.svg")} alt="Slide 1" />
                </div>
                <div className='slide fade'>
                    <img src={require("../../src/logo.svg")} alt="Slide 2" />
                </div>
                <div className='slide fade'>
                    <img src={require("../../src/logo.svg")} alt="Slide 3" />
                </div>
                {/* Add more slides as needed */}
            </div>
            <div className='login-container'>
                <h2>Login Page</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='User Name'
                        required
                    />
                    <br />
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Password'
                        required
                    />
                    <br />
                    <input
                        type="submit"
                        value='Submit'
                    />
                </form>
            </div>
        </div>
    );
}

export default Login;
