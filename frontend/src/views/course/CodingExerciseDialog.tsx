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
    Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { CodingExercise } from 'src/types/services/course/course.ts';

interface CodingExerciseDialogProps {
    open: boolean;
    onClose: () => void;
    exercise: CodingExercise;
    onSave: (exercise: CodingExercise) => void;
}

export default function CodingExerciseDialog({
    open,
    onClose,
    exercise: initialExercise,
    onSave,
}: CodingExerciseDialogProps) {
    const [exercise, setExercise] = useState<CodingExercise>(initialExercise);
    const [testFile, setTestFile] = useState<File | null>(null);

    const handleSave = () => {
        if (testFile) {
            onSave({
                ...exercise,
                testFile,
            });
        }
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                Coding Exercise
                <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
                    <TextField
                        label="Title"
                        value={exercise.title}
                        onChange={(e) => setExercise({ ...exercise, title: e.target.value })}
                        fullWidth
                    />

                    <TextField
                        label="Description"
                        value={exercise.description}
                        onChange={(e) => setExercise({ ...exercise, description: e.target.value })}
                        multiline
                        rows={4}
                        fullWidth
                        placeholder="Describe the coding exercise and what students need to do..."
                    />

                    <Box>
                        <Typography variant="subtitle1" gutterBottom>
                            Test File
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            Upload a test file that contains test cases to verify student solutions.
                            The file should include test cases and expected outputs.
                        </Typography>
                        <Button variant="outlined" component="label" fullWidth sx={{ mt: 1 }}>
                            Upload Test File
                            <input
                                type="file"
                                hidden
                                accept=".js,.py,.java,.cpp,.ts"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        setTestFile(file);
                                    }
                                }}
                            />
                        </Button>
                        {testFile && (
                            <Alert severity="success" sx={{ mt: 1 }}>
                                Test file uploaded: {testFile.name}
                            </Alert>
                        )}
                    </Box>

                    <Box>
                        <Typography variant="subtitle1" gutterBottom>
                            Guidelines
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            • Test file should contain comprehensive test cases
                            <br />
                            • Include edge cases and error scenarios
                            <br />
                            • Provide clear error messages for failed tests
                            <br />• Test both functionality and performance where applicable
                        </Typography>
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    onClick={handleSave}
                    variant="contained"
                    disabled={!exercise.title || !exercise.description || !testFile}
                >
                    Save Exercise
                </Button>
            </DialogActions>
        </Dialog>
    );
}
