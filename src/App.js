import React from "react";
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
import { ThemeProvider } from "./utils/ThemeContext";

function App() {
  return (
    <>
      <ThemeProvider>
      <div className="background">
        <Header />
        <div className="main_container">
          <main className="main_content">
            <div className="home_wrapper">
              <Home />
            </div>
          </main>
          <Sidebar />
        </div>
      </div>
    </ThemeProvider>
    </>
  );
}

export default App;
