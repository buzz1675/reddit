import React, { useState, useEffect } from "react";
import { fetchSearchPosts, getSubPosts } from "../../store/redditSlice";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../../store/redditSlice";
import "./header.css";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";

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
      <img
        src="https://logos-world.net/wp-content/uploads/2020/10/Reddit-Logo.png"
        alt="reddit logo"
        className="logo"
      />
      <form onSubmit={onSearchSubmit}>
        <div className="search-container">
          <input
            placeholder="Search your topic here!"
            type="search"
            onChange={onSearchChange}
          />
          <button type="submit" className="search-button">
            <AiOutlineSearch size="20px" color="grey" />
          </button>
        </div>
      </form>
      <AiOutlineMenu size="40px" color="grey" className="menu_icon" />
    </header>
  );
};
