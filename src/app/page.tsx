"use client";
import * as React from 'react';
import styles from "./page.module.css";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from "@/components/Navbar";
import { Box } from '@mui/material';
import NewTicket from '@/components/NewTicket';
import QaTickets from '@/components/QaTickets';
import HoldTicket from '@/components/HoldTicket';
import CountinueTicket from '@/components/CurrentTicket';
import AddTicketsListModal from '@/components/AddTicketsListModal';



const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#ff4081',
    },
  },
});


export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className={styles.page}>
        <Navbar />
        <Box sx={{ p: 5 }}>
          <CountinueTicket />
          <br />
          <br />
          <br />
          <br />
          <NewTicket />
          <br />
          <br />
          <br />
          <br />
          <QaTickets />
          <br />
          <br />
          <br />
          <br />
          <HoldTicket />
        </Box>
      </Box>
      <AddTicketsListModal />
    </ThemeProvider>
  );
}
