import { useParams } from 'react-router-dom';

// import ComputerIcon from '@mui/icons-material/Computer';
// import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
// import CodeIcon from '@mui/icons-material/Code';
// import AssignmentIcon from '@mui/icons-material/Assignment';
// import DoneIcon from '@mui/icons-material/Done';
import * as React from 'react';
import LightbulbCircleIcon from '@mui/icons-material/LightbulbCircle';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import PestControlIcon from '@mui/icons-material/PestControl';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import WorkIcon from '@mui/icons-material/Work';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import Button from '@mui/material/Button';
import ModalDialog from "./Modal";
import BankDetails from './BankDetails';
import { Accordion, AccordionSummary, AccordionDetails } from './AccordianUtils';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import ConstructionIcon from '@mui/icons-material/Construction';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import BorderOuterIcon from '@mui/icons-material/BorderOuter';
import ApiIcon from '@mui/icons-material/Api';
import StreamIcon from '@mui/icons-material/Stream';
import Typography from '@mui/material/Typography';
import { Parallax } from 'react-scroll-parallax';

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
                        <b>HTML</b>
                    </Typography>
                    <div>DocType, Structuring a web page
                        Header, Nav, Section, Footer and other tags
                        Head and Body section usage
                        Block and Inline elements
                        How a browser renders a HTML page
                        Injecting CSS in various ways
                        Audio, Video, Iframes etc  </div>
                    <Typography>
                        <b>CSS</b>
                    </Typography>
                    <div>Positioning,
                        Display,
                        Box Model,
                        Specificity,
                        Responsive Layout,
                        Animation,
                        Frameworks (Tailwind, BootStrap),
                        Pseudo selectors,
                        Flexbox</div>
                    <Typography>
                        <b>JavaScript</b>
                    </Typography>
                    <div>
                        1. JS Concepts
                        2. Objects, Arrays, Functions in details
                        3. Functions as first class citizens (higher order functions)
                        4. Closure
                        5. Prototype inheritance in JS
                        6. Cookies
                        7. Adding behaviour to a webpage and page elements, like button click, select change etc
                        8. And much more
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
                        ReactJS Library,
                        BootStrap,
                        jQuery,
                        Angular Framework,
                        SASS for CSS,
                        React NextJS and so on
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel3a'} onChange={handleChange('panel3a')}>
                <AccordionSummary aria-controls="panel3ad-content" id="panel3ad-header">
                    <Typography>4. Shell Scripting and NPM  <ApiIcon /></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Shell Commands,
                        Introduction to NPM
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
                    <Typography>5. APIs and Backend  <ApiIcon /></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        HTTP Standards,
                        API specifications,
                        NodeJS Concepts,
                        NPM,
                        API server and Database Server,
                        Security,
                        Networking Concepts and more
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
                    <Typography>6. Debugging & Problem Solving <PestControlIcon /> </Typography>
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
                    <Typography>7. Web Security and Software Testing  <AssignmentTurnedInIcon /></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Web Security,
                        Intro to Testing
                        Manual Testing
                        Unit Testing using JS libraries
                        Automation Testing using popular frameworks
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
                <AccordionSummary aria-controls="panel7d-content" id="panel7d-header">
                    <Typography>8. Deployment <CloudDoneIcon /> </Typography>
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
                    <Typography>9. Lab work  <HomeWorkIcon /></Typography>
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
                    <Typography>10. Interview Preparations  <WorkIcon /></Typography>
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


