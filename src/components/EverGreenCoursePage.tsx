import { useParams } from 'react-router-dom';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import UpcomingTwoToneIcon from '@mui/icons-material/UpcomingTwoTone';
import OpenInNewTwoToneIcon from '@mui/icons-material/OpenInNewTwoTone';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import { NavLink } from "react-router-dom";
import Typography from '@mui/material/Typography';

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

function FAQsAccordians() {
    const [expanded, setExpanded] = React.useState<string | false>('');

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

    return (
        <div>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Typography><span className='font-bold'>What's next after purchasing this course? </span></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        After you've submitted your details and the course fee, an instructor will be assigned to you. <br />Course will start based on the mutually agreed convenient time.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                    <Typography className='!font-bold'>Is there a refund option available, if I'm not satisfied? </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <div> If you are not satisfied with the course, you can receive a refund within max 30 business days to the original source of payment, excluding taxes.
                            <br /> Raise refund request within 10 days of purchase of a course. Any refund
                            request beyond 10 days of purchasing the course will not be accepted and
                            no refund will be provided.</div>

                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                    <Typography className='!font-bold'>Are there any jobs available, after completion of this course? </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        There are plenty of web developer jobs available for freshers. <br /> We'll try to our best to empower you so that you get placed, but it'll mostly depends on your efforts.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
                    <Typography className='!font-bold'>Is it 100% Online? </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Yes, it's based on online live classes and hands-on projects.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
                    <Typography className='!font-bold'>Do I get a course completion certificate?  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <div>Yes, you'll awarded course completion certificate upon successful completion of the course.</div>
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                <AccordionSummary aria-controls="panel6d-content" id="panel6d-header">
                    <Typography className='!font-bold'>Who is the instructor?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        We'll make sure you get an industry expert(s) for the course.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
                <AccordionSummary aria-controls="panel7d-content" id="panel7d-header">
                    <Typography className='!font-bold'>How much time is allocated for the lab work? </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Roughly 15hrs is allocated for covering lab assignments, this includes 10hrs customised sessions.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
                <AccordionSummary aria-controls="panel8d-content" id="panel8d-header">
                    <Typography className='!font-bold'>Can I choose the final project? </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Yes, if you've a project in mind and it's related to web development, our instructor(s) will help you with that.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel9'} onChange={handleChange('panel9')}>
                <AccordionSummary aria-controls="panel9d-content" id="panel9d-header">
                    <Typography className='!font-bold'>How to get support? </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        You can reach out to us via Email to <a href="mailto:contact@genlent.in">contact@genlent.in</a><br />
                        Also you can contact us by visiting <a href="/about" className='font-bold' target={"_blank"}>Contact</a>
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

const CourseDetailsPage = () => {
    const availalbeCourses = [
        {
            id: 'cplusplus',
            title: "C++",
            description: "Object Oriented Programming in C++",

        },
        // {
        //     id: 'core_java',
        //     title: "Core Java",
        //     description: "Core Java concepts one should know"
        // },
        {
            id: 'ds_algo_java',
            title: "DS and Algo in Java",
            description: "Data Structures and Algorithms in depth"
        },
    ]


    return (
        <div className="container p-3 pt-20 sm:p-10 mt-10 sm:mt-20">
            <div className='text-4xl text-center p-4'>Evergreen Courses</div>

            <div className='bg-green-600 text-white p-2 rounded'>
                <div className="flex flex-wrap flex-col md:flex-row  items-center justify-center p-2 w-full">
                    {availalbeCourses.map((course) => {
                        return (
                            <NavLink to={`/courses/${course.id}`} onClick={() => {
                                window.scrollTo(0, 0);
                            }}>
                                <div
                                    key={course.title}
                                    className="flex flex-col items-center justify-center mt-2 ml-0 mr-6 px-4 py-4 mt-lg-0 font-bold box-shadow border border-white-500 rounded-[5px]"
                                >
                                    {/* {<course.icon />} */}
                                    <EventAvailableIcon />

                                    <div className="ml-2 text-2xl">{course.title} <OpenInNewTwoToneIcon /></div>
                                    <div className="ml-2">{course.description}</div>
                                </div>
                            </NavLink>
                        );
                    })}
                </div>

            </div>

            <div className='pt-2'>
                Few programming languages and concepts add immense value in understanding computer systems and designing software. <br />
                Evergreen courses are building blocks of a successful programming career.
            </div>

            <div className='p-2 mt-4 flex flex-col items-center'>
                <div className='flex w-10 h-10 border bg-green-600 ml-8 rotate-[17deg]' />
                <div className='flex ml-4'>
                    <div className='w-10 h-10 border mt-2 mr-1 bg-blue-400' />
                    <div className='w-10 h-10 border mt-2 mr-1 bg-blue-400' />
                </div>
                <div className='flex'>
                    <div className='w-10 h-10 border mt-2 mr-1 bg-green-600' />
                    <div className='w-10 h-10 border  mt-2 mr-1 bg-blue-400' />
                    <div className='w-10 h-10 border  mt-2 bg-green-600' />
                </div>
            </div>

            {/* <FAQsAccordians /> */}
        </div >
    );
};

export default CourseDetailsPage;