import React from "react";
import Navbar from '../component/Navbar';

const AppLayout = ({ children }) => {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
};

export default AppLayout;