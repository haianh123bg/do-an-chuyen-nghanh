import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Paper,
    IconButton,
    Menu,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Select,
    FormControl,
    InputLabel,
    SelectChangeEvent,
    Collapse,
    Divider,
    Link,
    Tooltip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ArticleIcon from '@mui/icons-material/Article';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMore from '@mui/icons-material/ExpandMore';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import QuizIcon from '@mui/icons-material/Quiz';
import CodeIcon from '@mui/icons-material/Code';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PreviewIcon from '@mui/icons-material/Preview';
import {
    Section,
    CurriculumItem,
    ContentType,
    ContentItem,
    Question,
    ItemType,
    CodingExercise,
    PracticeTest,
    Assignment,
    isLectureItem,
    isQuizItem,
    isCodingExerciseItem,
    isPracticeTestItem,
    isAssignmentItem,
} from 'src/types/services/course/course.ts';
import QuizDialog from './QuizDialog';
import ContentDialog from './ContentDialog';
import CodingExerciseDialog from './CodingExerciseDialog';
import PracticeTestDialog from './PracticeTestDialog';
import AssignmentDialog from './AssignmentDialog';
import CurriculumSidebar from './CurriculumSidebar';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: theme.spacing(1),
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: '#f8f9fa',
}));

const ItemPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1.5),
    marginBottom: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: theme.spacing(0.5),
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: '#ffffff',
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
}));

const AddItemButton = styled(Button)(({ theme }) => ({
    textTransform: 'none',
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
    },
}));

const ContentTypeButton = styled(Button)(({ theme }) => ({
    width: '120px',
    height: '120px',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    padding: theme.spacing(2),
    backgroundColor: '#ffffff',
    border: `1px solid ${theme.palette.divider}`,
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
}));

const SectionHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    marginBottom: theme.spacing(2),
}));

const ItemHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    flex: 1,
}));

const ItemActions = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
}));

const getItemIcon = (type: ItemType) => {
    switch (type) {
        case 'lecture':
            return <OndemandVideoIcon />;
        case 'quiz':
            return <QuizIcon />;
        case 'coding_exercise':
            return <CodeIcon />;
        case 'practice_test':
            return <AssignmentIcon />;
        case 'assignment':
            return <AssignmentIcon />;
    }
};

const getItemTitle = (item: CurriculumItem): string => {
    switch (item.type) {
        case 'lecture':
        case 'quiz':
            return item.title;
        case 'coding_exercise':
            return item.exercise.title;
        case 'practice_test':
            return item.test.title;
        case 'assignment':
            return item.assignment.title;
    }
};

const setItemTitle = (item: CurriculumItem, newTitle: string): void => {
    switch (item.type) {
        case 'lecture':
        case 'quiz':
            item.title = newTitle;
            break;
        case 'coding_exercise':
            item.exercise.title = newTitle;
            break;
        case 'practice_test':
            item.test.title = newTitle;
            break;
        case 'assignment':
            item.assignment.title = newTitle;
            break;
    }
};

