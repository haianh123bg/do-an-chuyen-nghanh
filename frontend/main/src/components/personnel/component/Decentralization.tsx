// import React, { useState, useEffect } from 'react';
// import {
//     Box,
//     Button,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogTitle,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Checkbox,
//     Paper,
//     Typography,
//     List,
//     ListItemButton,
//     ListItemText,
//     Stack,
//     Avatar,
//     Grid,
//     FormControl,
//     InputLabel,
//     MenuItem
// } from '@mui/material';
// import PersonnelTable from '../datatable/PersonnelTable';
// import Select, { SelectChangeEvent } from '@mui/material/Select';



// interface FunctionProps {
//     name: string,
//     permissions: string[]
// }

// const permissions: string[] = ['xem', 'them', 'sua', 'xoa', 'khong'];

// // const functions: FunctionProps[] = [
// //     {
// //         name: 'Chức năng 1',
// //         permissions: permissions
// //     },
// //     {
// //         name: 'Chức năng 2',
// //         permissions: permissions
// //     }
// // ];

// interface PropsTable {
//     head: string
// }

// const HeadTable: PropsTable[] = [
//     {
//         head: 'Chức năng'
//     },
//     {
//         head: 'Xem'
//     },
//     {
//         head: 'Thêm'
//     },
//     {
//         head: 'Sửa'
//     },
//     {
//         head: 'Xóa'
//     },
//     {
//         head: 'Không có quyền'
//     },
// ]

// const InfoRow: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
//     <Grid item xs={12}>
//         <Grid container xs={12}>
//             <Grid item xs={4}>
//                 <Typography variant='h6'>{label}</Typography>
//             </Grid>
//             <Grid item xs={1}>
//                 <Typography variant='h6' >
//                     :
//                 </Typography>
//             </Grid>
//             <Grid item xs={4}>
//                 <Typography variant='h6' fontWeight={400}>
//                     {value}
//                 </Typography>
//             </Grid>
//         </Grid>
//     </Grid>
// );

// const Decentralization = () => {
//     const [openDialog, setOpenDialog] = useState(false);
//     const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
//     const [employeePermissions, setEmployeePermissions] = useState<{ [key: string]: { [key: string]: boolean } }>({});
//     // const [functions, setFunctions] = useState<FunctionProps[]>([])
//     const [selectItem, setSelectITem] = useState<string>('')
//     const [functions, setFunctions] = useState<FunctionProps[]>([
//         {
//             name: selectItem,
//             permissions: permissions
//         },
//     ])
//     // const functions: FunctionProps[] = [
//     //     {
//     //         name: selectItem,
//     //         permissions: permissions
//     //     },
//     //     {
//     //         name: selectItem,
//     //         permissions: permissions
//     //     }
//     // ];

//     const handleChange = (event: SelectChangeEvent) => {
//         setSelectITem(event.target.value as string);
//     };

//     const handleOpenDialog = () => setOpenDialog(true);
//     const handleCloseDialog = () => setOpenDialog(false);

//     const handleSelectEmployee = (employee: any) => {
//         setSelectedEmployee(employee);
//         setEmployeePermissions(employee.permissions);
//         handleCloseDialog();
//     };

//     const handleCheckboxChange = (functionName: string, permission: string) => {
//         setEmployeePermissions(prev => ({
//             ...prev,
//             [functionName]: {
//                 ...prev[functionName],
//                 [permission]: !prev[functionName][permission]
//             }
//         }));
//     };

//     useEffect(() => {
//         if (selectedEmployee) {
//             setEmployeePermissions(selectedEmployee.permissions);
//         }
//     }, [selectedEmployee]);

//     return (
//         <Box sx={{ position: 'relative' }}>
//             <Button variant="contained" onClick={handleOpenDialog}>
//                 Chọn nhân viên
//             </Button>

//             <Dialog
//                 open={openDialog}
//                 onClose={handleCloseDialog}
//                 fullWidth
//                 maxWidth='xs'

