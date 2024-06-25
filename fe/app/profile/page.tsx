'use client'
import React, { useEffect, useState } from 'react'

const page = () => {

    const [user , setUser] = useState('')
    const [blogs , setBlogs] = useState()
    const [countBlog , setCountBlog] = useState(0)

    async function blogUser(id){
      try{
        const res = await fetch(`http://localhost:8000/api/blog/userBlog/${id}` , {
          credentials: `include`,
        })
        if(res.ok){
          const blog = await res.json();
          setBlogs(blog)
          setCountBlog(blog.length)
        }else {
          console.log('Failed to fetch user. Status:', res.status);
        }
      }catch (error) {
        console.error('Failed to fetch user:', error);
      }
    }
    
    async function deleteBlog(id) {
      try {
        const response = await fetch(`http://localhost:8000/api/blog/${id}`, {
          method: 'DELETE',
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        alert('Blog deleted successfully!');
        window.location.reload()
        return data;
      } catch (error) {
        console.error('Error deleting item:', error);
        return false;
      }
    }

    async function getUser(){
        try {
            const res = await fetch('http://localhost:8000/api/user', {
              credentials: 'include',
            });
      
            if (res.ok) {
              const user = await res.json();
              blogUser(user.id)
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
      <br/>
        <h1>Profile</h1>
        <div className='row'>
            <p>Name: {user.name}</p>
        </div>
        <div className='row'>
            <p>email: {user.email}</p>
        </div>
        <p>Blogs made: {countBlog}</p>          
          {countBlog === 0 ? (
            <p>No blogs made</p>
          ) : (
            blogs.map((blog) => {
              return (
                <div key={blog.id} className='d-flex justify-content-center mb-4'>
                  <div className="card w-50">
                    <div className="card-body">
                      <h5 className="card-title">{blog.title}</h5>
                      <p>Author: {blog.user.name}</p>
                      <p>Created At: {new Date(blog.createdAt).toLocaleString()}</p>
                      <p className="card-text">{blog.blog}</p>
                      <button type="button" class="btn btn-danger" onClick={() => deleteBlog(blog.id)}>Delete</button>                
                    </div>
                  </div>
                </div>
              );
            })
          )}
    </div>
 </>
 )
}

export default page