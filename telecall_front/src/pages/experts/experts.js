import React, { Component } from "react";
import axios from "axios";
import MainCard from "ui-component/cards/MainCard";
import { gridSpacing } from 'store/constant';
import { IconArrowDownLeft, IconPencil } from '@tabler/icons';
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
import Info from "pages/experts/info";
import { dateConvert } from 'helpers';
import config from 'config';


function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    // let location = useLocation();
    // let navigate = useNavigate();
    // navigate("/users/123", { state: partialUser });
    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} className={open ? "opened-info" : "closed-info"}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        color="secondary"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <IconArrowDownLeft style={{transform: 'rotate(180deg)', transition: '.1s ease-in-out all'}} /> : <IconArrowDownLeft />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name} {row.surname}
                </TableCell>
                <TableCell>{row.specialist}</TableCell>
                <TableCell>{dateConvert(row.created_at)}</TableCell>
                <TableCell>
                    <Link
                        aria-label="expand row"
                        size="small"
                        color="secondary" 
                        className="link-a"
                        to={generatePath('/experts/edit/:id', { id: row.id })}
                        state={{
                            userid: row.id,
                            name: row.name,
                            surname: row.surname,
                        }}
                    >
                        <IconPencil />
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

class Experts extends Component {
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
        axios.get(`${config.baseURL}/api/auth/experts`)
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
                    title="Uzman Listesi" 
                    secondary={
                        <Link to="/experts/add">
                            <Button 
                                color="secondary" 
                                variant="contained"
                            >
                                Uzman Ekle
                            </Button>
                        </Link>
                    }
                >
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Table aria-label="collapsible table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell />
                                        <TableCell style={{fontSize: 16, fontWeight: 600}}>İsim</TableCell>
                                        <TableCell style={{fontSize: 16, fontWeight: 600}}>Uzmanlık</TableCell>
                                        <TableCell style={{fontSize: 16, fontWeight: 600}}>Kayıt Tarihi</TableCell>
                                        <TableCell style={{fontSize: 16, fontWeight: 600}}>İşlemler</TableCell>
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

export default Experts;