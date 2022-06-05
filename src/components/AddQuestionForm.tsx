import React, { useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, TextField } from '@mui/material';


const AddQuestionForm = ({ setOneQuestionData, isDialogOpen, handleClose, quizData, setAnswerData, editingQuestionId }: any) => {
    const [questionData, setQuestionData] = React.useState<any>({ options: [] });
    const [inCompleteQuestion, setInCompleteQuestion] = React.useState(false);
    const [invalidAnswer, setInvalidAnswer] = React.useState(false);

    useEffect(() => {
        if (editingQuestionId) {
            setQuestionData(quizData.questions[+editingQuestionId - 1]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editingQuestionId])

    const handleQuestionTitleChange = (event: any) => {
        const qD = { ...questionData, title: event.target.value };
        setQuestionData(qD);
        checkFormErrors(qD, quizData.answers[editingQuestionId ? editingQuestionId : quizData.questions.length + 1]);
    };

    const handleQuestionDescriptionChange = (event: any) => {
        setQuestionData({ ...questionData, description: event.target.value });
    };

    const handleQuestionOptionChange = (event: any) => {
        const _options = [...questionData.options];
        _options[event.target.id] = event.target.value;
        const qD = { ...questionData, options: _options };
        setQuestionData(qD);
        checkFormErrors(qD, quizData.answers[editingQuestionId ? editingQuestionId : quizData.questions.length + 1]);
    };

    const handleQuestionAnswerChange = (event: any) => {
        if (editingQuestionId) {
            setAnswerData({ [editingQuestionId]: event.target.value });
        } else {
            setAnswerData({ [quizData.questions.length + 1]: event.target.value });
        }
        checkFormErrors(questionData, event.target.value);
    };

    const checkFormErrors = (_questionData: any, answer: string) => {
        const validAnswer =
            answer && _questionData.options.includes(answer);

        const formFilled =
            _questionData.title && _questionData.options.length === 4;

        if (formFilled && new Set(_questionData.options).size === 4 && validAnswer) {
            setInCompleteQuestion(false);
            setInvalidAnswer(false);
            return true;
        } else {
            setInCompleteQuestion(true);
            formFilled && !validAnswer && setInvalidAnswer(true);
        }
    };
    const handleAddQuestion = () => {
        if (checkFormErrors(questionData, quizData.answers[editingQuestionId ? editingQuestionId : quizData.questions.length + 1])) {
            setOneQuestionData(editingQuestionId ? { ...questionData } : { ...questionData, id: `${quizData.questions.length + 1}` }, editingQuestionId);
            setQuestionData({ options: [] });
        }
    };

    console.log('question data', questionData);

    const renderOptions = () => {
        let options = [];
        for (let i = 0; i < 4; i++) {
            options.push(
                <div>
                    <TextField
                        className='w-full sm:w-2/3 !mt-2'
                        error={inCompleteQuestion && !questionData.options[i]}
                        value={questionData.options[i]}
                        id={i.toString()}
                        placeholder={`option${i + 1}*`}
                        required
                        variant="filled"
                        onChange={handleQuestionOptionChange}
                    />
                </div>
            );
        }

        return options;
    };
    return (
        <Dialog
            fullWidth={true}
            maxWidth={'md'}
            open={isDialogOpen}
            onClose={handleClose}
            aria-labelledby="max-width-dialog-title">
            <DialogTitle id="max-width-dialog-title">
                <div>{editingQuestionId ? `Edit details for Question ${editingQuestionId}` : `Add details for Question ${quizData.questions.length + 1}`}</div>
                {invalidAnswer && (
                    <span style={{ fontSize: '14px', color: 'red' }}>
                        Answer should match one option
                    </span>
                )}
                {!invalidAnswer && inCompleteQuestion && (
                    <span style={{ fontSize: '14px', color: 'red' }}>Fill all * marked fields</span>
                )}
            </DialogTitle>
            <DialogContent>
                <form key={quizData.questions.length}>
                    <FormControl className='w-full sm:w-2/3'>
                        <div>
                            <TextField
                                className='w-full sm:w-2/3 !mt-2'
                                error={inCompleteQuestion && !questionData.title}
                                value={questionData.title}
                                id="title"
                                placeholder="Question title *"
                                required
                                variant="filled"
                                onChange={handleQuestionTitleChange}
                            />
                        </div>

                        <div>
                            <TextField
                                className='w-full sm:w-2/3 !mt-2 !mb-4'
                                value={questionData.description}
                                id="description"
                                placeholder="Question description"
                                variant="filled"
                                onChange={handleQuestionDescriptionChange}
                            />
                        </div>
                        <br></br>
                        {renderOptions()}
                        <br></br>
                        <div>
                            <TextField
                                className='w-full sm:w-2/3 !mt-2'
                                error={inCompleteQuestion && !quizData.answers[editingQuestionId ? editingQuestionId : quizData.questions.length + 1]}
                                id="answer"
                                value={quizData.answers[editingQuestionId ? editingQuestionId : quizData.questions.length + 1]}
                                placeholder="Question answer *"
                                required
                                variant="filled"
                                onChange={handleQuestionAnswerChange}
                            />
                        </div>
                    </FormControl>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleAddQuestion} color="primary" variant="contained">
                    {editingQuestionId ? "Save" : "Add"}
                </Button>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddQuestionForm;
