import { Email } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Slide,
  Snackbar,
  Typography,
} from '@mui/material';
import { useState } from 'react';

function SlideTransition(props: any) {
  return <Slide {...props} direction="left" />;
}

const ReceiveEmail = () => {
  const initialState = {
    option1: false,
    option2: false,
    option3: false,
    option4: false,
    option5: false,
    option6: false,
  };

  const [checked, setChecked] = useState(initialState);
  const [savedState, setSavedState] = useState(initialState);
  const [open, setOpen] = useState(false);
  const [showAlert, setShowAlert] = useState<{ type: 'success' | 'info'; message: string } | null>(
    null,
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked({
      ...checked,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSave = () => {
    setSavedState(checked); // Save the current state
    setShowAlert({ type: 'success', message: 'Lưu thay đổi thành công' });
    setOpen(true); // Open the snackbar
  };

  const handleCancel = () => {
    setChecked(savedState); // Restore the previous state
    setShowAlert({ type: 'info', message: 'Hủy thay đổi thành công' });
    setOpen(true); // Open the snackbar
  };

  // const theme = useTheme();
  const handleClose = (_event: Event | React.SyntheticEvent<any, Event>, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false); // Close the snackbar
  };

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
        <Email /> <span>Tùy chọn nhận Email</span>
      </Typography>

      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={checked.option1} onChange={handleChange} name="option1" />}
          label="Chung - Nhận email liên quan đến tài khoản & hệ thống"
        />
        <FormControlLabel
          control={<Checkbox checked={checked.option2} onChange={handleChange} name="option2" />}
          label="Hóa đơn - nhận email hóa đơn mới, lời nhắc & thông báo quá hạn"
        />
        <FormControlLabel
          control={<Checkbox checked={checked.option3} onChange={handleChange} name="option3" />}
          label="Tính năng mới - Nhận email cập nhật các tính năng mới"
        />
        <FormControlLabel
          control={<Checkbox checked={checked.option4} onChange={handleChange} name="option4" />}
          label="Affiliate - Nhận email thông báo về chương trình Affiliate"
        />
        <FormControlLabel
          control={<Checkbox checked={checked.option5} onChange={handleChange} name="option5" />}
          label="Tài liệu - Nhận email tài liệu & hướng dẫn"
        />
        <FormControlLabel
          control={<Checkbox checked={checked.option6} onChange={handleChange} name="option6" />}
          label="Khuyến mại - Nhận email về các chương trình khuyến mại"
        />
      </FormGroup>

      <Box mt={4} display="flex" justifyContent="space-between">
        <Button variant="contained" color="primary" onClick={handleSave}>
          Lưu thay đổi
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleCancel}>
          Hủy thay đổi
        </Button>
      </Box>

      {/* Hiển thị Alert khi có sự thay đổi */}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        TransitionComponent={SlideTransition}
      >
        <Alert onClose={handleClose} severity={showAlert?.type} variant="filled">
          {showAlert?.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ReceiveEmail;
