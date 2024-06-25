'use client'
import Link from 'next/link';
import React, { useState } from 'react'

const register = () => {
    const [name , setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);


    async function clickRegister() {
        try {
            const res = await fetch('http://localhost:8000/api/register', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password , name}),
            });
        
            const data = await res.json();
        
            if (res.ok) {
                window.location.href = '/users';
            } else {
                const data = await res.json();
                setError(data.error);
            }
        } catch (error) {
        setError(error.toString());
        }
      }

    return (
        <div>
            {error && (
                <div className="alert alert-danger" role="alert">
                Error: {error}
                </div>
            )}
            <h1>Sign Up</h1>
            <div className="form-floating mb-3">
                <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name"
                    onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="floatingInput">Name</label>
            </div>
            <div className="form-floating mb-3">
                <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
                <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="floatingPassword">Password</label>
            </div>
            <br />
            <div className="row">
                <div className="col-6 d-grid gap-2">
                    <Link type="button" 
                    className="btn btn-secondary" 
                    href="/users">
                        Login
                    </Link>
                </div>
                <div className="col-6 d-grid gap-2">
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => clickRegister()}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default register;