import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    // States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const {login, user} = useAuth();
    const navigate = useNavigate();
    
    // Check user
    useEffect(() => {
        if(user) {
            navigate("/");
        }
    }, [user]);

    // Handle form submit
    const handleSubmit = async ( e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        try {

            await login({email, password});
            navigate("/");

        } catch (error) {
            setError("Inloggningen misslyckades, kontrollera e-post och lösenord");
        }
    }


    return (
        <div className='login-container'>
            <form onSubmit={handleSubmit}>

                {error && (
                    <p className='erroMsg'>
                        {error}
                    </p>
                )}
                <label htmlFor="email">E-postadress</label>
                <input 
                    type="email"
                    id='email'
                    required 
                    value = {email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="password">Lösenord</label>
                <input 
                    type="password" 
                    id='password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type='submit'>Logga in</button>
            </form>
        </div>
    )
}

export default LoginPage