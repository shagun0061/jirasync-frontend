// import React from 'react'
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import InsertLinkIcon from '@mui/icons-material/InsertLink';
// import { Box, CircularProgress } from '@mui/material';
// import { mapTicketsToRows, statusColor, StyledTableCell, StyledTableRow } from '@/helpers/Common';
// import { FilterProp, } from '@/helpers'

// const NewTicket: React.FC<FilterProp> = ({ filter, tickets, loading }) => {

//     const rows = mapTicketsToRows(tickets);

//     return (
//         <TableContainer component={Paper} sx={{ mt: filter === "All" ? 5 : '' }}>
//             <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
//                 <TableHead>
//                     <TableRow>
//                         <TableCell align="center" colSpan={12} sx={{ bgcolor: "#FCF596", fontFamily: 'Poppins', fontSize: '27px', fontWeight: 900, height: "56px" }}>
//                             New Ticket
//                         </TableCell>
//                     </TableRow>
//                     <TableRow>
//                         <StyledTableCell sx={{ fontWeight: 900 }}>Ticket No</StyledTableCell>
//                         <StyledTableCell sx={{ fontWeight: 900 }} align="center">Ticket Status</StyledTableCell>
//                         <StyledTableCell sx={{ fontWeight: 900 }} align="center">Assignee</StyledTableCell>
//                         <StyledTableCell sx={{ fontWeight: 900 }} align="center">Reported By</StyledTableCell>

//                         <StyledTableCell sx={{ fontWeight: 900 }} align="center">Priority</StyledTableCell>
//                         <StyledTableCell sx={{ fontWeight: 900 }} align="center">Link</StyledTableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {loading ? (
//                         <TableRow>
//                             <TableCell colSpan={6} align="center">
//                                 <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
//                                     <CircularProgress size={80} color="primary" />
//                                 </Box>
//                             </TableCell>
//                         </TableRow>
//                     ) : (
//                         rows.length > 0 ? (
//                             rows?.map((row) => (
//                                 <StyledTableRow key={row.ticketNo}>
//                                     <TableCell component="th" scope="row">
//                                         {row.ticketNo}
//                                     </TableCell>
//                                     <TableCell align="center">
//                                         <Box
//                                             sx={{
//                                                 borderRadius: "20px", padding: 1,
//                                                 ...statusColor(row.status),
//                                                 fontWeight: "bold"
//                                             }}>
//                                             {row.status}
//                                         </Box>
//                                     </TableCell>
//                                     <TableCell align="center">
//                                         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                                             <img
//                                                 src={row.assigneeImage}
//                                                 alt={row?.assignee}
//                                                 style={{ width: 30, height: 30, borderRadius: '50%', marginRight: 8 }}
//                                             />
//                                             {row.assignee}
//                                         </Box>
//                                     </TableCell>
//                                     <TableCell align="center">
//                                         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                                             <img
//                                                 src={row.reportedByImage}
//                                                 alt={row?.reportedBy}
//                                                 style={{ width: 30, height: 30, borderRadius: '50%', marginRight: 8 }}
//                                             />
//                                             {row.reportedBy}
//                                         </Box>
//                                     </TableCell>
//                                     <TableCell align="center"> {row?.priority}</TableCell>
//                                     <TableCell align="center">
//                                         <a href={row?.Link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
//                                             <InsertLinkIcon />
//                                         </a>
//                                     </TableCell>

//                                 </StyledTableRow>
//                             ))
//                         ) : (
//                             <TableRow>
//                                 <TableCell sx={{ fontSize: '20px', padding: '20px' }} align="center">No Tickets Found</TableCell>
//                             </TableRow>
//                         )
//                     )}
//                 </TableBody>
//             </Table>
//         </TableContainer>
//     );
// };

// export default NewTicket;
