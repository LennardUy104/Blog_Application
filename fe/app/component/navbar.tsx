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
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <Link class="navbar-brand" href="/">Blogs App</Link>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <Link class="nav-link active" aria-current="page" href="/">Home</Link>
                    </li>
                    {isLogin && (
                        <li class="nav-item">
                            <Link class="nav-link active" aria-current="page" href="/blog/createBlog">Create Blog</Link>
                        </li>
                    )}
                </ul>
                {isLogin ? (
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Welcome {authUser.name}
                        </button>
                        <ul class="dropdown-menu">
                        <li><a class="dropdown-item"onClick={logout}>Logout</a></li>
                        <li><Link class="dropdown-item"href="/profile">Profile</Link></li>
                        </ul>
                    </div>
                ) : (
                    <Link class="navbar-brand" href="/users">Login</Link>            
                )}
            </div>
        </div>
    </nav>
 </>
 )
}

export default navbar