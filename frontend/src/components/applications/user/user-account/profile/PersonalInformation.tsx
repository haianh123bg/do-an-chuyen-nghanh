import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  Alert,
  Snackbar,
  Slide,
  useTheme,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { SelectChangeEvent } from '@mui/material';

function SlideTransition(props: any) {
  return <Slide {...props} direction="left" />;
}

const PersonalInformation = () => {
  const theme = useTheme();
  const [editing, setEditing] = useState(false); // Chỉ dùng một state cho chế độ chỉnh sửa
  const [open, setOpen] = useState(false);
  const [showAlert, setShowAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [userInfo, setUserInfo] = useState({
    name: 'Ngô Quốc Toản',
    gender: 'Nam',
    dob: new Date('2004-10-30'),
    address: '123 Đường ABC, TP. Hồ Chí Minh',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenderChange = (e: SelectChangeEvent<string>) => {
    setUserInfo({
      ...userInfo,
      gender: e.target.value as string,
    });
  };

  const handleDateChange = (date: Date | null) => {
    setUserInfo({
      ...userInfo,
      dob: date || new Date(),
    });
  };

  const handleEditClick = () => {
    setEditing(true); 
  };

  const handleSaveClick = () => {
    setEditing(false); 
    setShowAlert({ type: 'success', message: 'Lưu thay đổi thành công!' });
    setOpen(true);
    setTimeout(() => setShowAlert(null), 3000);
  };

  const handleClose = (_event: Event | React.SyntheticEvent<any, Event>, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Box
      sx={{
        padding: 3,
        borderRadius: 1,
        boxShadow: 3,
        backgroundColor: theme.palette.mode === 'dark' ? '#2A3447' : '#fff',
        color: theme.palette.mode === 'dark' ? '#fff' : '#000',
        margin: '0 auto',
      }}
    >
      <Typography mb={4} variant="h4" fontWeight="600" gutterBottom display={'flex'} gap={1}>
        Thông tin cá nhân
      </Typography>

      {/* Tên */}
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
        <Typography variant="h6" fontWeight="500" sx={{ width: '150px' }}>
          Họ và tên:
        </Typography>
        {editing ? (
          <TextField
            name="name"
            value={userInfo.name}
            onChange={handleInputChange}
            sx={{ flexGrow: 1, mr: 1 }}
            size="small"
          />
        ) : (
          <Typography variant="body1" sx={{ flexGrow: 1 }}>
            {userInfo.name}
          </Typography>
        )}
      </Box>

      
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
        <Typography variant="h6" fontWeight="500" sx={{ width: '150px' }}>
          Giới tính:
        </Typography>
        {editing ? (
          <Select
            value={userInfo.gender}
            onChange={handleGenderChange}
            sx={{ flexGrow: 1, mr: 1 }}
            size="small"
          >
            <MenuItem value="Nam">Nam</MenuItem>
            <MenuItem value="Nữ">Nữ</MenuItem>
            <MenuItem value="Khác">Khác</MenuItem>
          </Select>
        ) : (
          <Typography variant="body1" sx={{ flexGrow: 1 }}>
            {userInfo.gender}
          </Typography>
        )}
      </Box>

      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
        <Typography variant="h6" fontWeight="500" sx={{ width: '150px' }}>
          Ngày sinh:
        </Typography>
        {editing ? (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={userInfo.dob}
              onChange={handleDateChange}
              renderInput={(params) => (
                <TextField {...params} size="small" sx={{ flexGrow: 1, mr: 1 }} />
              )}
            />
          </LocalizationProvider>
        ) : (
          <Typography variant="body1" sx={{ flexGrow: 1 }}>
            {userInfo.dob.toLocaleDateString()}
          </Typography>
        )}
      </Box>

      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
        <Typography variant="h6" fontWeight="500" sx={{ width: '150px' }}>
          Địa chỉ:
        </Typography>
        {editing ? (
          <TextField
            name="address"
            value={userInfo.address}
            onChange={handleInputChange}
            sx={{ flexGrow: 1, mr: 1 }}
            size="small"
          />
        ) : (
          <Typography variant="body1" sx={{ flexGrow: 1 }}>
            {userInfo.address}
          </Typography>
        )}
      </Box>

      <Button
        variant="contained"
        onClick={editing ? handleSaveClick : handleEditClick}
        sx={{ mt: 2, marginLeft: 'auto', display: 'block' }}  
      >
        {editing ? 'Lưu' : 'Sửa'}
      </Button>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        TransitionComponent={SlideTransition}
      >
        <Alert onClose={handleClose} severity={'success'} variant="filled">
          {showAlert?.message || 'Lưu thay đổi thành công'}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PersonalInformation;
