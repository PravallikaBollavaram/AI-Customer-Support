"use client";

import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, TextField, Button, Paper, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { useRouter } from 'next/navigation';

// Component for the header
function Header({ closeChat }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Chatbot</Typography>
        <IconButton edge="end" color="inherit" onClick={closeChat} sx={{ ml: 'auto' }}>
          <CloseIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

// Component for individual message bubble
function MessageBubble({ message, isUser }) {
  return (
    <Box
      sx={{
        backgroundColor: isUser ? 'primary.main' : 'grey.300',
        color: isUser ? 'white' : 'black',
        borderRadius: '16px',
        padding: '8px 16px',
        margin: '4px 0',
        maxWidth: '70%',
        alignSelf: isUser ? 'flex-end' : 'flex-start',
      }}
    >
      {message}
    </Box>
  );
}

export default function Interface() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const router = useRouter();

  const handleSendMessage = () => {
    if (inputText.trim()) {
      setMessages([...messages, { text: inputText, isUser: true }]);
      setInputText('');
      // Simulate bot response
      setTimeout(() => {
        setMessages(prevMessages => [
          ...prevMessages,
          { text: 'This is a bot response.', isUser: false },
        ]);
      }, 500);
    }
  };

  const closeChat = () => {
    router.push('/'); // Navigate back to the home page
  };

  return (
    <Paper elevation={3} sx={{ 
        height: '80vh', 
        display: 'flex', 
        flexDirection: 'column',
        padding: '16px',
        width: '800px',
        margin: 'auto',
        marginTop: '40px'
    }}>
      <Header closeChat={closeChat} />
      <Box sx={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        {messages.map((msg, index) => (
          <MessageBubble key={index} message={msg.text} isUser={msg.isUser} />
        ))}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', paddingTop: '8px' }}>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Type a message"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <Button variant="contained" color="primary" onClick={handleSendMessage} sx={{ marginLeft: '8px' }}>
          <SendIcon/>
        </Button>
      </Box>
    </Paper>                   
  );
}
