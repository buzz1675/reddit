import React, { useState } from "react";
import Card from "../../Components/Card/Card";
import "./post.css";
import shortenNumber from "../../utils/shortenNumber";
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
import Skeleton from "react-loading-skeleton";
import Comment from "../Comment/comment";
import { useTheme } from "../../utils/ThemeContext";

export const PostLoading = () => {

    const { lightMode } = useTheme();


    const light = () => {
        if (lightMode === true) {
          return "dark_mode";
        } else {
          return "light_mode";
        }
      };




  return (
    <div className={`post_container ${light()}`}>
      <div className="votes">
        <button type="button" className={`vote up_vote ${light()}`} aria-label="Up vote">
          <TiArrowUpOutline className="icon-action" />
        </button>
        <div className="pulse-skeleton vote_counter" />
        <button type="button" className={`vote down_vote ${light()}`} aria-label="Down vote">
          <TiArrowDownOutline className="icon-action" />
        </button>
      </div>
      <div className="post_content">
        <h3 className="post-title">
          <div className="pulse-skeleton" />
        </h3>

        <div className="pulse-skeleton tall" />
      </div>
    </div>
  );
};
