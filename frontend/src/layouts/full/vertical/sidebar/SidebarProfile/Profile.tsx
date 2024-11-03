import { Box, Avatar, Typography, IconButton, Tooltip, useMediaQuery } from '@mui/material';
import { useSelector } from 'src/store/Store';
import img1 from 'src/assets/images/profile/user-1.jpg';
import { IconPower } from '@tabler/icons-react';
import { AppState } from 'src/store/Store';
import { Link } from 'react-router-dom';

export const Profile = () => {
    const customizer = useSelector((state: AppState) => state.customizer);
    const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));
    const hideMenu = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : '';

    return (
        <Box
            display={'flex'}
            alignItems="center"
            gap={2}
            sx={{ m: 3, p: 2, bgcolor: `${'secondary.light'}` }}
        >
            {!hideMenu ? (
                <>
                    <Avatar alt="Remy Sharp" src={img1} />

                    <Box>
                        <Tooltip title={'Nguyễn Ngọc Hải Anh'} placement="top">
                            <Typography
                                variant="h6"
                                sx={{
                                    maxWidth: '100px',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                Nguyễn Ngọc Hải Anh
                            </Typography>
                        </Tooltip>
                    </Box>
                    <Box sx={{ ml: 'auto' }}>
                        <Tooltip title="Logout" placement="top">
                            <IconButton
                                color="primary"
                                component={Link}
                                to="auth/login"
                                aria-label="logout"
                                size="small"
                            >
                                <IconPower size="20" />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </>
            ) : (
                ''
            )}
        </Box>
    );
};
