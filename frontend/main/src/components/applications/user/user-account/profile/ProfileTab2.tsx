import { Box, Tab, Tabs } from '@mui/material';
import { IconCoin, IconShoppingCart } from '@tabler/icons-react';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const ProfileTab2 = () => {
  const location = useLocation();
  const [value, setValue] = useState(location.pathname);

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  interface profileType {
    label: string;
    icon: JSX.Element;
    to?: string;
    dropdown?: boolean;
    handleClick?: (event: React.MouseEvent<HTMLElement>) => void;
  }

  const ProfileTabs: profileType[] = [
    {
      label: 'Lịch sử mua hàng',
      icon: <IconShoppingCart size="20" />,
      dropdown: true,
      to: '/purchasehistory',
    },
    {
      label: '  Lịch sử nạp Point',
      icon: <IconCoin fontSize="small" />,
      dropdown: true,
      to: '/pointhistory',
    },
  ];
  // console.log('ProfileTabs', ProfileTabs);
  return (
    <Box mt={1} sx={{ mt: 1, backgroundColor: (theme) => theme.palette.grey[100] }}>
      <Box
        justifyContent="end"
        display="flex"
        sx={{ overflow: 'auto', width: { xs: '333px', sm: 'auto' } }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="profile tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          {ProfileTabs.map((tab) => {
            if (tab.dropdown) {
              return (
                <Tab
                  key={tab.label}
                  iconPosition="start"
                  label={tab.label}
                  sx={{ minHeight: '50px' }}
                  icon={tab.icon}
                  component={Link}
                  to={tab.to || ''}
                  value={tab.to || ''}
                  onClick={tab.handleClick || (() => {})}
                />
              );
            } else {
              return (
                <Tab
                  key={tab.label}
                  iconPosition="start"
                  label={tab.label}
                  sx={{ minHeight: '50px' }}
                  icon={tab.icon}
                  component={Link}
                  to={tab.to || ''}
                  value={tab.to || ''}
                />
              );
            }
          })}
        </Tabs>
      </Box>
    </Box>
  );
};

export default ProfileTab2;
