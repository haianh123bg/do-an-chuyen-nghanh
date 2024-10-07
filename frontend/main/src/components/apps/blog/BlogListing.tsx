// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// // @ts-ignore
// import React, { useEffect } from 'react';
// import { Grid, Pagination } from '@mui/material';
// import BlogCard from './BlogCard';
// import { orderBy } from 'lodash';
// import { useSelector, useDispatch } from 'src/store/Store';
// import { fetchBlogPosts } from 'src/store/apps/blog/BlogSlice';
// import BlogFeaturedCard from './BlogFeaturedCard';
// import { BlogPostType } from 'src/types/apps/blog';

// const BlogListing = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchBlogPosts());
//   }, [dispatch]);

//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const filterBlogs = (posts: BlogPostType[], sortBy: string, _cSearch: string) => {
//     // SORT BY

//     if (sortBy === 'newest') {
//       posts = orderBy(posts, ['createdAt'], ['desc']);
//     }
//     if (sortBy === 'oldest') {
//       posts = orderBy(posts, ['createdAt'], ['asc']);
//     }
//     if (sortBy === 'popular') {
//       posts = orderBy(posts, ['view'], ['desc']);
//     }
//     if (posts) {
//       return (posts = posts.filter((t) => t.featured === false));
//     }

//     return posts;
//   };

//   const filterFeaturedpost = (posts: BlogPostType[]) => {
//     return (posts = posts.filter((t) => t.featured));
//   };

//   const blogPosts = useSelector((state) =>
//     filterBlogs(
//       state.blogReducer.blogposts,
//       state.blogReducer.sortBy,
//       state.blogReducer.blogSearch,
//     ),
//   );
//   const featuredPost = useSelector((state) => filterFeaturedpost(state.blogReducer.blogposts));

//   return (
//     <Grid container spacing={3}>
//       {featuredPost.map((post, index) => {
//         return <BlogFeaturedCard index={index} post={post} key={post.title} />;
//       })}
//       {blogPosts.map((post) => {
//         return <BlogCard post={post} key={post.id} />;
//       })}
//       <Grid item lg={12} sm={12} mt={3}>
//         <Pagination count={10} color="primary" sx={{ display: 'flex', justifyContent: 'center' }} />
//       </Grid>
//     </Grid>
//   );
// };

// export default BlogListing;

import React from 'react';
import { Grid, Pagination, Button } from '@mui/material'; // Thêm Button
import { useNavigate } from 'react-router-dom'; // Sử dụng để điều hướng
import BlogCard from './BlogCard';
import BlogFeaturedCard from './BlogFeaturedCard';
import { useSelector, useDispatch } from 'src/store/Store';
import { fetchBlogPosts } from 'src/store/apps/blog/BlogSlice';
import { useEffect } from 'react';
import { BlogPostType } from 'src/types/apps/blog';
import { orderBy } from 'lodash';

const BlogListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook điều hướng

  useEffect(() => {
    dispatch(fetchBlogPosts());
  }, [dispatch]);

  const filterBlogs = (posts: BlogPostType[], sortBy: string, _cSearch: string) => {
    if (sortBy === 'newest') {
      posts = orderBy(posts, ['createdAt'], ['desc']);
    }
    if (sortBy === 'oldest') {
      posts = orderBy(posts, ['createdAt'], ['asc']);
    }
    if (sortBy === 'popular') {
      posts = orderBy(posts, ['view'], ['desc']);
    }
    if (posts) {
      return (posts = posts.filter((t) => t.featured === false));
    }

    return posts;
  };

  const filterFeaturedpost = (posts: BlogPostType[]) => {
    return (posts = posts.filter((t) => t.featured));
  };

  const blogPosts = useSelector((state) =>
    filterBlogs(
      state.blogReducer.blogposts,
      state.blogReducer.sortBy,
      state.blogReducer.blogSearch,
    ),
  );
  const featuredPost = useSelector((state) => filterFeaturedpost(state.blogReducer.blogposts));

  // Hàm điều hướng đến trang tạo bài viết mới
  const handleCreateNew = () => {
    navigate('/create-new-post'); // Điều hướng đến trang tạo mới
  };

  return (
    <Grid container spacing={3}>
      {featuredPost.map((post, index) => (
        <BlogFeaturedCard index={index} post={post} key={post.title} />
      ))}
      {blogPosts.map((post) => (
        <BlogCard post={post} key={post.id} />
      ))}

      <Grid item lg={12} sm={12} mt={3}>
        <Pagination count={10} color="primary" sx={{ display: 'flex', justifyContent: 'center' }} />
      </Grid>

      {/* Nút Tạo mới */}
      <Grid item lg={12} sm={12} mt={3} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" color="primary" onClick={handleCreateNew}>
          Tạo mới
        </Button>
      </Grid>
    </Grid>
  );
};

export default BlogListing;
