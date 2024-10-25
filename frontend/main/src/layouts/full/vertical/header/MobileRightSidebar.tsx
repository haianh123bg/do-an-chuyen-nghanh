// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useState } from 'react';
import {
    IconCalendarEvent,
    IconGridDots,
    IconMail,
    IconMessages,
} from '@tabler/icons-react';
import {
    Box,
    Typography,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';

import { Link } from 'react-router-dom';

const MobileRightSidebar = () => {
    const [showDrawer, setShowDrawer] = useState(false);

    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    const cartContent = (
        <Box>
            {/* ------------------------------------------- */}
            {/* Apps Content */}
            {/* ------------------------------------------- */}
            <Box px={1}>
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                >
                    <ListItemButton component={Link} to="/apps/chats">
                        <ListItemIcon sx={{ minWidth: 35 }}>
                            <IconMessages size="21" stroke="1.5" />
                        </ListItemIcon>
                        <ListItemText>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Nâng cấp hội viên
                            </Typography>
                        </ListItemText>
                    </ListItemButton>
                    <ListItemButton component={Link} to="/apps/calendar">
                        <ListItemIcon sx={{ minWidth: 35 }}>
                            <IconCalendarEvent size="21" stroke="1.5" />
                        </ListItemIcon>
                        <ListItemText>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Khóa học
                            </Typography>
                        </ListItemText>
                    </ListItemButton>
                    <ListItemButton component={Link} to="/apps/email">
                        <ListItemIcon sx={{ minWidth: 35 }}>
                            <IconMail size="21" stroke="1.5" />
                        </ListItemIcon>
                        <ListItemText>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Combo
                            </Typography>
                        </ListItemText>
                    </ListItemButton>
                </List>
            </Box>
        </Box>
    );

    return (
        <Box>
            <IconButton
                size="large"
                color="inherit"
                onClick={() => setShowDrawer(true)}
                sx={{
                    ...(showDrawer && {
                        color: 'primary.main',
                    }),
                }}
            >
                <IconGridDots size="21" stroke="1.5" />
            </IconButton>
            {/* ------------------------------------------- */}
            {/* Cart Sidebar */}
            {/* ------------------------------------------- */}
            <Drawer
                anchor="right"
                open={showDrawer}
                onClose={() => setShowDrawer(false)}
                PaperProps={{ sx: { width: '300px' } }}
            >
                <Box p={3} pb={0}>
                    <Typography variant="h5" fontWeight={600}>
                        Menu
                    </Typography>
                </Box>

                {/* component */}
                {cartContent}
            </Drawer>
        </Box>
    );
};

export default MobileRightSidebar;
