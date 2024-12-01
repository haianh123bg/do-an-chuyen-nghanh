import { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Alert,
    Snackbar,
    IconButton,
    InputAdornment,
    useTheme,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { dispatch } from 'src/store/Store';
import { fetchChangePassword } from 'src/store/user/account/changePasswordSlice';
import { ApiResponse } from 'src/types/services/response/response';
import { SnackbarProps } from 'src/types/components/snackbar';

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false); // State để mở/tắt mật khẩu hiện tại
    const [showPassword, setShowPassword] = useState(false); // State để mở/tắt mật khẩu mới và xác nhận
    const theme = useTheme();

    const [config, setConfig] = useState<SnackbarProps>({
        open: false,
        content: '',
        severity: 'error',
    });

    const handleSubmit = async () => {
        const responseChangePassword = await dispatch(
            fetchChangePassword({
                confirmPassword: confirmNewPassword,
                newPassword: newPassword,
                oldPassword: currentPassword,
            }),
        );

        const dataChangePassword = responseChangePassword.payload as ApiResponse<void>;
        if (dataChangePassword.code == 200) {
            setConfig({
                content: 'Thay đổi mật khẩu thành công',
                open: true,
                severity: 'success',
            });
        } else {
            setConfig({
                content: dataChangePassword.message || 'Có lỗi xảy ra',
                open: true,
                severity: 'error',
            });
        }
    };

    const handleToggleCurrentPasswordVisibility = () => {
        setShowCurrentPassword(!showCurrentPassword); // Đổi trạng thái hiển thị mật khẩu hiện tại
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword); // Đổi trạng thái hiển thị mật khẩu mới và xác nhận
    };

    return (
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
            <Typography mb={4} variant="h4" fontWeight="600" gutterBottom>
                Đổi Mật Khẩu
            </Typography>
            <Box sx={{ mb: 2 }}>
                <TextField
                    label="Mật khẩu hiện tại"
                    type={showCurrentPassword ? 'text' : 'password'} // Hiển thị hoặc ẩn mật khẩu hiện tại
                    fullWidth
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    sx={{
                        mb: 2,
                        input: { color: theme.palette.mode === 'dark' ? '#fff' : '#000' },
                        label: { color: theme.palette.mode === 'dark' ? '#fff' : '#000' },
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleToggleCurrentPasswordVisibility}>
                                    {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    label="Mật khẩu mới"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    sx={{
                        mb: 2,
                        input: { color: theme.palette.mode === 'dark' ? '#fff' : '#000' },
                        label: { color: theme.palette.mode === 'dark' ? '#fff' : '#000' },
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleTogglePasswordVisibility}>
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    label="Nhập lại mật khẩu mới"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    value={confirmNewPassword}
                    onChange={(e: any) => setConfirmNewPassword(e.target.value)}
                    sx={{
                        input: { color: theme.palette.mode === 'dark' ? '#fff' : '#000' },
                        label: { color: theme.palette.mode === 'dark' ? '#fff' : '#000' },
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleTogglePasswordVisibility}>
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-start' }}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Đổi mật khẩu
                </Button>
            </Box>
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
    );
};

export default ChangePassword;
