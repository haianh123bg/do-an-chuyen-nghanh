import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

const linkStyle = {
  textDecoration: 'none',
  display: 'block',
  color: 'white',
  mb: 1,
  fontSize: 14,
};

const sections = [
  {
    title: 'Company',
    links: ['Blog', 'Affiliate Area'],
  },
  {
    title: 'Help & Support',
    links: ['Contact Us', 'Premium Support', 'Custom Development'],
  },
  {
    title: 'Legal Information',
    links: ['License', 'Terms & Conditions', 'Privacy Policy'],
  },
];

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: 'primary.main', // Đặt nền tùy ý nếu cần
        color: 'white',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, mb: 2 }}>
          {sections.map((section) => (
            <Box key={section.title} sx={{ mr: 4 }}>
              {' '}
              {/* Tạo khoảng cách giữa các cột */}
              <Typography variant="h6" color="inherit" sx={{ mb: 2, fontSize: 18 }}>
                {section.title}
              </Typography>
              {section.links.map((link) => (
                <Link key={link} href="#" variant="body2" sx={linkStyle}>
                  {link}
                </Link>
              ))}
            </Box>
          ))}
        </Box>
        <Typography variant="body1" color="inherit" sx={{ fontSize: 16 }}>
          Ngo Anh Tien © 2024
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
