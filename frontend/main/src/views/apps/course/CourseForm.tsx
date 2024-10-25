import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const CourseForm = () => {
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý lưu khóa học
    console.log('Đã lưu khóa học:', courseTitle, courseDescription);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Thêm Khóa Học Mới
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Tên Khóa Học"
          fullWidth
          variant="outlined"
          margin="normal"
          value={courseTitle}
          onChange={(e) => setCourseTitle(e.target.value)}
          required
        />
        <TextField
          label="Mô Tả"
          fullWidth
          variant="outlined"
          margin="normal"
          multiline
          rows={4}
          value={courseDescription}
          onChange={(e) => setCourseDescription(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Lưu Khóa Học
        </Button>
      </form>
    </Box>
  );
};

export default CourseForm;
