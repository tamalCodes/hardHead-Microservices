import React, { useEffect, useState } from "react";
import Axios from "axios";
import PostCreate from "./PostCreate";
import CommentsShow from "./CommentsShow";
import CommentsCreate from "./CommentsCreate";

const PostShow = ({ postrefreshToken }) => {
  const [posts, setPosts] = useState([]);
  const [refreshcommentToken, setrefreshcommentToken] = useState(false);
  const fetchPosts = async () => {
    try {
      const response = await Axios.get("http://localhost:5000/posts");
      if (response.status === 200) {
        setPosts(response.data);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, [postrefreshToken]);

  return (
    <>
      <div className="container">
        <h1>Here are your posts:</h1>

        {posts?.map((post) => (
          <div className="card" key={post.id}>
            <div className="card-body">
              <h5 className="card-title">{post.title}</h5>
            </div>

            <CommentsCreate
              postId={post.id}
              refreshcommentToken={refreshcommentToken}
              setrefreshcommentToken={setrefreshcommentToken}
            />

            <CommentsShow
              postId={post.id}
              refreshcommentToken={refreshcommentToken}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default PostShow;
