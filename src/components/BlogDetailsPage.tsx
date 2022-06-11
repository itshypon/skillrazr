/* eslint-disable no-console */
import { useState, useEffect } from 'react';
// import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { NavLink } from 'react-router-dom';

export const BlogDetailsPage = () => {
    // const [notFound, _] = useState<boolean>(false);
    // const { id: blogId } = useParams<string>();

    const blogData = {
        title: 'Job roles in a Tech company',
    };

    const [scrollPosition, setSrollPosition] = useState(0);
    const handleScroll = () => {
        var scrolled_top = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        var to_scroll = (document.documentElement.scrollHeight || document.body.scrollHeight) - (document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight) - 338 // height of the footer (338)

        var horizontal_width = (scrolled_top / to_scroll) * 100;
        setSrollPosition(horizontal_width > 100 ? 100 : horizontal_width);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <div className='fixed text-red-400 z-20 w-full h-2 top-[110px] sm:top-[70px]'><div style={{ width: `${scrollPosition}%`, height: '2px', background: '#ff1493' }}></div></div>
            <div className={`flex flex-col w-full mt-10 py-20 px-10 sm:px-20`}>
                <div className="flex items-center flex-col">
                    <h1 className='text-4xl pt-4 pb-8 font-bold'>{blogData.title}</h1>
                    <img alt="tech company" src="https://miro.medium.com/max/1400/0*HTMQA6QcYq2Z_0YV" loading="lazy" role="presentation" width="700" height="467"></img>
                    <div className="flex justify-center m-auto">
                        <span className='mr-1'>Photo by Razvan Chisu on </span> <a href="https://unsplash.com/?utm_source=medium&utm_medium=referral">Unsplash</a> </div>
                    <br />

                    <div className="p-4 font-bold">
                        Every year millions of fresh graduates come out of college in search of jobs to start their career. Last 2 decades tech sector is significantly hiring fresh graduates who are interested in the tech sector. The numbers are increasing year by year and it is hoped it'll rise in coming years as well. This post is written to help job seekers evaluate different jobs in tech sector and plan accordingly.
                        Not all jobs in tech sector are technical in nature. Like other sectors it needs skilled employees in different areas to run a business. Following are the roles found in most tech companies. Some roles may be overlapping where in some companies, one personnel contributes to multiple roles.
                        <br />
                        Before listing all roles, let's highlight the common essential skills that are required in a candidate and those help immensely not just getting the job but also in the career growth.
                        <br /> <br />
                        <div className='text-2xl font-bold'>7 Common Skills :- </div>
                        <ul className='p-2'>
                            <li> 1. Excellent interpersonal skills, team player, being a collaborator.</li>
                            <li> 2. Good written and verbal communication skills.</li>
                            <li> 3. Motivated to learn new things and aware of best practices and standards, staying up-to-date with field specific tools, and trends.</li>
                            <li> 4. The drive to excel at the job.</li>
                            <li> 5. Ability to do analysis, research and document the findings.</li>
                            <li> 6. Strong time management, estimation and organisational abilities.</li>
                            <li> 7. Strong computer skills, maintenance of existing systems.</li>
                        </ul>
                        <br /> <br />

                        Here goes the roles…

                        <img alt="team" className="flex justify-center m-auto" src="https://miro.medium.com/max/1400/0*IBqhXtoLqo4KURCu" loading="lazy" role="presentation" width="700" height="467" />
                        <div className="flex justify-center m-auto">
                            Photo by Jason Goodman on {" "}<a href="https://unsplash.com/?utm_source=medium&utm_medium=referral" className='ml-2'> Unsplash</a>
                        </div>
                        <br /> <br />

                        <div className='text-2xl font-bold my-4'> 1. Front End Developer :- </div>

                        They work on look and feel of websites/web apps while maintaining it functional. They bring life to a design. Primarily they collaborate with UX and backend team and other team members. They are very good at HTML, CSS, JavaScript, Responsive Design and Problem Solving along with good at using popular UI frameworks, libraries, coding best practices and web development standards. Development involves writing unit tests as well.
                        <div className='text-2xl font-bold my-4'>2. Backend Developer :-</div>
                        It involves building backend of a software. They deal with APIs, Databases that'll consumed by the UI of the software. They are very good at backend languages, related frameworks and libraries, problem solving, coding best practices and field specific development standards i.e web/mobile etc. They build the infrastructure of the software using a solid technical design, keeping availability, scalability, security in mind. Development involves unit testing code.
                        <div className='text-2xl font-bold my-4'>3. FullStack Developer :-</div>
                        They wear multiple hats. They contribute both in Front end and Backend of a system. They are familiar with technologies used in both the stacks. Even though it's difficult to keep up with a specific tech stack, sometimes instead of focusing only one stack it pays, knowing both the stacks.
                        <div className='text-2xl font-bold my-4'> 4. Mobile App Developer :- </div>
                        They design interfaces and build fully functional mobile applications. They collaborate with UX and backend team team members. They are good at popular frameworks, libraries used for mobile development. Depending on the tech stack their skill set differs. e.g For a JavaScript based tech stack they should be very good at HTML, CSS, JavaScript, Responsive design and so on. They are good at problem solving, coding best practices and mobile development standards. Development involves unit testing code.
                        <div className='text-2xl font-bold my-4'>5. Data Engineer :-</div>
                        Data plays a big role in business decisions. Data engineers build algorithms, systems to process raw, complex, unstructured data collected from various sources to meaningful metrics. They are good at data processing languages, databases and tools, mathematics and statistical methods.
                        <div className='text-2xl font-bold my-4'>6. Automation tester :- </div>
                        They design, code testing systems to automate the testing process and remove repetition and reduce human efforts. For every release of software manually testing whole application is hard and consumes a lot of time, by automating the testing testing time is saved. Automation testers create test plans, identify test cases, setup the testing framework and finally add automation tests. Periodically these tests are run whenever new code is introduced. Tests are executed, errors are captured and reported.
                        In Scrum framework both manual testers and automation testers are part of the development team. They also do manual testing for the scenarios that can't be automated or difficult to automate.
                        <div className='text-2xl font-bold my-4'> 7. Dev ops :-</div>
                        They form the glue between software development and operation. They build and setup infrastructure and ensure software runs smoothly in different environments.
                        They build tools, processes to convert source code to working software that is passed thru various check points, like testing stages, checking for vulnerabilities in the code, finally deploying it on different environments. Security, logging and monitoring, load balancing all are important aspects taken care by Dev ops. They ensure code releases, new updates on existing systems, fixes go smooth. The role also involves timely review of the existing infrastructure and upgrades if needed.
                        <div className='text-2xl font-bold my-4'>8. Product Tech support :-</div>
                        They are fully aware of the product, all features with in, how to operate it and so on. They assist customers in explaining operating instructions, product features and help customers troubleshooting an issue. They go thru support tickets/issues raised by customers, provide immediate fix when applicable, if it's beyond their ability they categorise it and notify respective team to resolve the issue.
                        <div className='text-2xl font-bold my-4'>9. Product Management :- </div>
                        Identify customers needs, experimenting and bringing ideas to life. Design user centric experiences, building products thru solid engineering and product development practices. Works closely with designers, engineers, analysts, researchers, marketing and sales team to create impactful products. You will constantly create hypotheses for improving your product, convince your stakeholders which problems are worth solving, help build and test them with users, analyse data, learn from the results and propose the next course of action. You'll drive business growth by setting ambitious goals and defining a comprehensive strategy for your product area.
                        Creates a compelling vision and influence colleagues and senior leadership team towards the long-term vision. Understanding pain points, identify and prioritise opportunities, saying a NO when required. Work closely with all related areas to help define and develop the best solutions keeping time in mind. Validate ideas by conducting research, performing experiments and analysing results. Deep understanding of the industry. Works with geographically dispersed teams to get things done.
                        Has ability to define product goals and metrics, be analytical and take data driven decisions.
                        <div className='text-2xl font-bold my-4'>10. Product Owner :-</div>
                        Once product manager creates the vision, product owners role in scrum team is to execute the vision. To do that he or she outlines the plan, owns team backlog, works closely with stake holders on daily basis.
                        <div className='text-2xl font-bold my-4'>11. Development Manager :-</div>
                        Builds and manages the development team and plays a key role in managing people, planing the project from inception to release ensuring quality. He or she enables the development team to work as efficiently as possible and by making sure they have clear goals, both short term and long term. He or she owns responsibility for projects every stages from inception to release and maintenance. Delegates technology and development roles to tech leads in the development team. Need to stay abreast of the technical stack used in the product, to check that things are being done and enforce standard practices and processes if not followed. Since they work closely with the development team they mentor and help the team grow in their role and periodically evaluate employees performance and share it with HR.
                        <div className='text-2xl font-bold my-4'>12. Scrum master :-</div>
                        They are facilitators of scrum to the larger team by ensuring the scrum principles and values are practices. He/she is committed to the scrum values and practices, protect the team from outside distractions. Coach team members. Host daily stand-up meetings. Assist the product owner with the product backlog. Remove roadblocks.
                        <div className='text-2xl font-bold my-4'> 13. Manual testing :-</div>
                        It involves writing a test plan. Figuring out what are the different use cases of a product by customers and identify various workflows and coming up with appropriate test cases for each such scenario.
                        A tester should be well versed with various testing strategies, writing a comprehensive bug report with steps to reproduce the issue.
                        It should talk about the issue in details. Should specify . Any relevant error meta data should also be mentioned, screenshots, screencast or network recording data etc. Optionally a priority and severity status can also be mentioned based on the type of bug and frequency of it's appearance.
                        Workflow Testing before a release:- A workflow is a series of steps to test a key feature. Before release of a new feature in the product, all existing features need to tested going thru the workflows along with the new feature to ensure all features in the product work fine as one unit.
                        <div className='text-2xl font-bold my-4'> 14. Content Writing :-</div>
                        It involves a lot of research in writing informative and engaging articles to help brands showcase their products in a website, blogs and press releases and other social channels. The content is generally crafted to capture the attention of a particular target audience and educate customers. Since it involves a lot of writing, the role needs an excellent writing and communication skills so that the content consumers get the message clearly without any hassle. Working knowledge of content management systems, office applications and SEO best practices for web content are also required. On the job they need to understand the industry well and also stay relevant to any changing dynamics, contributing to marketing campaigns.
                        <div className='text-2xl font-bold my-4'>15. Designer :- </div>
                        It involves research to make user-friendly products that are easy to use, improving customer experience, find new areas of product growth by building better user experience, defining/aligning design system of an Org, identifying the gaps in product usability and adaptability and fixing them. They build design style for an org, to make various products and services align to a common design. They use wireframes, storyboards, process flows and sitemaps to illustrate and present design ideas. Collaborate with product managers and engineers to understand the product before presenting solutions to improve the visual and interactive experience. Gather user requirements from product managers to create compelling and original graphic designs (images, sketches, etc). Build and design user interface elements like menus, tabs, widgets, page navigation buttons and search fields. knowledge of visual design and wire framing tools like Photoshop, Illustrator, etc.
                        Tools:- Experience with wireframes, storyboards, and sitemaps
                        <div className='text-2xl font-bold my-4'> 16. Customer support :-</div>
                        Customer support is a field which focuses on providing support and services for customers during and after the purchasing process.
                        <div className='text-xl font-bold my-4'> Who are they?</div>
                        A problem solver, quickly determining customer's issues, explaining the best possible solution, and ensuring it is being handled in compliance with the company's guidelines and policies.
                        Can maintain financial accounts by processing customer adjustments.
                        Can collect and analyse customer information, and filing documents and paperwork.
                        Must be customer oriented, maintaining professionalism through out the job and thus converting frustrated customers to repeat customers.
                        Strong communication skills accompanied with excellent listening skills and patience to have smooth interactions with customers either on call or in person
                        Have thorough knowledge of the product or service being advertised.
                        <div className='text-xl font-bold my-4'>This role involves:- </div>
                        <ul>
                            <li>
                                Answering product and service questions.

                            </li>
                            <li>
                                Suggesting information about other products and services.

                            </li>
                            <li>
                                Generating sales leads even if you aren't directly involved with selling.

                            </li>
                            <li>
                                Answering telephone calls and transferring to appropriate departments based on their queries.

                            </li>
                            <li>
                                Record keeping account information, opening new accounts and maintaining accounts by updating information as and when necessary.

                            </li>
                            <li>
                                Resolving product or service problems by clarifying the customer's complaint after verifying its validity.
                            </li>
                        </ul>
                        <div className='text-2xl font-bold my-4'>17. Software Security :- </div>
                        They ensure a product undergoes software security testing before going to market to check its ability to withstand malicious attacks from various sources, so that the product continues to function under such attacks. They create threat models that are used in different stages in the software development, e.g STRIDE. https://www.softwaresecured.com/stride-threat-modeling/ The review technical documents and designs before the product is implemented using STRIDE and other methods. They introduce processes and practices to make security an important aspect of software development. They routinely identify vulnerabilities in the third party libraries and frameworks that are used in the product.
                        <div className='text-2xl font-bold my-4'>18. Legal and compliance :- </div>
                        They ensure businesses operate in a legal and ethical manner while meeting business objectives.
                        Role involves developing and implementing an effective legal compliance program, practices and documents, educating and training employees. They draft and revise company policies, proactively audit processes, practices and documents to identify weaknesses. They evaluate business activities (e.g. investments) to assess compliance risk, collaborate with external auditors and HR when needed, set plans to manage a crisis or compliance violation, educate and train employees on regulations and industry practices, address employee concerns or questions on legal compliance and finally keep abreast of internal standards and business goals.
                        <div className='text-2xl font-bold my-4'> 19. Marketing and Sales :- </div>
                        They play a vital role in promoting the business, product or service through brand awareness, brand image, keep information regarding products available to make discovery of the product easier.
                        Role involves developing strategies and tactics to generate new business leads, doing marketing research, creating creative marketing campaigns, events and content for promotion, managing social media handles. Tracking KPIs of marketing campaigns, doing analysis to measure performance using several tools, e.g Google Analytics etc.
                        They often collaborate with Sales, Customer Support and Product management teams.
                        <div className='text-2xl font-bold my-4'> 20. IT Support :- </div>
                        They fix computer systems when they fail, ensure employees have working systems most of the times. They procure IT hardware and supplies, customise new computer systems according to the org's requirement by installing additional software. Maintain IT inventory. See video and audio conferencing rooms in working condition. Install and configure new printers, copiers and other equipments.
                        Assist new users with computers and software issues. Train employees on new systems. Keep track of vulnerabilities, software updates and notify employees to update the system. Renew software licences, manage contracts with suppliers.
                        <div className='text-2xl font-bold my-4'>21. Accounting and Audit :-</div>
                        Accountants and auditors prepare and review financial records.
                        They are responsible for creating an auditing system that examines and tracks inconsistency in data, creates criteria for initiating audits and analyses data for reasonable conclusions. Perform inquiries and inspection as needed to identify and resolve vulnerabilities in existing financial operations, initiate improvement on the same. Maintain and cultivate a master inventory businesses policies, practices and processes, make recommendations to financial management about software, policies and audit triggers. They ensure that financial records are accurate and that taxes are paid properly and on time. They review financial operations and work to help ensure that organisations run efficiently. Compute taxes owed, prepare tax returns, and ensure that taxes are paid properly and on time.
                        <div className='text-2xl font-bold my-4'> 22. HR :-</div>
                        HR department is responsible for managing the employee recruitment, hiring right candidates following necessary paper work. Onboarding new trainees, administering employee benefits, processing payroll and handle employee exit process.
                        They conduct events to ensure work life balance at job, motivate employees and involve in several activities periodically to maintain a healthy workplace, they keep the employees satisfied and retain top performers. They play a pivotal role in the engagement of employees by ensuring employees have access to the right skills, tools, and workspace to feel comfortable. They design HR policies, resolve internal conflicts among employees.
                        <div className='text-2xl font-bold my-4'>23. Customer experience :-</div>
                        They ensure each touchpoint across the customer journey is engaging and effective. They help organisations increase customer satisfaction rates, customer loyalty, and help gain more referrals from those loyal customers. They instil a customer centric culture, gather feedback from customers, understand customer pain points, requirements and make them incorporated in timely fashion.
                        <div className='text-2xl font-bold my-4'>24. Social media manager :-</div>
                        They provides the voice for a company across social channels. They are responsible for managing content, responding to followers on social channels.
                        They design and implement social media strategies, create social media campaigns to align with business goals and strive to increase brand exposure and ensuring high levels of web traffic and customer engagement. Collaborate with Marketing, Sales and Product Development teams
                        <div className='text-2xl font-bold my-4'>25. Administration & Support staff :-</div>
                        They Ensure that all customer-related tasks are handled accurately and on time to improve guests' experience.
                        Administrative Support employees assist executives in their everyday activity and ensure that business operations are well-organised, essential services are in operation.
                        Their duties also include answering telephone calls, emails, receiving and directing visitors, word processing, creating spreadsheets and presentations, and filing.
                        All above roles are entry level roles to give an overall view of the role. Senior positions in reach role demands more experience and responsibilities. Typically involves mentoring and managing a team with your experience and expertise.

                        <div className='text-2xl font-bold my-4'>Disclaimer :-</div>
                        In all the above roles we have kept the information minimal to give you a basic idea. Do your analysis and spend more time to figure out a role of your interest in details.
                        Remuneration and role specific educational qualification is deliberately omitted because of the reason listed below. We should start believing in the philosophy "Rise up with Skills"
                        Most companies specify Bachelors Degree / Masters Degree in the particular field for any open positions as requirements. But there are companies those value skill over educational qualifications and give skilled candidates a fair chance. In the near future we hope this becomes the selection criteria as there are ways one can get required skills, showcase their skills and are eligible for a role without having a relevant educational degrees. That's one reason we are not specifying an educational degree as a requirement in the above roles, but don't feel dejected if a company rejects your application to a role because of lack of required education. Skill is the thing not an educational degree. Get skilled, you'll get chances to show case your skills.
                        Your Cost To Company (CTC) will depend on the company, experience, how good one is at the job and also sometimes on the type of role. In each role those who excel well are paid well. E.g A designer from a top company is paid significantly higher compare to an average software developer and so on. Also CTC is only one component, other rewards may include annual bonuses, Restricted Stock Units (RSUs) and various employee welfare schemes.

                        <div className='text-2xl font-bold my-4'>Credits :-</div>
                        To write this article information from various websites gathered, edited and presented in a format suitable to this article. It's not possible to credit all 100's of such sources. A big thanks to the Internet, abundance of information.
                        Now it's time to stop. We'll revisit this article periodically and update any missing info that'll add value.
                        Thanks for reading, hope this helped!
                    </div>
                    {/* {notFound && (<div className='flex flex-col items-center p-10'>
                        <span className='text-red-500 font-bold text-6xl'>
                            <span>4</span><span>0</span><span>4</span></span>
                        <span className='font-bold flex items-center text-2xl text-red-500'> <ErrorOutlineIcon htmlColor='red' /> <span className='ml-1'>Blog not found!</span></span>
                    </div>)} */}
                    <div className='w-full text-center pt-6'><NavLink to="/blogs"><ArrowBackIcon /> Back to Blogs List <br /> </NavLink></div>
                </div>
            </div >
        </>
    );
};

export default BlogDetailsPage;
