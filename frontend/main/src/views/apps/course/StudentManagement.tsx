import React from 'react';
import { Box, Grid, Typography, Paper } from '@mui/material';

const StudentManagement = () => {
  const students = [
    { id: 1, name: 'Nguyễn Văn A', email: 'vana@example.com' },
    { id: 2, name: 'Trần Thị B', email: 'btran@example.com' },
  ];

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Quản Lý Học Viên
      </Typography>
      <Grid container spacing={3}>
        {students.map(student => (
          <Grid item xs={12} md={6} key={student.id}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6">{student.name}</Typography>
              <Typography variant="body1">{student.email}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StudentManagement;
