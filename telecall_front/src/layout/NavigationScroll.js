import Login from 'auth/Login';
import PrivateRoute from 'auth/PrivateRoute';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// ==============================|| NAVIGATION SCROLL TO TOP ||============================== //

const NavigationScroll = ({ children }) => {
    const location = useLocation();
    const { pathname } = location;
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, [pathname]);

    const updateLocalDetails = () => {
        let userData = localStorage.getItem('userData');
        if (userData) {
            userData = JSON.parse(userData);
            if (Object.keys(userData).length > 0) {
                
                if (axios.defaults.headers.common['Authorization'] == undefined) {
                    axios.defaults.headers.common['Accept'] = 'application/json';
                    axios.defaults.headers.common['Authorization'] = 'Bearer '+ userData.access_token;
                }

                localStorage.setItem('loggedInTime', (new Date()).getTime());

            } else {
                handleLogout();
            }
        }
    };
    updateLocalDetails();
    
    return <PrivateRoute child={children} /> || <Login/>;
};

NavigationScroll.propTypes = {
    children: PropTypes.node
};

export default NavigationScroll;
