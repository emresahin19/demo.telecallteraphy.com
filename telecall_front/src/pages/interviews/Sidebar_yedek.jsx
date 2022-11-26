import React, { useState, useContext } from 'react';
import { Button, Grid } from '@material-ui/core';
import { Phone, PhoneDisabled } from '@material-ui/icons';

import { SocketContext } from './Context';

const Sidebar = ({children}) => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');
  
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
          {setName('aaa')}
          {setIdToCall('aaa')}

          <Button
            color="secondary" 
            variant="contained"
            onClick={() => callUser(idToCall)}
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
