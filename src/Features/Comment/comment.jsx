import React from "react";
import moment from "moment";

const Comment = (props) => {
  const { comment } = props;

  return (
    <div className="comment">
      <div>
        <p>{comment.author}</p>
        {moment.unix(comment.created_utc).fromNow()}
      </div>
      <p>{comment.body}</p>
    </div>
  );
};

export default Comment;
