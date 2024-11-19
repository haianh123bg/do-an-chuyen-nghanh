import { Box, Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Hình ảnh minh họa cho tính năng đang phát triển
import img1 from 'src/assets/images/feature-coming/img1.jpg';
import img2 from 'src/assets/images/feature-coming/img2.jpg';
import img3 from 'src/assets/images/feature-coming/img3.jpg';

const FeatureComingSoon = () => {
  const images = [img1, img2, img3];
  const [currentImage, setCurrentImage] = useState(0);

  // Chuyển hình ảnh sau mỗi 3 giây
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000);

    return () => clearInterval(intervalId); // Dọn dẹp interval khi component unmount
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      textAlign="center"
      justifyContent="center"
      alignItems="center"
      padding={2}
    >
      <Container maxWidth="md">
        <Typography align="center" variant="h3" mb={4} color="primary">
          Tính Năng Đang Phát Triển
        </Typography>
        <img
          src={images[currentImage]}
          alt="Under Development"
          style={{
            width: '100%',  // Hình ảnh full chiều rộng màn hình
            height: '60vh', // Giới hạn chiều cao của hình ảnh (có thể thay đổi tùy vào nhu cầu)
            objectFit: 'cover', // Giữ tỷ lệ hình ảnh và cắt phần dư thừa
            borderRadius: '10px',
            transition: 'opacity 1s',
            marginBottom: '20px',  // Khoảng cách giữa hình ảnh và văn bản dưới
          }}
        />
        <Typography align="center" variant="h5" mb={4}>
          Chúng tôi đang làm việc chăm chỉ để mang lại tính năng này cho bạn. Hãy quay lại sau nhé!
        </Typography>
        <Button
          color="primary"
          variant="contained"
          component={Link}
          to="/home"
          disableElevation
        >
          Quay lại Trang Chính
        </Button>
      </Container>
    </Box>
  );
};

export default FeatureComingSoon;
