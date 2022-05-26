import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import CourseDetailsPage from './CourseDetailsPage';
import { ParallaxProvider } from "react-scroll-parallax";

function App(props: any) {
  return (
    <ParallaxProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout {...props} />}>
            <Route index element={<HomePage {...props} />} />
            <Route path="/about" element={<AboutPage {...props} />} />
            <Route
              path="/courses/:id"
              element={<CourseDetailsPage {...props} />}
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
    </ParallaxProvider>
  );
}

export default App;
