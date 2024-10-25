import {
  Alert,
  Box,
  Button,
  IconButton,
  Slide,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { IconCheck, IconEdit, IconLock, IconUserCircle } from '@tabler/icons-react';
import { useFormik } from 'formik';
import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { setSelected } from 'src/store/RouterSlice';

import * as yup from 'yup';

function SlideTransition(props: any) {
  return <Slide {...props} direction="left" />;
}

const AccountInformation = () => {
  const [editing, setEditing] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [showAlert, setShowAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Validation schema
  const validationSchema = yup.object({
    phone: yup
      .string()
      .matches(/^0\d{9}$/, 'Số điện thoại không hợp lệ, phải có 10 chữ số và bắt đầu bằng 0')
      .required('Vui lòng nhập số điện thoại'),
  });

  const formik = useFormik({
    initialValues: {
      phone: '0901234567',
      password: '**********',
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      setEditing(null);
      setShowAlert({ message: 'Cập nhật thông tin thành công!', type: 'success' });
      setOpen(true); 
    },
  });

  const dispatch = useDispatch();

  const handleButtonClick = (id: number) => {
    if (id === 2) {
      dispatch(setSelected('changepassword'));
    }
  };

  const handleEditClick = (field: string) => {
    if (field === 'password') {
      handleButtonClick(2);
    } else {
      setEditing(field);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      formik.handleSubmit();
    }
  };

  const handleClose = (_event: Event | React.SyntheticEvent<any, Event>, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const renderField = (field: string, label: string, isEditable: boolean) => (
    <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography variant="h6" fontWeight="500" sx={{ width: '150px' }}>
        {label}:
      </Typography>
      {field === 'email' ? (
        <Typography variant="body1" sx={{ flexGrow: 1 }}>
          nqton301004@gmail.com 
        </Typography>
      ) : editing === field ? (
        <>
          <TextField
            name={field}
            value={formik.values[field as keyof typeof formik.values]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched[field as keyof typeof formik.touched] &&
              Boolean(formik.errors[field as keyof typeof formik.errors])
            }
            helperText={
              formik.touched[field as keyof typeof formik.touched] &&
              formik.errors[field as keyof typeof formik.errors]
            }
            onKeyDown={handleKeyDown}
            sx={{ flexGrow: 1, mr: 1 }}
            size="small"
          />
          <IconButton onClick={() => formik.handleSubmit()}>
            <IconCheck />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="body1" sx={{ flexGrow: 1 }}>
            {field === 'password'
              ? '**********'
              : formik.values[field as keyof typeof formik.values]}
          </Typography>
          {isEditable && (
            <IconButton onClick={() => handleEditClick(field)}>
              <IconEdit />
            </IconButton>
          )}
        </>
      )}
    </Box>
  );

  return (
    <Box
      sx={{
        padding: 3,
        borderRadius: 1,
        boxShadow: 3,
        margin: '0 auto',
      }}
    >
      <Typography mb={4} variant="h4" fontWeight="600" gutterBottom display={'flex'} gap={1}>
        <IconUserCircle /> <span>Thông tin tài khoản</span>
      </Typography>
      {renderField('email', 'Email', false)} {/* Email không thể chỉnh sửa */}
      {renderField('phone', 'Số điện thoại', true)} {/* Số điện thoại có thể chỉnh sửa */}
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" fontWeight="500" sx={{ width: '150px' }}>
          Mật khẩu:
        </Typography>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1" sx={{ flexGrow: 1 }}>
            {formik.values.password}
          </Typography>
          <Button
            onClick={() => handleEditClick('password')}
            variant="outlined"
            color="primary"
            startIcon={<IconLock />}
          >
            Đổi mật khẩu
          </Button>
        </Box>
      </Box>

      {/* Hiển thị Alert khi có sự thay đổi */}
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

export default AccountInformation;
