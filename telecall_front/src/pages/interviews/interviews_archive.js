import React, { Component } from "react";
import axios from "axios";
import MainCard from "ui-component/cards/MainCard";
import { gridSpacing } from 'store/constant';
import { IconArrowDownLeft, IconScreenShare } from '@tabler/icons';
import {    
    Grid,
    Table,
    TableHead,
    TableRow,
    TableBody, 
    TableCell, 
} from '@mui/material';
import { generatePath, Link } from "react-router-dom";
import { CutAndGlueText, dateConvert } from 'helpers';
import config from 'config';


class InterviewsArchive extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: history.state.usr.userid,
            users: [],
        }
        this.handleData();
    }
    handleData = () => {
        axios.get(`${config.baseURL}/api/auth/interviews/details/`+ this.state.id)
        .then(res => {
            this.setState({
                users: res.data.data,
            })
        })
    }

    render(){
        return (
            <>
                <MainCard title="Eski Görüşmeler">
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Table aria-label="collapsible table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell className="mw-10" style={{fontSize: 16, fontWeight: 600}}></TableCell>
                                        <TableCell className="mw-20" style={{fontSize: 16, fontWeight: 600}}>Danışan</TableCell>
                                        <TableCell className="mw-20" style={{fontSize: 16, fontWeight: 600}}>Uzman</TableCell>
                                        <TableCell className="mw-20" style={{fontSize: 16, fontWeight: 600}}>Video Notu</TableCell>
                                        <TableCell className="mw-20" style={{fontSize: 16, fontWeight: 600}}>Tarih</TableCell>
                                        <TableCell className="mw-10" style={{fontSize: 16, fontWeight: 600}}>İşlemler</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.users.map((row, index) => (
                                        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} key={index}>
                                            <TableCell className="mw-10">
                                               
                                            </TableCell>
                                            <TableCell className="mw-20">
                                                <Link
                                                    to={generatePath('/patients/edit/:id', { id: row.patient_id })}
                                                    state={{
                                                        userid: row.patient_id,
                                                        name: row.patient_name,
                                                        surname: row.patient_surname,
                                                    }}
                                                    className="link-a black"
                                                >
                                                    {row.patient_name} {row.patient_surname}
                                                </Link>
                                            </TableCell>
                                            <TableCell className="mw-20" component="th" scope="row">
                                                <Link
                                                    to={generatePath('/experts/edit/:id', { id: row.patient_id })}
                                                    state={{
                                                        userid: row.expert_id,
                                                        name: row.expert_name,
                                                        surname: row.expert_surname,
                                                    }}
                                                    className="link-a black"
                                                >
                                                    {row.expert_name} {row.expert_surname}
                                                </Link>
                                            </TableCell>
                                            <TableCell className="mw-20">
                                                <CutAndGlueText text={row.video_note} />
                                            </TableCell>
                                            <TableCell className="mw-20">
                                                {dateConvert(row.date)}
                                            </TableCell>
                                            <TableCell className="mw-10">
                                                <Link
                                                    aria-label="expand row"
                                                    size="small"
                                                    color="secondary" 
                                                    className="link-a"
                                                    to={generatePath('/screen/:id', { id: row.id })}
                                                    state={{
                                                        id: row.id,
                                                    }}
                                                >
                                                    <IconScreenShare />
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>
                </MainCard>
            </>
        );
    }
}

export default InterviewsArchive;