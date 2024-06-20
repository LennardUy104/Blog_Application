export default async function Home() {
  const res = await fetch('http://localhost:8000/api/blog');
  const blogs = await res.json();

  const { data, pagination } = blogs;

  return (
    <main>
      <h1>Blogs</h1>
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
      <div>
        <p>Total: {pagination.total}</p>
        <p>Page: {pagination.page}</p>
        <p>Page Size: {pagination.pageSize}</p>
        <p>Total Pages: {pagination.totalPages}</p>
      </div>
    </main>
  );
}