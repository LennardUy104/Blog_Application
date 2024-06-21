'use client'
import Link from 'next/link'
import React, { useState , useEffect} from 'react'

const navbar = () => {

    const [authUser , setAuthUser] = useState();
    const [isLogin , setIsLogin] = useState(false);

    async function getUser(){
        try {
            const res = await fetch('http://localhost:8000/api/user', {
              credentials: 'include',
            });
      
            if (res.ok) {
              const user = await res.json();
              setAuthUser(user);
              setIsLogin(true);
              console.log('User fetched successfully:', user);
            } else {
              console.log('Failed to fetch user. Status:', res.status);
              setIsLogin(false);
            }
          } catch (error) {
            console.error('Failed to fetch user:', error);
            setIsLogin(false);
          }
    }

    async function logout(){
        try{
            const res = await fetch('http://localhost:8000/api/logout' , {
                credentials: 'include',
                method: 'POST',
            })
            if (res.ok) {
                setAuthUser();
                setIsLogin(false);
                window.location.href = "/users"
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
    <nav class="navbar fixed-top bg-body-tertiary">
        <div class="container-fluid">
            <Link class="navbar-brand" href="/">Blogs</Link>
            {isLogin ? (
                <>
                    <button className="navbar-brand" onClick={logout}>Logout</button>
                    <Link className="navbar-brand" href="/">Profile</Link>
                </>
            ) : (
                <>
                    <Link class="navbar-brand" href="/users">Login</Link>
                </>
            )}
        </div>
    </nav>
 </>
 )
}

export default navbar