//             >
//                 <DialogTitle sx={{ textAlign: 'center' }}>Chọn nhân viên</DialogTitle>
//                 <DialogContent
//                     sx={{
//                         maxHeight: 300,
//                         overflowY: 'auto',
//                         '&::-webkit-scrollbar': {
//                             width: '4px',
//                         },
//                         '&::-webkit-scrollbar-thumb': {
//                             backgroundColor: '#C6C8CC',
//                             borderRadius: '4px',
//                         },
//                         '&::-webkit-scrollbar-track': {
//                             backgroundColor: 'transparent',
//                         },
//                     }}
//                 >
//                     <List>
//                         {PersonnelTable.map(emp => (
//                             <ListItemButton key={emp.id} onClick={() => handleSelectEmployee(emp)}>
//                                 <Stack direction='row' spacing={2}>
//                                     <Avatar src={emp.avt} />
//                                     <ListItemText
//                                         primary={emp.employeeName}
//                                         secondary={emp.email}
//                                     />
//                                 </Stack>
//                             </ListItemButton>
//                         ))}
//                     </List>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button
//                         variant='contained'
//                         color='error'
//                         onClick={handleCloseDialog}
//                     >
//                         Đóng
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//             {selectedEmployee && (
//                 <Box sx={{ mt: 2 }}>

//                     <Box sx={{ mt: 2 }}>
//                         <Box
//                             sx={{
//                                 display: 'flex',
//                                 justifyContent: 'space-between',
//                                 alignItems: 'center'
//                             }}
//                         >
//                             <Typography variant="h4">Thông tin nhân viên</Typography>

//                             {selectedEmployee.status ? (
//                                 <Box
//                                     sx={{
//                                         backgroundColor: 'success.light',
//                                         paddingY: 1.2,
//                                         paddingX: 1,
//                                         borderRadius: 1.5
//                                     }}
//                                 >
//                                     <Typography color="success.dark" fontWeight={600} variant="subtitle2">
//                                         Hoạt động
//                                     </Typography>
//                                 </Box>
//                             ) : (
//                                 <Box
//                                     sx={{
//                                         backgroundColor: 'error.light',
//                                         padding: 1,
//                                         paddingX: 1,
//                                         borderRadius: 1.5
//                                     }}
//                                 >
//                                     <Typography color="error.dark" fontWeight={600} variant="subtitle2">
//                                         Khóa
//                                     </Typography>
//                                 </Box>
//                             )}
//                         </Box>

//                         <Grid container sx={{ marginY: 2 }}>
//                             <Grid
//                                 item
//                                 xs={4}
//                                 sx={{
//                                     display: 'flex',
//                                     justifyContent: 'space-between',
//                                     alignItems: 'center'
//                                 }}
//                             >
//                                 <Avatar
//                                     variant="square"
//                                     src={selectedEmployee.avt}
//                                     sx={{
//                                         width: 200,
//                                         height: 200,
//                                         borderRadius: 4
//                                     }}
//                                 />
//                             </Grid>

//                             <Grid
//                                 item
//                                 xs={8}
//                                 sx={{
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                     justifyContent: 'center'
//                                 }}
//                             >
//                                 <Grid container xs={12}>
//                                     <Grid item xs={6}>
//                                         <Grid container rowSpacing={2}>
//                                             <InfoRow label="ID" value={selectedEmployee.id} />
//                                             <InfoRow label="Tên nhân viên" value={selectedEmployee.employeeName} />
//                                             <InfoRow label="Chức vụ" value={selectedEmployee.position} />
//                                             <InfoRow label="Phòng ban" value={selectedEmployee.department} />
//                                         </Grid>
//                                     </Grid>

