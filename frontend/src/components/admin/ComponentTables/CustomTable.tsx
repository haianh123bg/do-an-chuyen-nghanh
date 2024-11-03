import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  Box,
  IconButton,
  Paper,
} from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import Scrollbar_x from 'src/components/custom-scroll/Scrollbar_x';

interface Column {
  title: string;
  dataIndex?: string;
  render?: (value: any, record: any, rowIndex: number) => React.ReactNode;
  sort?: boolean;
  isValids?: boolean;
}

interface CustomTableProps {
  columns: Column[];
  dataSource: any[];
  rowsPerPageOptions?: number[];
  dataSelect?: string[];
}

const CustomTable: React.FC<CustomTableProps> = ({
  columns,
  dataSource,
  rowsPerPageOptions = [5, 10, 25],
  dataSelect = [],
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = dataSource?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <TableContainer component={Paper} sx={{ px: 2 }}>
      <Scrollbar_x>
        <Table>
          <TableHead>
            <TableRow>
              {columns?.map((column, index) => {
                const isColumnVisible = !dataSelect.includes(column.dataIndex ?? '');
                const isSortable = column.sort ?? false;
                return (
                  <>
                    {isColumnVisible && (
                      <TableCell key={index}>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <Typography
                            variant="subtitle2"
                            fontWeight={600}
                            sx={{ flexGrow: 1, whiteSpace: 'nowrap' }}
                          >
                            {column.title}
                          </Typography>
                          {isSortable && (
                            <IconButton>
                              <SwapVertIcon />
                            </IconButton>
                          )}
                        </Box>
                      </TableCell>
                    )}
                  </>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData?.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column, colIndex) => {
                  const value = column.dataIndex ? row[column.dataIndex] : undefined;
                  const isColumnVisible = !dataSelect.includes(column.dataIndex ?? '');
                  return (
                    isColumnVisible && (
                      <TableCell key={colIndex} sx={{ whiteSpace: 'nowrap' }}>
                        <Typography
                          variant="subtitle2"
                          style={{
                            whiteSpace: 'nowrap', 
                            overflow: 'hidden',    
                            textOverflow: 'ellipsis', 
                            maxWidth: '200px',    
                          }}
                        >
                          {column.render ? column.render(value, row, rowIndex) : value}
                        </Typography>
                      </TableCell>
                    )
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbar_x>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={dataSource.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Số hàng trên trang"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}–${to} của ${count !== -1 ? count : `hơn ${to}`}`
        }
      />
    </TableContainer>
  );
};

export default CustomTable;
