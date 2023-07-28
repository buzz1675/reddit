import React, { useEffect } from "react";
import {
  selectSelectedSubReddit,
  setSelectedSubReddits,
} from "../../store/redditSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectSubReddits, fetchSubReddits } from "../../store/subRedditSlice";
import "./sidebar.css";

export const Sidebar = () => {
  const holdingImage = "https://cdn.browshot.com/static/images/not-found.png";
  const dispatch = useDispatch();
  const subReddits = useSelector(selectSubReddits);
  const selectedSubReddits = useSelector(selectSelectedSubReddit);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
              className="button"
              onClick={() => {
                dispatch(setSelectedSubReddits(subReddit.url));
                scrollToTop();
              }}
            >
              {subReddit.display_name}
            </button>
            {subReddit.icon_img ? (
              <img
                className="icon"
                src={subReddit.icon_img}
                alt={subReddit.display_name}
              />
            ) : (
              <img
                className="icon holding-image"
                src={holdingImage}
                alt="Holding Image"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
