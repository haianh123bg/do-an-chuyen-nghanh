// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import BlogListing from 'src/components/apps/blog/BlogListing';

const Blog = () => {
  return (
    <PageContainer title="Quản lý khóa học" description="this is Blog page">
      <Breadcrumb title="Khóa học" subtitle="Get the latest news" />
      {/* ------------------------------------------- */}
      {/* Blog Listing */}
      {/* ------------------------------------------- */}
      <BlogListing />
    </PageContainer>
  );
};

export default Blog;
