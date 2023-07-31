import React, { useState, useEffect } from "react";
import { fetchSearchPosts } from "../../store/redditSlice";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../../store/redditSlice";
import "./header.css";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { BsSunFill, BsSun, BsMoonFill, BsMoon } from "react-icons/bs";
import { useTheme } from "../../utils/ThemeContext";
import darkmodereddit from '../../img/Reddit-Logo-darkmode.png'

export const Header = () => {
  const [localSearch, setLocalSearch] = useState("");
  const searchTerm = useSelector((state) => state.reddit.searchTerm);
  const dispatch = useDispatch();
  const {lightMode, setLightMode} = useTheme();

  const light = () => {
    if (lightMode === true) {
      return "dark_mode";
    } else {
      return "light_mode";
    }
  };

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

  const lightmodeToggle = () => {
    console.log(lightMode);
    setLightMode((prevLightMode) => !prevLightMode);
  };

  function renderSun() {
    if (lightMode === true) {
      return <BsSun size="20px" className={`symbol ${light()}`}/>;
    } else {
      return <BsSunFill size="20px" className={`symbol ${light()}`}/>;
    }
  }

  function renderMoon() {
    if (lightMode === false) {
      return <BsMoon size="20px" className={`symbol ${light()}`}/>;
    } else {
      return <BsMoonFill size="20px" className={`symbol ${light()}`}/>;
    }
  }

  return (
    <header className={`${light()}`}>
      <img
        src={`${lightMode ? darkmodereddit: 'https://logos-world.net/wp-content/uploads/2020/10/Reddit-Logo.png'}`}
        alt="reddit logo"
        className="logo"
      />
      <form onSubmit={onSearchSubmit}>
        <div className="search-container">
          <input
            placeholder="Search your topic here!"
            type="search"
            onChange={onSearchChange}
            className={`${light()}`}
            value={localSearch}
          />
          <button type="submit" className={`search-button ${light()}`}>
            <AiOutlineSearch size="20px" color="grey" />
          </button>
        </div>
      </form>
      <div className="lightmode_toggle">
        {renderSun()}
        <div
          className={`switch ${lightMode ? "on" : "off"}`}
          onClick={lightmodeToggle}
        >
          <div className="dot"></div>
        </div>
        {renderMoon()}
      </div>
    </header>
  );
};
