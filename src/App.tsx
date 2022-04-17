import React from "react";
import "./App.css";

import Navbar from "./Navbar";
import MainSection from "./MainSection";
import Features from "./Features";
import Footer from "./Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Home = () => {
  return (
    <div className="App">
      <Navbar />
      <MainSection />
      <Features />
      <Footer />
    </div>
  );
};

function App(props: any) {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route
          path="/"
          element={<Layout selectedWallet={selectedWallet} {...props} />}
        > */}
        <Route index element={<Home {...props} />} />

        {/* <Route path="/fair_launch" element={<div {...props}>Fair Lunch</div>}></Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