//                                     <Grid item xs={6}>
//                                         <Grid container rowSpacing={2}>
//                                             <InfoRow label="Email" value={selectedEmployee.email} />
//                                             <InfoRow label="Số điện thoại" value={selectedEmployee.phoneNumber} />
//                                             <InfoRow
//                                                 label="Ngày tạo"
//                                                 value={selectedEmployee.createdAt.toLocaleDateString()}
//                                             />
//                                             <InfoRow label="Bài viết" value={selectedEmployee.articleCount} />
//                                         </Grid>
//                                     </Grid>
//                                 </Grid>
//                             </Grid>
//                         </Grid>
//                     </Box>
//                     <Box
//                         sx={{
//                             position: 'absolute',
//                             right: 0
//                         }}
//                     >
//                         <Button variant='outlined' color='primary'>
//                             Thêm quyền
//                         </Button>
//                     </Box>
//                     {functions.length > 0 &&
//                         <Box>
//                             <Typography variant="h4" sx={{ mt: 3, mb: 2 }}>Phân quyền</Typography>
//                             <TableContainer component={Paper}>
//                                 <Table>
//                                     <TableHead>
//                                         <TableRow>
//                                             {HeadTable.map((item, index) => {
//                                                 return (
//                                                     <TableCell key={index}>
//                                                         <Typography variant='h6' >
//                                                             {item.head}
//                                                         </Typography>
//                                                     </TableCell>
//                                                 )
//                                             })}
//                                         </TableRow>
//                                     </TableHead>
//                                     <TableBody>
//                                         {functions.map(func => {

//                                             return (
//                                                 <TableRow key={func.name}>
//                                                     <TableCell>
//                                                         {/* <Typography variant='subtitle2' >
//                                                             {func.name}
//                                                         </Typography> */}
//                                                         <FormControl fullWidth>
//                                                             <InputLabel id="demo-simple-select-label">Chức năng</InputLabel>
//                                                             <Select
//                                                                 labelId="demo-simple-select-label"
//                                                                 id="demo-simple-select"
//                                                                 value={selectItem}
//                                                                 label="Chức năng"
//                                                                 onChange={handleChange}
//                                                             >
//                                                                 <MenuItem value={10}>Chức năng 1</MenuItem>
//                                                                 <MenuItem value={20}>Chức năng 2</MenuItem>
//                                                                 <MenuItem value={30}>Chức năng 3</MenuItem>
//                                                             </Select>
//                                                         </FormControl>
//                                                     </TableCell>
//                                                     {func.permissions.map(perm => {
//                                                         return (
//                                                             <TableCell key={perm}

//                                                             >
//                                                                 <Checkbox
//                                                                     checked={employeePermissions[func.name]?.[perm] || false}
//                                                                     onChange={() => handleCheckboxChange(func.name, perm)}
//                                                                 />
//                                                             </TableCell>
//                                                         )
//                                                     })}
//                                                 </TableRow>
//                                             )
//                                         })}
//                                     </TableBody>

//                                 </Table>
//                             </TableContainer>
//                             <Box
//                                 sx={{
//                                     display: 'flex',
//                                     justifyContent: 'end',
//                                     paddingTop: 3
//                                 }}
//                             >
//                                 {/* <Button variant='contained'>
//                                     Cập nhật
//                                 </Button> */}
//                                 <Button
//                                     variant='contained'
//                                     onClick={() => {
//                                         console.log("Permissions đã chọn:", employeePermissions);
//                                         // Object.keys(employeePermissions).forEach(funcName => {
//                                         //     const funcPermissions = employeePermissions[funcName];
//                                         //     console.log(`Chức năng: ${funcName}`);
//                                         //     Object.keys(funcPermissions).forEach(permission => {
//                                         //         if (funcPermissions[permission]) {
//                                         //             console.log(`- Đã chọn quyền: ${permission}`);
//                                         //         }
//                                         //     });
//                                         // });
//                                     }}
//                                 >
//                                     Cập nhật
//                                 </Button>
//                             </Box>
//                         </Box>
//                     }
//                 </Box>
//             )}

//         </Box>
//     );
// };

// export default Decentralization;


import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    List,
    ListItemButton,
    ListItemText,
    Stack,
    Avatar,
    Grid,
    Checkbox,
    FormControl,
    InputLabel,
    MenuItem,
} from '@mui/material';
import PersonnelTable from '../datatable/PersonnelTable';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CustomTable from 'src/components/ComponentTables/CustomTable';


interface PropsPosition {
    view: boolean,
    add: boolean,
    fix: boolean,
    dele: boolean,
    nonee: boolean
}


interface FunctionProps {
    name: string,
    permissions: PropsPosition;
}

interface Column {
    title: string;
    dataIndex?: string;
    render?: (value: any, record: any, rowIndex: number) => React.ReactNode;
    sort?: boolean;
    isValids?: boolean;
}


