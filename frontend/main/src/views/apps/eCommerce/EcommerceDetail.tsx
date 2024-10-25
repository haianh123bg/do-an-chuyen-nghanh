import { Grid, Typography, IconButton } from '@mui/material';
import ProductCarousel from 'src/components/apps/ecommerce/productDetail/ProductCarousel';
import PageContainer from 'src/components/container/PageContainer';
import ProductDetail from 'src/components/apps/ecommerce/productDetail/ProductDetail';
import ProductDesc from 'src/components/apps/ecommerce/productDetail/ProductDesc';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ExpandMore, ExpandLess } from '@mui/icons-material';

// EcommerceDetail component
const EcommerceDetail: React.FC = () => {
  const { id } = useParams();
  const [showDetail, setShowDetail] = useState(true); // State để quản lý việc hiển thị ProductDetail

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
  const selectedProduct = courses.find(course => course.id === parseInt(id || '0'));

  return (
    <PageContainer title="Chi tiết khóa học" description="Chi tiết về khóa học đã chọn">
      <Grid container spacing={3} sx={{ width: '100%ơ', maxWidth: '100vw', margin: 0 }}>
        {/* Phần ProductCarousel và ProductDesc đứng yên khi cuộn trang */}
        <Grid item xs={12} sm={12} lg={9} sx={{ position: 'relative', height: '600px', overflowY: 'hidden' }}>
          <div style={{ position: 'sticky', top: '0', height: '100%', overflowY: 'auto' }}>
            {/* Phần ProductCarousel */}
            <div style={{ marginBottom: '20px' }}>
              <ProductCarousel />
            </div>

            {/* Phần ProductDesc */}
            <ProductDesc />
          </div>
        </Grid>

        {/* Phần ProductDetail có thể cuộn */}
        <Grid
          item
          xs={12}
          sm={12}
          lg={3}
          sx={{
            position: '',
            top: '80px',
            alignSelf: 'flex-start',
            height: 'calc(100vh - 80px)', // Chiều cao của ProductDetail
            overflowY: 'hidden',
            padding: 0,
          }}
        >
          {/* Nút để ẩn/hiện ProductDetail */}
          <IconButton
            onClick={() => setShowDetail(!showDetail)} // Cập nhật state khi nút được nhấn
            sx={{ position: 'absolute', top: 10, right: 10 }} // Đặt vị trí cho nút
          >
            {showDetail ? <ExpandLess /> : <ExpandMore />} {/* Thay đổi icon dựa trên trạng thái */}
          </IconButton>

          {/* Nội dung ProductDetail */}
          {showDetail && ( // Chỉ hiển thị nếu showDetail là true
            <div style={{ height: 'calc(100% - 40px)', overflowY: 'auto' }}>
              {selectedProduct ? (
                <ProductDetail course={selectedProduct} />
              ) : (
                <Typography>Không tìm thấy khóa học này.</Typography>
              )}
            </div>
          )}
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default EcommerceDetail;
