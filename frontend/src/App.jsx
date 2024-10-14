import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from "axios";
import HomePage from "./components/Home";
import Home from "./components/Home";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import { AppContext } from "./context/AppContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("authToken"));
  return (
    <>
      <AppContext.Provider value={isLoggedIn}>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Outlet />
        <Footer />
      </AppContext.Provider>
    </>
  );
}

export default App;
