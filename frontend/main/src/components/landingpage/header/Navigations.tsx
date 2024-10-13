// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useState } from 'react';
import { Box, Button, Divider, Grid, styled, Paper, Stack } from '@mui/material';
import { IconChevronDown } from '@tabler/icons-react';
import AppLinks from 'src/layouts/full/vertical/header/AppLinks';
import QuickLinks from 'src/layouts/full/vertical/header/QuickLinks';
import DemosDD from './DemosDD';
import Notifications from 'src/layouts/full/vertical/header/Notification';
import Cart from 'src/layouts/full/vertical/header/Cart';
import Profile from 'src/layouts/full/vertical/header/Profile';

const Navigations = () => {

    const StyledButton = styled(Button)(({ theme }) => ({
        fontSize: '16px',
        color: theme.palette.text.secondary
    }));

    // demos
    const [open, setOpen] = useState(false);

    const [hoverBlog, setHoverBlog] = useState(false);

    const [hoverContact, setHoverContact] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleMouseEnterBlog = () => {
        setHoverBlog(true);
    };
    
    const handleMouseLeaveBlog = () => {
        setHoverBlog(false);
    };

    const handleMouseEnterContact = () => {
        setHoverContact(true);
    };
    
    const handleMouseLeaveContact = () => {
        setHoverContact(false);
    };

    // pages

    const [open2, setOpen2] = useState(false);

    const handleOpen2 = () => {
        setOpen2(true);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };



    return (
        <>
            <Box>
                <StyledButton
                    color="inherit"
                    variant="text"
                    onMouseEnter={handleOpen2} onMouseLeave={handleClose2}
                    sx={{
                        color: open2 ? 'primary.main' : (theme) => theme.palette.text.secondary,
                    }}
                    endIcon={<IconChevronDown size="15" style={{ marginLeft: '-5px', marginTop: '2px' }} />}
                >
                    Phân loại
                </StyledButton>
                {open2 && (
                    <Paper
                        onMouseEnter={handleOpen2}
                        onMouseLeave={handleClose2}
                        sx={{
                            position: 'absolute',
                            left: '0',
                            right: '0',
                            top: '55px',
                            width: '850px',
                            margin: '0 auto'
                        }}
                    >
                        <Grid container>
                            <Grid item sm={8} display="flex">
                                <Box p={4} pr={0} pb={3}>
                                    <AppLinks />
                                </Box>
                                <Divider orientation="vertical" />
                            </Grid>
                            <Grid item sm={4}>
                                <Box p={4}>
                                    <QuickLinks />
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                )}
            </Box>
            <StyledButton
                color="inherit"
                variant="text"
                aria-expanded={open ? 'true' : undefined}
                sx={{
                    color: open ? 'primary.main' : (theme) => theme.palette.text.secondary,
                }}
                onMouseEnter={handleOpen} onMouseLeave={handleClose}
                endIcon={<IconChevronDown size="15" style={{ marginLeft: '-5px', marginTop: '2px' }} />}
            >
                Khóa học của tôi
            </StyledButton>
            {open && (
                <Paper
                    onMouseEnter={handleOpen}
                    onMouseLeave={handleClose}
                    sx={{
                        position: 'absolute',
                        left: '0',
                        right: '0',
                        top: '55px',
                        maxWidth: '1200px',
                        width: '100%'
                    }}
                >
                    <DemosDD />
                </Paper>
            )}
            <StyledButton color="inherit" variant="text" onMouseEnter={handleMouseEnterBlog} 
          onMouseLeave={handleMouseLeaveBlog}  sx={{
            color: hoverBlog ? 'primary.main' : (theme) => theme.palette.text.secondary,
          }} href="https://demos.adminmart.com/premium/react/modernize-react/docs/index.html">
                Blog
            </StyledButton>
            <StyledButton color="inherit" variant="text" onMouseEnter={handleMouseEnterContact} 
          onMouseLeave={handleMouseLeaveContact}  sx={{
            color: hoverContact ? 'primary.main' : (theme) => theme.palette.text.secondary,
          }} href="https://adminmart.com/support/">
                Liên hệ
            </StyledButton>
            <Stack spacing={1} direction="row" alignItems="center">
                <Cart />
                <Notifications />
                <Profile />
            </Stack>
            {/* <Button color="primary" target="_blank" variant="contained" href="#">
                Buy Now
            </Button> */}
        </>
    );
};

export default Navigations;
