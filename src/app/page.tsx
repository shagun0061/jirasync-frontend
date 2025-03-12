"use client";
import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "@/components/Navbar";
import { Box, IconButton, Stack } from "@mui/material";
import AddTicketsListModal from "@/components/AddTicketsListModal";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from '@mui/icons-material/Close';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CalendarComponent from "@/components/CalendarComponent";
import SearchTicket from "@/components/SearchTicket";
import { MyProvider } from "../context/MyProvider.jsx";
import { useEffect, useState } from "react";
import { fetchTicketDetailByCategory } from "@/helpers/Common";
import TicketTable from "@/components/TicketDetailsTable";
import { Ticket, TicketsByCategory } from "@/helpers/index.jsx";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#ff4081",
    },
  },
});

export default function Home() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [filter, setFilter] = useState<string>("All");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [tickets, setTickets] = useState<TicketsByCategory>({
    continue: [],
    new: [],
    qa: [],
    hold: [],
  });
  console.log("🚀 ~ Home ~ tickets:", tickets)


  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value as string);
  };

  const handleSearchIconClick = () => {
    setIsSearchOpen(true);

  };
  const handleSearchInputBlur = () => {
    if (searchValue === '') {
      setIsSearchOpen(false);
    }
  };

  const handleClear = () => {
    setSearchValue('');
    setIsSearchOpen(false);
  };

  const inputStyles = {
    height: "44px",
    borderRadius: "8px",
    backgroundColor: "#F9FAFB",
    color: "#5C5F62",
    fontSize: "14px",
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (filter || refresh) {
          setLoading(true);
          setError(null);
          const data = await fetchTicketDetailByCategory(filter);

          setTickets({
            continue: filter === "All" || filter === "Current" ? data?.tickets?.currentTickets || [] : [],
            new: filter === "All" || filter === "New" ? data?.tickets?.newTickets || [] : [],
            qa: filter === "All" || filter === "QA" ? data?.tickets?.qaTickets || [] : [],
            hold: filter === "All" || filter === "Hold" ? data?.tickets?.holdTickets || [] : [],
          });
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filter, refresh]);

  const combineTickets = (tickets:TicketsByCategory):Ticket[] => {
    return [
      ...(tickets.continue ?? []).map(ticket => ({ ...ticket, category: 'Continue' })),
      ...(tickets.new ?? []).map(ticket => ({ ...ticket, category: 'New' })),
      ...(tickets.qa ?? []).map(ticket => ({ ...ticket, category: 'QA' })),
      ...(tickets.hold ?? []).map(ticket => ({ ...ticket, category: 'Hold' })),
    ];
  };

  // Call the function
  const combinedTickets = combineTickets(tickets);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MyProvider>
        <Box className="page">
          <Navbar setRefresh={setRefresh} />
          <Box sx={{ p: 5 }}>
            {/* Header Section */}
            <Stack
              direction="row"
              sx={{
                height: "70px",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
                bgcolor: "#ffffff",
                border: "1px solid #E4E7EC",
                borderRadius: "8px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                mb: 4,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", width: "40%" }}>
                <img
                  src="https://www.shutterstock.com/image-vector/little-boy-pointing-away-600nw-207094312.jpg"
                  alt="Calendar Icon"
                  width={90}
                  height={60}
                />
                <CalendarComponent />
              </Box>

              {/* Right Section - Search and Filter */}
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  width: "60%",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                {/* Search Input */}
                <FormControl
                  sx={{
                    width: isSearchOpen ? "200px" : "40px",
                    transition: "width 0.3s ease",
                    height: "32px",
                    justifyContent: "center"
                  }}
                >
                  <OutlinedInput
                    size="small"
                    id="header-search"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onBlur={handleSearchInputBlur}
                    onFocus={() => setIsSearchOpen(true)}
                    startAdornment={
                      <InputAdornment position="start" sx={{ color: "#3FA0EF", pl: '5px', cursor: 'pointer' }} onClick={handleSearchIconClick}>
                        <SearchIcon />
                      </InputAdornment>
                    }
                    endAdornment={
                      searchValue && (
                        <InputAdornment position="end">
                          <IconButton onClick={handleClear} edge="end" size="small">
                            <CloseIcon />
                          </IconButton>
                        </InputAdornment>
                      )
                    }
                    placeholder={isSearchOpen ? "Search Ticket" : ""}
                    sx={{
                      ...inputStyles,
                      paddingLeft: isSearchOpen ? "0px" : "0px",
                    }}
                  />
                </FormControl>



                {/* Ticket Filter Dropdown */}
                <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel
                    id="ticket-select-label"
                    sx={{
                      color: "#6B7280",
                      fontSize: "14px",
                      backgroundColor: "#ffffff",
                      px: 1,
                    }}
                  >
                    Ticket Filter
                  </InputLabel>
                  <Select
                    labelId="ticket-select-label"
                    id="ticket-simple-select"
                    value={filter}
                    onChange={handleChange}
                    sx={inputStyles}
                    MenuProps={{ disableScrollLock: true }}
                  >
                    <MenuItem value="All">All Tickets</MenuItem>
                    <MenuItem value="Current">Current Tickets</MenuItem>
                    <MenuItem value="New">New Tickets</MenuItem>
                    <MenuItem value="QA">QA Tickets</MenuItem>
                    <MenuItem value="Hold">Hold Tickets</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Stack>

            {searchValue === "" ? (
              <Box>
                {(filter === "Current" || filter === "All") && (
                <TicketTable
                title="Current Ticket"
                tickets={tickets.continue} // ✅ always Ticket[]
                filter={filter}
                loading={loading}
              />
                )}
                {(filter === "New" || filter === "All") && (
                  <TicketTable
                    title="New Ticket"
                    
                    tickets={tickets.new}
                    filter={filter}
                    loading={loading}
                  />
                )}
                {(filter === "QA" || filter === "All") && (
                  <TicketTable
                    title="QA Ticket"
                    
                    tickets={tickets?.qa}
                    filter={filter}
                    loading={loading}
                  />
                )}
                {(filter === "Hold" || filter === "All") && (
                  <TicketTable
                    title="Hold Ticket" 
                    
                    tickets={tickets?.hold}
                    filter={filter}
                    loading={loading}
                  />
                )}
              </Box>
            ) : (
              <SearchTicket searchValue={searchValue} combinedTickets={combinedTickets} />
            )}
          </Box>
        </Box>
        <AddTicketsListModal
          setRefresh={setRefresh}
        />
      </MyProvider>
    </ThemeProvider>
  );
}
