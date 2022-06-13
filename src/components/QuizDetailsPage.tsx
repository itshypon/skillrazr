/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import { FormHelperText, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel, Button, Grid, CircularProgress } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import QuizIcon from '@mui/icons-material/Quiz';
import { getQuiz, getQuizScrore, getScore } from '../uiHelper';
import localQuizes from '../data/quizes';
import { useParams, NavLink } from 'react-router-dom';
import { State } from '../components/App';
import singleQuiz from '../scripts/singleQuizData.json';
import confetti from 'canvas-confetti';

// quizData in the form {answer: {}, questions: []}

const renderConfetti = () => {
    confetti({
        particleCount: 400,
        spread: 70,
        origin: { y: 0.6 }
    })
}

function Snack(props: any) {
    const { message } = props;
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

export const QuizPlayGround = ({ quizData, editHandler, previewMode = false }: any) => {
    const [quizesData, setQuizesData] = useState<any>(quizData);
    const [isFetchingData, setFetchingData] = useState<boolean>(false);
    const [isFetchingScore, setFetchingScore] = useState<boolean>(false);
    const [notFound, setNotFound] = useState<boolean>(false);
    const [allowedTime, setAllowedTime] = useState<number>(60);
    const { id: quizId } = useParams<string>();
    const [submitClicked, setSubmitClicked] = useState<boolean>(false);
    const [learnMoreLinks, setLearnMoreLinks] = useState([]);

    useEffect(() => {
        setQuizesData(quizData);
    }, [quizData]);


    useEffect(() => {
        const getData = async () => {
            try {
                setFetchingData(true);
                const resp = quizId && await getQuiz(quizId);
                setQuizesData(resp.data);
                setAllowedTime(resp.data.allowedTime || 120);
                setLearnMoreLinks(resp.data.learnMoreLinks || []);
                setFetchingData(false);
                if (resp.status === 0) {
                    setNotFound(true);
                }
            } catch (e) {
                setFetchingData(false);
                if (process.env.REACT_APP_ENV !== 'production') {
                    setQuizesData(singleQuiz);
                    const quiz: any = localQuizes.find(quiz => quiz.id === quizId) || {};
                    setQuizesData(quiz);
                    setLearnMoreLinks(quiz.learnMoreLinks || []);
                    setAllowedTime(120);
                }
            }
        }
        quizId && getData();
    }, [quizId]);

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
        const answers = { ...questionAnswers, [questionId]: event.target.value };
        setQuestionValues(answers);

        setTimeout(() => {
            const answeredQuestionIds = Object.keys(answers);
            const allQuestionIds = quizesData.questions.map((q: any) => q.id);
            const unattended = allQuestionIds.filter((qId: any) => !answeredQuestionIds.includes(qId));
            submitClicked && setUnAnsweredQuestions(unattended);
        }, 0);
    };

    const _submitHandler = async () => {
        const answeredQuestionIds = Object.keys(questionAnswers);
        const allQuestionIds = quizesData.questions.map((q: any) => q.id);

        const unattended = allQuestionIds.filter((qId: any) => !answeredQuestionIds.includes(qId));
        setUnAnsweredQuestions(unattended);
        if (unattended) {
            setSubmitClicked(true);
        }

        if (quizId && unattended.length === 0) {
            setIsSubmitDisabled(true);

            try {
                setFetchingScore(true);
                const { data: { score } } = await getQuizScrore(quizId, questionAnswers);
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
                <div className="value text-xl font-bold">{isQuizStarted && isSubmitDisabled ? allowedTime - remainingTime : remainingTime}</div>
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
            <FormControl key={_id} component="fieldset" error={isUnanswered} className={`!mt-12 !border !border-solid ${isUnanswered ? '!border-red-600' : '!border-stone-600'} !rounded !p-4`}>
                {isUnanswered && <FormHelperText className='font-bold absolute top-0'>{'Select an answer'}</FormHelperText>}
                <FormLabel component="legend"><span className='text-black text-xl'>{`${_id + 1}*`}</span> <span className='text-black font-bold'>{question.type === 'math' ? 'Evaluate the math expression' : ''} </span> <span id={`output${_id}`} className='font-bold text-black text-xl'>{question.type === 'math' ? renderMathExpression(question.title, `output${_id}`) : question.title}</span></FormLabel>
                <FormLabel component="legend"><span className='text-black'>{question.description}</span></FormLabel>
                {previewMode && <EditIcon className='cursor-pointer absolute right-2' onClick={() => {
                    editHandler(question.id);
                }} />}
                <RadioGroup
                    className='options'
                    aria-label="option"
                    name="option"
                    id={question.id}
                    value={questionAnswers.id}
                    onChange={handleChange}>
                    {question.options.map((option: any) => {
                        return (
                            <FormControlLabel
                                id="option"
                                value={option}
                                control={<Radio disabled={isSubmitDisabled} id={question.id} />}
                                label={<span className='text-black font-bold'>{option}</span>}
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
        if (previewMode) {
            return '';
        }
        if (score !== undefined) {
            return score === 100 ? "Wow, you scored a perfect 100!" : `You're score in this quiz is ${score}`;
        } else if (isFetchingScore) {
            return 'Getting your score...';
        }
        return '';
    }

    return (
        <div className={`flex flex-col w-full ${previewMode ? '' : 'mt-16 sm:mt-10 pt-12 px-2 sm:px-20'}`}>
            {
                isQuizStarted && !previewMode && (<div id="timer" className="mt-10 sm:mt-0 flex justify-center">
                    <CountdownCircleTimer
                        onComplete={onTimeComplete}
                        {...timerProps}
                        isPlaying={isQuizStarted && !isSubmitDisabled}
                        duration={allowedTime}
                        colors={['#31db6b', '#85dba3', '#ec856d', '#f03307']}
                        colorsTime={[60, 30, 10, 0]}>
                        {renderTime}
                    </CountdownCircleTimer>
                </div>)
            }

            <div style={{ padding: '20px' }}>
                {isFetchingData && <div className='!flex justify-center !w-full'><CircularProgress /></div>}

                {quizesData && quizesData.title && !previewMode && <div className='flex justify-center p-2'><a
                    className="twitter-logo twitter-share-button"
                    href={`https://twitter.com/intent/tweet?text=Quiz Time ${quizesData.title}`}
                >
                    {' '}<i></i>
                    <span>Tweet</span>
                </a> </div>}
                {quizesData && quizesData.title && !isQuizStarted && (
                    <div className="flex items-center flex-col">
                        <QuizIcon />

                        <h1 className='text-xl font-bold'>{quizesData.title}</h1>
                        <div className='text-xl'>
                            {quizesData.description}
                        </div>
                        <div className='text-small mt-8 font-bold'>Note:- Quiz is timed and timer will start immediatedly after you click on Start. <br /> There'll be a total of <span className='font-black'>{quizesData.questions.length}</span> questions and you need to complete all questions before you can submit the quiz. <br />Good luck!</div>
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
                                window.scrollTo(0, 0);
                                setIsQuizStarted(true);
                            }}>
                            <PlayCircleFilledWhiteIcon /> <span className='font-bold'>Start</span>
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
                                {previewMode && <FactCheckIcon className="mr-2" />}
                                {previewMode ? 'Validate Quiz' : 'Submit quiz'}
                            </Button>
                            {isQuizStarted && unAnswered.length > 0 && <FormHelperText className='font-bold !text-red-500'>Please answer all the questions!</FormHelperText>}

                            {(previewMode && score !== undefined) && (
                                <div className='font-bold'>Your last score <b>{score}</b></div>
                            )}
                        </form>

                        {learnMoreLinks.length > 0 && isSubmitDisabled && <ul><div className='font-bold mt-10'>Learn More :- </div>
                            {learnMoreLinks.map(link => {
                                return <li key={link}>
                                    <a href={link} target="_blank" rel="noreferrer">{link}</a>
                                </li>
                            })}
                        </ul>}
                    </Grid>
                ) : null}

                {notFound && (<div className='flex flex-col items-center p-10'>
                    <span className='text-red-500 font-bold text-6xl'>
                        <span>4</span><span>0</span><span>4</span></span>
                    <span className='font-bold flex items-center text-xl text-red-500'> <ErrorOutlineIcon htmlColor='red' /> <span className='ml-1'>Quiz not found!</span></span>
                </div>)}
                {getStatusMessage() && <Snack score={score} message={getStatusMessage()} />}

                {!previewMode && <div className='w-full text-center pt-10 mt-4'>
                    <NavLink to="/quizzes"><ArrowBackIcon /> <span className='font-bold'>Back to Quizzes List</span> <br />
                        {isQuizStarted && <span className='text-xs'>(Unsaved changes will be lost)</span>}
                    </NavLink></div>}
            </div>
        </div >
    );
};

export default QuizPlayGround;
