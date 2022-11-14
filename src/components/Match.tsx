import React from 'react';
import logo from "../assets/images/SkillRazr.svg";

import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';


export const Match = () => {
    const matches = [
        {p1: 'Dudul', p1Score: "6/2 in 1.3 (3) overs",  p2: 'Tukuna', p2Score: '7/1 in 1.5 overs', winner: 'Tukuna'},
        {p1: 'Dudul', p1Score: "20/2 in 2.4 (3) overs",  p2: 'Tukuna', p2Score: '21/1 in 2.5 overs', winner: 'Tukuna'},
        {p1: 'Tukuna', p1Score: "4/2 in 1.3 (3) overs",  p2: 'Dudul', p2Score: '7/1 in 1.1 overs', winner: 'Dudul'},
        {p1: 'Tukuna', p1Score: "18/1 in 3.0 (3) overs",  p2: 'Dudul', p2Score: '19/1 in 2.5 overs', winner: 'Dudul'},
    ]
    return (
        <div className='relative pb-4'>
        <div style={{padding: '20px'}} className='mt-[320px] sm:mt-[200px] flex align-center items-center flex-col'>
            <div className='py-2 text-6xl'>GPL</div>
            <h2 className='py-2 text-4xl mt-2'>Final Cricket Match</h2>
            <div className='py-2 text-2xl'>Tukuna Vs Dudul</div>
            <div className='py-2 text-2xl'>Govindpur - 14/11/2022</div>
            <div className='py-2 text-2xl mt-4'>Sponsored by <img src={logo} alt='logo' width={'160px'} /></div>
        </div>

        {matches.map((m, index) => {
            return <div className={`static sm:absolute border-[1px] border-black rounded p-2 gpl-${index}`}>
                <div className='text-2xl border-b'>Match {index + 1}</div>
                <div className='text-xl'>P1- {m.p1}</div>
                <div>{m.p1Score}</div>
                <br/>
                <div className='text-xl'>P2- {m.p2}</div>
                <div>{m.p2Score}</div>
                <div className='text-green-500'><EmojiEventsIcon /> {m.winner}</div>
            </div>
        })}
        </div>
    );
};
