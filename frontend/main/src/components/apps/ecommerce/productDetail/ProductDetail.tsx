import React from 'react';
// MUI Elements
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Grid,
  Typography,
  Divider,
  useTheme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Define interface for Lesson, Chapter, and Course
interface Lesson {
  title: string;
  description: string;
}

interface Chapter {
  title: string;
  lessons: Lesson[];
}

interface Course {
  id: number;
  title: string;
  chapters: Chapter[];
  duration: number;
  price: number;
}

interface ProductDetailProps {
  course: Course; // Nhận dữ liệu của khóa học từ EcommerceDetail
}

const ProductDetail: React.FC<ProductDetailProps> = ({ course }) => {
  const theme = useTheme();

  return (
    <Box p={2}>
      {course ? (
        <>
          <Typography fontWeight="600" variant="h6" mt={1}>
            Nội dung khóa học
          </Typography>

         
          <Divider />

          {course.chapters && course.chapters.length > 0 ? (
            course.chapters.map((chapter, chapterIndex) => (
              <Accordion key={chapterIndex}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`chapter${chapterIndex}-content`}
                  id={`chapter${chapterIndex}-header`}
                >
                  <Typography fontWeight="500" sx={{ fontSize: '1rem' }}>{chapter.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    {chapter.lessons && chapter.lessons.length > 0 ? (
                      chapter.lessons.map((lesson, lessonIndex) => (
                        <Grid item xs={12} key={lessonIndex}>
                          <Box>
                            <Typography fontWeight="500" variant="subtitle1">
                              Bài {lessonIndex + 1}: {lesson.title}
                            </Typography>
                            <Typography variant="body2" color={theme.palette.text.secondary}>
                              {lesson.description}
                            </Typography>
                          </Box>
                        </Grid>
                      ))
                    ) : (
                      <Typography>Không có bài học nào trong chương này.</Typography>
                    )}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            ))
          ) : (
            <Typography>Không có chương nào trong khóa học này.</Typography>
          )}

          

          <Divider />
        </>
      ) : (
        <Typography>Không tìm thấy khóa học.</Typography>
      )}
    </Box>
  );
};

export default ProductDetail;
