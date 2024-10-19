// TableGrid.js
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
// import { makeStyles } from '@mui/styles';

const TableGrid = ({ Row }) => {
  // const classes = useStyles();
  return (
    <TableContainer
      sx={{ maxHeight: '300px', overflowY: 'auto', border: 'none', marginTop: '20px' }}
    >
      <Table
        sx={{
          borderCollapse: 'collapse',
          border: 'none',
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                fontWeight: 'bold',
              }}
            >
              No
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 'bold',
              }}
            >
              description
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 'bold',
              }}
            >
              Ordered (Qty)
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 'bold',
              }}
            >
              Unit Price
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 'bold',
              }}
            >
              Subtotal
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Row.map((product, index) => (
            <TableRow
              key={index}
              sx={{
                border: 'none',
                borderBottom: '1px solid lightgrey ',
              }}
            >
              <TableCell
                component="th"
                scope="row"
                sx={{
                  border: 'none',
                }}
              >
                {index + 1}
              </TableCell>
              <TableCell
                sx={{
                  border: 'none',
                }}
              >
                {product.product_name}
              </TableCell>
              <TableCell
                sx={{
                  border: 'none',
                }}
              >
                {product.quantity}
              </TableCell>
              <TableCell
                sx={{
                  border: 'none',
                }}
              >
                {product.net_unit_cost}
              </TableCell>
              <TableCell
                sx={{
                  border: 'none',
                }}
              >
                {product.subtotal}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableGrid;
