import React, { useContext } from 'react';
import { Button } from '@material-ui/core';

import { SocketContext } from './Context';

const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);

  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <>
          <h1>{call.name} arıyor</h1>
          <Button
            color="secondary" 
            variant="contained"
            onClick={answerCall}
          >
            Cevapla
          </Button>
        </>
      )}
    </>
  );
};

export default Notifications;
