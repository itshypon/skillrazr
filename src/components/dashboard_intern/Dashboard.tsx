import React from 'react';
import Footer from '../Footer';
import "./css/dashboard.css";
import Sidebar from './Sidebar';
import MainDashboard from './MainDashboard';
import RightSide from './RightSide';
function Dashboard(props:any){
    return (
        <div>
        <div className="dashboard">
            <div className="dashboardGlass">
            <Sidebar 
            name="Himanshu" 
            github="https://www.github.com"
            linkedin = "https:www.linkedin.com"
            />
            <MainDashboard />
            <RightSide />
            </div>
        </div>
            <Footer />
        </div>
    );
}

export default Dashboard;