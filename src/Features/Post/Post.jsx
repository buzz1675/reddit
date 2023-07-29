import React, { useState } from "react";
import Card from "../../Components/Card/Card";
import "./post.css";
import shortenNumber from "../../utils/shortenNumber";
import {
  TiArrowDownOutline,
  TiArrowDownThick,
  TiArrowUpOutline,
  TiArrowUpThick,
} from "react-icons/ti";
import { useEffect } from "react";

export const Post = (props) => {
  const { post, onToggleComments } = props;

  const [voteType, setVoteType] = useState(0);
  const [postUps, setPostUps] = useState(post.ups);

  useEffect(() => {
    // Update the vote count and type when the 'post' prop changes
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

  return (
    <article>
      <Card>
        <div className="post_container">
          <div className="votes">
            <button
              className={`vote up_vote ${voteType === 1 && "active"}`}
              onClick={() => handleVote(1)}
            >
              {renderUpVote()}
            </button>
            <p className={`vote_counter ${getVoteType()}`}>{postUps}</p>
            <button
              className={`vote down_vote ${voteType === -1 && "active"}`}
              onClick={() => handleVote(-1)}
            >
              {renderDownVote()}
            </button>
          </div>
          <div className="post_content">
            <h3 className="post-title">{post.title}</h3>
            <div className="post-image-container">
              <img src={post.url} alt="" className="post-image" />
            </div>

            <div className="post-details">
              <span className="author-details">
                <span className="author-username">{post.author}</span>
              </span>
              <span className="post-comments-container"></span>
            </div>
          </div>
        </div>
      </Card>
    </article>
  );
};
