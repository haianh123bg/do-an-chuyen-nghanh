import React from 'react';
import { Grid, Typography, Box, Button, styled, Container, Stack } from '@mui/material';
import c2aImg from 'src/assets/images/landingpage/background/c2a.png';
import Footer from '../footer/Footer';

const StyledButton = styled(Button)(({ theme }) => ({
    padding: '13px 34px',
    fontSize: '16px',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.main,
    fontWeight: 600,
}));

const StyledButton2 = styled(Button)(({ theme }) => ({
    padding: '13px 34px',
    fontSize: '16px',
    borderColor: theme.palette.background.paper,
    color: theme.palette.background.paper,
    fontWeight: 600,
    '&:hover': {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.primary.main,
    },
}));

const C2a2 = () => {
    return (
        <Box>
            <Box
                bgcolor="primary.main"
                sx={{
                    pt: '60px',
                    pb: '30px',
                }}
            >
                <Container maxWidth="lg">
                    <Grid container justifyContent="space-between" spacing={3}>
                        <Grid item xs={12} lg={7}>
                            <Typography
                                variant="h2"
                                color="background.paper"
                                fontWeight={700}
                                mt={4}
                            >
                                Nâng cấp kiến thức, chúng tôi sẵn sàng đồng hành cùng bạn !
                            </Typography>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} mt={3}>
                                <StyledButton
                                    variant="contained"
                                    color="inherit"
                                    href="/auth/login"
                                >
                                    Đăng nhập
                                </StyledButton>
                                <StyledButton2
                                    variant="outlined"
                                    color="inherit"
                                    href="/auth/register"
                                >
                                    Đăng ký
                                </StyledButton2>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} lg={5}>
                            <Box
                                sx={{
                                    textAlign: {
                                        xs: 'center',
                                        lg: 'right',
                                    },
                                }}
                            >
                                <img src={c2aImg} alt="img" width="250" />
                            </Box>
                        </Grid>
                    </Grid>
                    <Box>
                        <Footer />
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default C2a2;
