import React, { useState, useEffect } from "react";
import { fetchSearchPosts, getSubPosts } from "../../store/redditSlice";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../../store/redditSlice";
import "./header.css";

export const Header = () => {
  const [localSearch, setLocalSearch] = useState("");
  const searchTerm = useSelector((state) => state.reddit.searchTerm);
  const dispatch = useDispatch();

  const onSearchChange = (e) => {
    setLocalSearch(e.target.value);
  };

  useEffect(() => {
    setLocalSearch(searchTerm);
  }, [searchTerm]);

  const onSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(localSearch));
    dispatch(fetchSearchPosts(localSearch));
  };

  return (
    <header>
      <img src="../../img/Reddit-Logo.png" alt="reddit logo" />
      <form onSubmit={onSearchSubmit}>
        <input type="search" onChange={onSearchChange} />
      </form>
    </header>
  );
};
