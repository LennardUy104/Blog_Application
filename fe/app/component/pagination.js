import React from 'react'

const pagination = (props) => {
    const pages = [];
    for (let i = 1; i <= props.totalPages; i++) {
      pages.push(i);
    }
  
    return (
      <div>
        <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
                {pages.map((page) => (
                    <li class="page-item">
                        <button class="page-link" key={page} onClick={() => props.handlePageChange(page)}>
                        {page}
                        </button></li>

                ))}                
            </ul>
        </nav>
      </div>
    );
}

export default pagination