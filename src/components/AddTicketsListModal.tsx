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
import CloseIcon from '@mui/icons-material/Close';
import { MyContext } from '@/context/MyProvider';


export default function AddTicketsListModal() {
    const { isModalOpen, setIsModalOpen } = React.useContext(MyContext);
    const handleClose = () => setIsModalOpen(false);
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
                    <Box onClick={() => setIsModalOpen(false)} sx={{ display: 'flex', justifyContent: "space-between", alignItems: "center", cursor: 'pointer' }}>
                        <Typography variant="h5" align="center" gutterBottom>
                            Add Ticket List
                        </Typography>
                        <CloseIcon />
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