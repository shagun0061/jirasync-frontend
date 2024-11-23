import * as React from 'react';
import Modal from '@mui/material/Modal';
import {
    Box,
    TextField,
    Button,
    Typography,
    Container,
    Grid,
} from "@mui/material";

export default function AddTicketsListModal() {
    const [open, setOpen] = React.useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [formValues, setFormValues] = React.useState({
        qaTicketList: "",
        newTicketList: "",
        holdTicketList: "",
        continueTicketList: "",
    });

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Submitted", formValues);
        // Add further submission logic here
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <div>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Container maxWidth="sm" sx={{ ...style, mt: 4, p: 2, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
                    <Typography variant="h5" align="center" gutterBottom>
                        Ticket List Form
                    </Typography>
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

                            {/* Continue Ticket List */}
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Continue Ticket List"
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
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Modal>
        </div>
    );
}