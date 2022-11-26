import React, { useState, useContext } from 'react';
import { Button, Grid } from '@material-ui/core';
import { Phone, PhoneDisabled } from '@material-ui/icons';

import { SocketContext } from './Context';

const Sidebar = ({children}) => {
  const { me, callAccepted, callEnded, leaveCall, callUser } = useContext(SocketContext);
  console.log(me);
  return (

      <Grid item xs={12} md={6}>
        {callAccepted && !callEnded ? (
         
          <Button
            color="secondary" 
            variant="contained"
            onClick={leaveCall}
            startIcon={<PhoneDisabled fontSize="large" />} 
          >
            Konuşmayı Bitir
          </Button>
        ) : (
          <>
          <Button
            color="secondary" 
            variant="contained"
            onClick={() => callUser(me)}
            startIcon={<Phone fontSize="large" />} 
          >
            Ara
          </Button>
          </>
        )}
        {children}
      </Grid>
  );
};

export default Sidebar;
