// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { Box, Typography, Avatar, Stack, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'src/store/Store';
import emptyCart from 'src/assets/images/products/empty-shopping-cart.svg';
import { increment, decrement } from 'src/store/apps/eCommerce/ECommerceSlice';
import { AppState } from 'src/store/Store';

const CartItems = () => {
  const dispatch = useDispatch();

  // Get Products
  const Cartproduct = useSelector((state: AppState) => state.ecommerceReducer.cart);

  const Increase = (productId: string) => {
    dispatch(increment(productId));
  };

  const Decrease = (productId: string) => {
    dispatch(decrement(productId));
  };

  return (
    <Box px={3}>
      {Cartproduct.length > 0 ? (
        <>
          {Cartproduct.map((product: any) => (
            <Box key={product.id}>
              <Link to={'/apps/ecommerce/shop'}>
              <Stack direction="row" spacing={2} py={2}>
                <Avatar
                  src={product.photo}
                  alt={product.photo}
                  sx={{
                    borderRadius: '10px',
                    height: '75px',
                    width: '95px',
                  }}
                />
                <Box>
                  <Typography variant="subtitle2" color="textPrimary" fontWeight={600}>
                    {product.title}
                  </Typography>{' '}
                  <Typography color="textSecondary" fontSize="12px">
                    {' '}
                    {product.category}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={2} mt="5px">
                    <Typography variant="subtitle2" fontWeight="500">
                      {product.price} VNĐ
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
              </Link>
            </Box>
          ))}
        </>
      ) : (
        <Box textAlign="center" mb={3}>
          <img src={emptyCart} alt="cart" width="200px" />
          <Typography variant="h5" mb={2}>
            Cart is Empty
          </Typography>
          <Button component={Link} to="/apps/ecommerce/shop" variant="contained">
            Go back to Shopping
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CartItems;
