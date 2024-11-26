import { Grid, Typography, IconButton, Button } from '@mui/material';
import CourseVideo from 'src/components/course-learning/CourseVideo';
import PageContainer from 'src/components/apps/ecommerce/productGrid/PageContainer';
import CourseContent from 'src/components/course-learning/CourseContent';
import CourseDesc from 'src/components/course-learning/CourseDesc';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ExpandMore, Close, ArrowForward } from '@mui/icons-material'; // Import icon mới

// EcommerceDetail component
const LearningCourse: React.FC = () => {
    const { id } = useParams();
    const [showDetail, setShowDetail] = useState(true); // State để quản lý việc hiển thị CourseContent
    const [openTabCategory, setOpenTabCategory] = useState(true);
    const [isHovered, setIsHovered] = useState(false); // State để quản lý trạng thái hover

    const handleOpenTabCategory = () => {
        setOpenTabCategory(!openTabCategory);
    };

    // Array of courses
    const courses = [
        {
            id: 1,
            title: 'Khóa học React',
            chapters: [
                {
                    title: 'Chương 1: Giới thiệu',
                    lessons: [
                        {
                            title: 'Bài 1: Cài đặt',
                            description: 'Cách cài đặt React',
                            url: 'video-url-1.mp4',
                        },
                        {
                            title: 'Bài 2: Cấu trúc dự án',
                            description: 'Cấu trúc dự án React',
                            url: 'video-url-2.mp4',
                        },
                    ],
                },
                {
                    title: 'Chương 2: Nâng cao',
                    lessons: [
                        {
                            title: 'Bài 1: Hooks',
                            description: 'Sử dụng Hooks trong React',
                            url: 'video-url-3.mp4',
                        },
                    ],
                },
            ],
            duration: 10,
            price: 100,
        },
    ];

    // Lọc khóa học dựa trên ID từ URL
    const selectedProduct = courses.find((course) => course.id === parseInt(id || '0'));

    return (
        <PageContainer title="Chi tiết khóa học" description="Chi tiết về khóa học đã chọn">
            <Grid container spacing={3} sx={{ width: '100%', maxWidth: '100vw', margin: 0 }}>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    lg={openTabCategory ? 9 : 12}
                    sx={{ position: 'relative', height: '600px', overflowY: 'hidden' }}
                >
                    <div
                        style={{ position: 'sticky', top: '0', height: '100%', overflowY: 'auto' }}
                    >
                        {/* Phần CourseVideo */}
                        <div style={{ marginBottom: '20px', position: 'relative' }}>
                            {/* Video với chiều cao lớn hơn */}
                            <CourseVideo />
                            <Button
                                onClick={() => {
                                    setShowDetail(!showDetail);
                                    handleOpenTabCategory();
                                }}
                                onMouseEnter={() => setIsHovered(true)} // Bắt đầu hover
                                onMouseLeave={() => setIsHovered(false)} // Kết thúc hover
                                variant="contained"
                                sx={{
                                    position: 'absolute',
                                    bottom: '50px',
                                    left: '96%',
                                    transform: 'translateX(-50%)',
                                    backgroundColor: 'transparent',
                                    zIndex: 1200,
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <ArrowForward sx={{ marginRight: '8px', color: 'blue' }} />
                            </Button>
                        </div>

                        {/* Phần CourseDesc */}
                        <CourseDesc />
                    </div>
                </Grid>

                {/* Phần CourseContent có thể cuộn */}
                {openTabCategory && (
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        lg={3}
                        sx={{
                            position: 'fixed',
                            top: '80px',
                            alignSelf: 'flex-start',
                            right: '0px',
                            height: 'calc(100vh - 80px)', // Chiều cao của CourseContent
                            overflowY: 'hidden',
                            padding: 0,
                        }}
                    >
                        {/* Nút đóng/mở tab bên trong CourseContent */}
                        <IconButton
                            onClick={() => {
                                setShowDetail(!showDetail);
                                handleOpenTabCategory();
                            }}
                            sx={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                zIndex: 1200,
                                backgroundColor: 'white',
                                borderRadius: '50%',
                                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
                            }}
                        >
                            {isHovered ? (
                                <Typography variant="body2">
                                    {showDetail ? 'Đóng' : 'Mở'}
                                </Typography>
                            ) : showDetail ? (
                                <Close />
                            ) : (
                                <ExpandMore />
                            )}
                        </IconButton>

                        {/* Nội dung CourseContent */}
                        {showDetail && (
                            <div style={{ height: 'calc(100% - 40px)', overflowY: 'auto' }}>
                                {selectedProduct ? (
                                    <CourseContent course={selectedProduct} />
                                ) : (
                                    <Typography>Không tìm thấy khóa học này.</Typography>
                                )}
                            </div>
                        )}
                    </Grid>
                )}
            </Grid>
        </PageContainer>
    );
};

export default LearningCourse;
