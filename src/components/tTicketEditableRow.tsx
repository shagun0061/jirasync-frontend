import React, { useState } from 'react';
import { TableRow, TableCell, Button, TextField, Box } from '@mui/material';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import { TicketEditableRowProps } from '@/helpers';
import { statusColor } from '@/helpers/Common';


const EditableRow = ({ row, category, onRowUpdate }:TicketEditableRowProps) => {
  const [editing, setEditing] = useState(false);
  const [newBoard, setNewBoard] = useState(row.ticketNo); 
  const [localRow, setLocalRow] = useState(row);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  console.log("🚀 ~ statusColor ~ localRow:", localRow)
  const statusStyles = statusColor(localRow.status)

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/ticket/ticket-detail/${row.ticketNo}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, newBoard }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to update ticket');
      }
      // updatedTicketData is returned with fresh data.
      const updatedTicketData = data.updatedTicketData || data.updateResult?.updatedTicketData;
      
      // Merge the updated data with the local row.
      
      const newLocalRow = { ...localRow, ...updatedTicketData, ticketNo: updatedTicketData.key };
      setLocalRow(newLocalRow);
  
      // Optionally, call the parent's onRowUpdate callback.
      if (onRowUpdate) onRowUpdate(newLocalRow);
      setEditing(false);
    } catch (err) {
      setError(`Oops, Getting Error In Updating The Ticket ${err}`);
    } finally {
      setLoading(false);
    }
  };
  
  
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {editing ? (
          <TextField
            value={newBoard}
            onChange={(e) => setNewBoard(e.target.value)}
            size="small"
          />
        ) : (
          localRow.ticketNo
        )}
      </TableCell>
      <TableCell align="center">
      <Box
          sx={{
            borderRadius: '20px',
            padding: 1,
            backgroundColor: statusStyles.backgroundColor,
            color: statusStyles.color,
            fontWeight: 'bold',
          }}
        >
          {localRow.status}
        </Box>
      </TableCell>
      <TableCell align="center">
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src={localRow.assigneeImage}
            alt={localRow.assignee}
            style={{ width: 30, height: 30, borderRadius: '50%', marginRight: 8 }}
          />
          {localRow.assignee}
        </Box>
      </TableCell>
      <TableCell align="center">
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src={localRow.reportedImage ?? localRow?.reportedByImage}
            alt={localRow.reported ?? localRow?.reportedBy}
            style={{ width: 30, height: 30, borderRadius: '50%', marginRight: 8 }}
          />
     {localRow.reported ?? localRow?.reportedBy}
        </Box>
      </TableCell>
      <TableCell align="center">{localRow.priority}</TableCell>
      <TableCell align="center">
        <a href={localRow.Link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
          <InsertLinkIcon />
        </a>
      </TableCell>
      <TableCell align="center">
        {editing ? (
          <>
            <Button onClick={handleSave} disabled={loading} variant="contained" size="small">
              {loading ? 'Saving...' : 'Save'}
            </Button>
            <Button
              onClick={() => {
                setEditing(false);
                setNewBoard(localRow.ticketNo);
              }}
              disabled={loading}
              variant="outlined"
              size="small"
              sx={{ ml: 1 }}
            >
              Cancel
            </Button>
            {error && <p style={{ color: 'red', margin: 0 }}>{error}</p>}
          </>
        ) : (
          <Button onClick={() => setEditing(true)} variant="outlined" size="small">
            Edit
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};

export default EditableRow;
