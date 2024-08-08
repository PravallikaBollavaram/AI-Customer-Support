// app/page.js

"use client";

import React, { useState } from 'react';
import Interface from './components/interface';
import { IconButton,  
  Box
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';

export default function Home() {
  const [showChat, setShowChat] = useState(false); //State to manage chat visibility
  
  const toggleChat = () => {
    setShowChat(prev => !prev); //toggle showChat state between true and false
    // setHideIcon(true);
  };                                        
  

  return (
    <main>
      {/* Chat support icon */}
      <Box sx={{ position: 'fixed', bottom: 16, right: 16 }}>
        <IconButton color="primary" onClick={toggleChat}>
         { !showChat && <ChatIcon sx={{ fontSize: 80 }} />}
        </IconButton>
      </Box>

      {/* Conditionally render the Interface component */}
      {showChat && <Interface closeChat = {toggleChat}/>}
    </main>
  );
}
