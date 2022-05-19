import { useParams } from 'react-router-dom';

// import ComputerIcon from '@mui/icons-material/Computer';
// import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
// import CodeIcon from '@mui/icons-material/Code';
// import AssignmentIcon from '@mui/icons-material/Assignment';
// import DoneIcon from '@mui/icons-material/Done';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import LightbulbCircleIcon from '@mui/icons-material/LightbulbCircle';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import PestControlIcon from '@mui/icons-material/PestControl';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import WorkIcon from '@mui/icons-material/Work';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import Button from '@mui/material/Button';

import ApiIcon from '@mui/icons-material/Api';
import StreamIcon from '@mui/icons-material/Stream';
import Typography from '@mui/material/Typography';
import ModalDialog from "./Modal";


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

function ContentAccordians() {
    const [expanded, setExpanded] = React.useState<string | false>('panel1');

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

    return (
        <div>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Typography><span>1. Concepts </span> <LightbulbCircleIcon /></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        HTML
                    </Typography>
                    <div>DocType, Structuring a web page
                        Header, Nav, Section, Footer and other tags
                        Head and Body section usage
                        Block and Inline elements
                        How a browser renders a HTML page
                        Injecting CSS in various ways
                        Audio, Video, Iframes etc  </div>
                    <Typography>
                        CSS
                    </Typography>
                    <div>Positioning
                        Display
                        Box Model
                        Specificity
                        Responsive Layout
                        Animation
                        Frameworks (BootStrap)
                        Pseudo selectors
                        Flexbox</div>

                    <Typography>
                        JavaScript
                    </Typography>
                    <div>
                        1. JS Concepts
                        2. Cookies
                        3. Adding behaviour to a webpage and page elements, like button click, select change etc
                        4. Objects, Arrays, Functions in details
                        5. Functions as first class citizens (higher order functions)
                        6. Closure
                        7. Prototype inheritance in JS
                    </div>

                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                    <Typography>2. Source Code Management (Git) <IntegrationInstructionsIcon /></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <div> Git commands walk thru in live workshop {' '}</div>
                        <a href="https://training.github.com/downloads/github-git-cheat-sheet/" rel="noreferrer" target="_blank">https://training.github.com/downloads/github-git-cheat-sheet/</a>
                        <br />
                        <a href="https://www.atlassian.com/git/tutorials/git-alias/" rel="noreferrer" target="_blank">https://www.atlassian.com/git/tutorials/git-alias</a>
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                    <Typography>3. UI Frameworks and Libraries <StreamIcon /></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        ReactJS Library
                        BootStrap
                        jQuery
                        Angular Framework
                        SASS for CSS
                        React NextJS
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
                    <Typography>4. APIs and Backend  <ApiIcon /></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        HTTP Standards
                        API specifications
                        NodeJS Concepts
                        NPM
                        API server and Database Server
                        Security
                        Networking Concepts
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
                    <Typography>5. Debugging & Problem Solving <PestControlIcon /> </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <div> Debugging sessions using Chrome Dev Tools</div>
                        <a href="https://developer.chrome.com/docs/devtools/" rel="noreferrer" target="_blank">https://developer.chrome.com/docs/devtools/</a>
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                <AccordionSummary aria-controls="panel6d-content" id="panel6d-header">
                    <Typography>6. Software Testing  <AssignmentTurnedInIcon /></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Intro to Testing
                        Manual Testing
                        Unit Testing using JS libraries
                        Automation Testing using popular frameworks
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
                <AccordionSummary aria-controls="panel7d-content" id="panel7d-header">
                    <Typography>7. Deployment <CloudDoneIcon /> </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Intro to Domain Concepts
                        Static hosting on Github, Firebase
                        Application and database hosting on AWS / GCloud, Firebase etc
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
                <AccordionSummary aria-controls="panel8d-content" id="panel8d-header">
                    <Typography>8. Lab work  <HomeWorkIcon /></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <ul>
                            <li>Music Player</li>
                            <li>Calculator</li>
                            <li>Portfolio Website</li>
                            <li>Theme builder</li>
                            <li>and so on</li>
                        </ul>
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel9'} onChange={handleChange('panel9')}>
                <AccordionSummary aria-controls="panel9d-content" id="panel9d-header">
                    <Typography>9. Interview Preparations  <WorkIcon /></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        DS and Algorithms sessions with practice programs
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}


function FAQsAccordians() {
    const [expanded, setExpanded] = React.useState<string | false>('panel1');

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

    return (
        <div>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Typography><span>What's next after applying for this course? </span></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        After you've submitted your details and the course fee, an instructor will be assigned to you. <br />Course will be started based on the mutually agreed convenient time.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                    <Typography>Is there a refund option available, if I'm not satisfied? </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <div> If you are not satisfied with the course, you can recieve a refund within max thirty business days to the original source of payment, excluding taxes.
                            <br /> Raise refund request within 10 days of purchase of a course. Any refund
                            request beyond 10 days of purchasing the course will not be accepted and
                            no refund will be provided.</div>

                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                    <Typography>Are there any jobs available, after completion of this course? </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        There are plenty of web developer jobs available for freshers. <br /> We'll try to our best to empower you so that you get placed, but it'll mostly depends on your efforts.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
                    <Typography>Is it 100% Online? </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Yes, it's based on online live classes and hands-on projects.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
                    <Typography>Do I get a course completion certificate?  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <div>Yes, you'll awarded course completion certificate upon successful completion of the course.</div>
                        <a href="https://developer.chrome.com/docs/devtools/" rel="noreferrer" target="_blank">https://developer.chrome.com/docs/devtools/</a>
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
                <AccordionSummary aria-controls="panel7d-content" id="panel7d-header">
                    <Typography>Who are the instructors? </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        We'll make sure you get an industry expert(s) for the course.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
                <AccordionSummary aria-controls="panel7d-content" id="panel7d-header">
                    <Typography>How much time is allocated for the project work? </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Out of 4 months, 3 months is allocated for covering all the topics including lab assignments. You'll be completing your final project work in 1 months time.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
                <AccordionSummary aria-controls="panel7d-content" id="panel7d-header">
                    <Typography>Can I choose the final project? </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Yes, if you've a project in mind and it's related to web development, our instructor(s) will help you with that.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
                <AccordionSummary aria-controls="panel7d-content" id="panel7d-header">
                    <Typography>How to get support? </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        You can reach out to us via Email to contact@genlent.in <br />
                        Also you can contact us by visiting <a href="/about" target={"_blank"}>Contact</a>
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

const CourseDetailsPage = () => {
    const { id } = useParams();
    const [showPurchaseModal, setShowPurchaseModal] = React.useState(false);

    const ProjectWork = (props: any) => {
        const { course } = props;
        return <div className="mt-4">
            {/* <PersonOutlineIcon className="!w-10 !h-10 mr-4" />
            <AssignmentIcon className="!w-10 !h-10 mr-4" />
            <ComputerIcon className="!w-10 !h-10 mr-4" />
            <CodeIcon className="!w-10 !h-10 mr-4" />
            <DoneIcon htmlColor="green" className="!w-12 !h-12" /> */}

            <div className='text-left text-2xl py-2'>Course Content </div>
            <ContentAccordians />
        </div>
    }

    const courses = [
        {
            id: 'essential_ui',
            title: "Essential UI",
            // icon: StarIcon,
            description: "Intro to HTML, CSS and JavaScript",
            details: []
        },
        {
            id: 'more_js',
            title: "More JavaScript",
            // icon: LiveTvIcon,
            description: "JavaScript in depth",
            details: []
        },
        {
            id: 'react',
            title: "ReactJS",
            // icon: AssessmentIcon,
            description: "ReactJS in details",
            details: []
        },
        {
            id: 'fullstack_js',
            title: "Full Stack JavaScript",
            overview: 'This Course helps you understand the core concepts behind working of most web applications and enables you to build an application end-to-end, test and deploy code and so on.',
            // icon: CurrencyRupeeIcon,
            description:
                "Intro to HTML, CSS and JavaScript, \n Shell scripting, SCM, Intro to CSS and JS UI frameworks",
            features: [
                "1. Learn essential concepts",
                "2. Get exposure to cutting edge tools and industry insights",
                "3. Live coding and doubt clear classes",
                "4. Digital track of your learning",
                "5. Interview preparation sessions",
            ],
            feeStriked: "₹9999",
            fee: 5999,
            feeInRupees: "₹5,999"
        }];

    const course = courses.find(i => i.id === id);


    return (
        <div className="container p-3 pt-20 sm:p-10 mt-10 sm:mt-20">
            {course ? <>
                <div className='font-black text-4xl sm:text-6xl'>{course.title}</div>
                <div className='font-black my-4'>{course.overview}</div>

                <div>Total Course Fee <span className='line-through'>{course.feeStriked}</span> <span className='text-2xl font-bold'>{course.feeInRupees}</span><span className='text-small'> {' '}(Incl. taxes)</span></div>


                <div className='flex flex-row justify-around border-[1px] border-[#ff1493]  shadow-lg rounded my-4 p-2'>
                    <div className="flex flex-col sm:flex-row items-center border-[#ff1493] border-r p-2 sm:pr-12">
                        <SubscriptionsIcon className="!w-[60px] !h-[40px]" />
                        <div className="flex flex-col"> <span>Can I Enroll now? </span><span><b>Yes</b></span></div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center border-[#ff1493] border-r p-2 sm:pr-12">
                        <AccessTimeIcon className="!w-[60px] !h-[40px]" />
                        <div className="flex flex-col"><span>Course Duration</span>
                            <span><b>4 months</b> At 10 hours/week</span></div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center p-2 sm:pr-12 ">

                        <CastForEducationIcon className="!w-[60px] !h-[40px]" />
                        <div className="flex flex-col"><span>Format</span>
                            <span><b>Online Bootcamp</b></span></div>
                    </div>
                </div>

                {/* <Button variant='contained' className='bg-[#ff1493]'>Apply Now</Button> */}
                <Button variant='contained' className='!my-8 !py-2 !px-8 !text-xl !capitalize'>
                    <a href="https://rzp.io/l/genlentfullstackjs" target="_blank" rel='noreferrer'
                    > Buy Now</a></Button>


                <div className='text-2xl my-2 font-bold'>Features:- </div>
                <ul>
                    {course.features?.map(i => {
                        return <li><CheckCircleOutlineIcon htmlColor='green' /> {i}</li>;
                    })}
                </ul>

                <ProjectWork course={course} />

                <div className='text-2xl my-4'>Course FAQs</div>
                <FAQsAccordians />

                <Button variant='contained' className='!my-8 !py-2 !px-8 !text-xl !capitalize'>
                    <a href="https://rzp.io/l/genlentfullstackjs" target="_blank" rel='noreferrer'

                    >Buy Now</a></Button>

                {/* <ModalDialog
                    fullScreen={true}
                    showModal={showPurchaseModal}
                    cancelHandler={() => {
                        setShowPurchaseModal(false);
                    }}
                    setShowDialog={setShowPurchaseModal}
                    title="Return Policy"
                    content={
                        <div>
                            <iframe src="https://rzp.io/l/genlentfullstackjs" width={"1200px"} height="500px" />
                        </div>
                    }
                /> */}

            </>

                : <h2>404</h2>}
        </div >
    );
};

export default CourseDetailsPage;