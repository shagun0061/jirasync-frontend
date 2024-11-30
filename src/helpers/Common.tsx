
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#454545",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

export function statusColor(status: string): { backgroundColor: string; color: string } {
    const statusColors: { [key: string]: { backgroundColor: string; color: string } } = {
        "In Progress": { backgroundColor: "#D1E9FC", color: "#1565C0" },  // Light Sky Blue
        "QA": { backgroundColor: "#E6F4EA", color: "#2E7D32" },           // Soft Green
        "Code Review": { backgroundColor: "#F8E1F5", color: "#6A1B9A" }, // Lavender
        "Dev Testing": { backgroundColor: "#FFF9C4", color: "#F9A825" }, // Pale Yellow
        "QA Testing": { backgroundColor: "#B2EBF2", color: "#00838F" },  // Bright Aqua
        "Todo": { backgroundColor: "#ECEFF1", color: "#455A64" }         // Soft Gray
    };

    // Default: White background with black text for undefined statuses
    return statusColors[status] || { backgroundColor: "#FFFFFF", color: "#000000" };
}