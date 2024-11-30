"use client";
import * as React from "react";
import styles from "./page.module.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "@/components/Navbar";
import { Box, Stack, Typography } from "@mui/material";
import NewTicket from "@/components/NewTicket";
import QaTickets from "@/components/QaTickets";
import HoldTicket from "@/components/HoldTicket";
import ContinueTicket from "@/components/ContinueTicket";
import AddTicketsListModal from "@/components/AddTicketsListModal";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import SearchIcon from "@mui/icons-material/Search";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CalendarComponent from "@/components/CalendarComponent";
import SearchTicket from "@/components/SearchTicket";
import { MyProvider } from "../context/MyProvider.jsx";

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
export const MyContext = React.createContext();

export default function Home() {
  const [searchValue, setSearchValue] = React.useState("");
  const [filter, setFilter] = React.useState("All");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value as string);
  };
  const inputStyles = {
    height: "44px",
    borderRadius: "8px",
    backgroundColor: "#F9FAFB",
    color: "#5C5F62",
    fontSize: "14px",
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MyContext.Provider value={{ isModalOpen, setIsModalOpen }}>
        <Box className="page">
          <Navbar />
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
                <FormControl sx={{ flex: 1, maxWidth: "60%" }}>
                  <OutlinedInput
                    size="small"
                    id="header-search"
                    sx={{ ...inputStyles, px: 2 }}
                    onChange={(e) => setSearchValue(e.target.value)}
                    startAdornment={
                      <InputAdornment position="start" sx={{ color: "#3FA0EF" }}>
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
                    <MenuItem value="Continue">Continue Tickets</MenuItem>
                    <MenuItem value="New">New Tickets</MenuItem>
                    <MenuItem value="QA">QA Tickets</MenuItem>
                    <MenuItem value="Hold">Hold Tickets</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Stack>
            {searchValue == "" ? (
              <Box>
                {(filter === "Continue" || filter === "All") && (
                  <ContinueTicket filter={filter} />
                )}
                {(filter === "New" || filter === "All") && (
                  <NewTicket filter={filter} />
                )}
                {(filter == "QA" || filter == "All") && (
                  <QaTickets filter={filter} />
                )}
                {(filter === "Hold" || filter === "All") && (
                  <HoldTicket filter={filter} />
                )}
              </Box>
            ) : (
              <SearchTicket searchValue={searchValue} />
            )}
          </Box>
        </Box>
        <AddTicketsListModal />
      </MyContext.Provider>
    </ThemeProvider>
  );
}
