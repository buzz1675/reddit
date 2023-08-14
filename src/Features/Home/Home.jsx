import React, { useEffect } from "react";
import { fetchSearchPosts } from "../../store/redditSlice";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { fetchComments } from "../../store/redditSlice";
import { Post } from "../Post/Post";
import { fetchSubReddits, selectSubReddits } from "../../store/subRedditSlice";
import "./home.css";
import {PostLoading} from "../Post/postLoading";
import { AnimatedList } from 'react-animated-list';

export const Home = (props) => {
  const dispatch = useDispatch();
  const reddit = useSelector((state) => state.reddit);
  const { isLoading, error, searchTerm, selectedSubReddit } = reddit;
  const posts = useSelector((state) => state.reddit.posts);

  useEffect(() => {
    dispatch(fetchSearchPosts(selectedSubReddit));
  }, [selectedSubReddit]);

  const onToggleComments = (index) => {
    const getComments = (permalink) => {
      dispatch(fetchComments(index, permalink));
    };

    return getComments;
  };

  if (isLoading) {
    return (
      <AnimatedList>
        {" "}
        {Array(Math.floor(Math.random() * 9) + 2).fill(<PostLoading />)}
      </AnimatedList>
    );
  }

  return (
    <>
      {posts.length === 0 ? (
        <div>No posts found.</div>
      ) : (
        posts.map((post, index) => (
          <Post
            post={post}
            key={post.id}
            onToggleComments={onToggleComments(index)}
          />
        ))
      )}
    </>
  );
};
