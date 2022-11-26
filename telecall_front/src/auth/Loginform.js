import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Component } from 'react';
import axios from 'axios';
import config from 'config';

class Loginform extends Component {
    constructor(props){
        super(props);
        this.isLoggedIn();
        this.state = {
            email: '',
            password: '',
            isRemember: false,
            showPassword: false,
            isRemember: false,
            isEmailValid: false,
            error: '',
            local_url: ''
        }
    }

    componentDidUpdate() {
        this.isLoggedIn();
    }

    isLoggedIn = () => {
        let isAuthenticated = localStorage.getItem('isAuthenticated');
        if (isAuthenticated && isAuthenticated === 'true') {
            let from = '/';
            return window.location.href = from;
        }
    };

    persistUserDetails = (data) => {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userData', JSON.stringify(data));
        localStorage.setItem('isRemember', this.state.isRemember ? 'true' : 'false');
        localStorage.setItem('loggedInTime', (new Date()).getTime());
        axios.defaults.headers.common['Accept'] = 'application/json';
        axios.defaults.headers.common['Authorization'] = 'Bearer '+ data.access_token;
        this.isLoggedIn();
    };

    handleClickShowPassword = (re) => {
        this.setState({
            showPassword: !this.state.showPassword,
        });
    }

    handleChange = (e) => {
        this.setState(prevState => ({
            [e.target.name]: e.target.value
        }));
    }

    handleSubmit = () => {
        axios.post(`${config.baseURL}/api/login`, {
            password: this.state.password,
            email:    this.state.email
        })
        .then((response) => {
            if (response.data.status === true){
                this.persistUserDetails(response.data);
                this.isLoggedIn();
            }
            else {
                console.log(response.data.message, 'Error');
                this.setState({
                    error: response.data.message
                })
            }
        });
    }
    render(){
        return (
            <>
                <Box 
                    sx={{
                        '& .MuiTextField-root': { 
                            m: '1%', 
                            width: '100%',
                        },
                    }}
                    autoComplete="off"
                >
                    <TextField
                        id="filled-size-small"
                        size="small"
                        variant="outlined"
                        color={'secondary'}
                        label={'E-mail'}
                        value={this.state.email}
                        onChange={this.handleChange}
                        name={'email'}
                    />
                </Box>
                <Box 
                    sx={{
                        '& .MuiTextField-root': { 
                            m: '1%', 
                            width: '100%',
                        },
                    }}
                    autoComplete="off"
                >

                    <TextField
                        size="small"
                        variant="outlined"
                        color={'secondary'}
                        id="adornment-password"
                        type={this.state.showPassword ? 'text' : 'password'}
                        value={this.state.password}
                        onChange={this.handleChange}
                        name={'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="Toggle password visibility"
                                        onClick={this.handleClickShowPassword.bind(this, false)}
                                    >
                                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        label={'Şifre'}
                    />
                </Box>
                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.isRemember}
                                onChange={this.handleChange}
                                name="isRemember"
                                color="primary"
                            />
                        }
                        label="Remember me"
                    />
                    <Typography variant="subtitle1" color="secondary" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                        Parolanızı mı unuttunuz?
                        {this.state.error}
                    </Typography>
                </Stack>

                <Box sx={{ mt: 2 }}>
                    <AnimateButton>
                        <Button
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            color="secondary"
                            onClick={this.handleSubmit}
                        >
                            Giriş
                        </Button>
                    </AnimateButton>
                </Box>
            </>
        );
    }
};

export default Loginform;

