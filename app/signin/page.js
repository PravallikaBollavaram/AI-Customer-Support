"use client";

import React, { useState, useEffect } from 'react';
import { Container, Grid, TextField, Button, Typography, Box } from '@mui/material';
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from '@/app/firebase/config';
import { useRouter } from 'next/navigation';

export default function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, redirect to the homepage
                router.push('/');
            } else {
                // User is not signed in, continue to show the signin page
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, [router]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('Signed in user:', user);
            router.push('/');
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(errorMessage);
            console.error('Error signing in:', errorCode, errorMessage);
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Optional: Loading state while checking auth
    }

    return (
        <Container maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <Box
                sx={{
                    mt: 18,
                    p: 3,
                    borderRadius: 2,
                    boxShadow: 3,
                    backgroundColor: '#ffffff',
                }}
            >
                <Typography variant="h5" align="center" gutterBottom>
                    Welcome back!
                </Typography>
                <Typography variant="body2" align="center" color="textSecondary" gutterBottom>
                    Log in to access your account.
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Enter Email"
                                variant="outlined"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Enter Your Password"
                                variant="outlined"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                size="large"
                            >
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                {error && (
                    <Box mt={2} textAlign="center">
                        <Typography variant="body2" color="error">
                            {error}
                        </Typography>
                    </Box>
                )}
                <Box mt={2} textAlign="center">
                    <Typography variant="body2" color="textSecondary">
                        Not a member? <a href="/signup" style={{ color: '#1976d2' }}>Signup Here</a>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
}