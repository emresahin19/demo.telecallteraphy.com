import { Grid } from "@mui/material";
import { Component } from "react";
import MainCard from "ui-component/cards/MainCard";
import ExpertForm from "pages/experts/form";
import axios from "axios";
import config from 'config';


class ExpertsEdit extends Component {
    constructor(props){
        super(props);
        this.state = {
            info: {
                id: history.state.usr.userid,
                name: history.state.usr.name,
                surname: history.state.usr.surname,
                phone: '',
                email: '',
                job: '',
                specialist: '',
                education: '',
                school: '',
                graduate: '',
                nickname: '',
                role: 0,
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
        axios.put(`${config.baseURL}/api/auth/experts/${this.state.info.id}`, info.e)
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
                    <ExpertForm
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
export default ExpertsEdit;