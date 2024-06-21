'use client'

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Comment from '@/app/component/comment';

export default function BlogPage({ params }) {
  const { id } = params;
  const [authUser, setAuthUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    getUser();
    fetchBlog();
  }, []);

  function getUser() {
    fetch('http://localhost:8000/api/user', {
      credentials: 'include',
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          console.log('Failed to fetch user. Status:', res.status);
          setIsLogin(false);
          throw new Error('Failed to fetch user');
        }
      })
      .then(user => {
        setAuthUser(user);
        setIsLogin(true);
      })
      .catch(error => {
        console.error('Failed to fetch user:', error);
        setIsLogin(false);
      });
  }

  function fetchBlog() {
    fetch(`http://localhost:8000/api/blog/${id}`, {
      cache: 'no-store',
    })
      .then(res => {
        if (!res.ok) {
          notFound();
        }
        return res.json();
      })
      .then(blogData => {
        setBlog(blogData);
      })
      .catch(error => {
        console.error('Failed to fetch blog:', error);
      });
  }

  function post(comment) {
    if (!authUser) return;
    const authorId = authUser.id;
    fetch('http://localhost:8000/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, authorId, comment }),
      credentials: 'include',
    })
      .then(res => {
        if (res.ok) {
          window.location.reload();
        } else {
          return res.json().then(error => {
            throw new Error('Error creating blog post: ' + JSON.stringify(error));
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  if (!blog) return <div>Loading...</div>;

  return (
    <>
      <br/>
      <div className='row g-3 d-flex justify-content-center mb-4'>
        <div className="col-auto">
          <Link href={'/'} type="button" className="btn btn-outline-secondary">Back</Link>       
        </div>
      </div>
      
      <div className='d-flex justify-content-center mb-4'>
        <div key={blog.id} className="card w-50">
          <div className="card-body">
            <h5 className="card-title">{blog.title}</h5>
            <p>Author: {blog.user.name}</p>
            <p>Created At: {new Date(blog.createdAt).toLocaleString()}</p>
            <p className="card-text">{blog.blog}</p>
          </div>
        </div>
      </div>
      <div className='row d-flex justify-content-center mb-4'>
        <div className='col-auto'>
          <h4>Comments:</h4>
        </div>
      </div>
      {blog.comment.map((comment) => (
        <div key={comment.id} className='d-flex justify-content-center mb-4'>
          <div className="card w-50">
            <div className="card-body">
              <p>Author: {comment.user.name}</p>
              <p>Created At: {new Date(comment.createdAt).toLocaleString()}</p>
              <p className="card-text">{comment.comment}</p>
            </div>
          </div>
        </div>
      ))}
      {isLogin && (
        <div className='row d-flex justify-content-center mb-4'>
          <div className='col-6'>
            <Comment onClickPost={post}/>
          </div>
        </div>
      )}
    </>
  );
}