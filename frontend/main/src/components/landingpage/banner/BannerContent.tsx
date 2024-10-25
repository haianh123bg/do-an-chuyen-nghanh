// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { Typography, Box, Button, Stack, styled, useMediaQuery, Theme, Link } from '@mui/material';
import { IconRocket } from '@tabler/icons-react';

// third party

import { motion } from 'framer-motion';

const StyledButton = styled(Button)(() => ({
  padding: '13px 48px',
  fontSize: '16px',
}));

const BannerContent = () => {
  const lgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  return (
    <Box mt={lgDown ? 8 : 0}>
      <motion.div
        initial={{ opacity: 0, translateY: 550 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 30,
        }}
      >
        <Typography variant="h6" display={'flex'} gap={1} mb={2}>
          <Typography color={'secondary'}>
            <IconRocket size={'21'} />
          </Typography>{' '}
          Bắt đầu sự nghiệp của bạn với
        </Typography>

        <Typography
          variant="h1"
          fontWeight={900}
          sx={{
            fontSize: {
              md: '54px',
            },
            lineHeight: {
              md: '60px',
            },
          }}
        >
          999+ khóa học <br />
          <Typography component={'span'} variant="inherit" color={'primary'}>
            Chất lượng
          </Typography>
          , phù hợp với mọi trình độ
        </Typography>
      </motion.div>
      <Box pt={4} pb={3}>
        <motion.div
          initial={{ opacity: 0, translateY: 550 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'spring',
            stiffness: 150,
            damping: 30,
            delay: 0.2,
          }}
        >
          <Typography variant="h5" fontWeight={300}>
            Các khóa học trải đều các lĩnh vực trong công nghệ thông tin. <br />
            <Typography component={'span'} variant="inherit" color={'primary'}>
              <Link href="/auth/login" color="primary" underline="none">
                Đăng nhập
              </Link>{' '}
            </Typography>
            để học ngay !!!
          </Typography>
        </motion.div>
      </Box>
      <motion.div
        initial={{ opacity: 0, translateY: 550 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 30,
          delay: 0.4,
        }}
      >
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={3}>
          <StyledButton variant="contained" color="primary" href="/auth/login">
            Đăng nhập
          </StyledButton>

          <StyledButton variant="outlined" href="/dashboards/modern">
            Danh sách khóa học
          </StyledButton>
        </Stack>
      </motion.div>
    </Box>
  );
};

export default BannerContent;
