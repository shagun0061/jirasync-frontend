import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import { statusColor, StyledTableCell, StyledTableRow } from '@/helpers/Common';
import { Box } from '@mui/material';


const SearchTicket = ({ searchValue }) => {
    function createData(
        ticketNo: string,
        status: string,
        assignee: string,
        board: string,
        Link: string,
    ) {
        return { ticketNo, status, assignee, board, Link };
    }

    const rows = [
        createData('E2D-11456', 'In Progress', "Vaneet Kaur", "E2D", "www.google.com"),
        createData('LEG2-6756', 'QA', "sumit kumar", "LEG2", "www.google.com"),
        createData('ELNKWEB-1144', 'Code Review', "Gurbakshish", "ELNKWEB", "www.google.com"),
        createData('E2D-11436', 'Dev Testing', "kanica", "E2D", "www.google.com"),
        createData('LEG2-6746', 'QA Testing', "Priyanka", "LEG2", "www.google.com"),
        createData('ELNKWEB-1344', 'Todo', "Kanak", "ELNKWEB", "www.google.com"),
    ];
    // Filter rows based on the search value
    const filteredRows = rows.filter((row) => {
        const searchStr = searchValue.toLowerCase();
        return (
            row.ticketNo.toLowerCase().includes(searchStr)
        );
    });

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell
                            align="center"
                            colSpan={12}
                            sx={{
                                bgcolor: "#D4F6FF",
                                fontFamily: "Poppins",
                                fontSize: "27px",
                                fontWeight: 900,
                                height: "56px",
                            }}
                        >
                            Search Ticket&apos;s
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <StyledTableCell sx={{ fontWeight: 900 }}>Ticket No</StyledTableCell>
                        <StyledTableCell sx={{ fontWeight: 900 }} align="center">
                            Ticket Status
                        </StyledTableCell>
                        <StyledTableCell sx={{ fontWeight: 900 }} align="center">
                            Assignee
                        </StyledTableCell>
                        <StyledTableCell sx={{ fontWeight: 900 }} align="center">
                            Board
                        </StyledTableCell>
                        <StyledTableCell sx={{ fontWeight: 900 }} align="center">
                            Link
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredRows.length > 0 ? (
                        filteredRows.map((row) => (
                            <StyledTableRow key={row.ticketNo}>
                                <TableCell component="th" scope="row">
                                    {row.ticketNo}
                                </TableCell>
                                <TableCell align="center">
                                    <Box
                                        sx={{
                                            borderRadius: "20px",
                                            padding: 1,
                                            ...statusColor(row.status),
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {row.status}
                                    </Box>
                                </TableCell>
                                <TableCell align="center">{row.assignee}</TableCell>
                                <TableCell align="center">{row.board}</TableCell>
                                <TableCell align="center">
                                    <InsertLinkIcon />
                                </TableCell>
                            </StyledTableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} align="center" sx={{ p: 5, fontWeight: 800 }}>
                                <img src="https://assets-v2.lottiefiles.com/a/7adb209c-1187-11ee-9713-b3dd2cee229f/cqRBzojhh2.gif" alt="no-ticket-found" width="200" />
                                <h2>No tickets match your search.</h2>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default SearchTicket