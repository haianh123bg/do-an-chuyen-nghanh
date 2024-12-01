// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useState } from 'react';
import { Box, Typography, Divider, Stack, Snackbar, Alert } from '@mui/material';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import { registerType } from 'src/types/auth/auth';
import AuthSocialButtons from './AuthSocialButtons';
import logo from 'src/assets/images/logos/dark-logo.svg';
import { SnackbarProps } from 'src/types/components/snackbar';
import { AppState, dispatch, useSelector } from 'src/store/Store';
import { fetchRegister } from 'src/store/auth/registerSlice';
import { LoadingButton } from '@mui/lab';
import { ApiResponse } from 'src/types/services/response/response';
import { useNavigate } from 'react-router';

const AuthRegister = ({ subtitle }: registerType) => {
    // Internal State
    const [config, setConfig] = useState<SnackbarProps>({
        open: false,
        content: '',
        severity: 'error',
    });

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const navigate = useNavigate();

    // Slice
    const loadingRegister = useSelector((state: AppState) => state.registerSlice.loading);

    const handleRegister = async () => {
        const responseRegister = await dispatch(
            fetchRegister({
                name: name,
                email: email,
                password: password,
                captchaToken: '',
            }),
        );

        const dataRegister = responseRegister.payload as ApiResponse<void>;
        if (dataRegister.code == 200) {
            setConfig({
                content: dataRegister.message || 'Bạn đã đăng ký thành công hãy đăng nhập',
                open: true,
                severity: 'success',
            });
            navigate('/auth/login');
        } else {
            setConfig({
                content: dataRegister.message || 'Có lỗi xảy ra',
                open: true,
                severity: 'error',
            });
        }
    };

    return (
        <>
            <Box sx={{ textAlign: 'center' }}>
                <img src={logo} />
            </Box>
            <AuthSocialButtons title="Đăng nhập với" />

            <Box mt={3}>
                <Divider>
                    <Typography
                        component="span"
                        color="textSecondary"
                        variant="h6"
                        fontWeight="400"
                        position="relative"
                        px={2}
                    >
                        Tạo tài khoản
                    </Typography>
                </Divider>
            </Box>

            <Box>
                <Stack mb={3}>
                    <CustomFormLabel htmlFor="name">Tên</CustomFormLabel>
                    <CustomTextField
                        id="name"
                        variant="outlined"
                        fullWidth
                        type="text"
                        value={name}
                        onChange={(e: any) => setName(e.target.value)}
                    />
                    <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
                    <CustomTextField
                        id="email"
                        variant="outlined"
                        fullWidth
                        type="text"
                        value={email}
                        onChange={(e: any) => setEmail(e.target.value)}
                    />
                    <CustomFormLabel htmlFor="password">Mật khẩu</CustomFormLabel>
                    <CustomTextField
                        id="password"
                        variant="outlined"
                        fullWidth
                        type="password"
                        value={password}
                        onChange={(e: any) => setPassword(e.target.value)}
                    />
                </Stack>
                <LoadingButton
                    color="primary"
                    variant="contained"
                    size="large"
                    fullWidth
                    type="button"
                    onClick={handleRegister}
                    loading={loadingRegister}
                >
                    Đăng ký
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
            {subtitle}
        </>
    );
};

export default AuthRegister;
