import { useState } from 'react';
import { Box, Menu, Typography, Button, Divider, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { IconHelp } from '@tabler/icons-react';
import AppLinks from './AppLinks';
import QuickLinks from './QuickLinks';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';

const AppDD = () => {
    const [anchorEl2, setAnchorEl2] = useState(null);

    const handleClose2 = () => {
        setAnchorEl2(null);
    };

    return (
        <>
            <Box>
                {/* ------------------------------------------- */}
                {/* Message Dropdown */}
                {/* ------------------------------------------- */}
                <Menu
                    id="msgs-menu"
                    anchorEl={anchorEl2}
                    keepMounted
                    open={Boolean(anchorEl2)}
                    onClose={handleClose2}
                    anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                    transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                    sx={{
                        '& .MuiMenu-paper': {
                            width: '850px',
                        },
                        '& .MuiMenu-paper ul': {
                            p: 0,
                        },
                    }}
                >
                    <Grid container>
                        <Grid item sm={8} display="flex">
                            <Box p={4} pr={0} pb={3}>
                                <AppLinks />
                                <Divider />
                                <Box
                                    sx={{
                                        display: {
                                            xs: 'none',
                                            sm: 'flex',
                                        },
                                    }}
                                    alignItems="center"
                                    justifyContent="space-between"
                                    pt={2}
                                    pr={4}
                                >
                                    <Link to="/faq">
                                        <Typography
                                            variant="subtitle2"
                                            fontWeight="600"
                                            color="textPrimary"
                                            display="flex"
                                            alignItems="center"
                                            gap="4px"
                                        >
                                            <IconHelp width={24} />
                                            Frequently Asked Questions
                                        </Typography>
                                    </Link>
                                    <Button variant="contained" color="primary">
                                        Check
                                    </Button>
                                </Box>
                            </Box>
                            <Divider orientation="vertical" />
                        </Grid>
                        <Grid item sm={4}>
                            <Box p={4}>
                                <QuickLinks />
                            </Box>
                        </Grid>
                    </Grid>
                </Menu>
            </Box>
            <Button
                color="inherit"
                sx={{ color: (theme) => theme.palette.text.secondary }}
                variant="text"
                to="/apps/chats"
                component={Link}
            >
                Nâng cấp hội viên
            </Button>
            <Button
                color="inherit"
                sx={{ color: (theme) => theme.palette.text.secondary }}
                variant="text"
                to="/apps/calendar"
                component={Link}
            >
                Khóa học
            </Button>
            <Button
                color="inherit"
                sx={{ color: (theme) => theme.palette.text.secondary }}
                variant="text"
                to="/apps/email"
                component={Link}
            >
                Combo
            </Button>
        </>
    );
};

export default AppDD;
