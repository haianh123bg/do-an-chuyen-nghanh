// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useState } from 'react';
import {
  CardContent,
  Grid,
  Typography,
  MenuItem,
  Box,
  Avatar,
  Button,
  Stack,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

// components
import BlankCard from '../../shared/BlankCard';
import CustomTextField from '../../forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';
import CustomSelect from '../../forms/theme-elements/CustomSelect';

// images
import user1 from 'src/assets/images/profile/user-1.jpg';

interface LocationType {
  value: string;
  label: string;
}

// locations
const locations: LocationType[] = [
  { value: 'us', label: 'Hoa Kỳ' },
  { value: 'uk', label: 'Vương Quốc Anh' },
  { value: 'india', label: 'Ấn Độ' },
  { value: 'russia', label: 'Nga' },
];

const AccountTab: React.FC = () => {
  // State quản lý việc hiển thị mật khẩu
  const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [location, setLocation] = useState<string>(''); // Khai báo biến location

  const toggleShowCurrentPassword = () => setShowCurrentPassword((prev) => !prev);
  const toggleShowNewPassword = () => setShowNewPassword((prev) => !prev);
  const toggleShowConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  const handleChangeLocation = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLocation(event.target.value as string);
  };

  return (
    <Grid container spacing={3}>
      {/* Thay Đổi Hồ Sơ */}
      <Grid item xs={12} lg={6}>
        <BlankCard>
          <CardContent>
            <Typography variant="h5" mb={1}>
              Thay Đổi Hồ Sơ
            </Typography>
            <Typography color="textSecondary" mb={3}>
              Thay đổi hình đại diện của bạn tại đây
            </Typography>
            <Box textAlign="center" display="flex" justifyContent="center">
              <Box>
                <Avatar
                  src={user1}
                  alt="User Avatar"
                  sx={{ width: 120, height: 120, margin: '0 auto' }}
                />
                <Stack direction="row" justifyContent="center" spacing={2} my={3}>
                  <Button variant="contained" color="primary" component="label">
                    Tải lên
                    <input hidden accept="image/*" multiple type="file" />
                  </Button>
                  <Button variant="outlined" color="error">
                    Đặt lại
                  </Button>
                </Stack>
                <Typography variant="subtitle1" color="textSecondary" mb={4}>
                  Chấp nhận JPG, GIF hoặc PNG. Kích thước tối đa 800K
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </BlankCard>
      </Grid>

      {/* Thay Đổi Mật Khẩu */}
      <Grid item xs={12} lg={6}>
        <BlankCard>
          <CardContent>
            <Typography variant="h5" mb={1}>
              Thay Đổi Mật Khẩu
            </Typography>
            <Typography color="textSecondary" mb={3}>
              Để thay đổi mật khẩu của bạn, vui lòng xác nhận tại đây
            </Typography>
            <form>
              {/* Mật Khẩu Hiện Tại */}
              <CustomFormLabel htmlFor="text-cpwd">Mật Khẩu Hiện Tại</CustomFormLabel>
              <CustomTextField
                id="text-cpwd"
                value="MathewAnderson" // Dữ liệu tĩnh cho ví dụ
                variant="outlined"
                fullWidth
                type={showCurrentPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={toggleShowCurrentPassword}>
                        {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Mật Khẩu Mới */}
              <CustomFormLabel htmlFor="text-npwd">Mật Khẩu Mới</CustomFormLabel>
              <CustomTextField
                id="text-npwd"
                value="MathewAnderson" // Dữ liệu tĩnh cho ví dụ
                variant="outlined"
                fullWidth
                type={showNewPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={toggleShowNewPassword}>
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Xác Nhận Mật Khẩu */}
              <CustomFormLabel htmlFor="text-conpwd">Xác Nhận Mật Khẩu</CustomFormLabel>
              <CustomTextField
                id="text-conpwd"
                value="MathewAnderson" // Dữ liệu tĩnh cho ví dụ
                variant="outlined"
                fullWidth
                type={showConfirmPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={toggleShowConfirmPassword}>
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </form>
          </CardContent>
        </BlankCard>
      </Grid>

      {/* Chỉnh Sửa Chi Tiết */}
      <Grid item xs={12}>
        <BlankCard>
          <CardContent>
            <Typography variant="h5" mb={1}>
              Thông Tin Cá Nhân
            </Typography>
            <Typography color="textSecondary" mb={3}>
              Để thay đổi thông tin cá nhân, chỉnh sửa và lưu tại đây
            </Typography>
            <form>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel htmlFor="text-name">Họ Tên</CustomFormLabel>
                  <CustomTextField
                    id="text-name"
                    value="Mathew Anderson" // Dữ liệu tĩnh cho ví dụ
                    variant="outlined"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <CustomFormLabel htmlFor="text-location">Địa Điểm</CustomFormLabel>
                  <CustomSelect
                    fullWidth
                    id="text-location"
                    variant="outlined"
                    value={location}
                    onChange={handleChangeLocation}
                  >
                    {locations.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </CustomSelect>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <CustomFormLabel htmlFor="text-email">Email</CustomFormLabel>
                  <CustomTextField
                    id="text-email"
                    value="info@modernize.com" // Dữ liệu tĩnh cho ví dụ
                    variant="outlined"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <CustomFormLabel htmlFor="text-phone">Điện Thoại</CustomFormLabel>
                  <CustomTextField
                    id="text-phone"
                    value="+91 12345 65478" // Dữ liệu tĩnh cho ví dụ
                    variant="outlined"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <CustomFormLabel htmlFor="text-address">Địa Chỉ</CustomFormLabel>
                  <CustomTextField
                    id="text-address"
                    value="814 Howard Street, 120065, Ấn Độ" // Dữ liệu tĩnh cho ví dụ
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </BlankCard>

        <Stack direction="row" spacing={2} sx={{ justifyContent: 'end' }} mt={3}>
          <Button size="large" variant="contained" color="primary">
            Lưu
          </Button>
          <Button size="large" variant="text" color="error">
            Hủy
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default AccountTab;
