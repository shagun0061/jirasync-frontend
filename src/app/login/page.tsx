'use client';

import * as React from 'react';
// import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, FormLabel, Link, TextField, Typography, IconButton, InputAdornment } from '@mui/material';
// import { Visibility, VisibilityOff } from '@mui/icons-material';
// import Image from 'next/image';
// import Navbar from '@/components/Navbar';
// import ForgotPassword from '@/components/ForgotPassword';
// import { useRouter } from 'next/navigation';
// import { styled } from '@mui/material/styles';
// import TeamsLogo from '../../../public/images/teamsLogo.jpeg';

// const Card = styled(Box)(({ theme }) => ({
//     display: 'flex',
//     flexDirection: 'column',
//     width: '100%',
//     padding: theme.spacing(4),
//     margin: 'auto',
//     gap: theme.spacing(2),
//     boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//     [theme.breakpoints.up('sm')]: { width: '450px' },
// }));

export default function SignInCard() {
    return (
        <h2>
            This is a login page
        </h2>
    )
    // const [emailError, setEmailError] = React.useState(false);
    // const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    // const [passwordError, setPasswordError] = React.useState(false);
    // const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
    // const [showPassword, setShowPassword] = React.useState(false);
    // const [resetModalOpen, setResetModalOpen] = React.useState(false);

    // const router = useRouter();

    // const handleTogglePasswordVisibility = () => {
    //     setShowPassword((prev) => !prev);
    // };

    // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     const data = new FormData(event.currentTarget);
    //     const email = data.get('email');
    //     const password = data.get('password');

    //     // Validate inputs
    //     if (!validateInputs(email, password)) return;

    //     // Simulate login
    //     if (email === 'test@example.com' && password === 'password123') {
    //         localStorage.setItem('authToken', 'true');
    //         localStorage.setItem('user', JSON.stringify(email));
    //         router.push('/');
    //     } else {
    //         alert('Invalid login credentials.');
    //     }
    // };

    // const validateInputs = (email: string, password: string) => {
    //     let isValid = true;

    //     if (!email || !/\S+@\S+\.\S+/.test(email)) {
    //         setEmailError(true);
    //         setEmailErrorMessage('Please enter a valid email address.');
    //         isValid = false;
    //     } else {
    //         setEmailError(false);
    //         setEmailErrorMessage('');
    //     }

    //     if (!password || password.length < 6) {
    //         setPasswordError(true);
    //         setPasswordErrorMessage('Password must be at least 6 characters long.');
    //         isValid = false;
    //     } else {
    //         setPasswordError(false);
    //         setPasswordErrorMessage('');
    //     }

    //     return isValid;
    // };

    // return (
    //     <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
    //         <Navbar />
    //         <Card>
    //             <Typography variant="h4" align="center">
    //                 Log in
    //             </Typography>
    //             <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
    //                 <FormControl>
    //                     <FormLabel>Email</FormLabel>
    //                     <TextField
    //                         id="email"
    //                         name="email"
    //                         type="email"
    //                         placeholder="your@email.com"
    //                         error={emailError}
    //                         helperText={emailErrorMessage}
    //                         required
    //                         fullWidth
    //                     />
    //                 </FormControl>
    //                 <FormControl>
    //                     <FormLabel>Password</FormLabel>
    //                     <TextField
    //                         id="password"
    //                         name="password"
    //                         type={showPassword ? 'text' : 'password'}
    //                         placeholder="••••••"
    //                         error={passwordError}
    //                         helperText={passwordErrorMessage}
    //                         required
    //                         fullWidth
    //                         InputProps={{
    //                             endAdornment: (
    //                                 <InputAdornment position="end">
    //                                     <IconButton onClick={handleTogglePasswordVisibility}>
    //                                         {showPassword ? <VisibilityOff /> : <Visibility />}
    //                                     </IconButton>
    //                                 </InputAdornment>
    //                             ),
    //                         }}
    //                     />
    //                 </FormControl>
    //                 <FormControlLabel control={<Checkbox />} label="Remember me" />
    //                 <Button type="submit" fullWidth variant="contained">
    //                     Log in
    //                 </Button>
    //                 <Typography align="center">
    //                     Don&apos;t Remember Password?{' '}
    //                     <Link component="button" onClick={() => setResetModalOpen(true)}>
    //                         Forgot your password?
    //                     </Link>
    //                 </Typography>
    //                 <ForgotPassword open={resetModalOpen} handleClose={() => setResetModalOpen(false)} />
    //                 <Divider>or</Divider>
    //                 <Button
    //                     fullWidth
    //                     variant="outlined"
    //                     startIcon={<Image src={TeamsLogo} alt="Teams Logo" width={30} height={30} />}
    //                 >
    //                     Log in with Teams
    //                 </Button>
    //             </Box>
    //         </Card>
    //     </Box>
    // );
}
