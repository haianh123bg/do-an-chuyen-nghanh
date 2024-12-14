import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    IconButton,
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ArticleIcon from '@mui/icons-material/Article';
import { ContentItem, ContentType } from 'src/types/services/course/course.ts';

interface ContentDialogProps {
    open: boolean;
    onClose: () => void;
    contents: ContentItem[];
    onSave: (contents: ContentItem[]) => void;
}

export default function ContentDialog({
    open,
    onClose,
    contents: initialContents,
    onSave,
}: ContentDialogProps) {
    const [contents, setContents] = useState<ContentItem[]>(initialContents);
    const [selectedType, setSelectedType] = useState<ContentType | null>(null);
    const [newContent, setNewContent] = useState<{
        title: string;
        content: File | null;
    }>({
        title: '',
        content: null,
    });

    const handleAddContent = () => {
        if (!selectedType || !newContent.content || !newContent.title) return;

        const newItem: ContentItem = {
            type: selectedType,
            title: newContent.title,
            content: newContent.content,
        };

        setContents([...contents, newItem]);
        setSelectedType(null);
        setNewContent({ title: '', content: null });
    };

    const handleDeleteContent = (index: number) => {
        const newContents = contents.filter((_, i) => i !== index);
        setContents(newContents);
    };

    const handleSave = () => {
        onSave(contents);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                Content Manager
                <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" gutterBottom>
                        Current Content
                    </Typography>
                    <List>
                        {contents.map((content, index) => (
                            <React.Fragment key={index}>
                                <ListItem>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        {content.type === 'video' ? (
                                            <VideoLibraryIcon />
                                        ) : (
                                            <ArticleIcon />
                                        )}
                                        <ListItemText
                                            primary={content.title}
                                            secondary={
                                                content.type === 'video' ? 'Video' : 'Article'
                                            }
                                        />
                                    </Box>
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            edge="end"
                                            onClick={() => handleDeleteContent(index)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <Divider />
                            </React.Fragment>
                        ))}
                    </List>
                </Box>

                <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle1" gutterBottom>
                        Add New Content
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        <Button
                            variant={selectedType === 'video' ? 'contained' : 'outlined'}
                            startIcon={<VideoLibraryIcon />}
                            onClick={() => setSelectedType('video')}
                        >
                            Video
                        </Button>
                        <Button
                            variant={selectedType === 'article' ? 'contained' : 'outlined'}
                            startIcon={<ArticleIcon />}
                            onClick={() => setSelectedType('article')}
                        >
                            Article
                        </Button>
                    </Box>

                    {selectedType && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <TextField
                                label="Title"
                                value={newContent.title}
                                onChange={(e) =>
                                    setNewContent({ ...newContent, title: e.target.value })
                                }
                                fullWidth
                            />
                            <Button variant="outlined" component="label" fullWidth>
                                Upload {selectedType === 'video' ? 'Video' : 'Article'}
                                <input
                                    type="file"
                                    hidden
                                    accept={
                                        selectedType === 'video'
                                            ? 'video/*'
                                            : 'application/pdf,text/*'
                                    }
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setNewContent({ ...newContent, content: file });
                                        }
                                    }}
                                />
                            </Button>
                            {newContent.content && (
                                <Typography variant="caption" color="success.main">
                                    File selected: {newContent.content.name}
                                </Typography>
                            )}
                            <Button
                                variant="contained"
                                onClick={handleAddContent}
                                disabled={!newContent.title || !newContent.content}
                            >
                                Add Content
                            </Button>
                        </Box>
                    )}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave} variant="contained">
                    Save Changes
                </Button>
            </DialogActions>
        </Dialog>
    );
}
