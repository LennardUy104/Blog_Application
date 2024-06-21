'use client'
import React, { useState } from 'react'

const CreateBlog = () => {
    const [title , setTitle] = useState('')
    const [blog , setBlog] = useState('')
    const [user , setUser] = useState()

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
    
    async function post(){
        getUser()
        const authorId = user.id 
        const res = await fetch('http://localhost:8000/api/blog' , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ title, blog , authorId}),
              credentials: 'include',
        })
        
        if (res.ok) {
            window.location.href ='/'
          } else {
            // Handle errors
            console.error('Error creating blog post', await res.json());
          }
    }

 return (
    <div className='container'>
    <br/>   
        <div class="card">
            <div class="card-header">
                Create New Blog
            </div>
            <div class="card-body">
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Title</label>
                    <input type="text" class="form-control" id="exampleFormControlInput1" onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Blog</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(e) => setBlog(e.target.value)}></textarea>
                    <br/>
                    <button type="button" class="btn btn-outline-success" onClick={post}>Post</button>
                </div>
            </div>
        </div>
    </div>
 )
}

export default CreateBlog