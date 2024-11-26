// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/apps/ecommerce/productGrid/PageContainer';
import BlogListing from 'src/components/apps/blog/BlogListing';
const BCrumb = [
  {
    to: '/home',
    title: 'Trang Chủ',
  },
  {
    title: 'Khóa học',
  },
];
const Blog = () => {
  return (
    <PageContainer title="Khóa học của tôi" description="this is Blog page">
      <Breadcrumb title="Khóa học của tôi" items={BCrumb} />
      {/* ------------------------------------------- */}
      {/* Blog Listing */}
      {/* ------------------------------------------- */}
      <BlogListing />
    </PageContainer>
  );
};

export default Blog;
