'use client'
import React, { useEffect, useState } from 'react'
import UpdateForm from '../component/updateForm'
import { title } from 'process'

const page = () => {

    const [user , setUser] = useState('')
    const [blogs , setBlogs] = useState()
    const [countBlog , setCountBlog] = useState(0)
    const [updateUserMode , setUpdateUserMode] = useState(false)
    const [updateBlogId , setUpdateBlogId] = useState(0)
    const [updateTitle , setUpdateTitle] = useState("")
    const [updateBlogContent , setUpdateBlogContent] = useState("")


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

    async function update(updatedData) {
      try{
        const res = await fetch(`http://localhost:8000/api/user/users/${user.id}`, {
          credentials: `include`, 
          method: `PUT`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        });
        if(res.ok){
          setUpdateUserMode(false)
          window.location.reload()
        }else {
          console.log("EROORRR");
          
        }
       
      }catch(e){
        console.log("eroorrr" , e);
        
      }
    }

    function UpdateBtn(){
      if(updateUserMode){
        setUpdateUserMode(false)
      }else{
        setUpdateUserMode(true)
      }
    }

    function UpdateBlogBtn(id , title , blog){
      if(id == 0){
        setUpdateBlogId(0)
      }else{
        setUpdateBlogId(id)
        setUpdateTitle(title)
        setUpdateBlogContent(blog)
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

    async function updateBlog() {
      try{
        const res = await fetch(`http://localhost:8000/api/blog/${updateBlogId}`, {
          credentials: `include` , 
          method: `PATCH`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify( {title: updateTitle , blog : updateBlogContent}),
        })

        if(res.ok){
          UpdateBlogBtn(0 , "" , "")
          window.location.reload()
        } else {
          console.log("Erroor");
          
        }
      }catch(e){
        console.log("Error" , e);
        
      }
    }

    useEffect(() => {
        getUser();
      }, []);

 return (
 <>
    <div className='container text-center'>
      <br/>
      <div className='d-flex justify-content-center mb-4'>
        <div className="card w-50">
          <div className="card-body">
            {!updateUserMode ? (
              <>
                <h1>Profile</h1>
                <div className='row'>
                    <p>Name: {user.name}</p>
                </div>
                <div className='row'>
                    <p>email: {user.email}</p>
                </div>
                <button type='button' className='btn btn-info' onClick={UpdateBtn}>Update</button>
              </>
            ) : (
              <UpdateForm
                initialData={{ name: user.name , email: user.email }}
                onSubmit={update}
              />
            )}
          </div>
        </div>
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
                  {updateBlogId != blog.id ? (
                    <h5 className="card-title">{blog.title}</h5>
                  ) : (
                    <input type="text" class="form-control" id="exampleFormControlInput1" value={updateTitle} onChange={(e) => setUpdateTitle(e.target.value) }/>
                  )}
                  <p>Author: {blog.user.name}</p>
                  <p>Created At: {new Date(blog.createdAt).toLocaleString()}</p>
                  {updateBlogId != blog.id ? (
                    <p className="card-text">{blog.blog}</p>
                  ) : (
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={updateBlogContent} onChange={(e) => setUpdateBlogContent(e.target.value) }/>
                  )}
                  <button type="button" className="btn btn-danger" onClick={() => deleteBlog(blog.id)}>Delete</button> 
                  {updateBlogId != blog.id? (
                    <button type="button" className="btn btn-info" onClick={() => UpdateBlogBtn(blog.id , blog.title , blog.blog)}>Update</button>                
                  ) : 
                    <button type="button" className="btn btn-info" onClick={() => updateBlog()}>Save</button>                
                  }
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