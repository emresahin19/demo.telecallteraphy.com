import { 
    Table,
    TableHead,
    TableRow,
    TableBody, 
    TableCell,
} from "@mui/material";
import { Component } from "react";
import axios from "axios";
import { generatePath, Link } from "react-router-dom";
import { IconScreenShare } from "@tabler/icons";
import { CutAndGlueText, dateConvert } from "helpers";
import config from 'config';


const infotitle = {
    minWidth: 100,
    marginRight: 2,
    fontWeight: 600,
    display: 'flex',
}
const infoheader = {
    minWidth: 100,
    fontWeight: 600,
    display: 'flex',
    margin: '0 2px 0 16px'
}
class Info extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: this.props.id,
            date: '',
            expert_name: '',
            expert_surname: '',
            video_note: '',
            interviews: [],
        }
        this.handleData(this.props.id);
    }

    handleData = async (id) => {
        axios.get(`${config.baseURL}/api/auth/interviews/details/` + id)
        .then(async res => {
            this.setState({
                interviews: res.data.data,
            })
        });
    }

    render(){
        return (
            <>
            <Table size="small" aria-label="purchases">
                <TableBody>
                    {this.state.interviews.map((interview, index) => {
                        return (
                            <TableRow key={index}>
                                <TableCell className="mw-10">
                                    
                                </TableCell>
                                <TableCell className="mw-20">
                                    {interview.patient_name} {interview.patient_surname}
                                </TableCell>
                                <TableCell className="mw-20">
                                    {interview.expert_name} {interview.expert_surname}
                                </TableCell>
                                <TableCell className="mw-20">
                                    <CutAndGlueText text={interview.video_note} />
                                </TableCell>
                                <TableCell className="mw-20">
                                    {dateConvert(interview.date)}
                                </TableCell>
                                <TableCell className="mw-10">
                                    <Link
                                        aria-label="expand row"
                                        size="small"
                                        color="secondary" 
                                        className="link-a"
                                        to={generatePath('/screen/:id', { id: interview.id })}
                                        state={{
                                            id: interview.id,
                                        }}
                                    >
                                        <IconScreenShare />
                                    </Link>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </>
        );
    }
}
export default Info;