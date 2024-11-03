// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import BlogListing from 'src/components/apps/blog/BlogListing';

const Blog = () => {
  return (
    <PageContainer title="Khóa học của tôi" description="this is Blog page">
      <Breadcrumb title="Khóa học của tôi" subtitle="" />
      {/* ------------------------------------------- */}
      {/* Blog Listing */}
      {/* ------------------------------------------- */}
      <BlogListing />
    </PageContainer>
  );
};

export default Blog;
