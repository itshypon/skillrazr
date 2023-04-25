import React from 'react';
import './css/MainDashboard.css';
import Cards from './Cards';
import Table from './Table';

function MainDashboard(){
    return (
        <div className='MainDash'>
                <h1>Dashboard</h1>
                <Cards />
                <Table />
        </div>
    )
}

export default MainDashboard;