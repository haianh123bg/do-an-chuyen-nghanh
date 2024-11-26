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
    Breadcrumbs,
    Link,
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PageContainer from 'src/components/apps/ecommerce/productGrid/PageContainer';
import LpHeader from 'src/components/landingpage/header/Header';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link as RouterLink } from 'react-router-dom'; // Import RouterLink from react-router-dom

const DetailCourse: React.FC = () => {
    // Data for the course
    const courseInfo = {
        title: 'Java Spring Framework 6 with Spring Boot 3',
        category: ['Teaching & Academics', 'Engineering', 'Spring Framework'],
        description:
            'Master Java, Spring 6 and Spring Boot with JDBC, JPA, Security, Docker and Microservices with Telusko',
        rating: 4.6,
        ratingsCount: 22539,
        students: 170723,
        creator: 'Navin Reddy',
        lastUpdated: '10/2024',
        price: 299000,
        originalPrice: 1599000,
        discount: 81,
        discountDeadline: '2 hours left at this price!',
        includes: [
            '48 hours on-demand video',
            '1 article',
            'Access on mobile and TV',
            'Full lifetime access',
            'Certificate of completion',
        ],
    };

    const learningPoints = [
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
    ];

    const courseSections = ['Course Introduction', 'Core Java', 'Advance Java', 'Maven', 'JDBC'];

    return (
        <PageContainer title="CourseDetail">
            <LpHeader />
            {/* Upper section with gray background */}
            <Box sx={{ backgroundColor: '#ccc' }}>
                <Box
                    sx={{
                        padding: '32px 32px 0 32px',
                        maxWidth: 1200,
                        margin: 'auto',
                    }}
                >
                    <Grid container spacing={4}>
                        {/* Main Course Information */}
                        <Grid item xs={12} md={8}>
                            <Breadcrumbs
                                separator={<NavigateNextIcon fontSize="small" />}
                                aria-label="breadcrumb"
                                sx={{ color: 'text.secondary' }}
                            >
                                {courseInfo.category.map((cat, index) => (
                                    <Link
                                        underline="hover"
                                        color="inherit"
                                        href="#"
                                        sx={{ fontSize: '1rem' }}
                                        key={index}
                                    >
                                        {cat}
                                    </Link>
                                ))}
                            </Breadcrumbs>
                            <Typography variant="h4" fontWeight="bold" gutterBottom mt={4}>
                                {courseInfo.title}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" paragraph>
                                {courseInfo.description}
                            </Typography>
                            <Stack direction="row" spacing={1} alignItems="center" mt={2}>
                                <Chip label="Bestseller" color="warning" size="small" />
                                <Typography variant="h6" fontWeight="bold">
                                    {courseInfo.rating}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    ({courseInfo.ratingsCount} ratings) {courseInfo.students}{' '}
                                    students
                                </Typography>
                            </Stack>
                            <Typography variant="body2" color="text.secondary" mt={2} gutterBottom>
                                Created by {courseInfo.creator}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                Last updated {courseInfo.lastUpdated}
                            </Typography>
                        </Grid>

                        {/* Image Section */}
                        <Grid item xs={12} md={4} sx={{ pb: 0 }}>
                            <Box
                                sx={{
                                    borderRadius: '8px 8px 0 0',
                                    overflow: 'hidden',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                }}
                            >
                                <img
                                    src="https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg"
                                    alt={courseInfo.title}
                                    width="100%"
                                    style={{ display: 'block' }}
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
                        {/* "What You'll Learn" Section */}
                        <Grid item xs={12} md={8}>
                            <Paper sx={{ mb: 4, p: 3 }}>
                                <Typography variant="h5" fontWeight="bold" mb={3}>
                                    What you'll learn
                                </Typography>
                                <Grid container spacing={1}>
                                    {learningPoints.map((point, index) => (
                                        <Grid item xs={6} key={index}>
                                            <Typography variant="body1">✓ {point}</Typography>
                                        </Grid>
                                    ))}
                                </Grid>

                                <Divider sx={{ mt: 4 }} />
                                {/* Course Content Section */}
                                <Grid item xs={12} mt={4}>
                                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                                        Course content
                                    </Typography>

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            mb: 2, // margin bottom để tạo khoảng cách với accordion
                                        }}
                                    >
                                        <Typography variant="body2" color="text.secondary">
                                            26 sections • 405 lectures • 46h 14m total length
                                        </Typography>

                                        <Button
                                            variant="text"
                                            sx={{
                                                minWidth: 'auto',
                                                px: '8px',
                                                py: 0,
                                                color: 'black',
                                                textTransform: 'none', // để chữ không viết hoa
                                                '&:hover': {
                                                    color: 'black',
                                                    background: '#ccc', // loại bỏ background khi hover
                                                },
                                            }}
                                        >
                                            Expand all sections
                                        </Button>
                                    </Box>

                                    {/* Accordion for Sections */}
                                    {courseSections.map((section, index) => (
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
                                                <Typography variant="body2" color="text.secondary">
                                                    Lecture details for {section} go here.
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                    ))}
                                </Grid>
                            </Paper>
                        </Grid>

                        {/* Purchase Section */}
                        <Grid item xs={12} md={4} sx={{ mt: '-32px' }}>
                            <Paper
                                elevation={3}
                                sx={{ padding: 2, textAlign: 'left', borderRadius: '0 0 8px 8px' }}
                            >
                                <Typography variant="h4" fontWeight="bold" mt={2}>
                                    ₫{courseInfo.price.toLocaleString()}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <del>₫{courseInfo.originalPrice.toLocaleString()}</del>{' '}
                                    {courseInfo.discount}% off
                                </Typography>
                                <Typography variant="body2" color="error" fontWeight="bold">
                                    {courseInfo.discountDeadline}
                                </Typography>

                                {/* Linking the buttons to /checkout */}
                                <Link to="/checkout" component={RouterLink}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        startIcon={<ShoppingCartIcon />}
                                        fullWidth
                                        sx={{ mt: 2 }}
                                    >
                                        Go to cart
                                    </Button>
                                </Link>
                                
                                <Link to="/checkout" component={RouterLink}>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        startIcon={<FavoriteBorderIcon />}
                                        fullWidth
                                        sx={{ mt: 1 }}
                                    >
                                        Buy now
                                    </Button>
                                </Link>

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
                                {courseInfo.includes.map((include, index) => (
                                    <Typography key={index} variant="body2" color="text.secondary">
                                        ✓ {include}
                                    </Typography>
                                ))}

                                <Divider sx={{ my: 2 }} />

                                {/* Coupon Section */}
                                <Typography variant="body2" color="text.secondary">
                                    Share • Gift this course
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </PageContainer>
    );
};

export default DetailCourse;
