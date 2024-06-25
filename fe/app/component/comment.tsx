import React, { useState } from 'react'

const comment = (props) => {
    const [comment , setComment] = useState('')

 return (
    <div class="card">
          <div class="card-body">
              <div class="mb-3">
                  <label for="exampleFormControlTextarea1" class="form-label">Comments</label>
                  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(e) => setComment(e.target.value)} value={comment}></textarea>
                  <br/>
                  <button type="button" class="btn btn-outline-success" onClick={() => props.onClickPost(comment)}>Post</button>
              </div>
          </div>
        </div>
 )
}

export default comment