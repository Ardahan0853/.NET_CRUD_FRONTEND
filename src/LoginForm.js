import React, { useState } from 'react';
import './LoginForm.css';

const LoginForm = ({isLoggedIn, setIsLoggedIn}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedInSTR, setIsLoggedInSTR] = useState('')


    const handleRegister = () => {
        console.log(isLoggedIn)
        setIsLoggedIn(false)
        if(!isLoggedIn){
            window.location.href = '/register';
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

       

        try {
            
            const response = await fetch('http://localhost:5144/api/Access/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                // Handle successful login (e.g., redirect to dashboard)
                console.log('Login successful:', data.message);
                // Redirect or navigate to dashboard
                window.location.href = '/dashboard'; // Example redirect
            } else {
                // Handle login failure
                
                setIsLoggedInSTR('You do not have account do you want to create one ?')
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className="login-form">
            <form onSubmit={handleSubmit}>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                {isLoggedInSTR && (
                    <div>
                        <p>{isLoggedInSTR}</p><a onClick={handleRegister}>Register</a>
                    </div>
                )}
                <button type="submit">Login</button>

            </form>
        </div>
    );
};

export default LoginForm;
