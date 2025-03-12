// File: components/TicketTable.tsx
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, CircularProgress } from '@mui/material';
import EditableRow from './tTicketEditableRow';
import { mapTicketsToRows, StyledTableCell } from '@/helpers/Common';
import { TicketListingDetailProp } from '@/helpers';

const TicketTable = ({ title, tickets, filter, loading }: TicketListingDetailProp) => {
  const rows = mapTicketsToRows(tickets);

  return (
    <TableContainer component={Paper} sx={{ mt: filter === 'All' ? 5 : undefined }}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="tickets table">
        <TableHead>
          <TableRow>
            <TableCell
              align="center"
              colSpan={7}
              sx={{
                bgcolor: '#D0E8C5',
                fontFamily: 'Poppins',
                fontSize: '27px',
                fontWeight: 900,
                height: '56px',
              }}
            >
              {title}
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
              Reported By
            </StyledTableCell>
            <StyledTableCell sx={{ fontWeight: 900 }} align="center">
              Priority
            </StyledTableCell>
            <StyledTableCell sx={{ fontWeight: 900 }} align="center">
              Link
            </StyledTableCell>
            <StyledTableCell sx={{ fontWeight: 900 }} align="center">
              Actions
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={7} align="center">
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 200,
                  }}
                >
                  <CircularProgress size={80} color="primary" />
                </Box>
              </TableCell>
            </TableRow>
          ) : rows.length > 0 ? (
            rows.map((row) => (
              <EditableRow key={row.ticketNo} row={row} category={title} />
            ))
          ) : (
            <TableRow>
              <TableCell sx={{ fontSize: '20px', padding: '20px' }} align="center">
                No Tickets Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TicketTable