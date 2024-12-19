import React, { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PeopleIcon from '@mui/icons-material/People';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const StyledSidebar = styled('div')(({ theme }) => ({
  width: 280,
  backgroundColor: '#f8f9fa',
  borderRight: `1px solid ${theme.palette.divider}`,
  height: '100%',
  overflowY: 'auto',
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: 0,
  marginBottom: theme.spacing(1),
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  '&.Mui-selected': {
    backgroundColor: theme.palette.action.selected,
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#9c27b0',
  color: 'white',
  margin: theme.spacing(2),
  width: 'calc(100% - 32px)',
  '&:hover': {
    backgroundColor: '#7b1fa2',
  },
}));

interface CurriculumSidebarProps {
  onSubmit: () => void;
}

export default function CurriculumSidebar({ onSubmit }: CurriculumSidebarProps) {
  const [selectedItem, setSelectedItem] = useState<string | null>('intended-learners');
  const [isLearnersDialogOpen, setIsLearnersDialogOpen] = useState(false);
  const [isStructureDialogOpen, setIsStructureDialogOpen] = useState(false);
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false);
  const [completedItems, setCompletedItems] = useState<string[]>([]);

  const handleItemClick = (itemId: string) => {
    setSelectedItem(itemId);
    switch (itemId) {
      case 'intended-learners':
        setIsLearnersDialogOpen(true);
        break;
      case 'course-structure':
        setIsStructureDialogOpen(true);
        break;
      case 'setup-video':
        setIsVideoDialogOpen(true);
        break;
    }
  };

  const handleCompleteItem = (itemId: string) => {
    if (!completedItems.includes(itemId)) {
      setCompletedItems([...completedItems, itemId]);
    }
  };

  const sidebarItems = [
    {
      id: 'intended-learners',
      label: 'Intended learners',
      icon: <PeopleIcon />,
    },
    {
      id: 'course-structure',
      label: 'Course structure',
      icon: <MenuBookIcon />,
    },
    {
      id: 'setup-video',
      label: 'Setup & test video',
      icon: <VideoLibraryIcon />,
    },
  ];

  return (
    <StyledSidebar>
      <List>
        <ListItem sx={{ py: 2, px: 3 }}>
          <ListItemText 
            primary="Plan your course" 
            primaryTypographyProps={{ 
              fontWeight: 'bold',
              fontSize: '1.1rem'
            }} 
          />
        </ListItem>

        {sidebarItems.map((item) => (
          <StyledListItem key={item.id}>
            <StyledListItemButton
              selected={selectedItem === item.id}
              onClick={() => handleItemClick(item.id)}
            >
              <ListItemIcon>
                {completedItems.includes(item.id) ? (
                  <CheckCircleIcon color="success" />
                ) : (
                  <RadioButtonUncheckedIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </StyledListItemButton>
          </StyledListItem>
        ))}
      </List>
    </StyledSidebar>
  );
} 