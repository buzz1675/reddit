import React, { useState } from "react";
import Card from "../../Components/Card/Card";
import "./post.css";
import {
  TiArrowDownOutline,
  TiArrowDownThick,
  TiArrowUpOutline,
  TiArrowUpThick,
  TiMessage,
} from "react-icons/ti";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchSearchPosts, setSearchTerm } from "../../store/redditSlice";
import moment from "moment";
import Comment from "../Comment/comment";
import { useTheme } from "../../utils/ThemeContext";

export const Post = (props) => {
  const { post, onToggleComments } = props;
  const dispatch = useDispatch();
  const [voteType, setVoteType] = useState(0);
  const [postUps, setPostUps] = useState(post.ups);
  const [visibleComments, setVisibleComments] = useState(5);
  const { lightMode } = useTheme();

  const light = () => {
    if (lightMode === true) {
      return "dark_mode";
    } else {
      return "light_mode";
    }
  };

  useEffect(() => {
    setPostUps(post.ups);
    setVoteType(
      post.likes > post.dislikes ? 1 : post.likes < post.dislikes ? -1 : 0
    );
  }, [post]);

  const handleVote = (newValue) => {
    if (newValue === voteType) {
      setVoteType(0);
      setPostUps(post.ups);
    } else if (newValue === -voteType) {
      setVoteType(newValue);
      setPostUps((prevPostUps) => prevPostUps - 2 * voteType);
    } else if (newValue === 1) {
      setVoteType(1);
      setPostUps((prevPostUps) => prevPostUps + 1);
    } else {
      setVoteType(-1);
      setPostUps((prevPostUps) => prevPostUps - 1);
    }
  };

  function renderUpVote() {
    if (voteType === 1) {
      return <TiArrowUpThick />;
    } else {
      return <TiArrowUpOutline />;
    }
  }

  function renderDownVote() {
    if (voteType === -1) {
      return <TiArrowDownThick />;
    } else {
      return <TiArrowDownOutline />;
    }
  }

  const getVoteType = () => {
    if (voteType === 1) {
      return "up_vote";
    }
    if (voteType === -1) {
      return "down_vote";
    } else {
      return "";
    }
  };

  const onAuthorClick = () => {
    dispatch(setSearchTerm(`author:${post.author}`));
    dispatch(fetchSearchPosts(`author:${post.author}`));
  };

  const limitedComments = post.comments.slice(0, visibleComments);
  const handleMoreComments = () => {
    setVisibleComments((prevVisibleComments) => prevVisibleComments + 5);
  };

  const renderComments = () => {
    if (post.errorComments) {
      return (
        <div>
          <h3>Error Loading Comments</h3>
        </div>
      );
    }
    if (post.loadingComments) {
      return (
        <div>
          <div className="pulse-skeleton" width={210} height={118}/>
          <div className="pulse-skeleton" width={210} height={118}/>
          <div className="pulse-skeleton" width={210} height={118}/>
          <div className="pulse-skeleton" width={210} height={118}/>
        </div>
      );
    }
    if (post.showingComments) {
      return (
        <div className="comment_list">
          {limitedComments.map((comment) => (
            <Comment comment={comment} />
          ))}
          {visibleComments < post.comments.length && (
            <button className={`load_comments_button ${light()}`}onClick={handleMoreComments}>Show More Comments</button>
          )}
        </div>
      );
    }
  };

  return (
    <article>
      <Card>
        <div
          className={`post_container ${light()}`}
        >
          <div className="votes">
            <button
              className={`vote up_vote ${voteType === 1 && "active"} ${light()}`}
              onClick={() => handleVote(1)}
            >
              {renderUpVote()}
            </button>
            <p className={`vote_counter ${getVoteType()} ${light()}`}>{postUps}</p>
            <button
              className={`vote down_vote ${voteType === -1 && "active"} ${light()}`}
              onClick={() => handleVote(-1)}
            >
              {renderDownVote()}
            </button>
          </div>
          <div className="post_content">
            <h3 className="post_title">{post.title}</h3>
            <div className="post_image_container">
              <img src={post.url} alt="" className="post_image" />
            </div>

            <div className="post_details">
              <a href="#" onClick={onAuthorClick} className={`author ${light()}`}>
                {post.author}
              </a>

              {moment.unix(post.created_utc).fromNow()}

              <span className="post-comments-container">
                <button
                  type="button"
                  className={`icon-action-button ${
                    post.showingComments && "showing-comments"
                  } ${light()}`}
                  onClick={() => onToggleComments(post.permalink)}
                  aria-label="Show comments"
                >
                  <TiMessage className="icon-action" />
                </button>
                {post.num_comments}
              </span>
            </div>
            {renderComments()}
          </div>
        </div>
      </Card>
    </article>
  );
};
