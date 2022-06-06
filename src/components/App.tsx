import * as React from 'react';
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import CourseDetailsPage from './CourseDetailsPage';
import QuizDetailsPage from './QuizDetailsPage';
import QuizesList from './QuizesListPage';
import NewQuiz from './NewQuiz';
import SummerCoursePage from './EverGreenCoursePage';
import { ParallaxProvider } from "react-scroll-parallax";
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";
import NewspaperIcon from '@mui/icons-material/Newspaper';
import days from '../days';

export interface State extends SnackbarOrigin {
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

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <div>
      <Snackbar className='!top-[110px] sm:!top-[70px] cursor-pointer'
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="Explore our evergreen courses!"
        autoHideDuration={7000}
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

function DaySnack(props: any) {
  const { messages, url, handleClick } = props;
  let navigate = useNavigate();

  const [state, setState] = React.useState<State>({
    open: true,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    handleClick(true);
    setState({ ...state, open: false });
  };

  return (
    <div>
      <Snackbar className='!top-[110px] sm:!top-[70px] cursor-pointer'
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={7000}
        open={open}
        onClose={handleClose}
        message={<div><NewspaperIcon /><span className='ml-2 font-bold inline-block'>Today is :- {messages[0]}</span> <div>{messages[1]}</div></div>}
        key={vertical + horizontal}
        onClick={() => {
          handleClick(true);
          if (url) {
            navigate(`../${url}`, { replace: false });
            handleClose();
          }
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
  const date = new Date();
  const dateMonth = `${date.getDate()}/${date.getMonth() + 1}`;
  const [daySnackSeen, setDaySnackSeen] = React.useState(false);

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
              path="/quizes/:id"
              element={<QuizDetailsPage {...props} />}
            />
            <Route
              path="/blogs"
              element={
                <div {...props} className="p-48">
                  Blogs are coming soon...
                </div>
              }
            />
            <Route
              path="/quizes/new"
              element={
                <NewQuiz />
              }
            />
            <Route
              path="/quizes"
              element={
                <QuizesList {...props} className="p-48" />
              }
            />
          </Route>
        </Routes>
        {days[dateMonth] && !daySnackSeen ? <DaySnack messages={days[dateMonth]} handleClick={setDaySnackSeen} /> : <Snack />}
      </BrowserRouter>
    </ParallaxProvider>
  );
}

export default App;
