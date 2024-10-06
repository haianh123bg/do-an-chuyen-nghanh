import {
    IconButton,
    Box,
    AppBar,
    useMediaQuery,
    Toolbar,
    styled,
    Stack,
    Button,
} from '@mui/material';

import { useSelector, useDispatch } from 'src/store/Store';
import { toggleSidebar, toggleMobileSidebar } from 'src/store/customizer/CustomizerSlice';
import { IconMenu2 } from '@tabler/icons-react';
import Notifications from './Notification';
import Profile from './Profile';
import Cart from './Cart';
import { Search } from 'src/components/forms/form-elements/search/Search';
import { AppState } from 'src/store/Store';
import Navigation from './Navigation';
import MobileRightSidebar from './MobileRightSidebar';
import ApiService from 'src/service/ApiService';

const Header = () => {
    const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));
    const lgDown = useMediaQuery((theme: any) => theme.breakpoints.down('lg'));

    const isAuthenticate = ApiService.isAuthenticated();

    // drawer
    const customizer = useSelector((state: AppState) => state.customizer);
    const dispatch = useDispatch();

    const AppBarStyled = styled(AppBar)(({ theme }) => ({
        boxShadow: 'none',
        background: theme.palette.background.paper,
        justifyContent: 'center',
        backdropFilter: 'blur(4px)',
        [theme.breakpoints.up('lg')]: {
            minHeight: customizer.TopbarHeight,
        },
    }));
    const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
        width: '100%',
        color: theme.palette.text.secondary,
    }));

    return (
        <AppBarStyled position="sticky" color="default">
            <ToolbarStyled>
                {/* ------------------------------------------- */}
                {/* Toggle Button Sidebar */}
                {/* ------------------------------------------- */}
                <IconButton
                    color="inherit"
                    aria-label="menu"
                    onClick={
                        lgUp
                            ? () => dispatch(toggleSidebar())
                            : () => dispatch(toggleMobileSidebar())
                    }
                >
                    <IconMenu2 size="20" />
                </IconButton>
                {lgUp ? (
                    <>
                        <Navigation />
                    </>
                ) : null}

                <Search />

                <Box flexGrow={1} />
                <Stack spacing={1} direction="row" alignItems="center">
                    {/* Ecommerce Dropdown */}
                    {/* ------------------------------------------- */}
                    <Cart />
                    {/* ------------------------------------------- */}
                    {/* End Ecommerce Dropdown */}
                    {/* ------------------------------------------- */}
                    <Notifications />
                    {/* ------------------------------------------- */}
                    {/* Toggle Right Sidebar for mobile */}
                    {/* ------------------------------------------- */}
                    {lgDown ? <MobileRightSidebar /> : null}
                    {isAuthenticate ? (
                        <Profile />
                    ) : (
                        <Button variant="contained" color="primary">
                            Đăng nhập
                        </Button>
                    )}
                </Stack>
            </ToolbarStyled>
        </AppBarStyled>
    );
};

export default Header;
