// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { Box } from '@mui/material';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/apps/ecommerce/productGrid/PageContainer';
import ProductList from 'src/components/apps/ecommerce/productGrid/ProductList';
import ProductSidebar from 'src/components/apps/ecommerce/productGrid/ProductSidebar';
import AppCard from 'src/components/shared/AppCard';

const BCrumb = [
  {
    to: '/',
    title: 'Trang Chủ',
  },
  {
    title: 'Khóa học',
  },
];
const ListCourse = () => {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);

  return (
    <PageContainer title="Danh sách khóa học" description="Đây là danh sách khóa học">
      {/* breadcrumb */}
      <Breadcrumb title="Danh sách khóa học" items={BCrumb} />
      <AppCard>
        {/* ------------------------------------------- */}
        {/* Left part */}
        {/* ------------------------------------------- */}
        <ProductSidebar
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={() => setMobileSidebarOpen(false)}
        />
        {/* ------------------------------------------- */}
        {/* Right part */}
        {/* ------------------------------------------- */}
        <Box p={3} flexGrow={1}>
          <ProductList onClick={() => setMobileSidebarOpen(!isMobileSidebarOpen)} />
        </Box>
      </AppCard>
    </PageContainer>
  );
};

export default ListCourse;
