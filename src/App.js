import React, {useContext} from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { Header } from "./Features/Header/header";
import { Sidebar } from "./Features/Sidebar/sidebar";
import { Home } from "./Features/Home/Home";
import "./App.css";
import { useTheme } from "./utils/ThemeContext";

function App() {
  const { lightMode } = useTheme();

  const light = () => {
    if (lightMode === true) {
      return "dark_mode";
    } else {
      return "light_mode";
    }
  };
  
  return (
    <>
      <div className={`background ${light()}`}>
        <Header />
        <div className="main_container">
          <main className="main_content">
            <div className="home_wrapper">
              <Home />
            </div>
          </main>
          <Sidebar/>
        </div>
      </div>
    </>
  );
}

export default App;
