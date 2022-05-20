import React from 'react';
import { AccordionProps, AccordionSummaryProps, styled, Typography } from "@mui/material";
import MuiAccordion from '@mui/material/Accordion';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';


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
                    <Typography><span>What's next after purchasing a course? </span></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        After you've submitted your details and the course fee, an instructor will be assigned to you. <br />Course will start based on the mutually agreed convenient time.
                    </Typography>
                </AccordionDetails>

            </Accordion>
            <Accordion expanded={expanded === 'panel1a'} onChange={handleChange('panel1a')}>
                <AccordionSummary aria-controls="panel1ad-content" id="panel1ad-header">
                    <Typography><span>Who are elligible for the courses? </span></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        There is no age limit for learning. <br /> But all our courses are suitable for anyone above 13 years old.
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
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                <AccordionSummary aria-controls="panel6d-content" id="panel6d-header">
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

            <Accordion expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
                <AccordionSummary aria-controls="panel8d-content" id="panel8d-header">
                    <Typography>Can I choose the final project? </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Yes, if you've a project in mind and it's related to web development, our instructor(s) will help you with that.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel9'} onChange={handleChange('panel9')}>
                <AccordionSummary aria-controls="panel9d-content" id="panel9d-header">
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

export default function Faqs(props: any) {
    return (
        <div
            id="faqs"
            className={
                " px-6 pt-20 flex flex-col items-center flex-wrap justify-between"
            }
        >
            <div className="text-6xl text-center mb-4">FAQs</div>
            <div className="flex flex-wrap flex-col  items-center justify-center p-8 w-full">
                <FAQsAccordians />
            </div>
        </div>
    );
}
