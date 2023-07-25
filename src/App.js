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

function App() {
  return (
    <>
      <Header />
      <main>      <Home/>
</main>
      <Sidebar />
    </>
  );
}

export default App;
