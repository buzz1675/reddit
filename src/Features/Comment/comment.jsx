import React from "react";
import moment from "moment";
import './comment.css'

const Comment = (props) => {
  const { comment } = props;

  return (
    <div className="comment">
      <div className="comment_data">
        <p>{comment.author}</p>
        {moment.unix(comment.created_utc).fromNow()}
      </div>
      <p className="comment_body">{comment.body}</p>
    </div>
  );
};

export default Comment;