export default function Curriculum() {
    const [sections, setSections] = useState<Section[]>([]);
    const [contentAnchorEl, setContentAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedSectionIndex, setSelectedSectionIndex] = useState<number | null>(null);
    const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
    const [isAddContentDialogOpen, setIsAddContentDialogOpen] = useState(false);
    const [isAddQuestionDialogOpen, setIsAddQuestionDialogOpen] = useState(false);
    const [expandedSection, setExpandedSection] = useState<string | null>(null);
    const [expandedItem, setExpandedItem] = useState<string | null>(null);
    const [newContentData, setNewContentData] = useState<{
        title: string;
        type: ContentType;
        content: File | null;
    }>({
        title: '',
        type: 'video',
        content: null,
    });
    const [isQuizDialogOpen, setIsQuizDialogOpen] = useState(false);
    const [isContentDialogOpen, setIsContentDialogOpen] = useState(false);
    const [selectedQuizItem, setSelectedQuizItem] = useState<{
        sectionIndex: number;
        itemIndex: number;
    } | null>(null);
    const [selectedLectureItem, setSelectedLectureItem] = useState<{
        sectionIndex: number;
        itemIndex: number;
    } | null>(null);
    const [selectedCodingExercise, setSelectedCodingExercise] = useState<{
        sectionIndex: number;
        itemIndex: number;
    } | null>(null);
    const [selectedPracticeTest, setSelectedPracticeTest] = useState<{
        sectionIndex: number;
        itemIndex: number;
    } | null>(null);
    const [selectedAssignment, setSelectedAssignment] = useState<{
        sectionIndex: number;
        itemIndex: number;
    } | null>(null);
    const [isCodingExerciseDialogOpen, setIsCodingExerciseDialogOpen] = useState(false);
    const [isPracticeTestDialogOpen, setIsPracticeTestDialogOpen] = useState(false);
    const [isAssignmentDialogOpen, setIsAssignmentDialogOpen] = useState(false);

    const handleAddSection = () => {
        const newSection: Section = {
            id: Date.now().toString(),
            title: `Section ${sections.length + 1}: Introduction`,
            items: [],
        };
        setSections([...sections, newSection]);
        setExpandedSection(newSection.id);
    };

    const handleAddItem = (sectionIndex: number, type: ItemType) => {
        const newSections = [...sections];
        const newItem: CurriculumItem =
            type === 'lecture'
                ? {
                      id: Date.now().toString(),
                      type: 'lecture',
                      title: `Lecture ${newSections[sectionIndex].items.length + 1}: New Lecture`,
                      contents: [],
                      completed: false,
                  }
                : type === 'quiz'
                ? {
                      id: Date.now().toString(),
                      type: 'quiz',
                      title: `Quiz ${newSections[sectionIndex].items.length + 1}: New Quiz`,
                      questions: [],
                      completed: false,
                  }
                : type === 'coding_exercise'
                ? {
                      id: Date.now().toString(),
                      type: 'coding_exercise',
                      exercise: {
                          id: Date.now().toString(),
                          title: `Coding Exercise ${newSections[sectionIndex].items.length + 1}`,
                          description: '',
                          testFile: new File([], ''),
                          completed: false,
                      },
                  }
                : type === 'practice_test'
                ? {
                      id: Date.now().toString(),
                      type: 'practice_test',
                      test: {
                          id: Date.now().toString(),
                          title: `Practice Test ${newSections[sectionIndex].items.length + 1}`,
                          questions: [],
                          completed: false,
                      },
                  }
                : {
                      id: Date.now().toString(),
                      type: 'assignment',
                      assignment: {
                          id: Date.now().toString(),
                          title: `Assignment ${newSections[sectionIndex].items.length + 1}`,
                          description: '',
                          attachments: [],
                          completed: false,
                      },
                  };

        newSections[sectionIndex].items.push(newItem);
        setSections(newSections);
        setExpandedItem(newItem.id);
    };

    const handleSectionTitleChange = (sectionIndex: number, newTitle: string) => {
        const newSections = [...sections];
        newSections[sectionIndex].title = newTitle;
        setSections(newSections);
    };

    const handleItemTitleChange = (sectionIndex: number, itemIndex: number, newTitle: string) => {
        const newSections = [...sections];
        const item = newSections[sectionIndex].items[itemIndex];
        setItemTitle(item, newTitle);
        setSections(newSections);
    };

    const handleDeleteSection = (sectionIndex: number) => {
        const newSections = [...sections];
        newSections.splice(sectionIndex, 1);
        setSections(newSections);
    };

    const handleDeleteItem = (sectionIndex: number, itemIndex: number) => {
        const newSections = [...sections];
        newSections[sectionIndex].items.splice(itemIndex, 1);
        setSections(newSections);
    };

    const handleQuizQuestions = (sectionIndex: number, itemIndex: number) => {
        setSelectedQuizItem({ sectionIndex, itemIndex });
        setIsQuizDialogOpen(true);
    };

    const handleSaveQuizQuestions = (questions: Question[]) => {
        if (!selectedQuizItem) return;

        const newSections = [...sections];
        const item = newSections[selectedQuizItem.sectionIndex].items[selectedQuizItem.itemIndex];
        if (item.type === 'quiz') {
            item.questions = questions;
        }
        setSections(newSections);
        setIsQuizDialogOpen(false);
        setSelectedQuizItem(null);
    };

    const handleLectureContent = (sectionIndex: number, itemIndex: number) => {
        setSelectedLectureItem({ sectionIndex, itemIndex });
        setIsContentDialogOpen(true);
    };

    const handleSaveLectureContent = (contents: ContentItem[]) => {
        if (!selectedLectureItem) return;

        const newSections = [...sections];
        const item =
            newSections[selectedLectureItem.sectionIndex].items[selectedLectureItem.itemIndex];
        if (item.type === 'lecture') {
            item.contents = contents;
        }
        setSections(newSections);
        setIsContentDialogOpen(false);
        setSelectedLectureItem(null);
    };

    const handleCodingExercise = (sectionIndex: number, itemIndex: number) => {
        setSelectedCodingExercise({ sectionIndex, itemIndex });
        setIsCodingExerciseDialogOpen(true);
    };

    const handleSaveCodingExercise = (exercise: CodingExercise) => {
        if (!selectedCodingExercise) return;

        const newSections = [...sections];
        const item =
            newSections[selectedCodingExercise.sectionIndex].items[
                selectedCodingExercise.itemIndex
            ];
        if (item.type === 'coding_exercise') {
            item.exercise = exercise;
        }
        setSections(newSections);
        setIsCodingExerciseDialogOpen(false);
        setSelectedCodingExercise(null);
    };

    const handlePracticeTest = (sectionIndex: number, itemIndex: number) => {
        setSelectedPracticeTest({ sectionIndex, itemIndex });
        setIsPracticeTestDialogOpen(true);
    };

    const handleSavePracticeTest = (test: PracticeTest) => {
        if (!selectedPracticeTest) return;

        const newSections = [...sections];
        const item =
            newSections[selectedPracticeTest.sectionIndex].items[selectedPracticeTest.itemIndex];
        if (item.type === 'practice_test') {
            item.test = test;
        }
        setSections(newSections);
        setIsPracticeTestDialogOpen(false);
        setSelectedPracticeTest(null);
    };

    const handleAssignment = (sectionIndex: number, itemIndex: number) => {
        setSelectedAssignment({ sectionIndex, itemIndex });
        setIsAssignmentDialogOpen(true);
    };

    const handleSaveAssignment = (assignment: Assignment) => {
        if (!selectedAssignment) return;

        const newSections = [...sections];
        const item =
            newSections[selectedAssignment.sectionIndex].items[selectedAssignment.itemIndex];
        if (item.type === 'assignment') {
            item.assignment = assignment;
        }
        setSections(newSections);
        setIsAssignmentDialogOpen(false);
        setSelectedAssignment(null);
    };

    const getQuizQuestions = (item: CurriculumItem): Question[] => {
        return isQuizItem(item) ? item.questions : [];
    };

    const getLectureContents = (item: CurriculumItem): ContentItem[] => {
        return isLectureItem(item) ? item.contents : [];
    };

    const getCodingExercise = (item: CurriculumItem): CodingExercise => {
        return isCodingExerciseItem(item)
            ? item.exercise
            : {
                  id: '',
                  title: '',
                  description: '',
                  testFile: new File([], ''),
              };
    };

    const getPracticeTest = (item: CurriculumItem): PracticeTest => {
        return isPracticeTestItem(item)
            ? item.test
            : {
                  id: '',
                  title: '',
                  questions: [],
              };
    };

    const getAssignment = (item: CurriculumItem): Assignment => {
        return isAssignmentItem(item)
            ? item.assignment
            : {
                  id: '',
                  title: '',
                  description: '',
                  attachments: [],
              };
    };

    const handleSubmit = () => {
        console.log('Submitting curriculum:', {
            sections,
        });
    };

    return (
        <Box sx={{ display: 'flex', height: '76vh' }}>
            <CurriculumSidebar onSubmit={handleSubmit} />
            <Box sx={{ flexGrow: 1, p: 3, overflowY: 'auto' }}>
                <Typography variant="h4" gutterBottom>
                    Curriculum
                </Typography>

                {sections.map((section, sectionIndex) => (
                    <StyledPaper key={section.id}>
                        <SectionHeader>
                            <RadioButtonCheckedIcon
                                sx={{
                                    color: section.completed ? 'success.main' : 'primary.main',
                                    fontSize: 20,
                                }}
                            />
                            <TextField
                                value={section.title}
                                onChange={(e) =>
                                    handleSectionTitleChange(sectionIndex, e.target.value)
                                }
                                variant="standard"
                                fullWidth
                                sx={{ input: { fontSize: '1.1rem', fontWeight: 500 } }}
                            />
                            <IconButton
                                onClick={() =>
                                    setExpandedSection(
                                        expandedSection === section.id ? null : section.id,
                                    )
                                }
                            >
                                <ExpandMore
                                    sx={{
                                        transform:
                                            expandedSection === section.id
                                                ? 'rotate(180deg)'
                                                : 'none',
                                    }}
                                />
                            </IconButton>
                            <IconButton onClick={() => handleDeleteSection(sectionIndex)}>
                                <CloseIcon />
                            </IconButton>
                        </SectionHeader>

                        <Collapse in={expandedSection === section.id}>
                            {section.items.map((item, itemIndex) => (
                                <ItemPaper key={item.id}>
                                    <ItemHeader>
                                        {getItemIcon(item.type)}
                                        <TextField
                                            value={getItemTitle(item)}
                                            onChange={(e) =>
                                                handleItemTitleChange(
                                                    sectionIndex,
                                                    itemIndex,
                                                    e.target.value,
                                                )
                                            }
                                            variant="standard"
                                            fullWidth
                                        />
                                        {item.completed && (
                                            <CheckCircleIcon
                                                sx={{ color: 'success.main', fontSize: 20 }}
                                            />
                                        )}
                                    </ItemHeader>
                                    <ItemActions>
                                        {item.type === 'lecture' && (
                                            <>
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    onClick={() =>
                                                        handleLectureContent(
                                                            sectionIndex,
                                                            itemIndex,
                                                        )
                                                    }
                                                    endIcon={<ExpandMoreIcon />}
                                                >
                                                    Content
                                                </Button>
                                                {item.contents.length > 0 && (
                                                    <Typography
                                                        variant="caption"
                                                        color="text.secondary"
                                                    >
                                                        {item.contents.length}{' '}
                                                        {item.contents.length === 1
                                                            ? 'item'
                                                            : 'items'}
                                                    </Typography>
                                                )}
                                            </>
                                        )}
                                        {item.type === 'quiz' && (
                                            <>
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    onClick={() =>
                                                        handleQuizQuestions(sectionIndex, itemIndex)
                                                    }
                                                >
                                                    + Questions
                                                </Button>
                                                {item.questions.length > 0 && (
                                                    <Typography
                                                        variant="caption"
                                                        color="text.secondary"
                                                    >
                                                        {item.questions.length}{' '}
                                                        {item.questions.length === 1
                                                            ? 'question'
                                                            : 'questions'}
                                                    </Typography>
                                                )}
                                            </>
                                        )}
                                        {item.type === 'coding_exercise' && (
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                onClick={() =>
                                                    handleCodingExercise(sectionIndex, itemIndex)
                                                }
                                            >
                                                Edit Exercise
                                            </Button>
                                        )}
                                        {item.type === 'practice_test' && (
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                onClick={() =>
                                                    handlePracticeTest(sectionIndex, itemIndex)
                                                }
                                            >
                                                Edit Test
                                            </Button>
                                        )}
                                        {item.type === 'assignment' && (
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                onClick={() =>
                                                    handleAssignment(sectionIndex, itemIndex)
                                                }
                                            >
                                                Edit Assignment
                                            </Button>
                                        )}
                                        <IconButton
                                            size="small"
                                            onClick={() =>
                                                handleDeleteItem(sectionIndex, itemIndex)
                                            }
                                        >
                                            <CloseIcon fontSize="small" />
                                        </IconButton>
                                    </ItemActions>
                                </ItemPaper>
                            ))}

                            <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                <AddItemButton
                                    variant="outlined"
                                    size="small"
                                    onClick={() => handleAddItem(sectionIndex, 'lecture')}
                                    startIcon={<AddIcon />}
                                >
                                    Lecture
                                </AddItemButton>
                                <AddItemButton
                                    variant="outlined"
                                    size="small"
                                    onClick={() => handleAddItem(sectionIndex, 'quiz')}
                                    startIcon={<AddIcon />}
                                >
                                    Quiz
                                </AddItemButton>
                                <AddItemButton
                                    variant="outlined"
                                    size="small"
                                    onClick={() => handleAddItem(sectionIndex, 'coding_exercise')}
                                    startIcon={<AddIcon />}
                                >
                                    Coding Exercise
                                </AddItemButton>
                                <AddItemButton
                                    variant="outlined"
                                    size="small"
                                    onClick={() => handleAddItem(sectionIndex, 'practice_test')}
                                    startIcon={<AddIcon />}
                                >
                                    Practice Test
                                </AddItemButton>
                                <AddItemButton
                                    variant="outlined"
                                    size="small"
                                    onClick={() => handleAddItem(sectionIndex, 'assignment')}
                                    startIcon={<AddIcon />}
                                >
                                    Assignment
                                </AddItemButton>
                            </Box>
                        </Collapse>
                    </StyledPaper>
                ))}

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 2,
                    }}
                >
                    <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddSection}>
                        Add Section
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            // Handle submit for review
                        }}
                    >
                        Submit for Review
                    </Button>
                </Box>

                <Dialog
                    open={isAddContentDialogOpen}
                    onClose={() => setIsAddContentDialogOpen(false)}
                    maxWidth="sm"
                    fullWidth
                >
                    <DialogTitle>
                        Select Content Type
                        <Typography
                            variant="caption"
                            display="block"
                            color="text.secondary"
                            sx={{ mt: 1 }}
                        >
                            Select the main type of content. Files and links can be added as
                            resources.{' '}
                            <Link href="#" color="primary">
                                Learn about content types
                            </Link>
                        </Typography>
                        <IconButton
                            onClick={() => setIsAddContentDialogOpen(false)}
                            sx={{ position: 'absolute', right: 8, top: 8 }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 2 }}>
                            <ContentTypeButton
                                onClick={() =>
                                    setNewContentData({ ...newContentData, type: 'video' })
                                }
                            >
                                <VideoLibraryIcon sx={{ fontSize: 40 }} />
                                <Typography>Video</Typography>
                            </ContentTypeButton>
                            <ContentTypeButton
                                onClick={() =>
                                    setNewContentData({ ...newContentData, type: 'article' })
                                }
                            >
                                <ArticleIcon sx={{ fontSize: 40 }} />
                                <Typography>Article</Typography>
                            </ContentTypeButton>
                        </Box>
                    </DialogContent>
                </Dialog>

                {selectedQuizItem && (
                    <QuizDialog
                        open={isQuizDialogOpen}
                        onClose={() => {
                            setIsQuizDialogOpen(false);
                            setSelectedQuizItem(null);
                        }}
                        questions={getQuizQuestions(
                            sections[selectedQuizItem.sectionIndex].items[
                                selectedQuizItem.itemIndex
                            ],
                        )}
                        onSave={handleSaveQuizQuestions}
                    />
                )}

                {selectedLectureItem && (
                    <ContentDialog
                        open={isContentDialogOpen}
                        onClose={() => {
                            setIsContentDialogOpen(false);
                            setSelectedLectureItem(null);
                        }}
                        contents={getLectureContents(
                            sections[selectedLectureItem.sectionIndex].items[
                                selectedLectureItem.itemIndex
                            ],
                        )}
                        onSave={handleSaveLectureContent}
                    />
                )}

                {selectedCodingExercise && (
                    <CodingExerciseDialog
                        open={isCodingExerciseDialogOpen}
                        onClose={() => {
                            setIsCodingExerciseDialogOpen(false);
                            setSelectedCodingExercise(null);
                        }}
                        exercise={getCodingExercise(
                            sections[selectedCodingExercise.sectionIndex].items[
                                selectedCodingExercise.itemIndex
                            ],
                        )}
                        onSave={handleSaveCodingExercise}
                    />
                )}

                {selectedPracticeTest && (
                    <PracticeTestDialog
                        open={isPracticeTestDialogOpen}
                        onClose={() => {
                            setIsPracticeTestDialogOpen(false);
                            setSelectedPracticeTest(null);
                        }}
                        test={getPracticeTest(
                            sections[selectedPracticeTest.sectionIndex].items[
                                selectedPracticeTest.itemIndex
                            ],
                        )}
                        onSave={handleSavePracticeTest}
                    />
                )}

                {selectedAssignment && (
                    <AssignmentDialog
                        open={isAssignmentDialogOpen}
                        onClose={() => {
                            setIsAssignmentDialogOpen(false);
                            setSelectedAssignment(null);
                        }}
                        assignment={getAssignment(
                            sections[selectedAssignment.sectionIndex].items[
                                selectedAssignment.itemIndex
                            ],
                        )}
                        onSave={handleSaveAssignment}
                    />
                )}
            </Box>
        </Box>
    );
}
