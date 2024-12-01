// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useState } from 'react';
import {
    Box,
    Typography,
    FormGroup,
    FormControlLabel,
    Stack,
    Divider,
    Snackbar,
    Alert,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import { LoginResponseType, loginType } from 'src/types/auth/auth';
import CustomCheckbox from '../../../components/forms/theme-elements/CustomCheckbox';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';

import AuthSocialButtons from './AuthSocialButtons';
import { SnackbarProps } from 'src/types/components/snackbar';
import { LoadingButton } from '@mui/lab';
import { AppState, dispatch, useSelector } from 'src/store/Store';
import { fetchLogin } from 'src/store/auth/loginSlice';
import { ApiResponse } from 'src/types/services/response/response';

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
    // Internal State
    const [config, setConfig] = useState<SnackbarProps>({
        open: false,
        content: '',
        severity: 'error',
    });

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const navigate = useNavigate();
    // Slice
    const loadingLogin = useSelector((state: AppState) => state.loginSlice.loading);

    const handleLogin = async () => {
        const responseLogin = await dispatch(fetchLogin({ account: email, password: password }));
        const dataLogin = responseLogin.payload as ApiResponse<LoginResponseType>;

        if (dataLogin.code == 200) {
            setConfig({
                open: true,
                content: 'Đăng nhập thành công',
                severity: 'success',
            });

            const accessToken = dataLogin.result.accessToken;
            const refreshToken = dataLogin.result.refreshToken;
            const userId = dataLogin.result.userId;
            const roles = dataLogin.result.roles;

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('userId', JSON.stringify(userId));
            localStorage.setItem('roles', JSON.stringify(roles));

            navigate('/');
        } else {
            setConfig({
                open: true,
                content: dataLogin.message || 'Đăng nhập thất bại',
                severity: 'success',
            });
        }
    };
    return (
        <>
            {title ? (
                <Typography fontWeight="700" variant="h3" mb={1}>
                    {title}
                </Typography>
            ) : null}

            {subtext}

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
                        Chào mừng đến với HA
                    </Typography>
                </Divider>
            </Box>

            <Stack>
                <Box>
                    <CustomFormLabel htmlFor="username">Email</CustomFormLabel>
                    <CustomTextField
                        id="username"
                        variant="outlined"
                        fullWidth
                        type="text"
                        onClick={(e: any) => setEmail(e.target.value)}
                    />
                </Box>
                <Box>
                    <CustomFormLabel htmlFor="password">Mật khẩu</CustomFormLabel>
                    <CustomTextField
                        id="password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        onClick={(e: any) => setPassword(e.target.value)}
                    />
                </Box>
                <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
                    <FormGroup>
                        <FormControlLabel
                            control={<CustomCheckbox defaultChecked />}
                            label="Nhớ mật khẩu"
                        />
                    </FormGroup>
                    <Typography
                        component={Link}
                        to="/auth/forgot-password"
                        fontWeight="500"
                        sx={{
                            textDecoration: 'none',
                            color: 'primary.main',
                        }}
                    >
                        Quên mật khẩu ?
                    </Typography>
                </Stack>
            </Stack>
            <Box>
                <LoadingButton
                    color="primary"
                    variant="contained"
                    size="large"
                    fullWidth
                    type="button"
                    loading={loadingLogin}
                    onClick={handleLogin}
                >
                    Đăng nhập
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

export default AuthLogin;
