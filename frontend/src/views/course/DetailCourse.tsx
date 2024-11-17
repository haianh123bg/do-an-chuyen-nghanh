import React from 'react';
import {
    Box,
    Typography,
    Button,
    Grid,
    Paper,
    Divider,
    Stack,
    Chip,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PageContainer from 'src/components/container/PageContainer';
import LpHeader from 'src/components/landingpage/header/Header';

const DetailCourse: React.FC = () => {
    return (
        <PageContainer title="CourseDetail">
            <LpHeader />
            {/* Upper section with gray background */}
            <Box sx={{ backgroundColor: '#ccc' }}>
                <Box
                    sx={{
                        padding: '32px 32px 0 32px', // Chỉ để padding top và hai bên, bỏ padding bottom
                        maxWidth: 1200,
                        margin: 'auto',
                    }}
                >
                    <Grid container spacing={4}>
                        {/* Main Course Information */}
                        <Grid item xs={12} md={8}>
                        <Typography variant="h6" color="text.secondary">
                    Teaching & Academics {'>'} Engineering {'>'} Spring Framework
                </Typography>
                            <Typography variant="h4" fontWeight="bold" gutterBottom mt={4}>
                                Java Spring Framework 6 with Spring Boot 3
                            </Typography>
                            <Typography variant="body1" color="text.secondary" paragraph>
                                Master Java, Spring 6 and Spring Boot with JDBC, JPA, Security,
                                Docker and Microservices with Telusko
                            </Typography>
                            <Stack direction="row" spacing={1} alignItems="center" mt={2}>
                                <Chip label="Bestseller" color="warning" size="small" />
                                <Typography variant="h6" fontWeight="bold">
                                    4.6
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    (22,539 ratings) 170,723 students
                                </Typography>
                            </Stack>
                            <Typography variant="body2" color="text.secondary" mt={2} gutterBottom>
                                Created by Navin Reddy
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                                {' '}
                                {/* Thêm margin bottom */}
                                Last updated 10/2024
                            </Typography>
                        </Grid>

                        {/* Image Section */}
                        <Grid item xs={12} md={4} sx={{ pb: 0 }}>
                            {/* Bỏ padding bottom của Grid item */}
                            <Box
                                sx={{
                                    borderRadius: '8px 8px 0 0', // Chỉ bo góc phía trên
                                    overflow: 'hidden',
                                    height: '100%', // Đảm bảo Box chiếm full height
                                    display: 'flex',
                                    alignItems: 'flex-end', // Đẩy ảnh xuống dưới
                                }}
                            >
                                <img
                                    src="https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg"
                                    alt="Java Spring Framework 6 with Spring Boot 3"
                                    width="100%"
                                    style={{ display: 'block' }} // Loại bỏ khoảng trống dưới ảnh
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

            {/* Lower section with white background */}
            <Box sx={{ backgroundColor: 'white' }}>
                <Box sx={{ padding: 4, maxWidth: 1200, margin: 'auto' }}>
                    <Grid container spacing={4}>
                        {/* "What You'll Learn" Section on the left */}
                        <Grid item xs={12} md={8}>
                            <Paper sx={{ mb: 4, p: 3 }}>
                                <Typography variant="h5" fontWeight="bold" gutterBottom>
                                    What you'll learn
                                </Typography>
                                <Grid container spacing={1}>
                                    {[
                                        'Core Java',
                                        'Spring Core - IoC',
                                        'Spring AOP',
                                        'Spring REST',
                                        'Docker',
                                        'Spring Boot',
                                        'Spring MVC',
                                        'Spring Data JPA',
                                        'Spring Security',
                                        'Microservices',
                                    ].map((item) => (
                                        <Grid item xs={6} key={item}>
                                            <Typography variant="body1">✓ {item}</Typography>
                                        </Grid>
                                    ))}
                                </Grid>
                                {/* Course Content Section */}
                                <Grid container spacing={4} sx={{ mt: 2 }}>
                                    <Grid item xs={12}>
                                        <Typography variant="h5" fontWeight="bold">
                                            Course content
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            26 sections • 405 lectures • 46h 14m total length
                                        </Typography>
                                        <Button variant="text" color="primary" sx={{ mt: 1 }}>
                                            Expand all sections
                                        </Button>

                                        {/* Accordion for Sections */}
                                        {[
                                            'Course Introduction',
                                            'Core Java',
                                            'Advance Java',
                                            'Maven',
                                            'JDBC',
                                        ].map((section, index) => (
                                            <Accordion key={index}>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    sx={{
                                                        backgroundColor: '#f5f5f5',
                                                        '&:hover': {
                                                            backgroundColor: '#eeeeee',
                                                        },
                                                    }}
                                                >
                                                    <Typography variant="subtitle1">
                                                        {section}
                                                    </Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                    >
                                                        Lecture details for {section} go here.
                                                    </Typography>
                                                </AccordionDetails>
                                            </Accordion>
                                        ))}
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>

                        {/* Purchase Section immediately below the image */}
                        <Grid item xs={12} md={4} sx={{ mt: '-32px' }}>
                            <Paper
                                elevation={3}
                                sx={{ padding: 2, textAlign: 'left', borderRadius: '0 0 8px 8px' }}
                            >
                                <Typography variant="h4" fontWeight="bold" mt={2}>
                                    ₫299,000
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <del>₫1,599,000</del> 81% off
                                </Typography>
                                <Typography variant="body2" color="error" fontWeight="bold">
                                    2 hours left at this price!
                                </Typography>

                                <Button
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<ShoppingCartIcon />}
                                    fullWidth
                                    sx={{ mt: 2 }}
                                >
                                    Go to cart
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    startIcon={<FavoriteBorderIcon />}
                                    fullWidth
                                    sx={{ mt: 1 }}
                                >
                                    Buy now
                                </Button>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    mt={2}
                                    sx={{ textAlign: 'center' }}
                                >
                                    30-Day Money-Back Guarantee
                                </Typography>

                                <Divider sx={{ my: 2 }} />

                                {/* Course Includes Section */}
                                <Typography variant="subtitle1" fontWeight="bold">
                                    This course includes:
                                </Typography>
                                {[
                                    '46 hours on-demand video',
                                    '1 article',
                                    'Access on mobile and TV',
                                    'Full lifetime access',
                                    'Certificate of completion',
                                ].map((include, index) => (
                                    <Typography key={index} variant="body2" color="text.secondary">
                                        ✓ {include}
                                    </Typography>
                                ))}

                                <Divider sx={{ my: 2 }} />

                                {/* Coupon Section */}
                                <Typography variant="body2" color="text.secondary">
                                    Share • Gift this course • Apply Coupon
                                </Typography>
                                <Box display="flex" alignItems="center" mt={2}>
                                    <input
                                        type="text"
                                        placeholder="Enter Coupon"
                                        style={{
                                            flex: 1,
                                            padding: '8px',
                                            borderRadius: '4px',
                                            border: '1px solid #ccc',
                                            marginRight: '8px',
                                        }}
                                    />
                                    <Button variant="contained" color="primary">
                                        Apply
                                    </Button>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </PageContainer>
    );
};

export default DetailCourse;
