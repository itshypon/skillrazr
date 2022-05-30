import * as React from 'react';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import OpenInNewTwoToneIcon from '@mui/icons-material/OpenInNewTwoTone';
import { NavLink } from "react-router-dom";

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