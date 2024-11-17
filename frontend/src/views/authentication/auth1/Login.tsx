// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Grid, Box, Card, Stack, Typography } from '@mui/material';

// components
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';
import AuthLogin from '../authForms/AuthLogin';
import ApiService from 'src/service/apiService.ts';

const Login2 = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // useEffect(() => {
  //   // Lấy mã `code` từ URL
  //   const urlParams = new URLSearchParams(location.search);
  //   const code = urlParams.get('code');

  //   console.log(code);

  //   // Nếu có mã `code`, gọi API trên server để đổi lấy access token
  //   if (code) {
  //     const handleLogin = async () => {
  //       const response = await ApiService.loginWithGoogle(code);

  //       if (response.code == 200) {
  //         const { accessToken, refreshToken, roles, userId, tokenExpired } = response.result;

  //         // Lưu token và roles vào localStorage
  //         localStorage.setItem('accessToken', accessToken);
  //         localStorage.setItem('refreshToken', refreshToken);
  //         localStorage.setItem('refreshToken', refreshToken);
  //         localStorage.setItem('roles', JSON.stringify(roles));
  //         localStorage.setItem('userId', JSON.stringify(userId));
  //         localStorage.setItem('tokenExpired', tokenExpired);

  //         // Chuyển hướng người dùng đến trang chính (hoặc trang dashboard)
  //         navigate('/dashboards');
  //       }
  //     };
  //     handleLogin();
  //   }
  // }, []);

  return (
    <PageContainer title="Login" description="this is Login page">
      <Box
        sx={{
          position: 'relative',
          '&:before': {
            content: '""',
            background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: '0.3',
          },
        }}
      >
        <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
          <Grid
            item
            xs={12}
            sm={12}
            lg={5}
            xl={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '450px' }}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
              </Box>
              <AuthLogin
                subtitle={
                  <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
                    <Typography color="textSecondary" variant="h6" fontWeight="500">
                      Bạn chưa có tài khoản ?
                    </Typography>
                    <Typography
                      component={Link}
                      to="/auth/register"
                      fontWeight="500"
                      sx={{
                        textDecoration: 'none',
                        color: 'primary.main',
                      }}
                    >
                      Đăng ký ngay
                    </Typography>
                  </Stack>
                }
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Login2;
