import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import ProductCheckout from 'src/components/apps/ecommerce/productCheckout/ProductCheckout';
import ChildCard from 'src/components/shared/ChildCard';
import LpHeader from 'src/components/landingpage/header/Header';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Checkout',
  },
];

const Checkout = () => {
  // Disable scroll on page mount and restore it on unmount
  useEffect(() => {
    // Disable scroll
    document.body.style.overflow = 'hidden';

    // Re-enable scroll on cleanup
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <PageContainer title="Checkout" description="this is Shop List page">
      <LpHeader />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="top"
        minHeight="100vh"
      >
        <Box maxWidth="md" width="100%">
          <Breadcrumb title="Checkout" items={BCrumb} />
          <ChildCard>
            <Box p={2} flexGrow={1}>
              <ProductCheckout />
            </Box>
          </ChildCard>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default Checkout;
