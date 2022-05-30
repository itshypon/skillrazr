import * as React from 'react';
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import CourseDetailsPage from './CourseDetailsPage';
import SummerCoursePage from './EverGreenCoursePage';
import { ParallaxProvider } from "react-scroll-parallax";
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";

interface State extends SnackbarOrigin {
  open: boolean;
}

function Snack() {
  let navigate = useNavigate();

  const [state, setState] = React.useState<State>({
    open: true,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState: SnackbarOrigin) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <div>
      <Snackbar className='!top-[110px] sm:!top-[70px] cursor-pointer'
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="Get the basics right, explore our evergreen courses!"
        key={vertical + horizontal}
        onClick={() => {
          navigate("../evergreen_courses", { replace: false });
          handleClose();
        }}
        action={<IconButton
          aria-label="close"
          color="inherit"
          sx={{ p: 0.5 }}
          onClick={(e) => {
            handleClose();
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <CloseIcon />
        </IconButton>}
      />
    </div >
  );
}

function App(props: any) {
  return (
    <ParallaxProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout {...props} />}>
            <Route index element={<HomePage {...props} />} />
            <Route path="/about" element={<AboutPage {...props} />} />
            <Route
              path="/evergreen_courses"
              element={<SummerCoursePage {...props} />}
            />
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
        <Snack />
      </BrowserRouter>
    </ParallaxProvider>
  );
}

export default App;
