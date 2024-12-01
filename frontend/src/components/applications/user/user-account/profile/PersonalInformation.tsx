import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Select,
    MenuItem,
    Alert,
    Snackbar,
    useTheme,
    CircularProgress,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { SelectChangeEvent } from '@mui/material';
import { AppState, dispatch, useSelector } from 'src/store/Store';
import { fetchGetUserInfo, setUserInfoResponse } from 'src/store/user/account/getUserInfoSlice';
import { SnackbarProps } from 'src/types/components/snackbar';
import { fetchChangeUserInfoP1 } from 'src/store/user/account/changeUserInfoP1Slice';
import { GenderEnum, UserInfoResponse } from 'src/types/services/user/account';
import { ApiResponse } from 'src/types/services/response/response';
import { LoadingButton } from '@mui/lab';

const PersonalInformation = () => {
    const theme = useTheme();
    const [editing, setEditing] = useState(false); // Chỉ dùng một state cho chế độ chỉnh sửa
    const [config, setConfig] = useState<SnackbarProps>({
        open: false,
        content: '',
        severity: 'error',
    });
    const [userInfo, setUserInfo] = useState({
        name: '',
        gender: '',
        dob: new Date('2004-10-30'),
        address: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value,
        });
    };

    const handleGenderChange = (e: SelectChangeEvent<string>) => {
        setUserInfo({
            ...userInfo,
            gender: e.target.value as string,
        });
    };

    const handleDateChange = (date: Date | null) => {
        setUserInfo({
            ...userInfo,
            dob: date || new Date(),
        });
    };

    const handleEditClick = () => {
        setEditing(true);
    };

    const handleSaveClick = async () => {
        const responseChangUserInfo = await dispatch(
            fetchChangeUserInfoP1({
                address: userInfo.address,
                date: userInfo.dob.toISOString().split('T')[0],
                gender:
                    userInfo.gender == 'OTHER'
                        ? GenderEnum.OTHER
                        : userInfo.gender == 'MALE'
                        ? GenderEnum.MALE
                        : GenderEnum.FEMALE,
                name: userInfo.name,
            }),
        );

        const dataChangeUserInfo = responseChangUserInfo.payload as ApiResponse<UserInfoResponse>;
        if (dataChangeUserInfo.code == 200) {
            setConfig({
                content: 'Thay đổi thông tin thành công',
                open: true,
                severity: 'success',
            });
            dispatch(setUserInfoResponse(dataChangeUserInfo.result));
        }
        setEditing(false);
    };

    // Slice
    const dataUserInfo = useSelector((state: AppState) => state.getUserInfo.data);
    const loadingUserInfo = useSelector((state: AppState) => state.getUserInfo.loading);
    const loadingChangeUserInfoP1 = useSelector(
        (state: AppState) => state.changeUserInfoP1Slice.loading,
    );
    useEffect(() => {
        if (dataUserInfo?.code != 200) {
            dispatch(fetchGetUserInfo());
        }
    }, []);

    useEffect(() => {
        setUserInfo({
            address: dataUserInfo.result.address,
            dob: new Date(dataUserInfo.result.date),
            gender: dataUserInfo.result.gender,
            name: dataUserInfo.result.name,
        });
    }, [dataUserInfo]);

    return (
        <>
            {loadingUserInfo ? (
                <Box
                    sx={{
                        padding: 3,
                        borderRadius: 1,
                        boxShadow: 3,
                        backgroundColor: theme.palette.mode === 'dark' ? '#2A3447' : '#fff',
                        color: theme.palette.mode === 'dark' ? '#fff' : '#000',
                        margin: '0 auto',
                    }}
                >
                    <CircularProgress />
                </Box>
            ) : (
                <Box
                    sx={{
                        padding: 3,
                        borderRadius: 1,
                        boxShadow: 3,
                        backgroundColor: theme.palette.mode === 'dark' ? '#2A3447' : '#fff',
                        color: theme.palette.mode === 'dark' ? '#fff' : '#000',
                        margin: '0 auto',
                    }}
                >
                    <Typography
                        mb={4}
                        variant="h4"
                        fontWeight="600"
                        gutterBottom
                        display={'flex'}
                        gap={1}
                    >
                        Thông tin cá nhân
                    </Typography>

                    {/* Tên */}
                    <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h6" fontWeight="500" sx={{ width: '150px' }}>
                            Họ và tên:
                        </Typography>
                        {editing ? (
                            <TextField
                                name="name"
                                value={userInfo.name}
                                onChange={handleInputChange}
                                sx={{ flexGrow: 1, mr: 1 }}
                                size="small"
                            />
                        ) : (
                            <Typography variant="body1" sx={{ flexGrow: 1 }}>
                                {userInfo.name}
                            </Typography>
                        )}
                    </Box>

                    <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h6" fontWeight="500" sx={{ width: '150px' }}>
                            Giới tính:
                        </Typography>
                        {editing ? (
                            <Select
                                value={userInfo.gender}
                                onChange={handleGenderChange}
                                sx={{ flexGrow: 1, mr: 1 }}
                                size="small"
                            >
                                <MenuItem value="OTHER">Khác</MenuItem>
                                <MenuItem value="MALE">Nữ</MenuItem>
                                <MenuItem value="FEMALE">Nam</MenuItem>
                            </Select>
                        ) : (
                            <Typography variant="body1" sx={{ flexGrow: 1 }}>
                                {userInfo.gender == 'OTHER'
                                    ? 'Khác'
                                    : userInfo.gender === 'MALE'
                                    ? 'Nữ'
                                    : 'Nam'}
                            </Typography>
                        )}
                    </Box>

                    <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h6" fontWeight="500" sx={{ width: '150px' }}>
                            Ngày sinh:
                        </Typography>
                        {editing ? (
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    value={userInfo.dob}
                                    onChange={handleDateChange}
                                    inputFormat="dd/MM/yyyy"
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            size="small"
                                            sx={{ flexGrow: 1, mr: 1 }}
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                        ) : (
                            <Typography variant="body1" sx={{ flexGrow: 1 }}>
                                {userInfo.dob.toLocaleDateString('en-GB')}
                            </Typography>
                        )}
                    </Box>

                    <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h6" fontWeight="500" sx={{ width: '150px' }}>
                            Địa chỉ:
                        </Typography>
                        {editing ? (
                            <TextField
                                name="address"
                                value={userInfo.address}
                                onChange={handleInputChange}
                                sx={{ flexGrow: 1, mr: 1 }}
                                size="small"
                            />
                        ) : (
                            <Typography variant="body1" sx={{ flexGrow: 1 }}>
                                {userInfo.address}
                            </Typography>
                        )}
                    </Box>

                    <LoadingButton
                        variant="contained"
                        onClick={editing ? handleSaveClick : handleEditClick}
                        sx={{ mt: 2, marginLeft: 'auto', display: 'block' }}
                        loading={loadingChangeUserInfoP1}
                    >
                        {editing ? 'Lưu' : 'Sửa'}
                    </LoadingButton>

                    <Snackbar
                        open={config.open}
                        autoHideDuration={5000}
                        onClose={() =>
                            setConfig({
                                ...config,
                                open: false,
                            })
                        }
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >
                        <Alert
                            variant="filled"
                            severity={config.severity}
                            sx={{ width: '100%', display: 'flex', alignItems: 'center', px: 3 }}
                        >
                            {config.content}
                        </Alert>
                    </Snackbar>
                </Box>
            )}
        </>
    );
};

export default PersonalInformation;
