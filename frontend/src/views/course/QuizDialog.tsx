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
    Radio,
    RadioGroup,
    FormControlLabel,
    Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Question } from 'src/types/services/course/course.ts';

interface QuizDialogProps {
    open: boolean;
    onClose: () => void;
    questions: Question[];
    onSave: (questions: Question[]) => void;
}

export default function QuizDialog({
    open,
    onClose,
    questions: initialQuestions,
    onSave,
}: QuizDialogProps) {
    const [questions, setQuestions] = useState<Question[]>(initialQuestions);
    const [selectedQuestion, setSelectedQuestion] = useState<number>(0);

    const handleAddQuestion = () => {
        const newQuestion: Question = {
            id: Date.now().toString(),
            question: '',
            type: 'multiple_choice',
            options: ['', '', '', ''],
            correctAnswer: 0,
        };
        setQuestions([...questions, newQuestion]);
        setSelectedQuestion(questions.length);
    };

    const handleQuestionChange = (index: number, field: keyof Question, value: any) => {
        const newQuestions = [...questions];
        newQuestions[index] = { ...newQuestions[index], [field]: value };
        setQuestions(newQuestions);
    };

    const handleOptionChange = (questionIndex: number, optionIndex: number, value: string) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].options[optionIndex] = value;
        setQuestions(newQuestions);
    };

    const handleDeleteQuestion = (index: number) => {
        const newQuestions = questions.filter((_, i) => i !== index);
        setQuestions(newQuestions);
        if (selectedQuestion >= newQuestions.length) {
            setSelectedQuestion(Math.max(0, newQuestions.length - 1));
        }
    };

    const handleSave = () => {
        onSave(questions);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                Quiz Questions
                <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', gap: 2, height: '60vh' }}>
                    {/* Questions List */}
                    <Box sx={{ width: 200, borderRight: 1, borderColor: 'divider', p: 2 }}>
                        {questions.map((q, index) => (
                            <Box
                                key={q.id}
                                sx={{
                                    p: 1,
                                    cursor: 'pointer',
                                    bgcolor:
                                        selectedQuestion === index
                                            ? 'action.selected'
                                            : 'transparent',
                                    '&:hover': { bgcolor: 'action.hover' },
                                    borderRadius: 1,
                                    mb: 1,
                                }}
                                onClick={() => setSelectedQuestion(index)}
                            >
                                <Typography noWrap>Question {index + 1}</Typography>
                            </Box>
                        ))}
                        <Button
                            startIcon={<AddIcon />}
                            onClick={handleAddQuestion}
                            fullWidth
                            variant="outlined"
                            sx={{ mt: 2 }}
                        >
                            Add Question
                        </Button>
                    </Box>

                    {/* Question Editor */}
                    {questions.length > 0 && (
                        <Box sx={{ flex: 1, p: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Typography variant="h6">
                                    Question {selectedQuestion + 1}
                                </Typography>
                                <IconButton
                                    onClick={() => handleDeleteQuestion(selectedQuestion)}
                                    color="error"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                label="Question"
                                value={questions[selectedQuestion].question}
                                onChange={(e) =>
                                    handleQuestionChange(
                                        selectedQuestion,
                                        'question',
                                        e.target.value,
                                    )
                                }
                                sx={{ mb: 3 }}
                            />
                            <Typography variant="subtitle1" gutterBottom>
                                Options
                            </Typography>
                            <RadioGroup
                                value={questions[selectedQuestion].correctAnswer}
                                onChange={(e) =>
                                    handleQuestionChange(
                                        selectedQuestion,
                                        'correctAnswer',
                                        Number(e.target.value),
                                    )
                                }
                            >
                                {questions[selectedQuestion].options.map((option, index) => (
                                    <Box
                                        key={index}
                                        sx={{ display: 'flex', alignItems: 'center', mb: 2 }}
                                    >
                                        <FormControlLabel
                                            value={index}
                                            control={<Radio />}
                                            label=""
                                        />
                                        <TextField
                                            fullWidth
                                            value={option}
                                            onChange={(e) =>
                                                handleOptionChange(
                                                    selectedQuestion,
                                                    index,
                                                    e.target.value,
                                                )
                                            }
                                            placeholder={`Option ${index + 1}`}
                                        />
                                    </Box>
                                ))}
                            </RadioGroup>
                        </Box>
                    )}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave} variant="contained">
                    Save Questions
                </Button>
            </DialogActions>
        </Dialog>
    );
}
