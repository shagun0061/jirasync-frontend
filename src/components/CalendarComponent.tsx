import React, { useState } from "react";
import { Box, TextField } from "@mui/material";

const CalendarComponent = () => {
    const [month, setMonth] = useState("MAY");
    const [date, setDate] = useState(12);

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
            <Box
                sx={{
                    width: "2px", // Adjust this to set the desired dot size
                    height: "2px", // Ensure height equals width for a perfect circle
                    bgcolor: "white",
                    borderRadius: "50%", // Ensures the shape is a circle
                    position: "absolute",
                    top: "2px",
                    right: "30%",
                }}
            />
            <Box
                sx={{
                    width: "2px", // Match the size of the other dot
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
                    fontWeight: 900
                }}
            >
                MAR
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
                    fontWeight: 900
                }}
            >
                21
            </Box>
        </Box>
    );
};

export default CalendarComponent;
