import { Box, CssBaseline, Stepper, Step, StepLabel, Button } from '@mui/material';
import { useState } from 'react';
import CourseForm from 'src/views/course/CourseForm';
import Curriculum from 'src/views/course/Curriculum.tsx';
import { CourseFormData } from 'src/types/services/course/course';

const steps = ['Trang đích khóa học', 'Chương trình đào tạo'];

const CourseCreation = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [courseData, setCourseData] = useState<CourseFormData>({
        title: '',
        subtitle: '',
        description: '',
        language: '',
        level: '',
        category: '',
        primarySubject: '',
    });

    const isStepComplete = (step: number) => {
        if (step === 0) {
            return (
                courseData.title !== '' &&
                courseData.subtitle !== '' &&
                courseData.description !== '' &&
                courseData.language !== '' &&
                courseData.level !== '' &&
                courseData.category !== '' &&
                courseData.primarySubject !== ''
            );
        }
        return true;
    };

    const handleNext = () => {
        if (isStepComplete(activeStep)) {
            setActiveStep((prevStep) => prevStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {activeStep === 0 ? (
                    <CourseForm data={courseData} onChange={setCourseData} />
                ) : (
                    <Curriculum />
                )}

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 2 }}>
                    {activeStep > 0 && (
                        <Button
                            size="large"
                            variant="contained"
                            color="primary"
                            onClick={handleBack}
                        >
                            Quay lại
                        </Button>
                    )}
                    {activeStep < steps.length - 1 && (
                        <Button
                            size="large"
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                            disabled={!isStepComplete(activeStep)}
                        >
                            Tiếp theo
                        </Button>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default CourseCreation;
