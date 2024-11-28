// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import BlogDetail from 'src/components/apps/mycourse/detail/mycoursedetail';
import PageContainer from 'src/components/apps/ecommerce/productGrid/PageContainer';

const BlogPost = () => {
  return (
    <PageContainer title="Quản lý khóa học" description="this is Blog page">
      {/* ------------------------------------------- */}
      {/* Blog Listing */}
      {/* ------------------------------------------- */}
      <BlogDetail />
    </PageContainer>
  );
};

export default BlogPost;
