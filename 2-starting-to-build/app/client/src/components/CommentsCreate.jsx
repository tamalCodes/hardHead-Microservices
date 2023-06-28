import React, { useState } from "react";
import Axios from "axios";

const CommentsCreate = ({
  postId,
  refreshcommentToken,
  setrefreshcommentToken,
}) => {
  const [comment, setcomment] = useState({ content: "" });

  const handleChange = (e) => {
    setcomment({ content: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.post(
        `http://localhost:8000/posts/${postId}/comments`,
        comment
      );
      if (response.status === 201) {
        alert("Comment created successfully");
        setrefreshcommentToken(!refreshcommentToken);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Write a comment
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="content"
              value={comment.content}
              onChange={handleChange}
            />
          </div>

          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default CommentsCreate;
