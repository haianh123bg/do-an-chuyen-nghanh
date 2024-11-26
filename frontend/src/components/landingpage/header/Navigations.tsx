import React from 'react';
import { Box, Button, styled, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import Cart from 'src/layouts/full/vertical/header/Cart';
import Notifications from 'src/layouts/full/vertical/header/Notification';
import Profile from 'src/layouts/full/vertical/header/Profile';

const Navigations = () => {
  const StyledButton = styled(Button)(({ theme }) => ({
    fontSize: '16px',
    color: theme.palette.text.secondary,
    textTransform: 'none',
  }));

  return (
    <>
      {/* Phân loại */}
      <Box>
        <StyledButton
         component={Link}
         to="/feature/coming-soon" // Điều hướng nội bộ
         color="inherit"
         variant="text"
         sx={{
           color: (theme) => theme.palette.text.secondary,
         }}
        >
          Phân loại
        </StyledButton>
      </Box>

      {/* Khóa học của tôi */}
      <StyledButton
        component={Link}
        to="/mycourse" // Điều hướng nội bộ
        color="inherit"
        variant="text"
        sx={{
          color: (theme) => theme.palette.text.secondary,
        }}
      >
        Khóa học của tôi
      </StyledButton>

      {/* Blog */}
      <StyledButton
        component={Link}
        to="/feature/coming-soon" // Điều hướng nội bộ
        color="inherit"
        variant="text"
        sx={{
          color: (theme) => theme.palette.text.secondary,
        }}
      >
        Blog
      </StyledButton>

      {/* Liên hệ */}
      <StyledButton
        component={Link}
        to="/user/ticket" // Điều hướng nội bộ
        color="inherit"
        variant="text"
        sx={{
          color: (theme) => theme.palette.text.secondary,
        }}
      >
        Liên hệ
      </StyledButton>

      {/* Phần bên phải */}
      <Stack spacing={1} direction="row" alignItems="center">
        <Cart />
        <Notifications />
        <Profile />
      </Stack>
    </>
  );
};

export default Navigations;
