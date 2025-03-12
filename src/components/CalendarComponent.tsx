import React from "react";
import { Box } from "@mui/material";

const CalendarComponent = () => {
    // Get current date
    const today = new Date();
    
    // Get month in short format (e.g., "Mar")
    const month = today.toLocaleString('default', { month: 'short' }).toUpperCase();

    // Get date
    const date = today.getDate();

    return (
        <Box
            sx={{
                width: 60,
                height: 60,
                backgroundColor: "black",
                borderRadius: "8px",
                border: "2px solid #ddd",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Top two dots */}
            <Box
                sx={{
                    width: "2px",
                    height: "2px",
                    bgcolor: "white",
                    borderRadius: "50%",
                    position: "absolute",
                    top: "2px",
                    right: "30%",
                }}
            />
            <Box
                sx={{
                    width: "2px",
                    height: "2px",
                    bgcolor: "white",
                    borderRadius: "50%",
                    position: "absolute",
                    top: "2px",
                    left: "30%",
                }}
            />
            {/* Top Month Section */}
            <Box
                sx={{
                    width: "100%",
                    backgroundColor: "black",
                    color: "white",
                    textAlign: "center",
                    padding: "5px 0",
                    fontWeight: 900,
                }}
            >
                {month}
            </Box>
            <Box sx={{ borderBottom: '2px solid white', width: '100%', mt: '-6px' }}></Box>

            {/* Date Section */}
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: 900,
                }}
            >
                {date}
            </Box>
        </Box>
    );
};

export default CalendarComponent;
