"use client";

import React, { useState, useEffect } from "react";
import { IconButton, Box, AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import { signOutUser, getAuthState } from '@/app/signout/page'; // Renamed function to avoid conflict
import { useRouter } from 'next/navigation';

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = getAuthState((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const handleLogout = () => {
    signOutUser();
    console.log("Logged out");
  };

  const goToChatPage = () => {
    router.push('/components');
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My ChatBot!
          </Typography>
          {user ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" href="/signin">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {user ? (
            <>
              <Typography variant="h4" align="center" gutterBottom>
                Welcome back, {user.displayName || 'User'}!
              </Typography>
              <Typography variant="body1" align="center" color="textSecondary">
                We're glad to see you again.
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="h4" align="center" gutterBottom>
                Welcome to My ChatBot!
              </Typography>
              <Typography variant="body1" align="center" color="textSecondary">
                Unlock Your Potential: Chat with Our AI Bot! 
                Please log in to ask your questions!
              </Typography>
            </>
          )}
        </Box>
      </Container>
      {user && (
        <Box sx={{ position: 'fixed', bottom: 16, right: 16 }}>
          <IconButton color="primary" onClick={goToChatPage}>
            <ChatIcon sx={{ fontSize: 80 }} />
          </IconButton>
        </Box>
      )}
    </>
  );
}
