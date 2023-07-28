import React, { useEffect } from "react";
import {
  selectSelectedSubReddit, setSelectedSubReddits,
} from "../../store/redditSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectSubReddits, fetchSubReddits } from "../../store/subRedditSlice";
import './sidebar.css'

export const Sidebar = () => {
  const dispatch = useDispatch();
  const subReddits = useSelector(selectSubReddits);
  const selectedSubReddits = useSelector(selectSelectedSubReddit);

  useEffect(() => {
    dispatch(fetchSubReddits());
  }, [dispatch]);

  return (
    <div className="subreddits">
      <h2 className="center">SubReddits</h2>
      <ul className="subreddit-list">
        {subReddits.map((subReddit) => (
          <li key={subReddit.url} className="subreddit-item">
            <button
              type="button"
              onClick={() => dispatch(setSelectedSubReddits(subReddit.url))}
            >
              {subReddit.display_name}
            </button>
            <img className="icon" src={subReddit.icon_img} alt={subReddit.display_name} />
          </li>
        ))}
      </ul>
    </div>
  );
  
};
