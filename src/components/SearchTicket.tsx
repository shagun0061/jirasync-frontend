import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import { StyledTableCell, StyledTableRow, getPriorityIcon, statusColor } from '@/helpers/Common';
import { Box, Typography } from '@mui/material';
import { SearchTicketProps, Ticket } from '@/helpers';

const SearchTicket = ({ searchValue, combinedTickets }: SearchTicketProps) => {
  const filteredTickets = combinedTickets.filter((ticket: Ticket) => {
    const searchLower = searchValue.toLowerCase();
    return (
      ticket.key?.toLowerCase().includes(searchLower) ||
      ticket.status?.name?.toLowerCase().includes(searchLower) ||
      ticket.assignee?.toLowerCase().includes(searchLower) ||
      ticket.reported?.toLowerCase().includes(searchLower) ||
      ticket.reportedBy?.toLowerCase().includes(searchLower) ||
      ticket.priority?.toLowerCase().includes(searchLower) ||
      ticket.link?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <TableContainer component={Paper}>
      {filteredTickets.length > 0 ? (
        <Table aria-label="search result table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Category</StyledTableCell>
              <StyledTableCell>Ticket Number</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Assignee</StyledTableCell>
              <StyledTableCell>Reported By</StyledTableCell>
              <StyledTableCell>Priority</StyledTableCell>
              <StyledTableCell>Link</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTickets?.map((row, index) => (
              <StyledTableRow key={index}>
                <TableCell sx={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '16px' }}>
                  {row.category}
                </TableCell>

                <TableCell>{row.key}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      borderRadius: "12px",
                      px: 1.5,
                      py: 0.5,
                      display: "inline-block",
                      fontSize: "12px",
                      backgroundColor: statusColor(row.status?.name).backgroundColor,
                      color: statusColor(row?.status?.name).color,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {row.status?.name}
                  </Box>
                </TableCell>
                <TableCell>{row.assignee}</TableCell>
                <TableCell>{row.reported || row.reportedBy}</TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {getPriorityIcon(row.priority)}
                    <span style={{ marginLeft: 4, textTransform: 'capitalize' }}>{row.priority}</span>
                  </Box>
                </TableCell>
                <TableCell>
                  <a href={row.link} target="_blank" rel="noopener noreferrer">
                    <InsertLinkIcon />
                  </a>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography variant="body1" align="center" sx={{ m: 2 }}>
          No matching tickets found.
        </Typography>
      )}
    </TableContainer>
  );
};

export default SearchTicket;
