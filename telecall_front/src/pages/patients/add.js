import { Grid } from "@mui/material";
import { Component } from "react";
import MainCard from "ui-component/cards/MainCard";
import PatientForm from "pages/patients/form";
import axios from "axios";
import config from 'config';


class PatientsAdd extends Component {
    constructor(props){
        super(props);
        this.state = {
            info: {
                name: '',
                surname: '',
                phone: '',
                email: '',
                nickname: '',
                diagnosis: '',
                expert_id: 0,
                password: '',
                note: '',
                password: '',
                password_confirmation: '',
                avatar: 'unknown_person.png',
                file: null
            },
            toast: ''
        }
    }

    notificyMessage = (e) => {
        console.log(e);
    }

    handleCallback = async (info) => {
        await this.setState({
            info: info.e
        });
        var user_data = this.state.info;
        var data = new FormData();
        for (let x in user_data){
            data.append(x, user_data[x]);
        }
        data.append('info', data) 
        axios.post(`${config.baseURL}/api/auth/patients`, info.e)
        .then(res => {
            var messages = res.data;
            messages.msg.forEach(async item => {
                this.notificyMessage({
                    status: messages.status,
                    message: item
                })
            });
        })
    }
    render(){
        return (
            <>
            <MainCard title="Danışan Ekle">
                <Grid item xs={12}>
                    <PatientForm
                        info={''}
                        callback={(e) => {
                            this.handleCallback(e);
                        }}
                    />
                </Grid>
            </MainCard>
        </>
        );
    }
}
export default PatientsAdd;