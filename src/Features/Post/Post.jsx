import React from "react";
import Card from "../../Components/Card/Card";

export const Post = (props) => {
  const { post, onToggleComments } = props;

  return (
    <Card>
      <div className="post-container">
        <h3 className="post-title">{post.title}</h3>

        <div className="post-image-container">
          <img src={post.url} alt="" className="post-image" />
        </div>

        <div className="post-details">
          <span className="author-details">
            <span className="author-username">{post.author}</span>
          </span>
          <span className="post-comments-container">
          </span>
        </div>

      </div>
    </Card>
  );
};
