import React, { useContext } from 'react';
import { Grid } from '@material-ui/core';

import { SocketContext } from './Context';


const VideoPlayer = () => {
  const { callAccepted, myVideo, userVideo, callEnded, stream } = useContext(SocketContext);

  return (
    <Grid container>
      {stream && (
          <Grid item xs={12} md={6}>
            <video muted ref={myVideo} autoPlay className="camera-view" >
              <track src="captions_en.vtt" kind="captions" srcLang="en" label="english_captions" />
            </video>
          </Grid>
      )}
      {callAccepted && !callEnded && (
          <Grid item xs={12} md={6}>
            <video playsInline ref={userVideo} autoPlay className="camera-view" >
              <track src="captions_en.vtt" kind="captions" srcLang="en" label="english_captions" />
            </video>
          </Grid>
      )}
    </Grid>
  );
};

export default VideoPlayer;
