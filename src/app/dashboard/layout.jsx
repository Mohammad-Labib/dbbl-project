import React from 'react';
import Sidebar from '../components/Dashboard/Sidebar';

const dashboardLayout = ({children}) => {
    return (
        <div className='flex min-h-screen'>
            <Sidebar></Sidebar>
            <div className='flex-1'>{children}</div>
        </div>
    );
};

export default dashboardLayout;