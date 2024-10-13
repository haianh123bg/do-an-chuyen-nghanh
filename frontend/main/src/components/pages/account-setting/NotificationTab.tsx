// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { Avatar, Box, CardContent, Grid, IconButton, Typography, Tooltip, Button, Stack } from '@mui/material';

// components
import BlankCard from '../../shared/BlankCard';
import CustomTextField from '../../forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';
import CustomSwitch from '../../forms/theme-elements/CustomSwitch';
import {
  IconArticle,
  IconCheckbox,
  IconClock,
  IconDownload,
  IconMail,
  IconPlayerPause,
  IconTruckDelivery,
} from '@tabler/icons-react';

const NotificationTab = () => {
  return (
    <>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} lg={9}>
          <BlankCard>
            <CardContent>
              <Typography variant="h4" mb={2}>
                Tùy Chọn Thông Báo
              </Typography>
              <Typography color="textSecondary">
                Chọn các thông báo bạn muốn nhận qua email. Xin lưu ý rằng bạn không thể từ chối nhận các thông báo dịch vụ, chẳng hạn như thanh toán, bảo mật hoặc thông báo pháp lý.
              </Typography>

              <CustomFormLabel htmlFor="text-email">Địa Chỉ Email*</CustomFormLabel>
              <CustomTextField id="text-email" variant="outlined" fullWidth />
              <Typography color="textSecondary">Bắt buộc cho các thông báo.</Typography>

              {/* danh sách 1 */}
              <Stack direction="row" spacing={2} mt={4}>
                <Avatar
                  variant="rounded"
                  sx={{ bgcolor: 'grey.100', color: 'grey.500', width: 48, height: 48 }}
                >
                  <IconArticle size="22" />
                </Avatar>
                <Box>
                  <Typography variant="h6" mb={1}>
                    Bản tin của chúng tôi
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Chúng tôi sẽ luôn thông báo cho bạn về những thay đổi quan trọng
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto !important' }}>
                  <CustomSwitch />
                </Box>
              </Stack>

              {/* danh sách 2 */}
              <Stack direction="row" spacing={2} mt={3}>
                <Avatar
                  variant="rounded"
                  sx={{ bgcolor: 'grey.100', color: 'grey.500', width: 48, height: 48 }}
                >
                  <IconCheckbox size="22" />
                </Avatar>
                <Box>
                  <Typography variant="h6" mb={1}>
                    Xác Nhận Đơn Hàng
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Bạn sẽ nhận được thông báo khi khách hàng đặt hàng bất kỳ sản phẩm nào
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto !important' }}>
                  <CustomSwitch checked />
                </Box>
              </Stack>

              {/* danh sách 3 */}
              <Stack direction="row" spacing={2} mt={3}>
                <Avatar
                  variant="rounded"
                  sx={{ bgcolor: 'grey.100', color: 'grey.500', width: 48, height: 48 }}
                >
                  <IconClock size="22" />
                </Avatar>
                <Box>
                  <Typography variant="h6" mb={1}>
                    Thay Đổi Trạng Thái Đơn Hàng
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Bạn sẽ nhận được thông báo khi khách hàng thay đổi đơn hàng
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto !important' }}>
                  <CustomSwitch checked />
                </Box>
              </Stack>

              {/* danh sách 4 */}
              <Stack direction="row" spacing={2} mt={3}>
                <Avatar
                  variant="rounded"
                  sx={{ bgcolor: 'grey.100', color: 'grey.500', width: 48, height: 48 }}
                >
                  <IconTruckDelivery size="22" />
                </Avatar>
                <Box>
                  <Typography variant="h6" mb={1}>
                    Đơn Hàng Đã Giao
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Bạn sẽ nhận được thông báo khi đơn hàng được giao
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto !important' }}>
                  <CustomSwitch />
                </Box>
              </Stack>

              {/* danh sách 5 */}
              <Stack direction="row" spacing={2} mt={3}>
                <Avatar
                  variant="rounded"
                  sx={{ bgcolor: 'grey.100', color: 'grey.500', width: 48, height: 48 }}
                >
                  <IconMail size="22" />
                </Avatar>
                <Box>
                  <Typography variant="h6" mb={1}>
                    Thông Báo Qua Email
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Bật thông báo qua email để nhận cập nhật qua email
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto !important' }}>
                  <CustomSwitch checked />
                </Box>
              </Stack>
            </CardContent>
          </BlankCard>
        </Grid>

        {/* 2 */}
        <Grid item xs={12} lg={9}>
          <BlankCard>
            <CardContent>
              <Typography variant="h4" mb={2}>
                Ngày & Giờ
              </Typography>
              <Typography color="textSecondary">
                Cài đặt múi giờ và hiển thị lịch.
              </Typography>

              {/* danh sách 1 */}
              <Stack direction="row" spacing={2} mt={4}>
                <Avatar
                  variant="rounded"
                  sx={{ bgcolor: 'grey.100', color: 'grey.500', width: 48, height: 48 }}
                >
                  <IconClock size="22" />
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" color="textSecondary">
                    Múi giờ
                  </Typography>
                  <Typography variant="h6" mb={1}>
                    (UTC + 02:00) Athens, Bucharet
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto !important' }}>
                  <Tooltip title="Tải xuống">
                    <IconButton>
                      <IconDownload size="22" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Stack>
            </CardContent>
          </BlankCard>
        </Grid>

        {/* 3 */}
        <Grid item xs={12} lg={9}>
          <BlankCard>
            <CardContent>
              <Typography variant="h4" mb={2}>
                Bỏ Qua Theo Dõi
              </Typography>

              {/* danh sách 1 */}
              <Stack direction="row" spacing={2} mt={4}>
                <Avatar
                  variant="rounded"
                  sx={{ bgcolor: 'grey.100', color: 'grey.500', width: 48, height: 48 }}
                >
                  <IconPlayerPause size="22" />
                </Avatar>
                <Box>
                  <Typography variant="h6" mb={1}>
                    Bỏ Qua Theo Dõi Trình Duyệt
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Cookie Trình Duyệt
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto !important' }}>
                  <CustomSwitch />
                </Box>
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

export default NotificationTab;
