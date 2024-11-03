import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { Box, styled, SxProps } from '@mui/material';

const SimpleBarStyle = styled(SimpleBar)(() => ({
  minHeight: '100%', // Changed from maxHeight to minHeight
  overflowY: 'auto',
  overflowX: 'hidden',
}));

interface PropsType {
  children: React.ReactElement | React.ReactNode;
  sx?: SxProps;
}

const Scrollbar_y = (props: PropsType) => {
  const { children, sx, ...other } = props;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );

  if (isMobile) {
    return <Box sx={{ overflowY: 'auto' }}>{children}</Box>;
  }

  return (
    <SimpleBarStyle sx={sx} {...other}>
      {children}
    </SimpleBarStyle>
  );
};

export default Scrollbar_y;
