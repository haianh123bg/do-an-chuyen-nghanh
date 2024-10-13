import FilterListIcon from '@mui/icons-material/FilterList';
import {
  Avatar,
  Badge,
  Box,
  Checkbox,
  Grid,
  IconButton,
  InputAdornment,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { IconEye, IconSearch, IconTrash } from '@tabler/icons-react';
import { Dayjs } from 'dayjs';
import React, { useEffect, useMemo, useState } from 'react';
import CustomTable from 'src/components/ComponentTables/CustomTable';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
import PersonnelTable from '../datatable/PersonnelTable';
import DialogPersonel from '../dialog/DialogPersonel';
// import DialogPersonel from '../dialog/DialogPersonel';
import AddCircleIcon from '@mui/icons-material/AddCircle';
interface PropsItem {
  value: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedKey: string | null;
  setSelectedKey: React.Dispatch<React.SetStateAction<string | null>>;
}
interface Column {
  title: string;
  dataIndex: string;
  render?: (value: any, row?: any) => React.ReactNode;
  isValids?: boolean;
}
const PersonnelTab = ({ value, open, setOpen, setSelectedKey, selectedKey }: PropsItem) => {
  // const [selectedItems] = useState<number[]>([]);
  const [isCheckFix, setIsCheckFix] = useState<boolean>(false);
  const [valueTime1, setValueTime1] = useState<Dayjs | null>(null);
  const [valueTime2, setValueTime2] = useState<Dayjs | null>(null);
  const column = useMemo<Column[]>(
    () => [
      { dataIndex: 'id', title: 'ID', validate: true },
      {
        dataIndex: 'createdAt',
        title: 'Ngày tạo',
        render: (value: any) => value.toLocaleDateString(),
        validate: true,
      },
      {
        dataIndex: 'employeeName',
        title: 'Nhân viên',
        render: (row: any, value: any) => (
          <>
            <Stack direction="row" spacing={2}>
              <Avatar src={value.avt} variant="rounded" alt={value.avt} />
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="h6">{row}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2">{value.position}</Typography>
                </Grid>
              </Grid>
            </Stack>
          </>
        ),

        validate: true,
      },
      { dataIndex: 'department', title: 'Phòng ban', validate: true },
      { dataIndex: 'email', title: 'Email', validate: true },
      { dataIndex: 'phoneNumber', title: 'Số điện thoại', validate: true },
      { dataIndex: 'articleCount', title: 'Bài viết', validate: true },
      {
        dataIndex: 'status',
        title: 'Trạng thái',
        validate: true,

        render: (value: any) => (
          <>
            {value ? (
              <Typography color="success.dark" variant="subtitle2">
                Hoạt động
              </Typography>
            ) : (
              <Typography color="error" variant="subtitle2">
                Khóa
              </Typography>
            )}
          </>
        ),
      },
      {
        dataIndex: 'isActive',
        title: 'Hoạt động',
        validate: true,
        render: (_value, row: any) => (
          <>
            <IconButton
              onClick={() => {
                setSelectedKey(row.id);
                setOpen(true);
                setIsCheckFix(true);
              }}
            >
              <IconEye stroke={2} style={{ color: '#5D87FF' }} />
            </IconButton>
            <IconButton>
              <IconTrash stroke={2} style={{ color: '#FA896B' }} />
            </IconButton>
          </>
        ),
      },
    ],
    [],
  );

  const [dataSelect, setDataSelect] = useState<string[]>([]);

  useEffect(() => {
    const selectedColumns = column || [];
    const hasIsValids = selectedColumns.some((col) => col.isValids !== undefined);
    if (hasIsValids) {
      const hiddenColumns = selectedColumns
        .filter((col) => col.isValids === false)
        .map((col) => col.dataIndex || '');
      setDataSelect(hiddenColumns);
    } else {
      setDataSelect([]);
    }
  }, [column]);

  const handleColumnChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setDataSelect(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <>
      {' '}
      <Grid item xs={12}>
        <Grid container sx={{ alignItems: 'center' }} spacing={2}>
          <Grid
            item
            xs={4}
            sm={4}
            md={4}
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Grid container sx={{ alignItems: 'center' }}>
              <Grid item xs={2}>
                <IconButton
                  color="primary"
                  aria-label="Add to cart"
                  onClick={() => {
                    setOpen(true);
                    setSelectedKey(null);
                  }}
                >
                  <AddCircleIcon sx={{ fontSize: 30 }} />
                </IconButton>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  id="outlined-search"
                  placeholder="Tìm kiếm nhân viên"
                  size="small"
                  type="search"
                  variant="outlined"
                  inputProps={{ 'aria-label': 'Search Followers' }}
                  sx={{ fontSize: { xs: '10px', sm: '16px', md: '16px' } }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconSearch size="12" />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth={true}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              display: 'flex',
              justifyContent: 'end',
              alignItems: 'center',
            }}
          >
            <IconButton aria-label="filter" sx={{ mr: 2 }}>
              <Badge badgeContent={column.length - dataSelect.length} color="primary">
                <FilterListIcon />
              </Badge>
            </IconButton>
            <Select
              multiple
              value={dataSelect}
              displayEmpty
              onChange={handleColumnChange}
              renderValue={() => 'Sửa đổi cột'}
              size="small"
              MenuProps={{
                PaperProps: {
                  sx: {
                    marginTop: 1,
                    maxHeight: 400,
                    '&::-webkit-scrollbar': {
                      width: '4px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: '#D2D2D2',
                      borderRadius: '10px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                      backgroundColor: '#C6C8CC',
                    },
                    '&::-webkit-scrollbar-track': {
                      backgroundColor: '#f1f1f1',
                    },
                  },
                },
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'right',
                },
                transformOrigin: {
                  vertical: 'top',
                  horizontal: 'right',
                },
              }}
            >
              <MenuItem>
                <Checkbox
                  checked={dataSelect.length === column.length}
                  indeterminate={dataSelect.length > 0 && dataSelect.length < column.length}
                  onChange={(e) => {
                    if (e.target.checked) {
                      const allColumns = column.map((header: Column) => header.dataIndex);
                      setDataSelect(allColumns);
                    } else {
                      setDataSelect([]);
                    }
                  }}
                />
                <ListItemText primary="Chọn tất cả" />
              </MenuItem>
              {column.map((header: Column) => {
                const isSelected = dataSelect.includes(header.dataIndex);
                return (
                  <MenuItem key={header.dataIndex} value={header.dataIndex}>
                    <Checkbox checked={isSelected} />
                    <ListItemText primary={header.title} />
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={valueTime1}
                  onChange={(newValue) => {
                    setValueTime1(newValue);
                  }}
                  renderInput={(props) => (
                    <CustomTextField
                      {...props}
                      fullWidth
                      size="small"
                      sx={{
                        '& .MuiSvgIcon-root': {
                          width: '18px',
                          height: '18px',
                        },
                        '& .MuiFormHelperText-root': {
                          display: 'none',
                        },
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
              tới
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={valueTime2}
                  onChange={(newValue) => {
                    setValueTime2(newValue);
                  }}
                  renderInput={(props) => (
                    <CustomTextField
                      {...props}
                      fullWidth
                      size="small"
                      sx={{
                        '& .MuiSvgIcon-root': {
                          width: '18px',
                          height: '18px',
                        },
                        '& .MuiFormHelperText-root': {
                          display: 'none',
                        },
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <CustomTable columns={column} dataSource={PersonnelTable} dataSelect={dataSelect} />
      <DialogPersonel
        open={open}
        value={value}
        setOpen={setOpen}
        keyOption={selectedKey}
        isCheckFix={isCheckFix}
        setIsCheckFix={setIsCheckFix}
      />
    </>
  );
};

export default PersonnelTab;
