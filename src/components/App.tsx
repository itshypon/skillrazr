import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./HomePage";

function App(props: any) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout {...props} />}>
          <Route index element={<HomePage {...props} />} />
          <Route path="/about" element={<div {...props}>About Page</div>} />
          <Route path="/courses" element={<div {...props}>Courses Page</div>} />
          <Route
            path="/blogs"
            element={
              <div {...props} style={{ paddingTop: "500px" }}>
                Blog Page
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
