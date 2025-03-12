import * as React from 'react';
import Modal from '@mui/material/Modal';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import {
    Box,
    TextField,
    Button,
    Typography,
    Container,
    Grid,
    CircularProgress,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from 'react';
import { MyContext } from '@/context/MyProvider';
import { buildTicketPayload } from '@/helpers/Common';
import { TicketListRefreshProps } from '@/helpers';




// Custom Alert Component
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AddTicketsListModal({setRefresh} :TicketListRefreshProps) {
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
    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    // Close Snackbar separately
    const handleCloseSnackbar = () => {
        setToastOpen(false);
        setProgress(100);
    };
    const isFormValid = Object.values(formValues).every(value => value.trim() !== "");
    // Progress Bar Effect
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
    
                // Call your POST API endpoint
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
                } else {
                    setResponseMessage("Getting issue, tickets didn't store ❌");
                    setToastType("error");
                    setToastOpen(true);
                }
    
            } else {
                setResponseMessage("Please fill all the fields ❌");
                setToastType("error");
                setToastOpen(true);
            }
        } catch (err: unknown) {
            console.error("Error in handleSubmit:", err);
    
            if (err instanceof Error) {
                setResponseMessage(`Something Went Wrong ❌: ${err.message}`);
            } else {
                setResponseMessage("Something Went Wrong ❌");
            }
            
            setToastType("error");
            setToastOpen(true);
        } finally {
            setLoading(false);
            setRefresh((prev) => !prev)
        }
    };
    

    const handleClose = () => setIsModalOpen(false);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        // border: '1px solid #000',
        // boxShadow: 4,
        p: 8,
    };

    return (
        <div>
            <Modal
                open={isModalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Container maxWidth="sm" sx={{ ...style, mt: 4, p: 2, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: "center", cursor: 'pointer' }}>
                        <Typography variant="h5" align="center" gutterBottom>
                            Add Ticket List
                        </Typography>
                        <CloseIcon onClick={handleClose} />
                    </Box>

                    <hr style={{ marginBottom: "20px" }} />
                    <Box component="form" onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {/* QA Ticket List */}
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="QA Ticket List"
                                    name="qaTicketList"
                                    value={formValues.qaTicketList}
                                    onChange={handleChange}
                                    variant="outlined"
                                    placeholder="Enter QA tickets (comma-separated)"
                                />
                            </Grid>

                            {/* New Ticket List */}
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="New Ticket List"
                                    name="newTicketList"
                                    value={formValues.newTicketList}
                                    onChange={handleChange}
                                    variant="outlined"
                                    placeholder="Enter new tickets (comma-separated)"
                                />
                            </Grid>

                            {/* Hold Ticket List */}
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Hold Ticket List"
                                    name="holdTicketList"
                                    value={formValues.holdTicketList}
                                    onChange={handleChange}
                                    variant="outlined"
                                    placeholder="Enter hold tickets (comma-separated)"
                                />
                            </Grid>

                            {/* Current Ticket List */}
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Current Ticket List"
                                    name="continueTicketList"
                                    value={formValues.continueTicketList}
                                    onChange={handleChange}
                                    variant="outlined"
                                    placeholder="Enter continue tickets (comma-separated)"
                                />
                            </Grid>

                            {/* Submit Button */}
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
                </Container>
            </Modal>

            {/* Snackbar for Success & Error Messages */}
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={toastOpen}
                autoHideDuration={autoHideDuration}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity={toastType} sx={{ width: '100%' }}>
                    {responseMessage}
                    {/* Progress Bar Inside Snackbar */}
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
