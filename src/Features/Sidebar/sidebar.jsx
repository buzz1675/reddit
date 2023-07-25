import React, { useEffect } from "react";
import {
  selectSelectedSubReddit, setSelectedSubReddits,
} from "../../store/redditSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectSubReddits, fetchSubReddits } from "../../store/subRedditSlice";

export const Sidebar = () => {
  const dispatch = useDispatch();
  const subReddits = useSelector(selectSubReddits);
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
              onClick={() => dispatch(setSelectedSubReddits(subReddit.url))}
            >
              {subReddit.display_name}
            </button>
            <img src={subReddit.icon_img} alt={subReddit.display_name} />
          </li>
        ))}
      </ul>
    </div>
  );
};
