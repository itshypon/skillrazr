/* eslint-disable no-console */
import { useState, useEffect } from "react";
import {
  FormHelperText,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import QuizIcon from "@mui/icons-material/Quiz";
import {
  getQuiz,
  getQuizScrore,
  getScore,
  shuffleArray,
  renderMathExpression,
} from "../services";
import localQuizes from "../data/quizes";
import { useParams, NavLink } from "react-router-dom";
import { State } from "../components/App";
import singleQuiz from "../scripts/singleQuizData.json";
import confetti from "canvas-confetti";

// quizData in the form {answer: {}, questions: []}

const renderConfetti = () => {
  confetti({
    particleCount: 400,
    spread: 70,
    origin: { y: 0.6 },
  });
};

function Snack(props: any) {
  const { message } = props;
  const [state, setState] = useState<State>({
    open: true,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <div>
      <Snackbar
        className="!top-[110px] sm:!top-[70px] cursor-pointer"
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={message}
        key={vertical + horizontal}
        action={
          <IconButton
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
          </IconButton>
        }
      />
    </div>
  );
}

const RenderQuestion = (props: any) => {
  const {
    question,
    _id,
    unAnswered,
    previewMode,
    editHandler,
    questionAnswers,
    handleChange,
    isSubmitDisabled,
  } = props;
  const isUnanswered = unAnswered.includes(question.id);
  const [optionIndices, setOptionIndices] = useState<any>([]);

  useEffect(() => {
    setOptionIndices(
      previewMode
        ? Array.from(Array(question.options.length).keys())
        : shuffleArray(Array.from(Array(question.options.length).keys()))
    );
  }, [previewMode, question.options.length]);

  return (
    <FormControl
      key={_id}
      component="fieldset"
      error={isUnanswered}
      className={`!mt-12 !border !border-solid ${
        isUnanswered ? "!border-red-600" : "!border-stone-600"
      } !rounded !p-4`}
    >
      {isUnanswered && (
        <FormHelperText className="absolute top-0">
          {"Select an answer"}
        </FormHelperText>
      )}
      <FormLabel component="legend">
        <span className="text-black text-xl">{`${_id + 1}*`}</span>{" "}
        <span className="text-black">
          {question.type === "math" ? "Evaluate the math expression" : ""}{" "}
        </span>{" "}
        <span id={`output${_id}`} className="text-black text-xl">
          {question.type === "math"
            ? Object.keys(questionAnswers).length > 0
              ? undefined
              : renderMathExpression(question.title, `output${_id}`)
            : question.title}
        </span>
      </FormLabel>
      <FormLabel component="legend">
        <span className="text-black">{question.description}</span>
      </FormLabel>
      {previewMode && (
        <EditIcon
          className="cursor-pointer absolute right-2"
          onClick={() => {
            editHandler(question.id);
          }}
        />
      )}
      <RadioGroup
        className="options"
        aria-label="option"
        name="option"
        id={question.id}
        value={questionAnswers.id}
        onChange={handleChange}
      >
        {optionIndices.map((index: number) => {
          return (
            <FormControlLabel
              id="option"
              value={question.options[index]}
              control={<Radio disabled={isSubmitDisabled} id={question.id} />}
              label={
                <span className="text-black">{question.options[index]}</span>
              }
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};

export const QuizPlayGround = ({
  quizData,
  editHandler,
  previewMode = false,
}: any) => {
  const [quizesData, setQuizesData] = useState<any>(quizData);
  const [isFetchingData, setFetchingData] = useState<boolean>(false);
  const [isFetchingScore, setFetchingScore] = useState<boolean>(false);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [allowedTime, setAllowedTime] = useState<number>(60);
  const { id: quizId } = useParams<string>();
  const [submitClicked, setSubmitClicked] = useState<boolean>(false);
  const [learnMoreLinks, setLearnMoreLinks] = useState([]);
  const [questionIndices, setQuestionIndices] = useState<any>([]);

  useEffect(() => {
    setQuizesData(quizData);
    quizData &&
      setQuestionIndices(Array.from(Array(quizData.questions.length).keys()));
  }, [quizData]);

  useEffect(() => {
    const getData = async () => {
      try {
        setFetchingData(true);
        const resp = quizId && (await getQuiz(quizId));
        setQuizesData(resp.data);
        setQuestionIndices(
          shuffleArray(Array.from(Array(resp.data.questions.length).keys()))
        );
        setAllowedTime(resp.data.allowedTime || 120);
        setLearnMoreLinks(resp.data.learnMoreLinks || []);
        setFetchingData(false);
        if (resp.status === 0) {
          setNotFound(true);
        }
      } catch (e) {
        setFetchingData(false);
        if (process.env.REACT_APP_ENV !== "production") {
          setQuizesData(singleQuiz);
          const quiz: any =
            localQuizes.find((quiz) => quiz.id === quizId) || {};
          setQuizesData(quiz);
          setQuestionIndices(
            shuffleArray(Array.from(Array(quiz.questions.length).keys()))
          );
          setLearnMoreLinks(quiz.learnMoreLinks || []);
          setAllowedTime(120);
        }
      }
    };
    quizId && getData();
  }, [quizId]);

  const [isQuizStarted, setIsQuizStarted] = useState(previewMode);
  const [questionAnswers, setQuestionValues] = useState<any>({});
  const [unAnswered, setUnAnsweredQuestions] = useState<any[]>([]);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [score, setScore] = useState<number>();

  const handleChange = (event: any) => {
    const questionId = event.target.getAttribute("id");
    const answers = { ...questionAnswers, [questionId]: event.target.value };
    setQuestionValues(answers);

    setTimeout(() => {
      const answeredQuestionIds = Object.keys(answers);
      const allQuestionIds = quizesData.questions.map((q: any) => q.id);
      const unattended = allQuestionIds.filter(
        (qId: any) => !answeredQuestionIds.includes(qId)
      );
      submitClicked && setUnAnsweredQuestions(unattended);
    }, 0);
  };

  const _submitHandler = async () => {
    const answeredQuestionIds = Object.keys(questionAnswers);
    const allQuestionIds = quizesData.questions.map((q: any) => q.id);

    const unattended = allQuestionIds.filter(
      (qId: any) => !answeredQuestionIds.includes(qId)
    );
    setUnAnsweredQuestions(unattended);
    if (unattended) {
      setSubmitClicked(true);
    }

    if (quizId && unattended.length === 0) {
      setIsSubmitDisabled(true);

      try {
        setFetchingScore(true);
        const {
          data: { score },
        } = await getQuizScrore(quizId, questionAnswers);
        setScore(score);
        if (score === 100) {
          renderConfetti();
        }
        setFetchingScore(false);
      } catch (e) {
        setScore(20);
        setFetchingScore(false);
      }
    } else if (!quizId && unattended.length === 0) {
      const score = getScore(quizesData.answers, questionAnswers);
      setScore(score);
    }
  };

  const timerProps = {
    size: 100,
    strokeWidth: 5,
  };

  const renderTime = ({ remainingTime }: any) => {
    if (remainingTime === 0) {
      return (
        <div className="timer flex items-center flex-col text-center font-bold text-[red]">
          <AssignmentLateIcon />
          <span>Too late...</span>{" "}
          <PlayCircleFilledWhiteIcon
            htmlColor="green"
            className="cursor-pointer"
            onClick={() => {
              window.location.reload();
            }}
          />
        </div>
      );
    }

    return (
      <div className="timer text-sm text-center">
        <div className="text">
          {isQuizStarted && isSubmitDisabled ? "You took" : "Remaining"}
        </div>
        <div className="value font-bold">
          {isQuizStarted && isSubmitDisabled
            ? allowedTime - remainingTime
            : remainingTime}
        </div>
        <div className="text">seconds</div>
        {isSubmitDisabled && (
          <PlayCircleFilledWhiteIcon
            htmlColor="green"
            className="cursor-pointer"
            onClick={() => {
              window.location.reload();
            }}
          />
        )}
      </div>
    );
  };

  const onTimeComplete = () => {
    setIsSubmitDisabled(true);
  };

  const getStatusMessage = () => {
    if (previewMode) {
      return "";
    }
    if (score !== undefined) {
      return score === 100
        ? "Wow, you scored a perfect 100!"
        : `You're score in this quiz is ${score}`;
    } else if (isFetchingScore) {
      return "Getting your score...";
    }
    return "";
  };

  return (
    <div
      className={`flex flex-col w-full ${
        previewMode ? "" : "mt-16 sm:mt-10 py-16  px-2 sm:px-20"
      }`}
    >
      {isQuizStarted && !previewMode && (
        <div id="timer" className="mt-10 sm:mt-0 flex justify-center">
          <CountdownCircleTimer
            onComplete={onTimeComplete}
            {...timerProps}
            isPlaying={isQuizStarted && !isSubmitDisabled}
            duration={allowedTime}
            colors={["#31db6b", "#85dba3", "#ec856d", "#f03307"]}
            colorsTime={[60, 30, 10, 0]}
          >
            {renderTime}
          </CountdownCircleTimer>
        </div>
      )}

      <div style={{ padding: "20px" }}>
        {isFetchingData && (
          <div className="!flex justify-center !w-full">
            <CircularProgress />
          </div>
        )}

        {isQuizStarted && !previewMode && (
          <div className="flex justify-center p-2">
            <a
              className="twitter-logo twitter-share-button"
              href={`https://twitter.com/intent/tweet?text=Quiz Time ${quizesData.title}&url=${window.location.href}`}
            >
              {" "}
              <i></i>
              <span>Tweet</span>
            </a>{" "}
          </div>
        )}
        {quizesData && quizesData.title && !isQuizStarted && (
          <div className="flex items-center flex-col">
            <QuizIcon />

            <h1 className="text-xl mt-2">{quizesData.title}</h1>
            <div className="">{quizesData.description}</div>
            <div
              style={{
                cursor: "pointer",
                padding: "5px",
                borderRadius: "5px",
                border: "1px solid gray",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                width: "100px",
                marginTop: "20px",
              }}
              id="startbtn"
              onClick={() => {
                window.scrollTo(0, 0);
                setIsQuizStarted(true);
              }}
            >
              <PlayCircleFilledWhiteIcon />{" "}
              <span className="text-xl">Start</span>
            </div>
            <div className="text-sm mt-12">
              Note:- Quiz timer will start immediatedly after you click on
              Start. <br /> There'll be a total of{" "}
              <span className="font-black">{quizesData.questions.length}</span>{" "}
              questions and you need to answer all questions to get a score.{" "}
              <br />
              Good luck!
            </div>
          </div>
        )}

        {isQuizStarted && quizesData.questions.length ? (
          <Grid>
            <h1 className="text-xl">{quizesData.title}</h1>
            <div className="">{quizesData.description}</div>

            <form className="quiz-form flex flex-col justify-start">
              {questionIndices.map((index: any, _id: number) => {
                return (
                  <RenderQuestion
                    question={quizesData.questions[index]}
                    _id={_id}
                    unAnswered={unAnswered}
                    previewMode={previewMode}
                    editHandler={editHandler}
                    questionAnswers={questionAnswers}
                    handleChange={handleChange}
                    isSubmitDisabled={isSubmitDisabled}
                  />
                );
              })}
              <Button
                className="!mt-4 w-[200px]"
                color="primary"
                variant="contained"
                onClick={_submitHandler}
                disabled={isSubmitDisabled}
              >
                {previewMode && <FactCheckIcon className="mr-2" />}
                {previewMode ? "Validate Quiz" : "Submit quiz"}
              </Button>
              {isQuizStarted && unAnswered.length > 0 && (
                <FormHelperText className="!text-red-500">
                  Please answer all the questions!
                </FormHelperText>
              )}

              {previewMode && score !== undefined && (
                <div className="text-xl">
                  Your last score <b>{score}</b>
                </div>
              )}
            </form>

            {learnMoreLinks.length > 0 && isSubmitDisabled && (
              <ul>
                <div className="text-xl mt-10">Learn More :- </div>
                {learnMoreLinks.map((link) => {
                  return (
                    <li key={link}>
                      <a href={link} target="_blank" rel="noreferrer">
                        {link}
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </Grid>
        ) : null}

        {notFound && (
          <div className="flex flex-col items-center p-10">
            <span className="text-red-500 text-6xl">
              <span>4</span>
              <span>0</span>
              <span>4</span>
            </span>
            <span className="flex items-center text-xl text-red-500">
              {" "}
              <ErrorOutlineIcon htmlColor="red" />{" "}
              <span className="ml-1">Quiz not found!</span>
            </span>
          </div>
        )}
        {getStatusMessage() && (
          <Snack score={score} message={getStatusMessage()} />
        )}

        {!previewMode && (
          <div className="w-full text-center pt-10 mt-4">
            <NavLink to="/quizzes">
              <Button variant="outlined">
                <ArrowBackIcon /> <span className="">Back to Quizzes List</span>
              </Button>{" "}
              <br />
              {isQuizStarted && (
                <span className="text-xs">(Unsaved changes will be lost)</span>
              )}
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPlayGround;
