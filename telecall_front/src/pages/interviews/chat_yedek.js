import { 
    Button,
    Grid,
    TextField,
} from "@mui/material";
import React, { Component } from "react";
import MainCard from "ui-component/cards/MainCard";
import { gridSpacing } from 'store/constant';
import MUIRichTextEditor from "mui-rte";
import { convertToRaw, EditorState } from "draft-js";
import Webcam from "react-webcam";
import config from 'config';

const content = {"blocks":[{"key":"3n9sh","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}
const videoConstraints = {
    facingMode: "user"
};
const user_id = JSON.parse(localStorage.userData)['id'];
const room_id = window.location.pathname.split('/chat/')[1];
const socket = io(`${config.socketURL}?id=${user_id}&room_id=${room_id}`);
class Chat extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: user_id,
            room_id: room_id,
            generalnote: JSON.stringify(content),
            editorState: EditorState.createEmpty(),
            capturing: false,
            recordedChunks: [],
            download_url: '',
            downloadable: false,
            received_msgs: [],
            send_msgs: [],
            messages: [],
            message: '',
        }
        this.webcamRef = React.createRef(null);
        this.mediaRecorderRef = React.createRef(null);
        this.messageInputRef = React.createRef(null);
        this.messageAreaRef = React.createRef(null);
        this.handleReceive();

    }
    
    componentDidMount(){
        this.messageInputRef.current.addEventListener('keydown', (e) => {
            if(e.code === 'Enter'){
                this.handleSend();
            }
        })
    }

    handleStartCaptureClick = () => {
        this.setState({
            capturing: true
        });
        this.mediaRecorderRef.current = new MediaRecorder(this.webcamRef.current.stream, {
          mimeType: "video/webm"
        });
        this.mediaRecorderRef.current.addEventListener(
          "dataavailable",
          this.handleDataAvailable
        );
        this.mediaRecorderRef.current.start();
    }

    handleDataAvailable = async ({ data }) => {
        if (data.size > 0) {
            this.setState(prevState => ({
                recordedChunks:[
                    ...prevState.recordedChunks,
                    data
                ],
                downloadable: true,
            }));
        }
    }

    handleStopCaptureClick = () => {
        this.mediaRecorderRef.current.stop();
        this.setState({
            capturing: false
        });
    }

    handleDownload = () => {
        if (this.state.recordedChunks != null) {
            const blob = new Blob(this.state.recordedChunks, {
                type: "video/webm"
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            a.href = url;
            a.download = "react-webcam-stream-capture.webm";
            a.click();
            window.URL.revokeObjectURL(url);
            this.setState({
                download_url: url,
                recordedChunks: {data: {}},
                // downloadable: false,
            });
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
    }

    logContentState = () => {
        convertToRaw(this.state.editorState.getCurrentContent())
    }

    handleChat = (e) => {
        this.setState({
            message: e.target.value,
        })
    }

    handleSend = () => {
        socket.emit("message", {
            mesaj: `${this.state.message}`,
            id: `${socket.id}`,
            room_id: this.state.room_id
        });

        let new_message = {
            type: 'send',
            msg: this.state.message
        }
        this.setState({
            messages: [...this.state.messages, new_message],
            message: '',
        })
        this.messageAreaRef.current.scrollTo({
            top: 1000,
            behavior: 'smooth'
        });
    }
    
    handleReceive = async () => {
        socket.on('private message', (msg) => {
            let new_message = {
                type: 'receive',
                msg: msg.mesaj
            }
            this.setState({
                messages: [...this.state.messages, new_message]
            })
            this.messageAreaRef.current.scrollTo({
                top: 1000,
                behavior: 'smooth'
            });
        })
        socket.emit("video connect", {
            id: this.state.id,
            room_id: this.state.room_id
        });
    }

    render(){
        return (
            <>
                <MainCard title="Görüşme">
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={6}>
                            <Grid item xs={12} className="chat-area">
                                <ul ref={this.messageAreaRef}>
                                    {this.state.messages.map((item, index) => {
                                        return <li key={index} className={item.type + "-message-side message-ballon"}>{item.msg}</li>;
                                    })}
                                </ul>
                            </Grid>
                            <Grid item xs={12} className="message-send-area">
                                <TextField
                                    label={'Adı'}
                                    id="filled-size-small"
                                    size="small"
                                    variant="outlined"
                                    color={'secondary'}
                                    value={this.state.message}
                                    onChange={this.handleChat}
                                    name={'name'}
                                    ref={this.messageInputRef}
                                    autoComplete='false'
                                />
                                <Button
                                    color="secondary" 
                                    variant="contained"
                                    style={{marginLeft: 4}}
                                    onClick={this.handleSend}
                                >
                                    Gönder
                                </Button>
                            </Grid>
                            
                        </Grid>
                        <Grid item xs={6} 
                            className="camera-view" 
                            style={{
                                transform: 'rotateY(180deg)',
                                padding: '2%'
                            }}>
                            <Webcam
                                videoConstraints={videoConstraints}
                                ref={this.webcamRef}
                                width={'100%'}
                                height={'auto'}
                                audio={true}
                                className="camera-view"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            {this.state.capturing ? (
                                <Button
                                    color="secondary" 
                                    variant="contained"
                                    onClick={this.handleStopCaptureClick}
                                >
                                    Kaydı Durdur
                                </Button>
                            ) : (
                                <Button
                                    color="secondary" 
                                    variant="contained"
                                    onClick={this.handleStartCaptureClick}
                                >
                                    Kayda Başla
                                </Button>
                            )}
                            {this.state.downloadable ? 
                                (<Button
                                    color="secondary" 
                                    variant="contained"
                                    style={{marginLeft: 4}}
                                    onClick={this.handleDownload}
                                >
                                    İndir
                                </Button>
                                ) : ('')
                            }
                        </Grid>
                        <Grid item xs={12} style={{minHeight: 300}}>
                            <MUIRichTextEditor 
                                label={'Danışan Hakkında Notlar'}
                                defaultValue={this.state.generalnote}
                                onChange={this.handleEditor}
                                inlineToolbar={true}
                                onSave={this.handleSave}
                            />
                        </Grid>
                    </Grid>
                </MainCard>
            </>
        );
    }
}
export default Chat;