const InfoRow: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
    <Grid item xs={12}>
        <Grid container xs={12}>
            <Grid item xs={4}>
                <Typography variant='h6'>{label}</Typography>
            </Grid>
            <Grid item xs={1}>
                <Typography variant='h6' >
                    :
                </Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography variant='h6' fontWeight={400}>
                    {value}
                </Typography>
            </Grid>
        </Grid>
    </Grid>
);

const Decentralization = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
    const [functions, setFunctions] = useState<FunctionProps[]>([]);
    const [selectedFunctions, setSelectedFunctions] = useState<{ [key: number]: string }>({});
    const [selectedPermissions, setSelectedPermissions] = useState<{ [key: number]: PropsPosition }>({});

    const handleChange = (event: SelectChangeEvent, rowIndex: number) => {
        const updatedSelections = {
            ...selectedFunctions,
            [rowIndex]: event.target.value as string,
        };
        setSelectedFunctions(updatedSelections);
    };
    const handleCheckboxChange = (rowIndex: number, permissionType: keyof PropsPosition) => {
        setSelectedPermissions((prevPermissions) => ({
            ...prevPermissions,
            [rowIndex]: {
                ...prevPermissions[rowIndex],
                [permissionType]: !prevPermissions[rowIndex]?.[permissionType]
            }
        }));
    };

    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);

    const handleSelectEmployee = (employee: any) => {
        setSelectedEmployee(employee);
        handleCloseDialog();
    };

    const columns: Column[] = [
        {
            title: 'Chức năng',
            dataIndex: 'chucnang',
            render: (_, __, rowIndex) => (
                <FormControl fullWidth>
                    <InputLabel id={`select-label-${rowIndex}`}>Chức năng</InputLabel>
                    <Select
                        labelId={`select-label-${rowIndex}`}
                        id={`select-${rowIndex}`}
                        value={selectedFunctions[rowIndex] || ''}
                        label="Chức năng"
                        onChange={(event) => handleChange(event, rowIndex)}
                    >
                        <MenuItem value="Chức năng 1">Chức năng 1</MenuItem>
                        <MenuItem value="Chức năng 2">Chức năng 2</MenuItem>
                        <MenuItem value="Chức năng 3">Chức năng 3</MenuItem>
                    </Select>
                </FormControl>
            )
        },
        {
            title: 'Xem',
            dataIndex: 'view',
            render: (_, __, rowIndex) => (
                <Checkbox
                    checked={selectedPermissions[rowIndex]?.view || false}
                    onChange={() => handleCheckboxChange(rowIndex, 'view')}
                />
            )

        },
        {
            title: 'Thêm',
            dataIndex: 'add',
            render: (_, __, rowIndex) => (
                <Checkbox
                    checked={selectedPermissions[rowIndex]?.add || false}
                    onChange={() => handleCheckboxChange(rowIndex, 'add')}
                />
            )
        },
        {
            title: 'Sửa',
            dataIndex: 'fix',
            render: (_, __, rowIndex) => (
                <Checkbox
                    checked={selectedPermissions[rowIndex]?.fix || false}
                    onChange={() => handleCheckboxChange(rowIndex, 'fix')}
                />
            )
        },
        {
            title: 'Xóa',
            dataIndex: 'dele',
            render: (_, __, rowIndex) => (
                <Checkbox
                    checked={selectedPermissions[rowIndex]?.dele || false}
                    onChange={() => handleCheckboxChange(rowIndex, 'dele')}
                />
            )
        },
        {
            title: 'Không có quyền',
            dataIndex: 'nonee',
            render: (_, __, rowIndex) => (
                <Checkbox
                    checked={selectedPermissions[rowIndex]?.nonee || false}
                    onChange={() => handleCheckboxChange(rowIndex, 'nonee')}
                />
            )
        },
    ]

    const handleClick = () => {
        const newFunction: FunctionProps = {
            name: selectedFunctions[functions.length] || '',
            permissions: {
                view: false,
                add: false,
                fix: false,
                dele: false,
                nonee: false,
            },
        };

        setFunctions([...functions, newFunction]);
    };


    return (
        <Box sx={{ position: 'relative' }}>
            <Button variant="contained" onClick={handleOpenDialog}>
                Chọn nhân viên
            </Button>

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                fullWidth
                maxWidth='xs'

            >
                <DialogTitle sx={{ textAlign: 'center' }}>Chọn nhân viên</DialogTitle>
                <DialogContent
                    sx={{
                        maxHeight: 300,
                        overflowY: 'auto',
                        '&::-webkit-scrollbar': {
                            width: '4px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: '#C6C8CC',
                            borderRadius: '4px',
                        },
                        '&::-webkit-scrollbar-track': {
                            backgroundColor: 'transparent',
                        },
                    }}
                >
                    <List>
                        {PersonnelTable.map(emp => (
                            <ListItemButton key={emp.id} onClick={() => handleSelectEmployee(emp)}>
                                <Stack direction='row' spacing={2}>
                                    <Avatar src={emp.avt} />
                                    <ListItemText
                                        primary={emp.employeeName}
                                        secondary={emp.email}
                                    />
                                </Stack>
                            </ListItemButton>
                        ))}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant='contained'
                        color='error'
                        onClick={handleCloseDialog}
                    >
                        Đóng
                    </Button>
                </DialogActions>
            </Dialog>

            {selectedEmployee && (
                <Box sx={{ mt: 2 }}>

                    <Box sx={{ mt: 2 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <Typography variant="h4">Thông tin nhân viên</Typography>

                            {selectedEmployee.status ? (
                                <Box
                                    sx={{
                                        backgroundColor: 'success.light',
                                        paddingY: 1.2,
                                        paddingX: 1,
                                        borderRadius: 1.5
                                    }}
                                >
                                    <Typography color="success.dark" fontWeight={600} variant="subtitle2">
                                        Hoạt động
                                    </Typography>
                                </Box>
                            ) : (
                                <Box
                                    sx={{
                                        backgroundColor: 'error.light',
                                        padding: 1,
                                        paddingX: 1,
                                        borderRadius: 1.5
                                    }}
                                >
                                    <Typography color="error.dark" fontWeight={600} variant="subtitle2">
                                        Khóa
                                    </Typography>
                                </Box>
                            )}
                        </Box>

                        <Grid container sx={{ marginY: 2 }}>
                            <Grid
                                item
                                xs={4}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <Avatar
                                    variant="square"
                                    src={selectedEmployee.avt}
                                    sx={{
                                        width: 200,
                                        height: 200,
                                        borderRadius: 4
                                    }}
                                />
                            </Grid>

                            <Grid
                                item
                                xs={8}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Grid container xs={12}>
                                    <Grid item xs={6}>
                                        <Grid container rowSpacing={2}>
                                            <InfoRow label="ID" value={selectedEmployee.id} />
                                            <InfoRow label="Tên nhân viên" value={selectedEmployee.employeeName} />
                                            <InfoRow label="Chức vụ" value={selectedEmployee.position} />
                                            <InfoRow label="Phòng ban" value={selectedEmployee.department} />
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <Grid container rowSpacing={2}>
                                            <InfoRow label="Email" value={selectedEmployee.email} />
                                            <InfoRow label="Số điện thoại" value={selectedEmployee.phoneNumber} />
                                            <InfoRow
                                                label="Ngày tạo"
                                                value={selectedEmployee.createdAt.toLocaleDateString()}
                                            />
                                            <InfoRow label="Bài viết" value={selectedEmployee.articleCount} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box
                        sx={{
                            position: 'absolute',
                            right: 0
                        }}
                    >
                        <Button
                            variant='outlined'
                            color='primary'
                            onClick={handleClick}
                        >
                            Thêm quyền
                        </Button>
                    </Box>
                    {functions.length > 0 &&
                        <Box>
                            <Typography variant="h4" sx={{ mt: 3, mb: 2 }}>Phân quyền</Typography>

                            <CustomTable columns={columns} dataSource={functions} />

                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'end',
                                    paddingTop: 3
                                }}
                            >
                                <Button
                                    variant='contained'
                                    onClick={() => {
                                        console.log("Permissions đã chọn:", selectedFunctions, selectedPermissions);
                                    }}
                                >
                                    Cập nhật
                                </Button>
                            </Box>
                        </Box>
                    }
                </Box>
            )}

        </Box>
    );
};

export default Decentralization;
