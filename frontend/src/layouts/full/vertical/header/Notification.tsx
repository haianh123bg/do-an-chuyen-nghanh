
import { IconButton, Badge, Box } from '@mui/material';
import { IconBellRinging } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

const Notifications = () => {
  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show notifications"
        color="inherit"
        component={Link}
        to="/feature/coming-soon"
        sx={{
          color: 'text.secondary',
        }}
      >
        <Badge variant="dot" color="primary">
          <IconBellRinging size="21" stroke="1.5" />
        </Badge>
      </IconButton>
    </Box>
  );
};

export default Notifications;
