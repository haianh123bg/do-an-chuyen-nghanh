import PageContainer from 'src/components/container/PageContainer';
import {
    Badge,
    Box,
    Checkbox,
    Grid,
    IconButton,
    InputAdornment,
    ListItemText,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import BannerPage from 'src/layouts/full/shared/breadcrumb/BannerPage';
import TopCard from 'src/components/widgets/cards/TopCard';
import CustomTable from 'src/components/admin/ComponentTables/CustomTable';
import { useEffect, useMemo, useState } from 'react';
import PublisherTable from './datatable/Publisher';
import { IconEdit, IconSearch, IconTrash } from '@tabler/icons-react';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import { AddCircle, FilterList } from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Dayjs } from 'dayjs';

interface Column {
    title: string;
    dataIndex: string;
    render?: (value: any, row?: any) => React.ReactNode;
    isValids?: boolean;
}

const dataSource = [
    {
        bgColor: 'primary.light',
        title: 'Giáo viên',
        total: '190',
        icons: (
            <Box
                textAlign="center"
                padding={1}
                sx={{
                    width: 40,
                    height: 40,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {/* <img src={contract} width={30} /> */}
            </Box>
        ),
    },
    {
        bgColor: 'primary.light',
        title: 'Học viên',
        total: '190',
        icons: (
            <Box
                textAlign="center"
                padding={1}
                sx={{
                    width: 40,
                    height: 40,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {/* <img src={contractreject} width={30} /> */}
            </Box>
        ),
    },
    {
        bgColor: 'primary.light',
        title: 'Hoạt động',
        total: '123',
        icons: (
            <Box
                textAlign="center"
                padding={1}
                sx={{
                    width: 40,
                    height: 40,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {/* <img src={contractdone} width={30} /> */}
            </Box>
        ),
    },
    {
        bgColor: 'primary.light',
        title: 'Bị cấm',
        total: '23',
        icons: (
            <Box
                textAlign="center"
                padding={1}
                sx={{
                    width: 40,
                    height: 40,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {/* <img src={contractwait} width={30} /> */}
            </Box>
        ),
    },
];

const AccountTeacherManagement = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [checkValue, setCheckValue] = useState<string | null>(null);
    const [selectID, setSelectID] = useState<string | null>(null);
    const [dataSelect, setDataSelect] = useState<string[]>([]);
    const [value, setValue] = useState<Dayjs | null>(null);
    const [value1, setValue1] = useState<Dayjs | null>(null);

    const handleColumnChange = (event: any) => {
        const {
            target: { value },
        } = event;
        setDataSelect(typeof value === 'string' ? value.split(',') : value);
    };

    const column = useMemo<Column[]>(
        () => [
            {
                title: 'ID',
                dataIndex: 'id',
            },
            {
                title: 'Ngày tạo',
                dataIndex: 'createDate',
            },
            {
                title: 'Email',
                dataIndex: 'package',
            },
            {
                title: 'Tên giảng viên',
                dataIndex: 'points',
                render: (value: string) => (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {value}
                        {/* <img src={icontext} alt="" width={20} /> */}
                    </Box>
                ),
            },
            {
                title: 'Khóa học',
                dataIndex: 'totalBuy',
            },
            {
                title: 'Lượt mua',
                dataIndex: 'totalBuy',
            },
            {
                dataIndex: 'isActive',
                title: 'Hoạt động',
                render: (_value, row) => (
                    <>
                        <IconButton
                            onClick={() => {
                                setSelectID(row.id);
                                setOpen(true);
                                setCheckValue('view');
                            }}
                        >
                            <IconEdit stroke={2} style={{ color: '#5D87FF' }} />
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

    const BCrumb = [
        {
            to: '/admin',
            title: 'Trang chủ',
        },
        { to: '/admin/account/teacher', title: 'Giáo viên' },
    ];
    return (
        <PageContainer title="eCommerce Dashboard" description="this is eCommerce Dashboard page">
            <BannerPage title="Tài khoản" items={BCrumb} />
            <Grid container spacing={0}>
                <TopCard dataSource={dataSource} totalColumn={4} />
                <Grid item xs={12} mt={3}>
                    <Grid container sx={{ alignItems: 'center' }} spacing={2}>
                        <Grid
                            item
                            xs={4}
                            sm={4}
                            md={3.5}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <Grid container sx={{ alignItems: 'center' }}>
                                <Grid item>
                                    <IconButton
                                        color="primary"
                                        aria-label="Add to cart"
                                        onClick={() => {
                                            setOpen(true);
                                            setCheckValue('add');
                                        }}
                                    >
                                        <AddCircle sx={{ fontSize: 30 }} />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={10}>
                                    <TextField
                                        id="outlined-search"
                                        placeholder="Tìm kiếm khóa học"
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
                            xs={4.5}
                            sx={{
                                display: 'flex',
                                justifyContent: 'end',
                                alignItems: 'center',
                            }}
                        >
                            <Grid container sx={{ alignItems: 'center' }}>
                                <Grid item xs={5} sx={{ display: 'flex' }}>
                                    <IconButton aria-label="filter" sx={{ mr: 2 }}>
                                        <Badge
                                            badgeContent={column.length - dataSelect.length}
                                            color="primary"
                                        >
                                            <FilterList />
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
                                        {column.map((header: any) => {
                                            // console.log(`check ${header.title}`, dataSelect.includes(header.dataIndex));

                                            const isSelected = dataSelect.includes(
                                                header.dataIndex,
                                            );

                                            return (
                                                <MenuItem
                                                    key={header.dataIndex}
                                                    value={header.dataIndex}
                                                >
                                                    <Checkbox checked={!isSelected} />
                                                    <ListItemText primary={header.title} />
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={4}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        value={value}
                                        onChange={(newValue: any) => {
                                            setValue(newValue);
                                        }}
                                        renderInput={(params: any) => (
                                            <TextField {...params} fullWidth sx={{ mb: 3 }} />
                                        )}
                                    />
                                </LocalizationProvider>
                                tới
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        value={value1}
                                        onChange={(newValue: any) => {
                                            setValue1(newValue);
                                        }}
                                        renderInput={(params: any) => (
                                            <TextField {...params} fullWidth sx={{ mb: 3 }} />
                                        )}
                                    />
                                </LocalizationProvider>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <CustomTable
                        columns={column}
                        dataSource={PublisherTable}
                        dataSelect={dataSelect}
                    />
                </Grid>
            </Grid>
        </PageContainer>
    );
};

export default AccountTeacherManagement;
