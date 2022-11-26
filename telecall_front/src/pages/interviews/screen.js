import { 
    Table,
    TableHead,
    TableRow,
    TableBody, 
    TableCell,
    List,
    ListItem,
    Grid,
} from "@mui/material";
import { Component } from "react";
import { CutAndGlueText, dateConvert, timeConvert } from 'helpers';
import axios from "axios";
import MainCard from "ui-component/cards/MainCard";
import { gridSpacing } from 'store/constant';
import { Player } from 'video-react';
import MUIRichTextEditor from "mui-rte";
import { convertToRaw, EditorState } from "draft-js";
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
//const content = '{"blocks":[{"key":"7po5","text":"My Title","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"apv19","text":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi:","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":6,"length":5,"style":"BOLD"},{"offset":192,"length":16,"style":"UNDERLINE"},{"offset":261,"length":21,"style":"ITALIC"}],"entityRanges":[],"data":{}},{"key":"5sea5","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"57hbe","text":"Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet.","type":"blockquote","depth":0,"inlineStyleRanges":[{"offset":34,"length":17,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"9ijl2","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"98bf8","text":"print(\\"OK\\")","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"al2ij","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"d4no","text":"Visit this link!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":6,"length":9,"key":0}],"data":{}}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"https://github.com/niuware"}}}}'
const content = {"blocks":[{"key":"3n9sh","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}

class Screen extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: history.state.usr.id,
            expert_name_surname: '',
            patient_name_surname: '',
            avatar: '',
            email: '',
            phone: '',
            expert_id: 0,
            patient_id: 0,
            diagnosis: '',
            note: '',
            patient_note: '',
            video_note: '',
            generalnote: JSON.stringify(content),
            date: '',
            created_at: '',
            video_time: null,
            note_bool: false,
            videonot_bool: false,
            editorState: EditorState.createEmpty(),
        }
    }

    componentDidMount(){
        this.handleData();
    }

    handleData = async () => {
        let response = [];
        await axios.get(`${config.baseURL}/api/auth/interviews/${this.state.id}`)
        .then(res => {
            response = res.data.data
        })
        for (let item in response){
            for(let value in this.state){
                if(value === item){
                    this.setState({
                        [value]: response[item]
                    });
                }
                else if(value == 'date'){
                    this.setState({
                        date: dateConvert(response['created_at'])
                    });
                }
                else if(value === 'expert_name_surname'){
                    this.setState({
                        expert_name_surname: response['expert_name'] + ' ' + response['expert_surname']
                    });
                }
                else if(value === 'patient_name_surname'){
                    this.setState({
                        patient_name_surname: response['patient_name'] + ' ' + response['patient_surname']
                    });
                }
                // else if(value === 'generalnote'){
                //     this.setState({
                //         generalnote: response['general_note']
                //     });
                // }
            }
        }
    }
    
    handleEditor = async (editorState) => {
        await this.setState(
            { editorState },
            this.logContentState()
        )
    }

    handleSave = (e) => {
        let data = new FormData();
        data.append('id', this.state.id);
        data.append('general_note', JSON.stringify(e));

        axios.post(`${config.baseURL}/api/auth/interviews/edit`, { id: this.state.id, general_note: e})
        .then(res => {
            console.log(res.data);
        })
    }

    logContentState = () => {
        convertToRaw(this.state.editorState.getCurrentContent())
    }

    render(){
        return (
            <>
                <MainCard title="Seanslar">
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell className="mw-10"></TableCell>
                                        <TableCell className="mw-30"><span style={infoheader}>Danışan Bilgileri</span></TableCell>
                                        <TableCell className="mw-30"><span style={infoheader}>Seans Bilgileri</span></TableCell>
                                        <TableCell className="mw-30"><span style={infoheader}>Seans</span></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow className="info-table">
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
                                                    <span style={infotitle}>Adı Soyadı: </span> {this.state.patient_name_surname}
                                                </ListItem>
                                                <ListItem>
                                                    <span style={infotitle}>Telefon: </span> {this.state.phone}
                                                </ListItem>
                                                <ListItem>
                                                    <span style={infotitle}>E-mail: </span> {this.state.email}
                                                </ListItem>
                                                <ListItem>
                                                    <span style={infotitle}>Uzman: </span> {this.state.expert_name_surname}
                                                </ListItem>
                                            </List>
                                        </TableCell>
                                        <TableCell>
                                            <List>
                                                <ListItem>
                                                    <span style={infotitle}>Kayıt Tarihi: </span> {this.state.date}
                                                </ListItem>
                                                <ListItem>
                                                    <span style={infotitle}>Tanı: </span> {this.state.diagnosis}
                                                </ListItem>
                                                <ListItem>
                                                    <span style={infotitle}>Hakkında: </span> 
                                                    <CutAndGlueText text={this.state.note} />
                                                </ListItem>
                                            </List>
                                        </TableCell>
                                        <TableCell>
                                            <List>
                                                <ListItem>
                                                    <span style={infotitle}>Tarih: </span> {dateConvert(this.state.created_at)}
                                                </ListItem>
                                                <ListItem>
                                                    <span style={infotitle}>Seans Süresi: </span> {timeConvert(this.state.video_time)}
                                                </ListItem>
                                                <ListItem>
                                                    <span style={infotitle}>Video Notu: </span> 
                                                    <CutAndGlueText text={this.state.video_note} />
                                                </ListItem>
                                            </List>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Grid>
                        <Grid item xs={4}>
                            <MUIRichTextEditor 
                                label={'Danışan Hakkında Notlar'}
                                defaultValue={this.state.generalnote}
                                onChange={this.handleEditor}
                                inlineToolbar={true}
                                onSave={this.handleSave}
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <Player>
                                <source src={'../video/videobg_3.mp4'}></source>
                            </Player>
                        </Grid>
                    </Grid>
                </MainCard>
            </>
        );
    }
}
export default Screen;