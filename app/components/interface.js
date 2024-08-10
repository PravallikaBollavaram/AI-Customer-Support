"use client";
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, TextField, Button, Paper, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

// Component for the header
function Header({ closeChat }) {
  return (
    <AppBar position="static" >
      <Toolbar variant='h6'>
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
        backgroundColor: isUser ? '#ff4569' : '#00b0ff',
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

export default function Interface({ closeChat }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    // Add the user's message to the chat
    setMessages([...messages, { text: inputText, isUser: true }]);

    // Make the API call
    fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: inputText }),
    })
      .then((res) => {
        console.log("Response status:", res.status); // Log the status
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Response data:", data); // Log the data
        const botMessage = data.botMessage || "Sorry, I couldn't find an answer.";
        setMessages((prevMessages) => [...prevMessages, { text: botMessage, isUser: false }]);
      })
      .catch((error) => {
        console.error('Error:', error);
        setMessages((prevMessages) => [...prevMessages, { text: `Error: ${error.message}`, isUser: false }]);
      });

    setInputText(''); // Clear the input field
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
      <Header  closeChat={closeChat} />
      <Box sx={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', bgcolor:'#795548', padding:'20px' }}>
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
