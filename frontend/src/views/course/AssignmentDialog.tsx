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
    Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Assignment } from 'src/types/services/course/course.ts';

interface AssignmentDialogProps {
    open: boolean;
    onClose: () => void;
    assignment: Assignment;
    onSave: (assignment: Assignment) => void;
}

export default function AssignmentDialog({
    open,
    onClose,
    assignment: initialAssignment,
    onSave,
}: AssignmentDialogProps) {
    const [assignment, setAssignment] = useState<Assignment>(initialAssignment);
    const [newAttachments, setNewAttachments] = useState<File[]>([]);

    const handleAddAttachments = (files: FileList) => {
        const newFiles = Array.from(files);
        setNewAttachments([...newAttachments, ...newFiles]);
    };

    const handleRemoveAttachment = (index: number) => {
        setNewAttachments(newAttachments.filter((_, i) => i !== index));
    };

    const handleSave = () => {
        onSave({
            ...assignment,
            attachments: newAttachments,
        });
        onClose();
    };

    const isValid = assignment.title && assignment.description;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                Assignment
                <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
                    <TextField
                        label="Assignment Title"
                        value={assignment.title}
                        onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
                        fullWidth
                        placeholder="e.g., Build a REST API"
                    />

                    <TextField
                        label="Description"
                        value={assignment.description}
                        onChange={(e) =>
                            setAssignment({ ...assignment, description: e.target.value })
                        }
                        multiline
                        rows={6}
                        fullWidth
                        placeholder="Describe the assignment requirements, objectives, and evaluation criteria..."
                    />

                    <Box>
                        <Typography variant="subtitle1" gutterBottom>
                            Attachments
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            Upload any files that students will need to complete the assignment
                            (e.g., starter code, documentation, resources).
                        </Typography>
                        <Button
                            variant="outlined"
                            component="label"
                            startIcon={<AttachFileIcon />}
                            sx={{ mt: 1 }}
                        >
                            Add Attachments
                            <input
                                type="file"
                                hidden
                                multiple
                                onChange={(e) => {
                                    if (e.target.files) {
                                        handleAddAttachments(e.target.files);
                                    }
                                }}
                            />
                        </Button>

                        {newAttachments.length > 0 && (
                            <List sx={{ mt: 2 }}>
                                {newAttachments.map((file, index) => (
                                    <React.Fragment key={index}>
                                        <ListItem>
                                            <ListItemText
                                                primary={file.name}
                                                secondary={`${(file.size / 1024).toFixed(1)} KB`}
                                            />
                                            <ListItemSecondaryAction>
                                                <IconButton
                                                    edge="end"
                                                    onClick={() => handleRemoveAttachment(index)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        <Divider />
                                    </React.Fragment>
                                ))}
                            </List>
                        )}
                    </Box>

                    <Box>
                        <Typography variant="subtitle1" gutterBottom>
                            Guidelines
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            • Provide clear and specific requirements
                            <br />
                            • Include submission format and deadline
                            <br />
                            • Specify evaluation criteria and grading rubric
                            <br />
                            • List any technical requirements or constraints
                            <br />• Include examples or references if applicable
                        </Typography>
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave} variant="contained" disabled={!isValid}>
                    Save Assignment
                </Button>
            </DialogActions>
        </Dialog>
    );
}
