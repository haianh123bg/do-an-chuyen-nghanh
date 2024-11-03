// import React from 'react';
import { Grid, Box, Typography } from '@mui/material';

import PageContainer from 'src/components/container/PageContainer';
import img1 from 'src/assets/images/backgrounds/login-bg.svg';
import Logo from 'src/layouts/full/shared/logo/Logo';
import AuthTwoSteps from '../authForms/AuthTwoSteps';

const TwoSteps = () => (
  <PageContainer title="Two Steps" description="This is Two Steps page">
    <Grid container spacing={0} sx={{ height: '100vh', overflowX: 'hidden' }}>
      <Grid
        item
        xs={12}
        sm={12}
        lg={8}
        xl={9}
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&:before': {
            content: '""',
            background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: '0.3',
            zIndex: 1,
          },
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: '500px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <img
            src={img1}
            alt="background"
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        </Box>
      </Grid>

      <Grid
        item
        xs={12}
        sm={12}
        lg={4}
        xl={3}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ height: '100%', px: 6, backgroundColor: '#ffffff', borderLeft: '1px solid #e0e0e0' }}
      >
        <Box mb={6} textAlign="center">
          <Logo />
        </Box>

        <Box textAlign="center" sx={{ width: '100%', maxWidth: '360px' }}>
          <Typography variant="h4" fontWeight="700" mb={2}>
            Xác minh hai bước
          </Typography>

          <Typography variant="subtitle1" color="textSecondary" mb={2}>
            Chúng tôi đã gửi mã xác minh đến điện thoại di động của bạn. Nhập mã từ điện thoại di
            động vào ô bên dưới.
          </Typography>

          <Typography variant="subtitle1" fontWeight="700" mb={3}>
            nqton301004@gmail.com
          </Typography>

          <AuthTwoSteps />
        </Box>
      </Grid>
    </Grid>
  </PageContainer>
);

export default TwoSteps;
