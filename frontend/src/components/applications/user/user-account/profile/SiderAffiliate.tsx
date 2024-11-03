import { Theme, useTheme } from '@emotion/react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

// Extend the Theme interface to include palette
declare module '@emotion/react' {
  export interface Theme {
    palette: {
      primary: any;
      success: any;
      warning: any;
      error: any;
      mode: 'light' | 'dark';
      background: {
        paper: string;
      };
      text: {
        primary: string;
        secondary: string;
      };
    };
  }
}

const SiderAffiliate = () => {
  const theme: Theme = useTheme(); // Lấy theme để kiểm tra chế độ dark/light
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: 5, // Adds some margin at the top to position it better vertically
      }}
    >
      <Box
        sx={{
          width: 500,
          flexShrink: 0,
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          boxShadow: 3, // Optional shadow
          borderRadius: 2, // Optional rounded corners
          backgroundColor: isDarkMode ? theme.palette.background.paper : 'white', // Change background based on dark mode
          color: isDarkMode ? theme.palette.text.primary : 'black', // Change text color based on dark mode
        }}
      >
        <Typography
          variant="h6"
          align="center"
          sx={{
            mb: 2, // Adds some margin below the text
            textAlign: 'center', // Justifies text so that it starts and ends at the same point
            width: '100%', // Ensures the text takes up the full width of the box
          }}
        >
          Bạn muốn đăng ký đối tác Affiliate với vai trò cá nhân hay doanh nghiệp?
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              component={Link}
              to="/person-affiliate"
            >
              Cá nhân
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              component={Link}
              to="/company-affiliate"
            >
              Doanh nghiệp
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SiderAffiliate;
