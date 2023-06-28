import React from "react";
import Axios from "axios";
import { useState } from "react";

const PostCreate = ({ postrefreshToken, setpostrefreshToken }) => {
  const [post, setpost] = useState({ title: "" });

  const handleChange = (e) => {
    setpost({ title: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.post("http://localhost:5000/posts", post);
      if (response.status === 201) {
        alert("Post created successfully");
        setpostrefreshToken(!postrefreshToken);
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
              Post title
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="title"
              value={post.title}
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

export default PostCreate;
