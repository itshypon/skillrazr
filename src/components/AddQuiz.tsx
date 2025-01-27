import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneIcon from "@mui/icons-material/Done";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AddQuestionForm from "./AddQuestionForm";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { NavLink } from "react-router-dom";
import { QuizPlayGround } from "./QuizDetailsPage";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "./AccordianUtils";
import { getCompletionText, getQuizQuestionsFromString } from "../services";
import { quizString } from "../data/quizStrOpenApi";

export default function NewQuiz() {
  const [quizData, setQuizData] = useState<any>({ questions: [], answers: {} });
  const [inCompleteQuiz, setInCompleteQuiz] = useState(false);
  const [isCopied, setCopied] = useState(false);
  const [editingQuestionId, setEditingQuestionId] = useState("");
  const [expanded, setExpanded] = React.useState<string | false>("");
  const [query, setQuery] = React.useState("");
  const [queryLoading, setQueryLoading] = React.useState(false);

  const submitQuery = async () => {
    setQueryLoading(true);
    try {
      const resp = await getCompletionText(query);

      if (resp.status === 1) {
        const { questions, answers } = getQuizQuestionsFromString(resp.data);
        const _questions = [...quizData.questions, ...questions];
        setQuizData({
          ...quizData,
          questions: _questions,
          answers: { ...quizData.answers, ...answers },
        });
      } else {
        console.log("Sorry, chat api failed add quizes manually!");
      }
      setQueryLoading(false);
    } catch (e) {
      if (process.env.REACT_APP_ENV === "development") {
        const { questions, answers } = getQuizQuestionsFromString(quizString);

        const _questions = [...quizData.questions, ...questions];
        setQuizData({
          ...quizData,
          questions: _questions,
          answers: { ...quizData.answers, ...answers },
        });
      }
      setQueryLoading(false);
      console.log("Sorry, chat api failed add quizes manually!");
    }
  };

  const setOneQuestionData = (newQuestionData: any, questionNumber: any) => {
    if (editingQuestionId) {
      quizData.questions.splice(+questionNumber - 1, 1, newQuestionData);
      setOpen(false);
      setEditingQuestionId("");
      setQuizData({ ...quizData });
    } else {
      const _questions = [...quizData.questions, newQuestionData];
      setQuizData({ ...quizData, questions: _questions });
    }
  };

  const setAnswerData = (answerObj: any) => {
    setQuizData({
      ...quizData,
      answers: { ...quizData.answers, ...answerObj },
    });
  };

  const handleTitleChange = (event: any) => {
    setQuizData({ ...quizData, title: event.target.value });
  };

  const handleDescriptionChange = (event: any) => {
    setQuizData({ ...quizData, description: event.target.value });
  };

  const handleAddQuiz = () => {
    setOpen(true);
  };

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const renderQuestionData = () => {
    const output = JSON.stringify({ ...quizData }, undefined, 4);

    return (
      <>
        <Button
          disabled={quizData.questions.length < 5}
          onClick={() => {
            try {
              if (quizData.questions.length < 5) {
                setInCompleteQuiz(true);
                return;
              } else {
                setInCompleteQuiz(false);
              }
              navigator.clipboard.writeText(output).then(
                function () {
                  setCopied(true);

                  setTimeout(() => {
                    setCopied(false);
                  }, 5000);
                },
                function (err) {
                  console.error("Could not copy text: ", output);
                }
              );
            } catch (e) {
              console.log("clipboard is not available", e);
            }
          }}
          variant="contained"
          color="primary"
        >
          <ContentCopyIcon className="cursor-pointer mr-2" />
          Copy Quiz Data
        </Button>

        {isCopied && (
          <div className="text-xl mt-2">
            <DoneIcon htmlColor="green" />
            Copy successful!
          </div>
        )}
      </>
    );
  };

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const renderHelpAccordian = () => {
    return (
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <div className="text-xl">
            <span>How to add a new quiz? </span>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="p-4">
            <div>
              Thank you for sharing your knowledge. <br />
              Adding a new quiz is very simple. <br /> Follow these 5 simple
              steps to do so.
            </div>
            <ul className="list-decimal p-4">
              <li>
                Add title and description of the quiz e.g title:- SQL and
                description:- SQL commands walkthru
              </li>
              <li>
                Add a question by clicking Add Question button, fill the
                question title, an optional desciption, 4 related options and
                one answer.{" "}
              </li>
              <li>You can edit the quiz questions one by one when needed</li>
              <li>
                You need to add a minimum 5 questions, after that Copy Quiz Data
                button is enabled to get the quiz content
              </li>
              <li>
                Finally to share the quiz, please email the quiz content to{" "}
                <b>
                  <a href="mailto:support@skillrazr.com">
                    support@skillrazr.com
                  </a>
                </b>
              </li>
            </ul>
          </div>
        </AccordionDetails>
      </Accordion>
    );
  };

  return (
    <Grid container className="mt-24 sm:mt-20 p-4">
      <Grid direction="row" container md={12}>
        <Grid item md={6} xs={12}>
          <div className="p-4">
            {/* {!quizData.title ||
                            (!quizData.description && quizData.questions.length === 0 && (
                                <span style={{ fontSize: '14px', color: 'red' }}>
                                    Fill all required fields
                                </span>
                            ))} */}

            {!quizData.title || !quizData.description ? (
              <div className="py-2">Set title and description for the quiz</div>
            ) : null}

            <div className="mb-2">
              <TextField
                className="w-full sm:w-2/3"
                error={inCompleteQuiz && !quizData.title}
                id="title-quiz"
                label="Title of the Quiz"
                placeholder="Short title"
                required
                variant="filled"
                onChange={handleTitleChange}
              />
            </div>
            <div>
              <TextField
                className="w-full sm:w-2/3"
                id="description-quiz"
                label="Description of the Quiz"
                error={inCompleteQuiz && !quizData.description}
                placeholder="What is this quiz about"
                required
                variant="filled"
                onChange={handleDescriptionChange}
              />
            </div>
            <div className="mt-2">
              {quizData.questions.length < 1 ? (
                <div className="py-2">Add your first question!</div>
              ) : null}
              {quizData.questions.length >= 1 &&
              quizData.questions.length < 5 ? (
                <>
                  <div className="text-xl">
                    So far <b>{quizData.questions.length} </b> question
                    {quizData.questions.length === 1 ? "" : "s"} added!
                  </div>
                  <div className="text-xl text-red-500 pb-2">
                    {quizData.questions.length < 5
                      ? `Need at least ${
                          5 - quizData.questions.length
                        } more question(s)!`
                      : "Quiz is ready!"}
                  </div>
                </>
              ) : null}

              <Button
                id="submit"
                style={{ marginRight: "20px" }}
                onClick={handleAddQuiz}
                variant="contained"
                color="primary"
              >
                <AddBoxIcon className="mr-2" />
                Add question
              </Button>

              <div className="text-xl my-4">
                You can use our smart query engine too!{" "}
              </div>
              <div className="my-2">
                <TextField
                  className="w-full sm:w-2/3"
                  error={inCompleteQuiz && !quizData.title}
                  id="title-quiz"
                  label="Query chat engine e.g get a quiz on css position property"
                  placeholder="Enter your query"
                  variant="filled"
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <Button
                disabled={queryLoading}
                onClick={submitQuery}
                variant="contained"
                color="primary"
                className="button !block !mb-6"
              >
                {queryLoading ? "Please wait..." : "Submit Query"}
              </Button>
              {renderQuestionData()}
            </div>
            {quizData.title && quizData.questions.length >= 5 && (
              <div>
                Quiz is ready! <br />
                Click on Copy and use Ctrl + V to email the content to{" "}
                <b>
                  <a href="mailto:support@skillrazr.com">
                    support@skillrazr.com
                  </a>
                </b>
              </div>
            )}
            {open && (
              <AddQuestionForm
                isDialogOpen={open}
                quizData={quizData}
                setOneQuestionData={setOneQuestionData}
                setAnswerData={setAnswerData}
                handleClose={handleClose}
                editingQuestionId={editingQuestionId}
              />
            )}
          </div>
        </Grid>
        <Grid item md={6} xs={12}>
          {quizData.questions.length > 0 && (
            <div className="p-4 text-xl">Quiz Preview Mode</div>
          )}
          <QuizPlayGround
            quizData={quizData}
            editHandler={(questionId: any) => {
              setOpen(true);
              setEditingQuestionId(questionId);
            }}
            previewMode={true}
          />
        </Grid>
      </Grid>
      {
        <div className="w-full text-left pt-6 pl-4">
          <NavLink to="/quizzes">
            <Button variant="outlined">
              <ArrowBackIcon /> <span>Back to Quizes List </span>
            </Button>
            <br />{" "}
            <span className="text-xs"> (Unsaved changes will be lost)</span>
          </NavLink>
        </div>
      }
      <div className="p-4 w-full sm:w-1/2">{renderHelpAccordian()}</div>
    </Grid>
  );
}
