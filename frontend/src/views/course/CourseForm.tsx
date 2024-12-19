import {
    Box,
    TextField,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Paper,
    IconButton,
    Tooltip,
    SelectChangeEvent,
    Link,
    Button,
    Snackbar,
    Alert,
    FormHelperText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';
import { CourseFormData } from 'src/types/services/course/course.ts';
import RichTextEditor from './RichTextEditor';
import ImageUpload from './ImageUpload';
import { useState, useEffect, useRef } from 'react';
import React, { Dispatch, SetStateAction } from 'react';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
}));

const HelperText = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontSize: '0.875rem',
    marginTop: theme.spacing(0.5),
}));

const CharacterCount = styled(Typography)(({ theme }) => ({
    position: 'absolute',
    right: theme.spacing(1),
    top: '50%',
    transform: 'translateY(-50%)',
    color: theme.palette.text.secondary,
    fontSize: '0.875rem',
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
        '& fieldset': {
            borderColor: theme.palette.divider,
        },
        '&:hover fieldset': {
            borderColor: theme.palette.primary.main,
        },
    },
}));

const WordCounter = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontSize: '0.875rem',
    marginTop: theme.spacing(0.5),
}));

const ImagePreview = styled('img')({
    width: '100%',
    height: 'auto',
    maxHeight: 300,
    objectFit: 'contain',
    marginTop: 16,
    borderRadius: 4,
});

interface CourseFormProps {
    data: CourseFormData;
    onChange: Dispatch<SetStateAction<CourseFormData>>;
}

