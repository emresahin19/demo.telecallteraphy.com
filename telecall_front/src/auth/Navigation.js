import React, {Component} from 'react';
import axios from 'axios';
import config from 'config';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            logout: this.props.logout,
            user: localStorage.getItem('loggedInTime'),
        };
    }

    handleLogout = () => {
        this.revokeAccessToken();
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userData');
        localStorage.removeItem('loggedInTime');
        // this.props.history.push('/login');
    };

    componentDidUpdate = () => {
        this.updateLocalDetails();
    };

    UNSAFE_componentWillMount = () => {
        this.updateLocalDetails();
    };

    updateLocalDetails = () => {
        let userData = localStorage.getItem('userData');
        userData = JSON.parse(userData);
        if (userData) {
            console.log(userData.access_token)
            if (Object.keys(userData).length > 0) {
                let lastLoggedInTime = localStorage.getItem('loggedInTime');
                let now = (new Date()).getTime();
                let rememberMe = localStorage.getItem('isRemember');
                if ((rememberMe !== 'true' && (now - lastLoggedInTime) > (10000*60*24)) || this.props.logout) // if user doesn't perform any activity in 24 minutes than log him/her out.
                    this.handleLogout();

                if (axios.defaults.headers.common['Authorization'] == undefined) {
                    axios.defaults.headers.common['Accept'] = 'application/json';
                    axios.defaults.headers.common['Authorization'] = 'Bearer '+ userData.access_token;
                }
                localStorage.setItem('loggedInTime', (new Date()).getTime());

                if (this.state.name == '')
                    this.setState({name: userData.name || 'Anonymous'})
            } else {
                this.handleLogout();
            }
        }
    };

    revokeAccessToken = () => {
        axios.get(`${config.baseURL}/api/auth/logout`, {token: 'token'})
        .then((response) => {
            console.log(response);
        }).catch((err) => {
            console.log(err);
        });
    };

    render() {
        return (
            <>
                <a className="nav-link" href="#" 
                onClick={this.handleLogout}
                style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'flex',
                }}>Logout</a>
                       
            </>
        );
    }
}

export default Navigation;
