import React from 'react';
import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PeopleIcon from '@mui/icons-material/People';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
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
    onOpenLearnersDialog: () => void;
    onOpenStructureDialog: () => void;
    onOpenVideoDialog: () => void;
    completedItems: string[];
}

export default function CurriculumSidebar({
    onSubmit,
    onOpenLearnersDialog,
    onOpenStructureDialog,
    onOpenVideoDialog,
    completedItems,
}: CurriculumSidebarProps) {
    const sidebarItems = [
        {
            id: 'intended-learners',
            label: 'Người học dự kiến',
            icon: <PeopleIcon />,
            onClick: onOpenLearnersDialog,
        },
        {
            id: 'course-structure',
            label: 'Cấu trúc khóa học',
            icon: <MenuBookIcon />,
            onClick: onOpenStructureDialog,
        },
        {
            id: 'setup-video',
            label: 'Video thiết lập và kiểm tra',
            icon: <VideoLibraryIcon />,
            onClick: onOpenVideoDialog,
        },
    ];

    return (
        <StyledSidebar>
            <List>
                <ListItem sx={{ py: 2, px: 3 }}>
                    <ListItemText
                        primary="Kế hoạch khóa học của bạn"
                        primaryTypographyProps={{
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                        }}
                    />
                </ListItem>

                {sidebarItems.map((item) => (
                    <StyledListItem key={item.id}>
                        <StyledListItemButton onClick={item.onClick}>
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

            {/* <SubmitButton onClick={onSubmit}>Gửi để đánh giá</SubmitButton> */}
        </StyledSidebar>
    );
}
