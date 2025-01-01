import React, { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    TextField,
    Button,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Divider,
    Radio,
    RadioGroup,
    FormControlLabel,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import {
    PlanYourCourse as IPlanYourCourse,
    IntendedLearner,
    CourseStructure,
    TestVideo,
} from 'src/types/services/course/course.ts';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2),
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    marginBottom: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
}));

interface PlanYourCourseProps {
    data: IPlanYourCourse;
    onChange: (data: IPlanYourCourse) => void;
}

export default function PlanYourCourse({ data, onChange }: PlanYourCourseProps) {
    const [newLearner, setNewLearner] = useState('');
    const [newStructure, setNewStructure] = useState({
        title: '',
        description: '',
        duration: '',
    });

    const handleAddLearner = () => {
        if (!newLearner.trim()) return;
        onChange({
            ...data,
            intendedLearners: [
                ...data.intendedLearners,
                {
                    id: Date.now().toString(),
                    description: newLearner,
                },
            ],
        });
        setNewLearner('');
    };

    const handleDeleteLearner = (id: string) => {
        onChange({
            ...data,
            intendedLearners: data.intendedLearners.filter((learner) => learner.id !== id),
        });
    };

    const handleAddStructure = () => {
        if (!newStructure.title.trim() || !newStructure.description.trim()) return;
        onChange({
            ...data,
            courseStructure: [
                ...data.courseStructure,
                {
                    id: Date.now().toString(),
                    ...newStructure,
                },
            ],
        });
        setNewStructure({ title: '', description: '', duration: '' });
    };

    const handleDeleteStructure = (id: string) => {
        onChange({
            ...data,
            courseStructure: data.courseStructure.filter((structure) => structure.id !== id),
        });
    };

    const handleTestVideoUpload = (file: File) => {
        onChange({
            ...data,
            testVideo: {
                id: Date.now().toString(),
                title: file.name,
                video: file,
            },
        });
    };

    return (
        <Box>
            <StyledPaper>
                <Typography variant="h6" gutterBottom>
                    Người học dự kiến
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    Ai nên tham gia khóa học này? Liệt kê đối tượng mục tiêu và điều kiện tiên
                    quyết.
                </Typography>

                <List>
                    {data.intendedLearners.map((learner) => (
                        <StyledListItem key={learner.id}>
                            <ListItemText primary={learner.description} />
                            <ListItemSecondaryAction>
                                <IconButton
                                    edge="end"
                                    onClick={() => handleDeleteLearner(learner.id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </StyledListItem>
                    ))}
                </List>

                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                    <TextField
                        fullWidth
                        value={newLearner}
                        onChange={(e) => setNewLearner(e.target.value)}
                        placeholder="VD. Developers với kiến thức Java cơ bản"
                    />
                    <Button
                        variant="contained"
                        onClick={handleAddLearner}
                        disabled={!newLearner.trim()}
                    >
                        Thêm
                    </Button>
                </Box>
            </StyledPaper>

            <StyledPaper>
                <Typography variant="h6" gutterBottom>
                    Cấu trúc khóa học
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    Lên kế hoạch cho nội dung khóa học của bạn và ước tính thời lượng của từng phần.
                </Typography>

                <List>
                    {data.courseStructure.map((structure) => (
                        <StyledListItem key={structure.id}>
                            <ListItemText
                                primary={structure.title}
                                secondary={
                                    <>
                                        {structure.description}
                                        <Typography
                                            variant="caption"
                                            display="block"
                                            color="text.secondary"
                                        >
                                            Thời lượng: {structure.duration}
                                        </Typography>
                                    </>
                                }
                            />
                            <ListItemSecondaryAction>
                                <IconButton
                                    edge="end"
                                    onClick={() => handleDeleteStructure(structure.id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </StyledListItem>
                    ))}
                </List>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                    <TextField
                        fullWidth
                        value={newStructure.title}
                        onChange={(e) =>
                            setNewStructure({ ...newStructure, title: e.target.value })
                        }
                        placeholder="Tiêu đề chương"
                    />
                    <TextField
                        fullWidth
                        multiline
                        rows={2}
                        value={newStructure.description}
                        onChange={(e) =>
                            setNewStructure({ ...newStructure, description: e.target.value })
                        }
                        placeholder="Mô tả chương"
                    />
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <TextField
                            fullWidth
                            value={newStructure.duration}
                            onChange={(e) =>
                                setNewStructure({ ...newStructure, duration: e.target.value })
                            }
                            placeholder="Thời lượng (VD. 2 giờ)"
                        />
                        <Button
                            variant="contained"
                            onClick={handleAddStructure}
                            disabled={
                                !newStructure.title.trim() || !newStructure.description.trim()
                            }
                        >
                            Thêm
                        </Button>
                    </Box>
                </Box>
            </StyledPaper>

            <StyledPaper>
                <Typography variant="h6" gutterBottom>
                    Video thiết lập và kiểm tra
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    Tải lên video thử nghiệm để xác minh thiết lập ghi âm của bạn và nhận phản hồi.
                </Typography>

                {data.testVideo ? (
                    <Box sx={{ mt: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <VideoLibraryIcon />
                            <Typography>{data.testVideo.title}</Typography>
                            <IconButton
                                onClick={() => onChange({ ...data, testVideo: null })}
                                size="small"
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </Box>
                ) : (
                    <Button
                        variant="outlined"
                        component="label"
                        startIcon={<VideoLibraryIcon />}
                        sx={{ mt: 2 }}
                    >
                        Tải lên video kiểm tra
                        <input
                            type="file"
                            hidden
                            accept="video/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    handleTestVideoUpload(file);
                                }
                            }}
                        />
                    </Button>
                )}
            </StyledPaper>
        </Box>
    );
}
