import React, { useState } from "react";
import PostCreate from "./components/PostCreate";
import PostShow from "./components/PostShow";

const App = () => {
  const [postrefreshToken, setpostrefreshToken] = useState(false);
  return (
    <>
      <div className="container">
        <h1>Create a post</h1>
        <PostCreate
          postrefreshToken={postrefreshToken}
          setpostrefreshToken={setpostrefreshToken}
        />
        <br />
        <br />
        <PostShow postrefreshToken={postrefreshToken} />
      </div>
    </>
  );
};

export default App;
