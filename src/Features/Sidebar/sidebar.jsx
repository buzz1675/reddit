import React, { useEffect, useState } from "react";
import { setSelectedSubReddits } from "../../store/redditSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectSubReddits, fetchSubReddits } from "../../store/subRedditSlice";
import "./sidebar.css";
import { SubredditItem } from "../subreddits/subreddits";
import { useTheme } from "../../utils/ThemeContext";

export const Sidebar = () => {
  const [selectedSubReddit, setSelectedSubReddit] = useState(null);
  const holdingImage = "https://cdn.browshot.com/static/images/not-found.png";
  const dispatch = useDispatch();
  const subReddits = useSelector(selectSubReddits);
  const { lightMode } = useTheme();


  useEffect(() => {
    dispatch(fetchSubReddits());
  }, [dispatch]);

  return (
    <div className="subreddits">
      <h2 className="center">SubReddits</h2>
      <ul className="subreddit-list">
        {subReddits.map((subReddit) => (
          <SubredditItem
            key={subReddit.url}
            subReddit={subReddit}
            dispatch={dispatch}
            selected={subReddit.url === selectedSubReddit}
            setSelectedSubReddit={setSelectedSubReddit}
          />
        ))}
      </ul>
    </div>
  );
};
