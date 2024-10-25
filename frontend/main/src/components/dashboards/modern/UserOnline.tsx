// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar } from '@mui/material';
import { IconArrowDownRight } from '@tabler/icons-react';

import DashboardCard from '../../shared/DashboardCard';


const UserOnline = () => {
  // chart color
  const theme = useTheme();
  const errorlight = theme.palette.error.light;

  return (
    <DashboardCard
      title="Người dùng đang hoạt động"
    >
      <>
        <Typography variant="h3" fontWeight="700" mt="-20px">
          6,820 VNĐ
        </Typography>
        <Stack direction="row" spacing={1} my={1} alignItems="center">
          <Avatar sx={{ bgcolor: errorlight, width: 27, height: 27 }}>
            <IconArrowDownRight width={20} color="#FA896B" />
          </Avatar>
          <Typography variant="subtitle2" fontWeight="600">
            +9%
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            last month
          </Typography>
        </Stack>
      </>
    </DashboardCard>
  );
};

export default UserOnline;
