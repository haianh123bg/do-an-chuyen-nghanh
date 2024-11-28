import React, { useEffect } from 'react';
import { vi } from 'date-fns/locale';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useDispatch } from 'src/store/Store';
import {
  CardContent,
  Stack,
  Avatar,
  Typography,
  CardMedia,
  Grid,
  Tooltip,
  Box,
  Skeleton,
} from '@mui/material';
import { IconEye, IconMessage2, IconPoint } from '@tabler/icons-react';
import BlankCard from '../../shared/BlankCard';
import { BlogPostType } from 'src/types/apps/blog';

interface Btype {
  post: BlogPostType;
}

const BlogCard = ({ post }: Btype) => {
  const { coverImg, title, view, comments, createdAt }: any = post;

  // Skeleton
  const [isLoading, setLoading] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Grid item xs={12} lg={4} md={4} sm={6} display="flex" alignItems="stretch">
      {isLoading ? (
        <Skeleton
          animation="wave"
          variant="rectangular"
          width="100%"
          height={400}
          sx={{ borderRadius: (theme) => theme.shape.borderRadius / 5 }}
        />
      ) : (
        <BlankCard className="hoverCard">
          <>
            <Typography
              component={Link}
              to="/learning/course/1" // Đường dẫn cố định
            >
              <CardMedia component="img" height="240" image={coverImg} alt={title} />
            </Typography>
            <CardContent>
              
              <Box my={3}>
                <Typography
                  gutterBottom
                  variant="h5"
                  color="inherit"
                  component={Link}
                  to="/learning/course/1" // Đường dẫn cố định
                >
                  {title}
                </Typography>
              </Box>
              <Stack direction="row" gap={3} alignItems="center">
                <Stack direction="row" gap={1} alignItems="center">
                  <IconEye size="18" /> {view}
                </Stack>
                <Stack direction="row" gap={1} alignItems="center">
                  <IconMessage2 size="18" /> {comments?.length}
                </Stack>
                  <Stack direction="row" ml="auto" alignItems="center">
                    <IconPoint size="16" />
                    <small>
                      {format(new Date(createdAt), "dd 'tháng' MM 'năm' yyyy", { locale: vi })}
                    </small>
                  </Stack>
              </Stack>
            </CardContent>
          </>
        </BlankCard>
      )}
    </Grid>
  );
};

export default BlogCard;
