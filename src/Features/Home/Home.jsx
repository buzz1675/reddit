import React, { useEffect } from "react";
import { fetchSearchPosts } from "../../store/redditSlice";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { fetchComments, getSubPosts } from "../../store/redditSlice";
import { Post } from "../Post/Post";
import { fetchSubReddits, selectSubReddits } from "../../store/subRedditSlice";

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

  return (
    <>
      {posts.length === 0 ? (
        <div>No posts found.</div>
      ) : (
        posts.map((post, index) => (
          <Post post={post} key={index} onToggleComments={onToggleComments(index)} />
        ))
      )}
    </>
  );
};
