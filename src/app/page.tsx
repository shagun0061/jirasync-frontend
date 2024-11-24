"use client";
import * as React from 'react';
import styles from "./page.module.css";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from "@/components/Navbar";
import { Box, Stack, Typography } from '@mui/material';
import NewTicket from '@/components/NewTicket';
import QaTickets from '@/components/QaTickets';
import HoldTicket from '@/components/HoldTicket';
import ContinueTicket from '@/components/ContinueTicket';
import AddTicketsListModal from '@/components/AddTicketsListModal';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import SearchIcon from '@mui/icons-material/Search';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CalendarComponent from '@/components/CalendarComponent';

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
  const [searchValue, setSearchValue] = React.useState("All Ticket");
  const [filter, setFilter] = React.useState("All Ticket")


  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value as string);
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className={styles.page}>
        <Navbar />
        <Box sx={{ p: 5 }}>
          <Stack
            direction={"row"}
            sx={{
              height: '70px',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: '20px', // Added padding to prevent content from touching the border
              bgcolor: '#ffffff',
              border: '1px solid #E4E7EC',
              borderRadius: '8px',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              mb: 4,
            }}
          >
            {/* Date Section (40% Width) */}
            <Box sx={{ width: '40%', display: 'flex', }}>

              <img src='https://www.shutterstock.com/image-vector/little-boy-pointing-away-600nw-207094312.jpg' alt="" width={90} height={60} />
              <CalendarComponent />
              {/* <Typography
                sx={{
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#3D3D3D',
                }}
              >
                Date: 23/11/24
              </Typography> */}
            </Box>

            {/* Search and Select Section (60% Width) */}
            <Stack
              direction="row"
              spacing={2}
              sx={{ width: '60%', justifyContent: 'flex-end', alignItems: 'center' }}
            >
              {/* Search Input */}
              <FormControl sx={{ flex: 1, maxWidth: '60%' }}>
                <OutlinedInput
                  size="small"
                  id="header-search"
                  sx={{
                    height: '44px', // Matches the height of the select dropdown
                    color: '#5C5F62',
                    fontSize: '14px',
                    borderRadius: '8px',
                    borderColor: '#D1D5DB',
                    backgroundColor: '#F9FAFB',
                    py: 0,
                    px: 2,
                  }}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                  }}
                  startAdornment={
                    <InputAdornment position="start" sx={{ color: '#3FA0EF' }}>
                      <SearchIcon />
                    </InputAdornment>
                  }
                  placeholder="Search Ticket"
                />
              </FormControl>

              {/* Ticket Filter Dropdown */}
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel
                  id="ticket-select-label"
                  sx={{
                    color: '#6B7280',
                    fontSize: '14px',
                    backgroundColor: '#ffffff', // Matches the background to prevent overlap
                    px: 1, // Adds padding to ensure the label doesn't touch the select border
                  }}
                  shrink
                >
                  Ticket Filter
                </InputLabel>
                <Select
                  labelId="ticket-select-label"
                  id="ticket-simple-select"
                  value={filter}
                  onChange={handleChange}
                  sx={{
                    height: '44px', // Matches the search bar height
                    borderRadius: '8px',
                    backgroundColor: '#F9FAFB',
                    color: '#5C5F62',
                    fontSize: '14px',
                  }}
                  MenuProps={{
                    disableScrollLock: true,
                  }}
                >
                  <MenuItem value="All Ticket">All Tickets</MenuItem>
                  <MenuItem value="Continue Ticket">Continue Tickets</MenuItem>
                  <MenuItem value="QA Ticket">New Tickets</MenuItem>
                  <MenuItem value="QA Ticket">QA Tickets</MenuItem>
                  <MenuItem value="Hold Ticket">Hold Tickets</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Stack>


          <ContinueTicket />
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
