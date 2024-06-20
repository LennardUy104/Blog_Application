'use client'
import { useState, useEffect } from 'react';
import Pagination from './component/pagination';

export default function Home() {
  const [data, setData] = useState([]);
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
    const res = await fetch(`http://localhost:8000/api/blog?page=${pageNum}`);
    const blogs = await res.json();
    const { data, pagination } = blogs;
    setData(data);
    setPagination(pagination);
  };

  const handlePageChange = (pageNum) => {
    fetchData(pageNum);
  };

  return (
    <main>
      <h1>Blogs</h1>
      <Pagination handlePageChange={handlePageChange} totalPages={pagination.totalPages} />
      <ul>
        {data.map((blog) => (
          <li key={blog.id}>
            <h2>{blog.title}</h2>
            <p>{blog.blog}</p>
            <p>Author: {blog.user.name}</p>
            <p>Created At: {blog.createdAt}</p>
          </li>
        ))}
      </ul>
      <Pagination handlePageChange={handlePageChange} totalPages={pagination.totalPages} />
    </main>
  );
}
