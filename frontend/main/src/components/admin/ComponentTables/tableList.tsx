import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import BlankCard from 'src/components/shared/BlankCard';
import Scrollbar_x from 'src/components/custom-scroll/Scrollbar_x';

// Hàm so sánh giảm dần
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

// Kiểu dữ liệu Order
type Order = 'asc' | 'desc';

// Hàm so sánh theo thứ tự đã chọn
function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Hàm sắp xếp ổn định
function stableSort<T>(array: any[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// Hàm để xác định màu sắc của hàng
function getRowColor(row: DataRow): string {
  // Ví dụ: Thay đổi màu sắc dựa trên một giá trị trong dữ liệu hàng
  return row.someValue > 100 ? 'lightcoral' : 'transparent';
}

interface HeadCell {
  disablePadding: boolean;
  dataIndex: string;
  label: string;
  numeric: boolean;
}

interface DataRow {
  [key: string]: any;
}

interface TableListProps {
  headCells?: HeadCell[];
  dataRows?: DataRow[];
}

const TableList: React.FC<TableListProps> = ({ headCells, dataRows }) => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<string | number>('id');
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dense] = useState(false);

  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: keyof DataRow) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (_event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - (dataRows?.length ?? 0)) : 0;

  return (
    <Grid item xs={12}>
      <BlankCard>
        <Box mb={2} sx={{ mb: 2 }}>
          <TableContainer sx={{ px: 2 }}>
            <Scrollbar_x>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? 'small' : 'medium'}
              >
                <TableHead sx={{ overflowX: 'auto', width: '100%' }}>
                  <TableRow>
                    {(headCells || []).map((headCell) => (
                      <TableCell
                        key={headCell.dataIndex}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.dataIndex ? order : false}
                        sx={{ whiteSpace: 'nowrap' }}
                      >
                        <TableSortLabel
                          active={orderBy === headCell.dataIndex}
                          direction={orderBy === headCell.dataIndex ? order : 'asc'}
                          onClick={(event) =>
                            handleRequestSort(event, headCell.dataIndex as keyof DataRow)
                          }
                        >
                          <Typography variant="h6">{headCell.label}</Typography>
                        </TableSortLabel>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stableSort(dataRows ?? [], getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: DataRow) => {
                      const isItemSelected = selected.indexOf(row.id) !== -1;
                      const rowColor = getRowColor(row);

                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, row.id)}
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
                          selected={isItemSelected}
                          sx={{ backgroundColor: rowColor }} // Áp dụng màu sắc
                        >
                          {(headCells ?? []).map((cell: HeadCell) => (
                            <TableCell
                              key={cell.dataIndex}
                              align={cell.numeric ? 'right' : 'left'}
                              sx={{ whiteSpace: 'nowrap' }}
                            >
                              <Typography color="textSecondary" variant="subtitle2">
                                {row[cell.dataIndex] !== undefined && row[cell.dataIndex]}
                              </Typography>
                            </TableCell>
                          ))}
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                      <TableCell colSpan={headCells?.length ?? 0} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Scrollbar_x>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={dataRows?.length ?? 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Hàng trên mỗi trang"
          />
        </Box>
      </BlankCard>
    </Grid>
  );
};

export default TableList;
