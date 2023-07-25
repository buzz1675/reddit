import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { Header } from "./Features/Header/header";
import { Sidebar } from "./Features/Sidebar/sidebar";

function App() {
  return (
    <>
      <Header />
      <Sidebar />
    </>
  );
}

export default App;
