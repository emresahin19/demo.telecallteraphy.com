import { Grid } from "@mui/material";
import { Component } from "react";
import MainCard from "ui-component/cards/MainCard";
import PatientForm from "pages/patients/form";
import axios from "axios";
import config from 'config';


class PatientsEdit extends Component {
    constructor(props){
        super(props);
        this.state = {
            info: {
                id: history.state.usr.userid,
                name: history.state.usr.name,
                surname: history.state.usr.surname,
                nickname: '',
                phone: '',
                email: '',
                nickname: '',
                diagnosis: '',
                expert_id: 0,
                role: 3,
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
            info: info.e,
        });
        axios.put(`${config.baseURL}/api/auth/patients/${this.state.info.id}`, info.e)
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
            <MainCard title={this.state.info.name + ' ' + this.state.info.surname + " Kullanıcısını Düzenle"}>
                <Grid item xs={12}>
                    <PatientForm
                        info={this.state.info}
                        callback={(e) => {
                            this.handleCallback(e);
                        }}
                        id={history.state.usr.userid}
                    />
                </Grid>
            </MainCard>
        </>
        );
    }
}
export default PatientsEdit;