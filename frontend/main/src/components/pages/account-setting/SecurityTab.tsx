// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import {
  Avatar,
  Box,
  CardContent,
  Grid,
  IconButton,
  Typography,
  Button,
  Divider,
  Stack
} from '@mui/material';

// components
import BlankCard from '../../shared/BlankCard';
import { IconDeviceLaptop, IconDeviceMobile, IconDotsVertical } from '@tabler/icons-react';

const SecurityTab = () => {
  return (
    <>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} lg={8}>
          <BlankCard>
            <CardContent>
              <Typography variant="h4" mb={2}>
                Xác Thực Hai Yếu Tố
              </Typography>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
                <Typography variant="subtitle1" color="textSecondary">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis sapiente sunt
                  earum officiis laboriosam ut.
                </Typography>
                <Button variant="contained" color="primary">
                  OK
                </Button>
              </Stack>

              <Divider />

              {/* danh sách 1 */}
              <Stack direction="row" spacing={2} py={2} alignItems="center">
                <Box>
                  <Typography variant="h6">Ứng Dụng Xác Thực</Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Ứng dụng Google auth
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto !important' }}>
                  <Button variant="text" color="primary">
                    Thiết Lập
                  </Button>
                </Box>
              </Stack>
              <Divider />
              {/* danh sách 2 */}
              <Stack direction="row" spacing={2} py={2} alignItems="center">
                <Box>
                  <Typography variant="h6">E-mail Khác</Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    E-mail để gửi liên kết xác minh
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto !important' }}>
                  <Button variant="text" color="primary">
                    Thiết Lập
                  </Button>
                </Box>
              </Stack>
              <Divider />
              {/* danh sách 3 */}
              <Stack direction="row" spacing={2} py={2} alignItems="center">
                <Box>
                  <Typography variant="h6">Khôi Phục Qua SMS</Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Số điện thoại của bạn hoặc thông tin khác
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto !important' }}>
                  <Button variant="text" color="primary">
                    Thiết Lập
                  </Button>
                </Box>
              </Stack>
            </CardContent>
          </BlankCard>
        </Grid>
        <Grid item xs={12} lg={4}>
          <BlankCard>
            <CardContent>
              <Avatar
                variant="rounded"
                sx={{ bgcolor: 'primary.light', color: 'primary.main', width: 48, height: 48 }}
              >
                <IconDeviceLaptop size="26" />
              </Avatar>

              <Typography variant="h5" mt={2}>
                Thiết Bị
              </Typography>
              <Typography color="textSecondary" mt={1} mb={2}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit Rem.
              </Typography>
              <Button variant="contained" color="primary">
                Đăng Xuất Khỏi Thiết Bị
              </Button>

              {/* danh sách 1 */}
              <Stack direction="row" spacing={2} py={2} mt={3} alignItems="center">
                <IconDeviceMobile size="26" />

                <Box>
                  <Typography variant="h6">iPhone 14</Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    London UK, 23 tháng 10 lúc 1:15 AM
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto !important' }}>
                  <IconButton>
                    <IconDotsVertical size="22" />
                  </IconButton>
                </Box>
              </Stack>
              <Divider />
              {/* danh sách 2 */}
              <Stack direction="row" spacing={2} py={2} alignItems="center">
                <IconDeviceLaptop size="26" />

                <Box>
                  <Typography variant="h6">Macbook Air </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Gujarat Ấn Độ, 24 tháng 10 lúc 3:15 AM
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto !important' }}>
                  <IconButton>
                    <IconDotsVertical size="22" />
                  </IconButton>
                </Box>
              </Stack>
              <Stack>
                <Button variant="text" color="primary">
                  Cần Giúp Đỡ?
                </Button>
              </Stack>
            </CardContent>
          </BlankCard>
        </Grid>
      </Grid>

      <Stack direction="row" spacing={2} sx={{ justifyContent: 'end' }} mt={3}>
        <Button size="large" variant="contained" color="primary">
          Lưu
        </Button>
        <Button size="large" variant="text" color="error">
          Hủy
        </Button>
      </Stack>
    </>
  );
};

export default SecurityTab;
