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
  Tabs,
  Tab,
  Radio,
  RadioGroup,
  FormControlLabel,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import PreviewIcon from '@mui/icons-material/Preview';
import { PracticeTest, Question } from '../types/course';

interface PracticeTestDialogProps {
  open: boolean;
  onClose: () => void;
  test: PracticeTest;
  onSave: (test: PracticeTest) => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function PracticeTestDialog({
  open,
  onClose,
  test: initialTest,
  onSave,
}: PracticeTestDialogProps) {
  const [test, setTest] = useState<PracticeTest>(initialTest);
  const [selectedTab, setSelectedTab] = useState(0);
  const [previewMode, setPreviewMode] = useState(false);

  const handleAddQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      question: '',
      type: 'multiple_choice',
      options: ['', '', '', ''],
      correctAnswer: 0,
    };
    setTest({
      ...test,
      questions: [...test.questions, newQuestion],
    });
    setSelectedTab(test.questions.length);
  };

  const handleQuestionChange = (index: number, field: keyof Question, value: any) => {
    const newQuestions = [...test.questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setTest({ ...test, questions: newQuestions });
  };

  const handleOptionChange = (questionIndex: number, optionIndex: number, value: string) => {
    const newQuestions = [...test.questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setTest({ ...test, questions: newQuestions });
  };

  const handleDeleteQuestion = (index: number) => {
    const newQuestions = test.questions.filter((_, i) => i !== index);
    setTest({ ...test, questions: newQuestions });
    if (selectedTab >= newQuestions.length) {
      setSelectedTab(Math.max(0, newQuestions.length - 1));
    }
  };

  const handleSave = () => {
    onSave(test);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Practice Test
        <Box sx={{ position: 'absolute', right: 8, top: 8, display: 'flex', gap: 1 }}>
          <IconButton onClick={() => setPreviewMode(!previewMode)}>
            <PreviewIcon />
          </IconButton>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
          <TextField
            label="Test Title"
            value={test.title}
            onChange={(e) => setTest({ ...test, title: e.target.value })}
            fullWidth
            disabled={previewMode}
          />

          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={selectedTab}
              onChange={(_, newValue) => setSelectedTab(newValue)}
              variant="scrollable"
              scrollButtons="auto"
            >
              {test.questions.map((_, index) => (
                <Tab key={index} label={`Question ${index + 1}`} />
              ))}
              {!previewMode && (
                <Tab
                  icon={<AddIcon />}
                  onClick={handleAddQuestion}
                  sx={{ minWidth: 'auto' }}
                />
              )}
            </Tabs>
          </Box>

          {test.questions.map((question, index) => (
            <TabPanel key={index} value={selectedTab} index={index}>
              {previewMode ? (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Question {index + 1}
                  </Typography>
                  <Typography paragraph>
                    {question.question}
                  </Typography>
                  <RadioGroup value={previewMode ? -1 : question.correctAnswer}>
                    {question.options.map((option, optionIndex) => (
                      <FormControlLabel
                        key={optionIndex}
                        value={optionIndex}
                        control={<Radio />}
                        label={option}
                        disabled={previewMode}
                      />
                    ))}
                  </RadioGroup>
                </Box>
              ) : (
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">Question {index + 1}</Typography>
                    <IconButton onClick={() => handleDeleteQuestion(index)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Question"
                    value={question.question}
                    onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                    sx={{ mb: 3 }}
                  />
                  <Typography variant="subtitle1" gutterBottom>
                    Options
                  </Typography>
                  <RadioGroup
                    value={question.correctAnswer}
                    onChange={(e) => handleQuestionChange(index, 'correctAnswer', Number(e.target.value))}
                  >
                    {question.options.map((option, optionIndex) => (
                      <Box key={optionIndex} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <FormControlLabel
                          value={optionIndex}
                          control={<Radio />}
                          label=""
                        />
                        <TextField
                          fullWidth
                          value={option}
                          onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                          placeholder={`Option ${optionIndex + 1}`}
                        />
                      </Box>
                    ))}
                  </RadioGroup>
                </Box>
              )}
            </TabPanel>
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={previewMode || !test.title || test.questions.length === 0}
        >
          Save Test
        </Button>
      </DialogActions>
    </Dialog>
  );
} 