import React, { Component } from "react";
import axios from "axios";
import MainCard from "ui-component/cards/MainCard";
import { gridSpacing } from 'store/constant';
import { IconArrowDownLeft, IconDeviceDesktop, IconPencil, IconScreenShare } from '@tabler/icons';
import {    
    Grid,
    Table,
    TableHead,
    TableRow,
    TableBody, 
    TableCell, 
    Box,
    Collapse,
    IconButton,
    Button
} from '@mui/material';
import { Link } from "react-router-dom";
import { generatePath } from "react-router";
import Info from "pages/patients/info";
import { dateConvert } from 'helpers';
import hash from 'object-hash';
import config from 'config';


function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const room_id = hash(row.name + row.surname + new Date().getTime());
    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} className={open ? "opened-info" : "closed-info"}>
                <TableCell className="mw-10">
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        color="secondary"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <IconArrowDownLeft style={{transform: 'rotate(180deg)', transition: '.1s ease-in-out all'}} /> : <IconArrowDownLeft />}
                    </IconButton>
                </TableCell>
                <TableCell className="mw-20" component="th" scope="row">
                    {row.name} {row.surname}
                </TableCell>
                <TableCell className="mw-20">
                    {row.expert_name} {row.expert_surname}
                </TableCell>
                <TableCell className="mw-20">{dateConvert(row.created_at)}</TableCell>
                <TableCell className="mw-20">
                    <Link
                        aria-label="expand row"
                        size="small"
                        color="secondary" 
                        className="link-a"
                        to={generatePath('/patients/edit/:id', { id: row.id })}
                        state={{
                            userid: row.id,
                            name: row.name,
                            surname: row.surname,
                        }}
                    >
                        <IconPencil className="icon-button" />
                    </Link>
                    <Link
                        aria-label="expand row"
                        size="small"
                        color="secondary" 
                        className="link-a"
                        to={generatePath('/interviews/:id', { id: row.id })}
                        state={{
                            userid: row.id,
                        }}
                    >
                        <IconDeviceDesktop className="icon-button" />
                    </Link>
                    <Link
                        aria-label="expand row"
                        size="small"
                        color="secondary" 
                        className="link-a"
                        to={generatePath('/chat/:id', { id: room_id })}
                    >
                        <IconScreenShare className="icon-button" />
                    </Link>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Info id={row.id} />
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

class Patients extends Component {
    constructor(props){
        super(props);
        this.state = {
            users: [],
            user_data: [],
            info: {},
        }
        this.handleData();
    }
    handleData = () => {
        axios.get(`${config.baseURL}/api/auth/patients`)
        .then(async res => {
            var response = res.data.data;
            var res_arr = [];
            response.forEach(item => {
                res_arr.push(item);
            })
            this.setState({
                users: res_arr
            });
        });
    }

    render(){
        return (
            <>
                <MainCard 
                    title="Danışan Listesi" 
                    secondary={
                        <Link to="/patients/add">
                            <Button 
                                color="secondary" 
                                variant="contained"
                            >
                                Danışan Ekle
                            </Button>
                        </Link>
                    }
                >
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Table aria-label="collapsible table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell className="mw-15" />
                                        <TableCell className="mw-20" style={{fontSize: 16, fontWeight: 600}}>İsim</TableCell>
                                        <TableCell className="mw-20" style={{fontSize: 16, fontWeight: 600}}>İlgili Uzman</TableCell>
                                        <TableCell className="mw-20" style={{fontSize: 16, fontWeight: 600}}>Kayıt Tarihi</TableCell>
                                        <TableCell className="mw-15" style={{fontSize: 16, fontWeight: 600}}>İşlemler</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.users.map((row, index) => (
                                        <Row key={index} row={row} />
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

export default Patients;