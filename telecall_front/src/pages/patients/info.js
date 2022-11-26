import { 
    Table,
    TableHead,
    TableRow,
    TableBody, 
    TableCell,
    List,
    ListItem,
} from "@mui/material";
import { Component } from "react";
import axios from "axios";
import { cutText } from 'helpers';
import { generatePath, Link } from "react-router-dom";
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
            name: '',
            surname: '',
            phone: '',
            email: '',
            diagnosis: '',
            nickname: '',
            note: '',
            expert_name: '',
            expert_surname: '',
            role: 3,
            password: '',
            password_confirmation: '',
            avatar: 'unknown_person.png',
        }
        this.handleData(this.props.id);
    }

    handleData = async (id) => {
        await axios.get(`${config.baseURL}/api/auth/patients/` + id)
        .then(async res => {
            let response = res.data.data;
            for (let item in response){
                for(let value in this.state){
                    if(value === item){
                        this.setState({
                            [value]: response[item]
                        });
                    }
                }
            }
        });
    }

    render(){
        return (
            <>
            <Table size="small" aria-label="purchases">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell><span style={infoheader}>Kullanıcı Bilgileri</span></TableCell>
                        <TableCell><span style={infoheader}>Eğitim Bilgileri</span></TableCell>
                        <TableCell><span style={infoheader}>Hesap Bilgileri</span></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <div className='avatar-input'>
                                <img 
                                    className="form-avatar" 
                                    alt="anonymous" 
                                    src={'/images/users/' + (this.state.avatar ? this.state.avatar : 'unknown_person.png') }
                                />
                            </div>
                        </TableCell>
                        <TableCell>
                            <List>
                                <ListItem>
                                    <span style={infotitle}>Adı Soyadı: </span> {this.state.name} {this.state.surname}
                                </ListItem>
                                <ListItem>
                                    <span style={infotitle}>Telefon: </span> {this.state.phone}
                                </ListItem>
                                <ListItem>
                                    <span style={infotitle}>E-mail: </span> {this.state.email}
                                </ListItem>
                            </List>
                        </TableCell>
                        <TableCell>
                            <List>
                                <ListItem>
                                    <span style={infotitle}>İlgili Uzman: </span> {this.state.expert_name} {this.state.expert_surname}
                                </ListItem>
                                <ListItem>
                                    <span style={infotitle}>Tanı: </span> {this.state.diagnosis}
                                </ListItem>
                                <ListItem>
                                    <span style={infotitle}>Hakkında: </span> {cutText(this.state.note)}
                                </ListItem>
                            </List>
                        </TableCell>
                        <TableCell>
                            <List>
                                <ListItem>
                                    <span style={infotitle}>Kullanıcı Adı: </span> {this.state.nickname}
                                </ListItem>
                                <ListItem>
                                    <span style={infotitle}>Arşiv: </span>
                                    <Link
                                        to={generatePath('/interviews/:id', { id: this.state.id })}
                                        state={{
                                            userid: this.state.id,
                                        }}
                                        style={{
                                            textDecoration: 'none'
                                        }}
                                        className="link-a"
                                        color={'secondary'}
                                    >
                                        Geçmiş
                                    </Link>
                                </ListItem>
                                <ListItem>
                                    <span style={infotitle}>Aktivasyonu: </span> Yapılmadı
                                </ListItem>
                            </List>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </>
        );
    }
}
export default Info;