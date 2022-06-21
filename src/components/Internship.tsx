import React from 'react';
import { Button } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Parallax } from 'react-scroll-parallax';


export default function Internship(props: any) {

    const [comingSoon, showComingSoon] = React.useState(false);

    return (
        <div
            id="internship"
            className={
                " px-6 pt-20 flex flex-col items-center flex-wrap justify-between"
            }
        >
            <div className="text-6xl text-center mb-4">Paid Internship</div>
            <div className="flex flex-wrap flex-col  items-center justify-center p-8 w-full">
                <ul className='text-small py-4'>
                    <div className='text-2xl mb-4'>Get a chance to show case your skills and much more!</div>
                    {[
                        'Gain industry experience',
                        'Develop new skills',
                        'Get decent stipend',
                        'Open doors to new opportunities'
                    ].map((i, index) =>
                        <Parallax key={i}
                            translateY={[
                                `${index * -25}%`,
                                `${index * 50}%`
                            ]}
                            scaleY={[1, 1.5, 'easeInQuad']}>
                            <li>
                                <CheckCircleOutlineIcon htmlColor='green' /> {i}
                            </li>
                        </Parallax>
                    )
                    }
                </ul>
                <div className="navbar-nav-scroll flex flex-row  px-2 py-4">
                    <Button variant='outlined' className='!capitalize w-[124px]' onMouseEnter={() => {
                        showComingSoon(true)
                    }}
                        onMouseLeave={() => {
                            showComingSoon(false)
                        }}
                    >{!comingSoon ? "Apply Now" : "Coming Soon"}</Button>
                </div>
            </div>
        </div >
    );
}