export default function CourseForm({ data, onChange }: CourseFormProps) {
    const [wordCount, setWordCount] = useState(0);
    const [errors, setErrors] = useState<Partial<Record<keyof CourseFormData, string>>>({});
    const [autoSaveStatus, setAutoSaveStatus] = useState<'success' | 'error' | null>(null);
    const autoSaveTimeoutRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        const words = data.description.trim().split(/\s+/).length;
        setWordCount(words);
    }, [data.description]);

    const handleTextChange =
        (field: keyof CourseFormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
            onChange({
                ...data,
                [field]: event.target.value,
            });
        };

    const handleSelectChange =
        (field: keyof CourseFormData) => (event: SelectChangeEvent<string>) => {
            onChange({
                ...data,
                [field]: event.target.value,
            });
        };

    const validateForm = () => {
        const newErrors: Partial<Record<keyof CourseFormData, string>> = {};

        if (!data.title) newErrors.title = 'Course title is required';
        else if (data.title.length > 51) newErrors.title = 'Title must be at most 51 characters';

        if (!data.subtitle) newErrors.subtitle = 'Course subtitle is required';
        else if (data.subtitle.length > 120)
            newErrors.subtitle = 'Subtitle must be at most 120 characters';

        if (!data.description) newErrors.description = 'Course description is required';
        else if (data.description.split(/\s+/).length < 200) {
            newErrors.description = 'Description must have at least 200 words';
        }

        if (!data.language) newErrors.language = 'Language is required';
        if (!data.level) newErrors.level = 'Level is required';
        if (!data.category) newErrors.category = 'Category is required';
        if (!data.primarySubject) newErrors.primarySubject = 'Primary subject is required';
        if (!data.courseImage) newErrors.courseImage = 'Course image is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Auto-save functionality
    useEffect(() => {
        if (autoSaveTimeoutRef.current) {
            clearTimeout(autoSaveTimeoutRef.current);
        }

        autoSaveTimeoutRef.current = setTimeout(() => {
            try {
                onChange(data);
                setAutoSaveStatus('success');
            } catch (error) {
                setAutoSaveStatus('error');
            }
        }, 1000);

        return () => {
            if (autoSaveTimeoutRef.current) {
                clearTimeout(autoSaveTimeoutRef.current);
            }
        };
    }, [data, onChange]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (validateForm()) {
            // Handle submission
            console.log('Form submitted:', data);
        }
    };

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            <Typography variant="h4" gutterBottom>
                Course landing page
            </Typography>

            <form onSubmit={handleSubmit}>
                <StyledPaper>
                    <Typography variant="h6" gutterBottom>
                        Course title
                    </Typography>
                    <Box sx={{ position: 'relative' }}>
                        <TextField
                            fullWidth
                            value={data.title}
                            onChange={handleTextChange('title')}
                            placeholder="e.g. Java Core"
                            inputProps={{ maxLength: 51 }}
                            error={Boolean(errors.title)}
                            helperText={
                                errors.title ||
                                'Your title should be a mix of attention-grabbing, informative, and optimized for search'
                            }
                        />
                        <CharacterCount>{data.title.length}/51</CharacterCount>
                    </Box>
                </StyledPaper>

                <StyledPaper>
                    <Typography variant="h6" gutterBottom>
                        Course subtitle
                    </Typography>
                    <Box sx={{ position: 'relative' }}>
                        <TextField
                            fullWidth
                            value={data.subtitle}
                            onChange={handleTextChange('subtitle')}
                            placeholder="Insert your course subtitle"
                            inputProps={{ maxLength: 120 }}
                            error={Boolean(errors.subtitle)}
                            helperText={
                                errors.subtitle || 'Subtitle must be at most 120 characters'
                            }
                        />
                        <CharacterCount>{data.subtitle.length}/120</CharacterCount>
                    </Box>
                </StyledPaper>

                <StyledPaper>
                    <Typography variant="h6" gutterBottom>
                        Course description
                    </Typography>
                    <RichTextEditor
                        value={data.description}
                        onChange={(value) => onChange({ ...data, description: value })}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                        <HelperText>Description should have minimum 200 words</HelperText>
                        <WordCounter>{wordCount} words</WordCounter>
                    </Box>
                    {errors.description && (
                        <FormHelperText error>{errors.description}</FormHelperText>
                    )}
                </StyledPaper>

                <StyledPaper>
                    <Typography variant="h6" gutterBottom>
                        Basic info
                    </Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
                        <StyledFormControl fullWidth error={Boolean(errors.language)}>
                            <InputLabel>Language</InputLabel>
                            <Select
                                value={data.language}
                                label="Language"
                                onChange={handleSelectChange('language')}
                            >
                                <MenuItem value="en-US">English (US)</MenuItem>
                                <MenuItem value="es">Spanish</MenuItem>
                                <MenuItem value="fr">French</MenuItem>
                            </Select>
                            <FormHelperText>
                                {errors.language || 'Select course language'}
                            </FormHelperText>
                        </StyledFormControl>

                        <StyledFormControl fullWidth error={Boolean(errors.level)}>
                            <InputLabel>Level</InputLabel>
                            <Select
                                value={data.level}
                                label="Level"
                                onChange={handleSelectChange('level')}
                            >
                                <MenuItem value="beginner">Beginner</MenuItem>
                                <MenuItem value="intermediate">Intermediate</MenuItem>
                                <MenuItem value="advanced">Advanced</MenuItem>
                            </Select>
                            <FormHelperText>{errors.level || 'Select course level'}</FormHelperText>
                        </StyledFormControl>

                        <StyledFormControl fullWidth error={Boolean(errors.category)}>
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={data.category}
                                label="Category"
                                onChange={handleSelectChange('category')}
                            >
                                <MenuItem value="it-software">IT & Software</MenuItem>
                                <MenuItem value="business">Business</MenuItem>
                                <MenuItem value="design">Design</MenuItem>
                            </Select>
                            <FormHelperText>
                                {errors.category || 'Select course category'}
                            </FormHelperText>
                        </StyledFormControl>
                    </Box>
                </StyledPaper>

                <StyledPaper>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <Typography variant="h6">
                            What is primarily taught in your course?
                        </Typography>
                        <Tooltip title="This helps us categorize your course appropriately">
                            <IconButton size="small" sx={{ color: 'primary.main' }}>
                                <InfoIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <TextField
                        fullWidth
                        value={data.primarySubject}
                        onChange={handleTextChange('primarySubject')}
                        placeholder="e.g. Landscape Photography"
                        error={Boolean(errors.primarySubject)}
                        helperText={errors.primarySubject || 'Primary subject is required'}
                    />
                </StyledPaper>

                <StyledPaper>
                    <Typography variant="h6" gutterBottom>
                        Course image
                    </Typography>
                    <Box
                        sx={{
                            border: '2px dashed #ccc',
                            borderRadius: 1,
                            p: 3,
                            textAlign: 'center',
                            bgcolor: '#f8f9fa',
                        }}
                    >
                        <ImageUpload
                            onFileSelect={(file) => onChange({ ...data, courseImage: file })}
                        />
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                            Upload your course image here. It must meet our{' '}
                            <Link href="#" color="primary">
                                course image quality standards
                            </Link>{' '}
                            to be accepted.
                            <br />
                            Important guidelines: 750x422 pixels; jpg, jpeg, gif, or .png. no text
                            on the image.
                        </Typography>
                    </Box>
                    {data.courseImage && (
                        <ImagePreview
                            src={URL.createObjectURL(data.courseImage)}
                            alt="Course preview"
                        />
                    )}
                </StyledPaper>

                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            onChange(data); // Save as draft
                            setAutoSaveStatus('success');
                        }}
                    >
                        Save as Draft
                    </Button>
                    <Button variant="contained" type="submit">
                        Submit for Review
                    </Button>
                </Box>

                <Snackbar
                    open={autoSaveStatus !== null}
                    autoHideDuration={3000}
                    onClose={() => setAutoSaveStatus(null)}
                >
                    <Alert
                        severity={autoSaveStatus === 'success' ? 'success' : 'error'}
                        onClose={() => setAutoSaveStatus(null)}
                    >
                        {autoSaveStatus === 'success'
                            ? 'Changes saved automatically'
                            : 'Failed to save changes'}
                    </Alert>
                </Snackbar>
            </form>
        </Box>
    );
}
