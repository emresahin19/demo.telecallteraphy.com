import { 
    Grid, 
    TextField, 
    InputLabel,
    MenuItem,
    FormControl, 
    Button
} from "@mui/material";
import React, { Component } from "react";
import SubCard from "ui-component/cards/SubCard";
import { Box } from "@mui/system";
import { IMaskInput } from 'react-imask';
import PropTypes from 'prop-types';
import { IconButton, InputAdornment } from '@mui/material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import Select from '@mui/material/Select';
import axios from "axios";
import config from 'config';


const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="(#00) 000 00 00"
        definitions={{
          '#': /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
});
  
TextMaskCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

class PatientsForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            info: {
                id: 0,
                name: '',
                surname: '',
                phone: '',
                email: '',
                job: '',
                diagnosis: '',
                expert_id: '',
                nickname: '',
                role: 3,
                note: '',
                password: '',
                password_confirmation: '',
                experts: [],
                avatar: 'unknown_person.png',
                file: null
            },
            showPassword: false,
            showrePassword: false,
            toast: null,
        }
    }

    componentDidMount(){
        axios.get(`${config.baseURL}/api/auth/patients`)
        .then(res => {
            this.handleState('experts', res.data.experts)
        })
        if(this.props.id > 0){
            this.setState({
                id: this.props.id,
            })
            this.handleData(this.props.id);
        }
    }

    handleData = (id) => {
        axios.get(`${config.baseURL}/api/auth/patients/` + id)
        .then(async res => {
            let response = res.data.data;
            for (let item in response){
                for(let value in this.state.info){
                    if(value === item){
                        this.handleState(value, response[item])
                    }
                }
                
            }
        });
    }

    handleChange = (e) => {
        this.handleState(e.target.name, e.target.value)
    }

    handleState = async (value, item) => {
        await this.setState(prevState => ({
            info:{
                ...prevState.info,
                [value]: item
            }
        }));
    }

    handleFileChange = (e) => {
        this.setState(prevState => ({
            info:{
              ...prevState.info,
              avatar: e.target.files[0]['name'],
              file: e.target.files[0]
            }
        }));
    }

    handleClickShowPassword = (re) => {
        if(re){
            this.setState({
                showrePassword: !this.state.showrePassword,
            })
        }
        else {
            this.setState({
                showPassword: !this.state.showPassword,
            })
        }
    }

    handleSubmit = () => {
        this.props.callback({e: this.state.info});
    }

    render(){
        return (
            <>
                <Grid item xs={12}>
                    <SubCard title="Kişisel Bilgiler"
                        sx={{
                            '& .MuiCardContent-root': { 
                                display: 'flex'
                            },
                        }}
                    >
                        <Grid item xs={10}>
                            <Box 
                                sx={{
                                    '& .MuiTextField-root': { 
                                        m: '1%', 
                                        width: '48%',
                                    },
                                }}
                                autoComplete="off"
                            >
                                <TextField
                                    label={'Adı'}
                                    id="filled-size-small"
                                    size="small"
                                    variant="outlined"
                                    color={'secondary'}
                                    value={this.state.info.name}
                                    onChange={this.handleChange}
                                    name={'name'}
                                />
                                <TextField
                                    label={'Soyadı'}
                                    id="filled-size-small"
                                    size="small"
                                    variant="outlined"
                                    color={'secondary'}
                                    value={this.state.info.surname}
                                    onChange={this.handleChange}
                                    name={'surname'}
                                />
                            </Box>
                            <Box
                                sx={{
                                    '& .MuiTextField-root': { 
                                        m: '1%', 
                                        width: '48%',
                                    },
                                }}
                                autoComplete="off"
                            >
                                <TextField
                                    size="small"
                                    variant="outlined"
                                    color={'secondary'}
                                    label={'Telefon'}
                                    value={this.state.info.phone}
                                    onChange={this.handleChange}
                                    name={'phone'}
                                    id="formatted-text-mask-input"
                                    InputProps={{
                                        inputComponent: TextMaskCustom,
                                    }}
                                />
                                <TextField
                                    id="filled-size-small"
                                    size="small"
                                    variant="outlined"
                                    color={'secondary'}
                                    label={'E-mail'}
                                    value={this.state.info.email}
                                    onChange={this.handleChange}
                                    name={'email'}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <div className='avatar-input'>
                                <input type="file" name="avatar" />
                                <img 
                                    className="form-avatar" 
                                    alt="anonymous" 
                                    src={'/images/users/' + (this.state.info.avatar ? this.state.info.avatar : 'unknown_person.png') }
                                />
                            </div>
                        </Grid>
                    </SubCard>
                </Grid>
                <Grid item xs={12}>
                    <SubCard title="Klinik Bilgileri"
                        sx={{
                            '& .MuiCardContent-root': { 
                                display: 'flex'
                            },
                        }}
                    >
                        <Grid item xs={12}>
                            <Box 
                                sx={{
                                    '& .MuiTextField-root': { 
                                        m: '1%', 
                                        width: '48%',
                                    },
                                }}
                                autoComplete="off"
                            >
                                <TextField
                                    size="small"
                                    variant="outlined"
                                    color={'secondary'}
                                    label={'Tanı'}
                                    id="filled-size-small"
                                    value={this.state.info.diagnosis}
                                    onChange={this.handleChange}
                                    name={'diagnosis'}
                                />
                                <FormControl sx={{ m: '1%', minWidth: '47.5%' }} size="small">
                                    <InputLabel id="role-select-small" color={'secondary'}>İlgili Uzman</InputLabel>
                                    <Select
                                        labelId="role-select-small"
                                        id="role-select-small"
                                        size="small"
                                        variant="outlined"
                                        label={'İlgili Uzman'}
                                        color={'secondary'}
                                        name={'expert_id'}
                                        value={this.state.info.expert_id}
                                        onChange={this.handleChange}
                                    >
                                        {this.state.info.experts.map(item => {
                                            return (
                                                <MenuItem key={item.id} value={item.id}>{item.name} {item.surname}</MenuItem>
                                            )
                                        })}
                                        
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box 
                                sx={{
                                    '& .MuiTextField-root': { 
                                        m: '1%', 
                                        width: '97.6%',
                                    },
                                }}
                                autoComplete="off"
                            >
                                <TextField
                                    size="small"
                                    variant="outlined"
                                    color={'secondary'}
                                    label={'Not'}
                                    id="filled-size-small"
                                    value={this.state.info.note}
                                    onChange={this.handleChange}
                                    name={'note'}
                                    rows={2}
                                    multiline
                                />
                            </Box>
                        </Grid>
                    </SubCard>
                </Grid>
                <Grid item xs={12}>
                    <SubCard title="Hesap Bilgileri"
                        sx={{
                            '& .MuiCardContent-root': { 
                                display: 'flex'
                            },
                        }}
                    >
                        <Grid item xs={12}>
                            <Box 
                                sx={{
                                    '& .MuiTextField-root': { 
                                        m: '1%', 
                                        width: '48%',
                                    },
                                }}
                                autoComplete="off"
                            >
                                <TextField
                                    size="small"
                                    variant="outlined"
                                    color={'secondary'}
                                    label={'Kullanıcı Adı'}
                                    id="filled-size-small"
                                    value={this.state.info.nickname}
                                    onChange={this.handleChange}
                                    name={'nickname'}
                                />
                                <FormControl sx={{ m: '1%', minWidth: '47.5%' }} size="small">
                                    <InputLabel id="role-select-small" color={'secondary'}>Rol</InputLabel>
                                    <Select
                                        labelId="role-select-small"
                                        id="role-select-small"
                                        size="small"
                                        variant="outlined"
                                        label={'Rol'}
                                        color={'secondary'}
                                        name={'role'}
                                        value={3}
                                        disabled={true}
                                    >
                                        <MenuItem value={0}>Admin</MenuItem>
                                        <MenuItem value={1}>Supervisor</MenuItem>
                                        <MenuItem value={2}>Uzman</MenuItem>
                                        <MenuItem value={3}>Danışan</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box 
                                sx={{
                                    '& .MuiTextField-root': { 
                                        m: '1%', 
                                        width: '48%',
                                    },
                                }}
                            >
                                <TextField
                                    size="small"
                                    variant="outlined"
                                    color={'secondary'}
                                    id="adornment-password"
                                    type={this.state.showPassword ? 'text' : 'password'}
                                    value={this.props.id ? '' : this.state.info.password}
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
                                    disabled={this.props.id ? true : false}
                                />
                                <TextField
                                    size="small"
                                    variant="outlined"
                                    color={'secondary'}
                                    label={'Şifre Tekrarı'}
                                    id="adornment-password_confirmation"
                                    type={this.state.showrePassword ? 'text' : 'password'}
                                    value={this.props.id ? '' : this.state.info.password_confirmation}
                                    onChange={this.handleChange}
                                    name={'password_confirmation'}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="Toggle password visibility"
                                                    onClick={this.handleClickShowPassword.bind(this, true)}
                                                >
                                                    {this.state.showrePassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    disabled={this.props.id ? true : false}
                                />
                            </Box>
                        </Grid>
                    </SubCard>
                </Grid>
                <Button
                    color="secondary" 
                    variant="contained"
                    onClick={this.handleSubmit}
                >
                    Kaydet
                </Button>
            </>
        );
    }
}
export default PatientsForm;