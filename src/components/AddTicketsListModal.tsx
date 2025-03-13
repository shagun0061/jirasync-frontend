import * as React from 'react';
import Modal from '@mui/material/Modal';
import Snackbar from '@mui/material/Snackbar';

import LinearProgress from '@mui/material/LinearProgress';
import {
    Box,
    TextField,
    Button,
    Typography,
    Grid,
    CircularProgress,
    Alert,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from 'react';
import { MyContext } from '@/context/MyProvider';
import { buildTicketPayload } from '@/helpers/Common';
import { TicketListRefreshProps } from '@/helpers';


export default function AddTicketsListModal({ setRefresh }: TicketListRefreshProps) {
    const [formValues, setFormValues] = React.useState({
        qaTicketList: "",
        newTicketList: "",
        holdTicketList: "",
        continueTicketList: "",
    });
    const { isModalOpen, setIsModalOpen } = React.useContext(MyContext);
    const [toastOpen, setToastOpen] = useState(false);
    const [toastType, setToastType] = useState<"success" | "error">("success");
    const [responseMessage, setResponseMessage] = useState("");
    const [progress, setProgress] = useState(100);
    const [loading, setLoading] = useState(false);

    const autoHideDuration = 3000; // 3 seconds

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCloseSnackbar = () => {
        setToastOpen(false);
        setProgress(100);
    };

    const isFormValid = Object.values(formValues).every(value => value.trim() !== "");

    useEffect(() => {
        if (toastOpen) {
            setProgress(100);
            const interval = setInterval(() => {
                setProgress((oldProgress) => Math.max(oldProgress - 10, 0));
            }, autoHideDuration / 10);

            setTimeout(() => {
                setToastOpen(false);
                clearInterval(interval);
            }, autoHideDuration);

            return () => clearInterval(interval);
        }
    }, [toastOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setResponseMessage("");

        try {
            if (isFormValid) {
                const ticketListPayload = await buildTicketPayload(formValues);
                setLoading(true);

                const res = await fetch("/api/ticket", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(ticketListPayload),
                });

                if (res.ok) {
                    setResponseMessage("Tickets stored successfully! 🎉");
                    setToastType("success");
                    setToastOpen(true);
                    setIsModalOpen(false);
                    setFormValues({
                        qaTicketList: "",
                        newTicketList: "",
                        holdTicketList: "",
                        continueTicketList: "",
                    });
                    setRefresh((prev) => !prev);
                } else {
                    setResponseMessage("Getting issue, tickets didn't store ❌");
                    setToastType("error");
                    setToastOpen(true);
                    setRefresh(false);
                }
            } else {
                setResponseMessage("Please fill all the fields ❌");
                setToastType("error");
                setToastOpen(true);
            }
        } catch (err: unknown) {
            console.error("Error in handleSubmit:", err);
            setResponseMessage(err instanceof Error ? `Something Went Wrong ❌: ${err.message}` : "Something Went Wrong ❌");
            setToastType("error");
            setToastOpen(true);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setIsModalOpen(false);
        setFormValues({
            qaTicketList: "",
            newTicketList: "",
            holdTicketList: "",
            continueTicketList: "",
        });
    };

    return (
        <div>
            <Modal
                open={isModalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '800px',
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        bgcolor: '#f5f5f5',
                        borderRadius: 2,
                        boxShadow: 24,
                        p: 0, 
                    }}
                >
                    {/* Sticky Header */}
                    <Box
                        sx={{
                            position: 'sticky',
                            top: 0,
                            zIndex: 1000,
                            bgcolor: '#f5f5f5',
                            p: 2,
                            borderBottom: '1px solid #ccc',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="h6">
                            Add Ticket List
                        </Typography>
                        <CloseIcon onClick={handleClose} sx={{ cursor: 'pointer' }} />
                    </Box>

                    {/* Form Section */}
                    <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
                        <Grid container spacing={2}>
                            {["qaTicketList", "newTicketList", "holdTicketList", "continueTicketList"].map((field, idx) => (
                                <Grid item xs={12} key={idx}>
                                    <TextField
                                        fullWidth
                                        label={field === "qaTicketList" ? "QA Ticket List" :
                                            field === "newTicketList" ? "New Ticket List" :
                                            field === "holdTicketList" ? "Hold Ticket List" : "Current Ticket List"}
                                        name={field}
                                        value={formValues[field as keyof typeof formValues]}
                                        onChange={handleChange}
                                        variant="outlined"
                                        placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').trim().toLowerCase()}`}
                                        multiline
                                        minRows={3}
                                        // InputLabelProps={{
                                        //     shrink: true, // Force label to float
                                        //   }}
                                        //   sx={{
                                        //     "& label": { fontSize: "18px" }, // Label font size
                                        //     // "& textarea": { fontSize: "14px" }, // Textarea font size (for multiline)
                                        //   }}
                                    />
                                </Grid>
                            ))}
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    sx={{ mt: 2 }}
                                >
                                    {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Modal>

            {/* Snackbar for Success & Error */}
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={toastOpen}
                autoHideDuration={autoHideDuration}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity={toastType} sx={{ width: '100%' }}>
                    {responseMessage}
                    <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{ height: 3, mt: 1 }}
                    />
                </Alert>
            </Snackbar>
        </div>
    );
}
