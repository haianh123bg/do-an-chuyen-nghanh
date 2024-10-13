import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { Box, styled, SxProps } from '@mui/material';

const SimpleBarStyle = styled(SimpleBar)(() => ({
  maxHeight: '100%',
  overflowX: 'auto', // Enable horizontal scrolling
  overflowY: 'hidden', // Disable vertical scrolling if needed
}));

interface PropsType {
  children: React.ReactElement | React.ReactNode;
  sx?: SxProps; // Made sx optional in case it's not passed
}

const Scrollbar_x = (props: PropsType) => {
  const { children, sx, ...other } = props;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );

  if (isMobile) {
    return <Box sx={{ overflowX: 'auto' }}>{children}</Box>;
  }
  return (
    <SimpleBarStyle sx={sx} {...other}>
      {children}
    </SimpleBarStyle>
  );
};

export default Scrollbar_x;
