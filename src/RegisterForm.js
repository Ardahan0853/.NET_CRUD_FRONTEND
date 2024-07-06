import React, { useState } from 'react';
import './RegisterForm.css';


const RegisterForm = ({ isLoggedIn, setIsLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegisteredSTR, setIsRegisteredSTR] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5144/api/Register/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Registration successful:', data.message);
                setIsLoggedIn = true;
                setIsRegisteredSTR('Registration complete. Redirecting...')
                setTimeout(() => {
                    
                    window.location.href = '/'; 
                }, 3000);

                
            } else {
                setIsRegisteredSTR('Registration failed. Please try again.');
                console.error('Registration failed');
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    return (
        <div className="register-form">
            <form onSubmit={handleSubmit}>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                {isRegisteredSTR && <div><p>{isRegisteredSTR}</p></div>}
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterForm;