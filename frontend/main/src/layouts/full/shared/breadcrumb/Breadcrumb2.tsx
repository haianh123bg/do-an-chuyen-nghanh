// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Box, Grid, Theme } from '@mui/material';
import breadcrumbImg from 'src/assets/images/breadcrumb/ChatBc.png';

interface BreadCrumbType {
  subtitle?: string;
  items?: any[];
  title: string;
  children?: JSX.Element;
}

const Breadcrumb = ({ children }: BreadCrumbType) => (
  <Grid
    container
    sx={{
      backgroundColor: 'error.light',
      borderRadius: (theme: Theme) => theme.shape.borderRadius / 4,
      p: '30px 25px 20px',
      marginBottom: '30px',
      position: 'relative',
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Grid item xs={12} sm={12} lg={12} display="flex" justifyContent="center">
      <Box sx={{ textAlign: 'center' }}>
        {children ? (
          <Box>{children}</Box>
        ) : (
          <Box>
            <img src={breadcrumbImg} alt={breadcrumbImg} width={'165px'} />
          </Box>
        )}
      </Box>
    </Grid>
  </Grid>
);

export default Breadcrumb;
