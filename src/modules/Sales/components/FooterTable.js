import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
// Defimport { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  tableHeader: {
    backgroundColor: '#e0f0ff',
    fontWeight: 'bold',
  },
  tableRow: {
    borderBottom: '1px solid',
  },
  tableCell: {
    borderBottom: 'none',
  },
});
const AddTable = ({ rows, columns }) => {
  const classes = useStyles();
  return (
    <TableContainer>
      <Table>
        <TableHead className={classes.tableHeader}>
          <TableRow className={classes.tableRow}>
            {columns.map((column) => (
              <TableCell key={column.id}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index} className={classes.tableRow}>
              {columns.map((column) => (
                <TableCell key={column.id} className={classes.tableCell}>
                  {row[column.id]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AddTable;
