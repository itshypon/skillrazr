import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";

function App(props: any) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout {...props} />}>
          <Route index element={<HomePage {...props} />} />
          <Route path="/about" element={<AboutPage {...props} />} />
          <Route
            path="/courses"
            element={<div {...props}>Course Details Page</div>}
          />
          <Route
            path="/blogs"
            element={
              <div {...props} className="p-48">
                Blogs are coming soon...
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
