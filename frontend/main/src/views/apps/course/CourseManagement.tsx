import React from 'react';
import { Box, Button, Grid, Typography, Paper } from '@mui/material';
import CourseCard from './CourseCard'; // Giả định bạn có component CourseCard

const CourseManagement = () => {
  const courses = [
    { id: 1, title: 'Khóa Học React Cơ Bản' },
    { id: 2, title: 'Khóa Học Node.js Nâng Cao' },
  ];

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Quản Lý Khóa Học
      </Typography>
      <Button variant="contained" color="primary" sx={{ mb: 3 }}>
        Thêm Khóa Học Mới
      </Button>
      <Grid container spacing={3}>
        {courses.map(course => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <CourseCard title={course.title} /> {/* Component hiển thị khóa học */}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CourseManagement;
