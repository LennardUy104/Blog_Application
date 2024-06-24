'use client'
import React, { useEffect, useState } from 'react'

const page = () => {

    const [user , setUser] = useState('')

    async function getUser(){
        try {
            const res = await fetch('http://localhost:8000/api/user', {
              credentials: 'include',
            });
      
            if (res.ok) {
              const user = await res.json();
              setUser(user);
            } else {
              console.log('Failed to fetch user. Status:', res.status);
            }
          } catch (error) {
            console.error('Failed to fetch user:', error);
          }
    }

    useEffect(() => {
        getUser();
      }, []);

 return (
 <>
    <div className='container text-center'>
        <h1>Profile</h1>
        <div className='row'>
            <p>Name: {user.name}</p>
        </div>
        <div className='row'>
            <p>email: {user.email}</p>
        </div>
    </div>
 </>
 )
}

export default page