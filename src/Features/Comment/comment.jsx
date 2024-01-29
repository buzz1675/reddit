import React from "react";
import moment from "moment";
import "./comment.css";
import { useTheme } from "../../utils/ThemeContext";

const Comment = (props) => {
  const { comment } = props;
  const { lightMode } = useTheme();

  const light = () => {
    if (lightMode === true) {
      return "dark_mode";
    } else {
      return "light_mode";
    }
  };

  return (
    <div className={`comment ${light()}`}>
      <div className={`comment_data ${light()}`}>
        <p className="comment_author">{comment.author}</p>
        <p className="comment_date">
          {moment.unix(comment.created_utc).fromNow()}
        </p>
      </div>
      <p className={`comment_body ${light()}`}>{comment.body}</p>
    </div>
  );
};

export default Comment;
