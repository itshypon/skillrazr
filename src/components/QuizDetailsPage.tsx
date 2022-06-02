/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import { FormHelperText, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel, Button, Grid } from '@mui/material';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import QuizIcon from '@mui/icons-material/Quiz';
import { getQuiz, getQuizScrore } from '../uiHelper';
import localQuizes from '../data/quizes';
import { useParams } from 'react-router-dom';
import { State } from '../components/App';

// quizData in the form {answer: {}, questions: []}

function Snack(props: any) {
    const { score, message } = props;
    const [state, setState] = useState<State>({
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
                message={message}
                key={vertical + horizontal}

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


const QuizPlayGround = ({ quizData, submitHandler, previewMode = false }: any) => {
    const [quizesData, setQuizesData] = useState<any>(quizData);
    const [isFetchingData, setFetchingData] = useState<boolean>(false);
    const [isFetchingScore, setFetchingScore] = useState<boolean>(false);

    const { id: quizId } = useParams<string>();

    useEffect(() => {
        const getData = async () => {
            try {
                setFetchingData(true);
                const resp = quizId && await getQuiz(quizId);
                setQuizesData(resp.data);
                setFetchingData(false);
            } catch (e) {
                setFetchingData(false);
                const quiz = localQuizes.find(quiz => quiz.id === quizId) || {};
                setQuizesData(quiz);
            }
        }
        getData();
    }, []);

    const renderMathExpression = (input: string, id: string) => {
        if (Object.keys(questionAnswers).length > 0) {
            return;
        }
        setTimeout(() => {
            let output: any = document.getElementById(id);
            output.innerHTML = '';

            window.MathJax.texReset();
            let options = MathJax.getMetricsFor(output);
            options.display = true;
            MathJax.tex2chtmlPromise(input, options).then(function (node: any) {
                output.appendChild(node);
                MathJax.startup.document.clear();
                MathJax.startup.document.updateDocument();
            }).catch(function (err: any) {
                output.appendChild(document.createElement('pre')).appendChild(document.createTextNode(err.message));
            });
        }, 200);
    };


    const [isQuizStarted, setIsQuizStarted] = useState(previewMode);
    const [questionAnswers, setQuestionValues] = useState<any>({});
    const [unAnswered, setUnAnsweredQuestions] = useState<any[]>([]);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
    const [score, setScore] = useState<number>();

    const handleChange = (event: any) => {
        const questionId = event.target.getAttribute('id');
        setQuestionValues({ ...questionAnswers, [questionId]: event.target.value });
    };

    const _submitHandler = async () => {
        const answeredQuestionIds = Object.keys(questionAnswers);
        const allQuestionIds = quizesData.questions.map((q: any) => q.id);

        const unattended = allQuestionIds.filter((qId: any) => !answeredQuestionIds.includes(qId));
        setUnAnsweredQuestions(unattended);

        if (unattended.length == 0) {
            setIsSubmitDisabled(true);
            setFetchingData(false);

            try {
                setFetchingScore(true);
                const { score } = quizId && await getQuizScrore(quizId, questionAnswers);
                setScore(score);
                setFetchingScore(false);
            } catch (e) {
                setScore(20);
                setFetchingScore(false);
            }
        }
    };

    const timerProps = {
        size: 100,
        strokeWidth: 5
    };
    const renderTime = ({ remainingTime }: any) => {


        if (remainingTime === 0) {
            return <div className="timer flex items-center flex-col text-center font-bold text-[red]">
                <AssignmentLateIcon />
                <span>Too late...</span> <PlayCircleFilledWhiteIcon htmlColor='green' className='cursor-pointer' onClick={() => {
                    window.location.reload();
                }} />
            </div>;

        }

        return (
            <div className="timer text-sm text-center">
                <div className="text">{isQuizStarted && isSubmitDisabled ? 'You took' : 'Remaining'}</div>
                <div className="value font-bold">{isQuizStarted && isSubmitDisabled ? 60 - remainingTime : remainingTime}</div>
                <div className="text">seconds</div>
                {isSubmitDisabled && <PlayCircleFilledWhiteIcon htmlColor='green' className='cursor-pointer' onClick={() => {
                    window.location.reload();
                }} />}
            </div>
        );
    };

    const renderQuestion = (question: any, _id: number) => {
        const isUnanswered = unAnswered.includes(question.id);
        return (
            <FormControl component="fieldset" error={isUnanswered} className="!mt-4">
                {isUnanswered && <FormHelperText>{'Select an answer'}</FormHelperText>}
                <FormLabel component="legend">{`${_id + 1}*`} <span className='font-bold'>  {question.type === 'math' ? 'Evaluate the math expression' : ''} </span> <span id={`output${_id}`}>{question.type === 'math' ? renderMathExpression(question.title, `output${_id}`) : question.title}</span></FormLabel>
                <FormLabel component="legend"><span>{question.description}</span></FormLabel>

                <RadioGroup
                    className='options'
                    aria-label="gender"
                    name="gender1"
                    id={question.id}
                    value={questionAnswers.id}
                    onChange={handleChange}>
                    {question.options.map((option: any) => {
                        return (
                            <FormControlLabel
                                id="option"
                                value={option}
                                control={<Radio disabled={isSubmitDisabled} id={question.id} />}
                                label={option}
                            />
                        );
                    })}
                </RadioGroup>
            </FormControl >
        );
    };

    const onTimeComplete = () => {
        setIsSubmitDisabled(true);
    };

    const getStatusMessage = () => {
        if (score) {
            return `You're score in this quiz is ${score}`;
        }
        else if (isFetchingData) {
            return 'Please wait...'
        } else if (isFetchingScore) {
            return 'Getting your score...';
        }
        return '';
    }

    return (
        <div className="flex flex-col mt-10 p-20 w-full">
            <div id="timer" className="flex justify-center">
                {isQuizStarted && !previewMode && (
                    <CountdownCircleTimer
                        onComplete={onTimeComplete}
                        {...timerProps}
                        isPlaying={isQuizStarted && !isSubmitDisabled}
                        duration={60}
                        colors={['#31db6b', '#85dba3', '#ec856d', '#f03307']}
                        colorsTime={[60, 30, 10, 0]}>
                        {renderTime}
                    </CountdownCircleTimer>
                )}
            </div>
            <div style={{ padding: '20px' }}>
                {
                    <div>
                        {quizesData && quizesData.title && !isQuizStarted && (
                            <div className="flex items-center flex-col">
                                <QuizIcon />
                                <h1 className='text-xl font-bold'>{quizesData.title}</h1>
                                <div className='text-xl'>
                                    {quizesData.description}
                                </div>
                                <div className='text-small mt-8'> Note:- Clicking start will start the quiz. <br /> There'll be total 5 questions and you need to complete all questions before you can submit the quiz. <br />Timer will start immediatedly after you click start. <br />Good luck!</div>
                                <div
                                    style={{
                                        cursor: 'pointer',
                                        padding: '5px',
                                        borderRadius: '5px',
                                        border: '1px solid gray',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-around',
                                        width: '100px',
                                        marginTop: '20px'
                                    }}
                                    id="startbtn"
                                    onClick={() => {
                                        setIsQuizStarted(true);
                                    }}>
                                    <PlayCircleFilledWhiteIcon /> <span>Start</span>
                                </div>
                            </div>
                        )}

                        {isQuizStarted && quizesData.questions.length ? (
                            <Grid>
                                <h1 className='text-xl font-bold'>{quizesData.title}</h1>
                                <div className='text-xl'>
                                    {quizesData.description}
                                </div>

                                <form className="quiz-form flex flex-col justify-start">
                                    {quizesData.questions.map((question: any, _id: number) => {
                                        return renderQuestion(question, _id);
                                    })}
                                    <Button
                                        className='!mt-4 w-[200px]'
                                        color="primary"

                                        variant="contained"
                                        onClick={_submitHandler}
                                        disabled={isSubmitDisabled}>
                                        Submit quiz
                                    </Button>
                                    {/* {isSubmitDisabled && (
                                        <div>*You can submit a quiz only once</div>
                                    )} */}
                                </form>
                            </Grid>
                        ) : null}
                    </div>
                }
            </div>
            {getStatusMessage() && <Snack score={score} message={getStatusMessage()} />}
        </div >
    );
};

export default QuizPlayGround;
