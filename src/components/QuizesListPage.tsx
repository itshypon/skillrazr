
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { getQuizes } from "../uiHelper";
import localQuizes from '../data/quizes';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { CircularProgress } from '@mui/material';
import { Accordion, AccordionSummary, AccordionDetails } from './AccordianUtils';


export default function QuizesList(props: any) {
    const [quizes, setQuizes] = useState<any[]>([]);
    const [expanded, setExpanded] = useState<string | false>('');
    const [isFetchingData, setFetchingData] = useState<boolean>(false);

    useEffect(() => {
        const getData = async () => {
            try {
                setFetchingData(true);
                const resp = await getQuizes();
                setQuizes(resp.data.filter((i: any) => i.status === 'published'));
                setFetchingData(false);
            } catch (e) {
                setFetchingData(false);
                setQuizes(localQuizes.filter((i: any) => i.status === 'published'));
            }
        }
        getData();
    }, []);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

    const renderInfoAccordian = () => {
        return <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <div className='!font-bold'><span>Why quizes? </span></div>
            </AccordionSummary>
            <AccordionDetails>
                <div className='p-4'>
                    <div className='font-bold'>A well - designed quiz can engage and entertain the learners and also develop critical thinking and making learning fun, entertaining and innovative in the process.</div>
                    <div>An ever - evolving field like education, each learner has to learn more to stay relevant as they have access to better tools and more knowledge.
                        Covid induced pandemic has made, newer learning methods that are less tedius, engaging, interactive and more pleasant, an absolute necessity.
                        Numerous studies have supported the efficacy of quiz based learnings. <br /><br />
                        The effectiveness of quiz - based learning is rooted in following key aspects:- <br /> <br />
                        <b>Engagement:- </b>Quizes helps in engagement, which in turn helps increase the time spent on learning from the application. Moreover, as playing a quiz doesn’t seem like studying, learners involve more in their free time or to unwind, thereby adding to their learning time in a day.
                        <br /> <br />
                        <b>Retention:- </b> Participating in quizes creates memory traces, which can influence learning outcomes in the short term. As digital quizes can be participated more than one time and repeated retrieval of these memory traces during practice leads to long - term retention of the subject.
                        <br /> <br />
                        <b>Comprehension:- </b> Digitally designed quizzes improve the process of learning through instant feedback, explanations for incorrect answers, further helping in comprehension, memorisation and recall.
                        <br /> <br />
                        <b>More Fun:- </b>Quizes are fun way of learning a subject.
                        <br />
                    </div>
                </div>
            </AccordionDetails>
        </Accordion>
    }

    return (
        <div
            id="courses"
            className={
                "my-24 px-6 pt-20 flex flex-col items-center flex-wrap justify-center"
            }
        >
            <div className="text-6xl text-center mb-4">Quizes</div>

            {isFetchingData ? <div className='!flex justify-center !w-full'><CircularProgress /></div> : <>
                <div className="flex flex-wrap flex-col md:flex-row  justify-center p-2 w-full">
                    {quizes.map((quiz: any) => {
                        return (
                            <NavLink to={`/quizzes/${quiz.id}`} onClick={() => {
                                window.scrollTo(0, 0);
                            }}>
                                <div
                                    key={quiz.title}
                                    className="flex flex-col items-center justify-center mt-2 ml-0 sm:ml-12 px-4 py-4 mt-lg-0 font-bold box-shadow border border-green-500 rounded-[5px]"
                                >


                                    <div className="ml-2 text-2xl">{quiz.title} </div>
                                    <div className="ml-2">{quiz.description}</div>
                                </div>
                            </NavLink>
                        );
                    })}
                </div>
                <div className='p-2'>Quizes on other topics coming soon...</div>
            </>}
            <NavLink to={"/quizzes/new"} className="text-2xl mt-2 mb-4 p-4 font-bold underline underline-offset-3" onClick={() => {
                window.scrollTo(0, 0);
            }}> Add Quiz <AddBoxIcon /></NavLink>
            <div className='w-full sm:w-1/2 align-left text-left left '>{renderInfoAccordian()}</div>
        </div>
    );
}
