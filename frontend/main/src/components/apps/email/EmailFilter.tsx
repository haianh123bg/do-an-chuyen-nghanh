// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { useSelector, useDispatch } from 'src/store/Store';
import {
  ListItemText,
  ListItemButton,
  List,
  Divider,
  ListItemIcon,
  Box,
  Typography,
  Tooltip,
} from '@mui/material';

import { setVisibilityFilter } from '../../../store/apps/email/EmailSlice';
import EmailCompose from './EmailCompose';
import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import {
  IconMail,
  IconSend,
  IconFlag,
  IconTrash,
  IconStar,
  IconAlertCircle,
  IconFolder,
  IconNote,
} from '@tabler/icons-react';
import { GeneralIcon } from 'src/types/apps/icon';

interface fitlerType {
  id?: number;
  filterbyTitle?: string;
  icon?: GeneralIcon | any;
  name?: string;
  divider?: boolean;
  color?: string;
}

const EmailFilter = () => {
  const active = useSelector((state) => state.emailReducer.currentFilter);
  const customizer = useSelector((state) => state.customizer);
  const br = `${customizer.borderRadius}px`;

  const dispatch = useDispatch();
  const filterData: fitlerType[] = [
    {
      id: 2,
      name: 'Hộp thư đến',
      icon: IconMail,
      color: 'inherit',
    },
    {
      id: 3,
      name: 'Đã gửi',
      icon: IconSend,
      color: 'inherit',
    },
    {
      id: 4,
      name: 'Thư nháp',
      icon: IconNote,
      color: 'inherit',
    },
    {
      id: 4,
      name: 'Thư rác',
      icon: IconFlag,
      color: 'inherit',
    },
    {
      id: 5,
      name: 'Thùng rác',
      icon: IconTrash,
      color: 'inherit',
    },
    {
      id: 6,
      divider: true,
    },
  ];

  return (
    <>
      <Box>
        {/* ------------------------------------------- */}
        {/* Email compose */}
        {/* ------------------------------------------- */}
        <EmailCompose />
      </Box>
      <List>
      <Scrollbar sx={{ height: { lg: 'calc(100vh - 100px)', md: '100vh' }, maxHeight: '800px' }}>
          {filterData.map((filter) => {
            if (filter.filterbyTitle) {
              return (
                <Typography
                  variant="subtitle2"
                  p={2}
                  pb={1}
                  pl={5.5}
                  fontWeight={600}
                  key={filter.id}
                >
                  {filter.filterbyTitle}
                </Typography>
              );
            } else if (filter.divider) {
              return <Divider key={filter.id} />;
            }

            return (
              <ListItemButton
                sx={{
                  //mb: 1,
                  px: '20px',
                  mx: 1,
                  borderRadius: br,
                }}
                selected={active === `${filter.name}`}
                onClick={() => dispatch(setVisibilityFilter(`${filter.name}`))}
                key={`${filter.id}${filter.name}`}
              >
                {/* ------------------------------------------- */}
                {/* If list to filter */}
                {/* ------------------------------------------- */}
                <ListItemIcon sx={{ minWidth: '30px', color: filter.color, padding:"0px" }}>
                  <Tooltip title={filter.name}><filter.icon stroke="1.5" size={25} /></Tooltip>
                </ListItemIcon>
              </ListItemButton>
            );
          })}
        </Scrollbar>
      </List>
    </>
  );
};

export default EmailFilter;
