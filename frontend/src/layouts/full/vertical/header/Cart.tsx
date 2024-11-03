// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useState } from 'react';
import { sum } from 'lodash';
import { IconShoppingCart, IconX } from '@tabler/icons-react';
import { Box, Typography, Badge, Drawer, IconButton, Button, Stack, Menu } from '@mui/material';
import { useSelector } from 'src/store/Store';
import { Link } from 'react-router-dom';
import CartItems from './CartItem';
import { AppState } from 'src/store/Store';

const Cart = () => {
    // Get Products
    const Cartproduct = useSelector((state: AppState) => state.ecommerceReducer.cart);
    const bcount = Cartproduct.length > 0 ? Cartproduct.length : '0';

    const checkout = useSelector((state: AppState) => state.ecommerceReducer.cart);
    const total = sum(checkout.map((product: any) => product.price * product.qty));

    const [anchorEl2, setAnchorEl2] = useState(null);

    const handleClick2 = (event: any) => {
        setAnchorEl2(event.currentTarget);
    };

    const handleClose2 = () => {
        setAnchorEl2(null);
    };

    const cartContent = (
        <Box>
            {/* ------------------------------------------- */}
            {/* Cart Content */}
            {/* ------------------------------------------- */}
            <Box>
                <CartItems />
            </Box>
        </Box>
    );

    return (
        <Box>
            <IconButton
                size="large"
                color="inherit"
                onClick={handleClick2}
                sx={{
                    color: 'text.secondary',
                    ...(typeof anchorEl2 === 'object' && {
                        color: 'primary.main',
                    }),
                }}
            >
                <Badge color="error" badgeContent={bcount}>
                    <IconShoppingCart size="21" stroke="1.5" />
                </Badge>
            </IconButton>
            {/* ------------------------------------------- */}
            {/* Cart Sidebar */}
            {/* ------------------------------------------- */}
            <Menu
                id="msgs-menu"
                anchorEl={anchorEl2}
                keepMounted
                open={Boolean(anchorEl2)}
                onClose={handleClose2}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                sx={{
                    '& .MuiMenu-paper': {
                        width: '400px',
                        p: 0.5,
                    },
                }}
            >
                <Box display="flex" alignItems="center" p={3} pb={0} justifyContent="space-between">
                    <Typography variant="h5" fontWeight={600}>
                        Giỏ Hàng Của Bạn
                    </Typography>
                </Box>

                {/* component */}
                {cartContent}
                {/* ------------------------------------------- */}
                {/* Checkout  */}
                {/* ------------------------------------------- */}
                <Box px={3} mt={2}>
                    {Cartproduct.length > 0 ? (
                        <>
                            <Stack direction="row" justifyContent="space-between" mb={3}>
                                <Typography variant="subtitle2" fontWeight={400}>
                                    Tổng tiền
                                </Typography>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    {total} VNĐ
                                </Typography>
                            </Stack>
                            <Button
                                fullWidth
                                component={Link}
                                to="/apps/ecommerce/eco-checkout"
                                variant="contained"
                                color="primary"
                            >
                                Mua
                            </Button>
                        </>
                    ) : (
                        ''
                    )}
                </Box>
            </Menu>
        </Box>
    );
};

export default Cart;