function DeepJS() {
    const [expanded, setExpanded] = React.useState<string | false>('');

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

    return (
        <div>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Typography><span className='font-bold'>1. Concepts </span> <LightbulbCircleIcon /></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <b className='text-2xl'>Deep JS</b>
                    </Typography>
                    <div className='text-1xl font-bold'>
                        Object Oriented and Functional Programming <br />
                        Inheritance, Prototype Chain<br />
                        Scope and Execution Context<br />
                        Closures<br />
                        Asynchronous JavaScript (Promises, async, await)<br />
                        More about this keyword<br />
                        Error Handling<br />
                        Composition vs Inheritance<br />
                        Type Coersion<br />
                        Pass By Reference vs Pass by Value<br />
                        Functions as first class citizens<br />
                        IIFE, call(), apply(), bind(), etc<br />
                        Object and Array methods<br />
                        JavaScript Patterns, best practices and so on<br />
                    </div>
                    <br />
                    <Typography>
                        <b className='text-2xl'>Advance NodeJS</b>
                        <div className='text-1xl font-bold'>
                            Event Loop, Callback, Non-blocking IO<br />
                            API server using Express<br />
                            Session Management using Redis<br />
                            Web Sockets and Web workers <br />
                            MongoDB Atlas<br />
                            Working with Streams<br />
                            Accessing File System <br />
                            Clustering and Child processes<br />
                            Versioning using npm <br />
                            Process management using PM2<br />
                            Debugging NodeJS Apps and much more<br />
                        </div>
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                    <Typography className='!font-bold'>2. Tools and Libraries <ConstructionIcon /></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <ul>
                            <li>
                                Express,
                            </li>
                            <li>
                                PM2,
                            </li><li>
                                Redis, and so on
                            </li>
                        </ul>
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                    <Typography className='!font-bold'>3. Deployment <CloudDoneIcon /> </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <ul>
                            <li>Intro to Domain and Network Concepts
                            </li>
                            <li>
                                Static hosting on Github, Firebase
                            </li>
                            <li>
                                Application and database hosting on AWS / GCloud, Firebase etc
                            </li>
                        </ul>
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
                    <Typography className='!font-bold'>4. Lab work  <HomeWorkIcon /></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <ul>
                            <li>Advance JS Exercises</li>
                            <li>Express integration</li>
                            <li>Cloud database integration</li>
                            <li>NodeJS Exercises</li>
                            <li>and so on</li>
                        </ul>
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
                    <Typography className='!font-bold'>5. Customizable session (10 hrs) <DashboardCustomizeIcon /></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        10 hrs dedicated sessions to clarify all your doubts for topics related to this course.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

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


function DSAlgo() {
    const [expanded, setExpanded] = React.useState<string | false>('');

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

    return (
        <div>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Typography><span className='font-bold'>1. Data Structures </span> <LightbulbCircleIcon /></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {/* <Typography>
                        <b className='text-2xl'>Stack</b>
                    </Typography> */}
                    <div className='text-1xl font-bold'>
                        1. Stack <br />
                        2. Queue <br />
                        3: Linked list <br />
                        4: Trees <br />
                        4a: Trees - BST <br />

                        4b: Trees - AVL<br />
                        4c: Trees - Red Black<br />
                        5: Hash Table <br />
                        6: Graphs <br />
                        6a: Graph and its representations<br />
                        6b: Adjacency List<br />
                        6c: Directed Graph<br />
                        6d: Undirected Graph<br />
                    </div>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                    <Typography className='!font-bold'>2. Algorithms <AccountTreeIcon /></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <ul className='font-bold'>
                            <div className='text-xl font-bold'>
                                1. Searching and Sorting
                            </div>
                            <li>
                                Complexity Theory <br />
                                Big O Notation<br />
                                Divide and Conquer
                            </li>
                            <li>
                                Binary Search
                            </li><li>
                                Selection Sort
                            </li>
                            <li>
                                Bubble Sort
                            </li>
                            <li>
                                Insertion Sort
                            </li>
                            <li>
                                Merge Sort
                            </li>
                            <li>
                                Heap Sort
                            </li> <li>
                                Quick Sort
                            </li>
                            <li>
                                Radix Sort
                            </li>
                            <br />

                            2. Greedy Algorithm <br />
                            3. Dynamic Programming <br />
                            4. Recursion <br />
                            5. Balanced Trees <br />
                            6. Trie concpts <br />
                        </ul>


                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                    <Typography className='!font-bold'>3. Interview Preparations <WorkIcon /> </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <ul>
                            <li>Interview Guidance
                            </li>
                            <li>
                                Mock Interview Session
                            </li>
                            <li>
                                How To Crack Coding interviews
                            </li>
                            <li>
                                Mock Interviews (One on one ) With an expert
                            </li>
                        </ul>
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
                    <Typography className='!font-bold'>4. System Design (Addon for Professional candidates) <BorderOuterIcon /></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <ul>
                            <div>We will explain design principles with real world applications</div>
                            <li>System design concepts</li>
                            <li>Design Tinder application</li>
                            <li>Design Tiny URL Pattern</li>
                            <li>Design Logging Application</li>
                        </ul>
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

function CPP() {
    const [expanded, setExpanded] = React.useState<string | false>('');

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

    return (
        <div>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Typography><span className='font-bold'>1. Concepts </span> <LightbulbCircleIcon /></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <b className='text-2xl'>Part 1</b>
                    </Typography>
                    <div className='text-1xl font-bold'>
                        Object Oriented Programming Concepts <br />
                        Structure of a program, Compiling and linking source file<br />
                        Tokens, expressions, control structures<br />
                        Functions<br />
                        Classes and Objects <br />
                        Overloading in detail <br />
                        Type conversion<br />
                        Inheritance<br />
                    </div>
                    <br />
                    <Typography>
                        <b className='text-2xl'>Part 2</b>
                        <div className='text-1xl font-bold'>
                            Pointers, Virtual Functions<br />
                            Pollymorphism <br />
                            I/O Operations, Files<br />
                            Templates<br />
                            Exception Handling<br />
                            Standard Template Library
                        </div>
                    </Typography>
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

            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
                    <Typography className='!font-bold'>3. Lab work  <HomeWorkIcon /></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <ul>
                            <li>Programs related to topics </li>
                            <li>Exercises</li>
                            <li>Coding best practices</li>
                            <li>and so on</li>
                        </ul>
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
                    <Typography className='!font-bold'>4. Customizable session (5 hrs) <DashboardCustomizeIcon /></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Extra 5 hrs* dedicated sessions to clarify all your doubts for topics related to this course.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

function TheCompleteSoftwareTesting() {
    const [expanded, setExpanded] = React.useState<string | false>('');

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

    return (
        <div>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Typography><span className='font-bold'>1. Concepts </span> <LightbulbCircleIcon /></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <b className='text-2xl'>Part 1</b>
                    </Typography>
                    <div className='text-1xl font-bold'>
                        Software Testing Concepts <br />
                        Types of Testing <br />
                        Testing Techniques:- Black Box and White Box Testing<br />
                        Unit Testing <br />
                        API Testing<br />
                        Performance Testing<br />
                        Test planning <br />
                        Bug Report Writing <br />
                    </div>
                    <br />
                    <Typography>
                        <b className='text-2xl'>Part 2</b>
                        <div className='text-1xl font-bold'>
                            Agile principles<br />
                            Introduction to Automation Testing<br />
                            WebdriverIO, Page Object Model <br />
                            Intro to Mocha, Chai, Cucumber, Jasmine and other popular frameworks<br />
                            Allure Test Reporting <br />
                        </div>
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                    <Typography><span className='font-bold'>2. Source Code Management (Git) <IntegrationInstructionsIcon /> </span></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <div className='text-1xl font-bold'> Git commands walk thru in live workshop {' '}</div>
                        <a href="https://training.github.com/downloads/github-git-cheat-sheet/" rel="noreferrer" target="_blank">https://training.github.com/downloads/github-git-cheat-sheet/</a>
                        <br />
                        <a href="https://www.atlassian.com/git/tutorials/git-alias/" rel="noreferrer" target="_blank">https://www.atlassian.com/git/tutorials/git-alias</a>
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel2a'} onChange={handleChange('panel2a')}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                    <Typography><span className='font-bold'>3. Agile Principles and Tools <ConstructionIcon /> </span></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <div className='text-1xl font-bold'> Intro to Agile Principles and Scrum Framework <br /></div>
                        <div className='text-1xl font-bold'> Jira Software detailed usage <br /></div>
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
                    <Typography className='!font-bold'>4. Lab work  <HomeWorkIcon /></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <ul className='font-bold'>
                            <div className='text-xl'>Following activities will be perfomed on a real Web App</div>
                            <li>Writing Test plans, scenarios</li>
                            <li>Executing Test Scenarios Manually</li>
                            <li>Writing Unit Tests using Jest</li>
                            <li>Writing API Tests using Postman</li>
                            <li>Writing Automation Tests using WebdriverIO</li>
                        </ul>
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
                    <Typography className='!font-bold'>5. Interview Preparation Sessions <WorkIcon /></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <span className='font-bold'>Interview preparation sessions</span><br />
                        <span className='font-bold'>Mock interview sessions with experts</span>
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
                    <Typography className='!font-bold'>6. Customizable session (5 hrs) <DashboardCustomizeIcon /></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <span className='font-bold'>Extra 5 hrs* dedicated sessions to clarify all your doubts for topics related to this course.</span>
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

const CourseDetailsPage = () => {
    const { id } = useParams();
    const [showBankDetails, setShowBankDetails] = React.useState(false);

    const handleDialogClose = () => {
        setShowBankDetails(false);
    };


    const renderContent = (course: string) => {
        switch (course) {
            case 'fullstack_js': {
                return <ContentAccordians />;
            }

            case 'deep_js_node_js': {
                return <DeepJS />;
            }

            case 'cplusplus': {
                return <CPP />;
            }

            case 'core_java': {
                return <DeepJS />;
            }

            case 'ds_algo_java': {
                return <DSAlgo />;
            }

            case 'complete_software_testing': {
                return <TheCompleteSoftwareTesting />
            }

            default:
                return null;

        }
    }

    const ProjectWork = (props: any) => {
        return <div className="mt-4">
            {/* <PersonOutlineIcon className="!w-10 !h-10 mr-4" />
            <AssignmentIcon className="!w-10 !h-10 mr-4" />
            <ComputerIcon className="!w-10 !h-10 mr-4" />
            <CodeIcon className="!w-10 !h-10 mr-4" />
            <DoneIcon htmlColor="green" className="!w-12 !h-12" /> */}

            <div className='text-left text-2xl py-2'>Course Content </div>

            {renderContent(props.course.id)}
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
            id: 'deep_js_node_js',
            title: "Deep JS and Advance NodeJS",
            // icon: LiveTvIcon,
            description: "JavaScript in depth, advance NodeJS concepts",
            overview: 'This course starts with  advanced JavaScript features, it deep dives into most of the concepts. It also covers specific Node.js features in details along with tools and libraries like PM2, Redis, Express. This is suitable for those who wants to learn deeper concepts in JS and NodeJS.',
            details: [],
            features: [
                "1. Learn essential and deep concepts",
                "2. Get exposure to cutting edge tools and industry insights",
                "3. Live coding and doubt clear classes",
                "4. Digital track of your learning",
                "5. Customizable sessions for interviews or clearing specific doubts",
            ],
            duration: { total: '2 months', weekly: 'At 5 hours/week + 10 hrs*' },
            feeStriked: "₹8,999",
            fee: 4999,
            feeInRupees: "₹4,999",
            paymentPage: 'https://rzp.io/l/genlent_deepjs_nodejs'
        },
        {
            id: 'react',
            title: "ReactJS",
            // icon: AssessmentIcon,
            description: "ReactJS in details",
            details: [],
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
            feeStriked: "₹9,999",
            fee: 5999,
            feeInRupees: "₹5,999",
            duration: { total: '4 months', weekly: 'At 10 hours/week' },
            paymentPage: 'https://rzp.io/l/genlentfullstackjs',
        },
        {
            id: 'cplusplus',
            title: "OOPs with C++",
            description: "Object Oriented Programming in C++",
            overview: "This course provides you concept of Object Oriented Programming with explanatory programming sessions. This will help you to cover all concepts and aid you in your programming journey.",
            features: [
                "1. Learn essential concepts",
                "2. Get exposure to cutting edge tools and industry insights",
                "3. Live coding and doubt clear classes",
                "4. Digital track of your learning",
                "5. Interview preparation sessions",
            ],
            feeStriked: "₹2,999",
            fee: 1999,
            feeInRupees: "₹1,999",
            duration: { total: '1 month', weekly: 'At 5 hours/week + 5 hrs*' },
            paymentPage: 'https://rzp.io/l/skillrazr-opps-cpp',

        },
        {
            id: 'core_java',
            title: "Core Java",
            description: "Core Java concepts one should know",
            overview: "",
            features: [
                "1. Learn essential concepts",
                "2. Get exposure to cutting edge tools and industry insights",
                "3. Live coding and doubt clear classes",
                "4. Digital track of your learning",
                "5. Interview preparation sessions",
            ],
            feeStriked: "₹2,999",
            fee: 1999,
            feeInRupees: "₹1,999",
            duration: { total: '1 month', weekly: 'At 5 hours/week' },
            paymentPage: 'https://rzp.io/l/genlentfullstackjs',
        },
        {
            id: 'ds_algo_java',
            title: "DS and Algo in Java",
            description: "Data Structures and Algorithms in depth",
            overview: "This course provides you deep understanding of Data structures and Algorithm concepts from ground up. This is designed by experts to match with real world interview preparations for both freshers and working professionals.",
            features: [
                "1. Learn essential concepts",
                "2. Get exposure to cutting edge tools and industry insights",
                "3. Live coding and doubt clear classes",
                "4. Digital track of your learning",
                "5. Interview preparation sessions",
            ],
            feeStriked: "₹5,999",
            fee: 3999,
            feeInRupees: "₹3,999",
            duration: { total: '2 months', weekly: 'At 5 hours/week' },
            paymentPage: 'https://rzp.io/l/skillrazr-algo-java',
        },
        {
            id: 'complete_software_testing',
            title: "The Complete Software Testing",
            description: "Manual and Automation Software Testing",
            overview: "This course provides you deep understanding of Software Testing. This is designed to help you explore career in Software Testing.",
            features: [
                "1. Learn essential concepts",
                "2. Get exposure to cutting edge tools and industry insights",
                "3. Live coding and doubt clear classes",
                "4. Digital track of your learning",
                "5. Interview preparation sessions",
            ],
            feeStriked: "₹6,999",
            fee: 3999,
            feeInRupees: "₹3,999",
            duration: { total: '2 months', weekly: 'At 5 hours/week + 5 hrs*' },
            paymentPage: 'https://rzp.io/l/skillrazr-algo-java',
        },
    ];

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
                            <span><b>{course.duration?.total}</b> {course.duration?.weekly}</span></div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center p-2 sm:pr-12 ">

                        <CastForEducationIcon className="!w-[60px] !h-[40px]" />
                        <div className="flex flex-col"><span>Format</span>
                            <span><b>Online Bootcamp</b></span></div>
                    </div>
                </div>

                <Button variant='contained' className='!my-8 !py-2 !px-8 !text-xl !capitalize' onClick={() => {
                    setShowBankDetails(true);
                }}>
                    Buy Now</Button>


                <div className='text-2xl my-2 font-bold'>Features:- </div>
                <ul className='mb-8'>
                    {course.features?.map((i, index) => {
                        return (
                            <Parallax
                                translateY={[
                                    `${index * -25}%`,
                                    `${index * 25}%`
                                ]}
                                scaleY={[1, 1.25, 'easeInQuad']}

                            >
                                <li><CheckCircleOutlineIcon htmlColor='green' /> {i}</li>
                            </Parallax>
                        )
                    })}
                </ul>


                <div>Note:- To attend this course, you need to have PC/Laptop with internet access.</div>
                <ProjectWork course={course} />

                <div className='text-2xl my-4'>Course FAQs</div>
                <FAQsAccordians />

                <Button variant='contained' className='!my-8 !py-2 !px-8 !text-xl !capitalize' onClick={() => {
                    setShowBankDetails(true);
                }}>
                    Buy Now</Button>

                <ModalDialog
                    showModal={showBankDetails}
                    cancelHandler={handleDialogClose}
                    setShowDialog={setShowBankDetails}
                    title="Payment"
                    content={
                        <BankDetails amount={course.fee} />
                    }
                />
            </>

                : <h2>404</h2>}
        </div >
    );
};

export default CourseDetailsPage;