'use client'
import { useState, useEffect } from 'react';
import Pagination from './component/pagination';
import Link from 'next/link';

export default function Home() {
  const [data, setData] = useState([]);
  const [authorName , setAuthorName] = useState('')
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pageSize: 10,
    totalPages: 1
  });

  useEffect(() => {
    fetchData(pagination.page);
  }, []);

  const fetchData = async (pageNum) => {
    if(authorName != ''){
      const res = await fetch(`http://localhost:8000/api/blog?page=${pageNum}&author=${authorName}`)
      const blogs = await res.json()
      const { data, pagination } = blogs;
      setData(data);
      setPagination(pagination);
    }else {
      const res = await fetch(`http://localhost:8000/api/blog?page=${pageNum}`);
      const blogs = await res.json();
      const { data, pagination } = blogs;
      setData(data);
      setPagination(pagination);
    }
  };

  const handlePageChange = (pageNum) => {
    fetchData(pageNum);
  };

  return (
    <main>
      <div className='row'>
        <div className='col'>
          <Pagination handlePageChange={handlePageChange} totalPages={pagination.totalPages} />
        </div>
      </div>
      <div className='row g-3 d-flex justify-content-center mb-4'>
        <div className="col-auto">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Author" aria-label="Author" onChange={(e) => setAuthorName(e.target.value)} />
            <button type="button" className="btn btn-outline-info" onClick={fetchData}>Search</button>
          </div>
        </div>
        <h1 className='justify-content-center d-flex'>Blogs</h1>
      </div>

      
      {data.map((blog) => {
        const truncate = (input) =>
          input?.length > 20 ? `${input.substring(0, 19)}...` : input;

        return (
          <div className='d-flex justify-content-center mb-4'>
            <div key={blog.id} className="card w-50" >
              <div className="card-body">
                <h5 className="card-title">{blog.title}</h5>
                <p>Author: {blog.user.name}</p>
                <p>Created At: {new Date(blog.createdAt).toLocaleString()}</p>
                <p className="card-text">{truncate(blog.blog)}</p>
                <Link href={`/blog/${blog.id}`} className="btn btn-primary">View</Link>
              </div>
            </div>
          </div>
        );
      })}

      <Pagination handlePageChange={handlePageChange} totalPages={pagination.totalPages} />
    </main>
  );
}
