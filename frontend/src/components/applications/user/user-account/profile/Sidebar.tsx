import { AccountCircle, Business, Email, Person, Security } from '@mui/icons-material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { Box, Tab, Tabs } from '@mui/material';
import { IconLock } from '@tabler/icons-react';
import React from 'react';

interface SidebarProps {
  selected: string | null;
  onSelect: (buttonName: string) => void;
}

const SCROLLABLE_TAB = [
  { value: 'personal', icon: <Person />, label: 'Thông tin cá nhân' },
  { value: 'account', icon: <AccountCircle />, label: 'Thông tin tài khoản' },
  { value: 'banking', icon: <AccountBalanceIcon />, label: 'Thông tin ngân hàng' }, // Sửa chính tả 'bankking' thành 'banking'
  { value: 'changepassword', icon: <IconLock />, label: 'Đổi mật khẩu' },
];

const Sidebar: React.FC<SidebarProps> = ({ selected, onSelect }) => {
  return (
    <Tabs
      orientation="vertical"
      value={selected}
      onChange={(event, newValue) => onSelect(newValue)} // Gọi onSelect với giá trị mới
      variant="scrollable"
      scrollButtons="auto"
      sx={{
        borderRight: '1px solid #e0e0e0',
        padding: 2,
        minWidth: 240,
        textAlign: 'left',
      }}
    >
      {SCROLLABLE_TAB.map((tab) => (
        <Tab
          key={tab.value}
          label={
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                justifyContent: 'flex-start',
                textAlign: 'left',
                paddingLeft: 0,
                fontWeight: 'bold',
              }}
            >
              {tab.icon}
              {tab.label}
            </Box>
          }
          value={tab.value}
          sx={{
            minHeight: 72,
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingLeft: 1,
            '&.Mui-selected': {
              color: 'primary.main',
              backgroundColor: 'action.hover',
            },
            '& .MuiTab-wrapper': {
              justifyContent: 'flex-start',
            },
          }}
        />
      ))}
    </Tabs>
  );
};

export default Sidebar;
