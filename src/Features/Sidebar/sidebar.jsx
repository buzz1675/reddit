import React, { useEffect } from "react";
import {
  selectSelectedSubReddit,
  setSelectedSubreddit,
} from "../../store/redditSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectSubreddits, fetchSubReddits } from "../../store/subRedditSlice";

export const Sidebar = (props) => {
  const dispatch = useDispatch();
  const subReddits = useSelector(selectSubreddits);
  const selectedSubReddits = useSelector(selectSelectedSubReddit);

  useEffect(() => {
    dispatch(fetchSubReddits());
  }, [dispatch]);

  return (
    <div>
      <h2>SubReddits</h2>
      <ul>
        {subReddits.map((subReddit) => (
          <li>
            <button
              type="button"
              onClick={() => dispatch(setSelectedSubreddit(subReddit.url))}
            >
              {subReddit.display_name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
