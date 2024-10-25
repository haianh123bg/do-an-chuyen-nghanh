// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { Box, Typography, Button, Divider, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import { registerType } from 'src/types/auth/auth';
import AuthSocialButtons from './AuthSocialButtons';
import logo from 'src/assets/images/logos/dark-logo.svg';

const AuthRegister = ({ subtitle }: registerType) => (
    <>
        <Box sx={{textAlign:'center'}}>
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
                <CustomTextField id="name" variant="outlined" fullWidth />
                <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
                <CustomTextField id="email" variant="outlined" fullWidth />
                <CustomFormLabel htmlFor="password">Mật khẩu</CustomFormLabel>
                <CustomTextField id="password" variant="outlined" fullWidth />
            </Stack>
            <Button
                color="primary"
                variant="contained"
                size="large"
                fullWidth
                component={Link}
                to="/auth/login"
            >
                Đăng ký
            </Button>
        </Box>
        {subtitle}
    </>
);

export default AuthRegister;
