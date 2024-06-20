'use client'
import React, { useState } from 'react'

const login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function clickLogin() {
        try {
          const res = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });
      
          const data = await res.json();
      
          if (res.ok) {
            if (data.message === 'success') {
                <div class="alert alert-success" role="alert">
                    Login successful
                </div>
            } else {
                <div class="alert alert-danger" role="alert">
                    Error: {data}
                </div>
            }
          } else {
            <div class="alert alert-danger" role="alert">
                    Error: {data.error}
                </div>
          }
        } catch (error) {
            <div class="alert alert-danger" role="alert">
                Error: {error}
            </div>
        }
      }

    return (
        <div>
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
                    <button type="button" className="btn btn-secondary">
                        Sign up
                    </button>
                </div>
                <div className="col-6 d-grid gap-2">
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => clickLogin()}
                    >
                        Log in
                    </button>
                </div>
            </div>
        </div>
    );
};

export default login;