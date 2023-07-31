import React, { useState } from "react";
import { setSelectedSubReddits } from "../../store/redditSlice";
import { useTheme } from "../../utils/ThemeContext";

export const SubredditItem = ({ subReddit, dispatch, selected, setSelectedSubReddit }) => {
  const [randomColor, setRandomColor] = useState(getRandomColor());
  const { lightMode } = useTheme()


  const light = () => {
    if (lightMode === true) {
      return "dark_mode";
    } else {
      return "light_mode";
    }
  };

  function getRandomColor() {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)})`;
  }

  const holdingImage = "https://cdn.browshot.com/static/images/not-found.png";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <li key={subReddit.url} className="subreddit-item">
      <button
        type="button"
        className={`button ${selected ? 'selected' : ''} ${light()}`}
        onClick={() => {
          dispatch(setSelectedSubReddits(subReddit.url));
          scrollToTop();
          setSelectedSubReddit(subReddit.url);
        }}
      >
        {subReddit.icon_img ? (
          <img
            className="icon"
            src={subReddit.icon_img}
            alt={subReddit.display_name}
            style={{ border: `3px solid ${randomColor}` }}
          />
        ) : (
          <img
            className="icon holding-image"
            src={holdingImage}
            alt="Holding Image"
            style={{ border: `3px solid ${randomColor}` }}
          />
        )}
        <span className={`name ${light()}`}>{subReddit.display_name}</span>
      </button>
    </li>
  );
};
