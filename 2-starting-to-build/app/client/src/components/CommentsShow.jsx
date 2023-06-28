import React, { useEffect, useState } from "react";
import Axios from "axios";

const CommentsShow = ({ postId, refreshcommentToken }) => {
  const [comments, setcomments] = useState([]);

  const fetchComments = async () => {
    try {
      const response = await Axios.get(
        `http://localhost:8000/posts/${postId}/comments`
      );
      if (response.status === 200) {
        setcomments(response.data);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    fetchComments();
  }, [refreshcommentToken]);

  return (
    <>
      <div className="container">
        <div>
          <strong>Comments for this post:</strong>
        </div>
        {comments?.map((comment) => {
          return <p key={comment.id}>{comment.content}</p>;
        })}
      </div>
    </>
  );
};

export default CommentsShow;
