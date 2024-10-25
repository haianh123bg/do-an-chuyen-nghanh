import React from 'react';
import Slider from 'react-slick';
import { Typography, Box, Container, IconButton, Rating, Button, Tooltip } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import StarIcon from '@mui/icons-material/Star';

interface Course {
  id: number;
  photo: string;
  title: string;
  author: string;
  rating: number;
  reviews: number;
  price: number;
  originalPrice: number;
  details: React.ReactNode;
}

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      style={{
        position: 'absolute',
        right: '-25px',
        top: '35%',
        transform: 'translateY(-50%)',
        zIndex: 1,
      }}
      sx={{
        color: '#fff',
        backgroundColor: '#000',
        borderRadius: '50%',
        width: '52px',
        height: '52px',
        '&:hover': {
          backgroundColor: 'rgb(62, 65, 67)',
        },
      }}
    >
      <ArrowForwardIosIcon />
    </IconButton>
  );
};

const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      style={{
        position: 'absolute',
        left: '-25px',
        top: '35%',
        transform: 'translateY(-50%)',
        zIndex: 1,
      }}
      sx={{
        color: '#fff',
        backgroundColor: '#000',
        borderRadius: '50%',
        width: '52px',
        height: '52px',
        '&:hover': {
          backgroundColor: 'rgb(62, 65, 67)',
        },
      }}
    >
      <ArrowBackIosIcon />
    </IconButton>
  );
};

const ShortCourseSlider: React.FC = () => {
  // Dữ liệu sản phẩm được gán cố định ngay trong component
  const Courses: Course[] = [
    {
      id: 1,
      photo: 'https://i.pinimg.com/736x/34/f2/64/34f26409f2d179da0278279661d7ff6d.jpg',
      title: 'Khóa học JavaScript Cơ bản',
      author: 'Nguyễn Văn A',
      rating: 4.5,
      reviews: 1500,
      price: 100000,
      originalPrice: 200000,
      details: (
        <Box sx={{ p: 2 }}>
          <Typography fontWeight="bold">
            Spring Boot Unit Testing with JUnit, Mockito and MockMvc
          </Typography>
          <Typography color="">
            Updated <span style={{ color: 'green' }}>July 2024</span>
          </Typography>
          <Typography color="">10 total hours • Intermediate Level • Subtitles</Typography>
          <Typography mt={1} mb={1}>
            Develop Real-Time Spring Boot Unit Tests: JUnit 5, Mockito, MockMvc, TDD, JsonPath,
            Hamcrest, H2 Embedded DB, MySQL
          </Typography>
          <Box>
            <ul>
              <li>
                Explore the architecture of the Spring Boot testing framework and write integration
                tests
              </li>
              <li>Develop unit tests with JUnit 5 and supporting JUnit Assertions</li>
              <li>Mock Spring container dependencies using Mockito</li>
            </ul>
          </Box>
          <Box mt={2}>
            <Button variant="contained" color="primary" fullWidth>
              Add to cart
            </Button>
          </Box>
        </Box>
      ),
    },
    {
      id: 2,
      photo: 'https://i.pinimg.com/736x/34/f2/64/34f26409f2d179da0278279661d7ff6d.jpg',
      title: 'Khóa học ReactJS Nâng cao',
      author: 'Trần Thị B',
      rating: 4.8,
      reviews: 2300,
      price: 150000,
      originalPrice: 250000,
      details: (
        <Box sx={{ p: 2 }}>
          <Typography fontWeight="bold">
            Spring Boot Unit Testing with JUnit, Mockito and MockMvc
          </Typography>
          <Typography color="">
            Updated <span style={{ color: 'green' }}>July 2024</span>
          </Typography>
          <Typography color="">10 total hours • Intermediate Level • Subtitles</Typography>
          <Typography mt={1} mb={1}>
            Develop Real-Time Spring Boot Unit Tests: JUnit 5, Mockito, MockMvc, TDD, JsonPath,
            Hamcrest, H2 Embedded DB, MySQL
          </Typography>
          <ul>
            <li>
              Explore the architecture of the Spring Boot testing framework and write integration
              tests
            </li>
            <li>Develop unit tests with JUnit 5 and supporting JUnit Assertions</li>
            <li>Mock Spring container dependencies using Mockito</li>
          </ul>
          <Box mt={2}>
            <Button variant="contained" color="primary" fullWidth>
              Add to cart
            </Button>
          </Box>
        </Box>
      ),
    },
    {
      id: 3,
      photo: 'https://i.pinimg.com/736x/34/f2/64/34f26409f2d179da0278279661d7ff6d.jpg',
      title: 'NodeJS cho Người mới Bắt đầu',
      author: 'Phạm Văn C',
      rating: 4.7,
      reviews: 1800,
      price: 120000,
      originalPrice: 220000,
      details: (
        <Box sx={{ p: 2 }}>
          <Typography fontWeight="bold">
            Spring Boot Unit Testing with JUnit, Mockito and MockMvc
          </Typography>
          <Typography color="">
            Updated <span style={{ color: 'green' }}>July 2024</span>
          </Typography>
          <Typography color="">10 total hours • Intermediate Level • Subtitles</Typography>
          <Typography mt={1} mb={1}>
            Develop Real-Time Spring Boot Unit Tests: JUnit 5, Mockito, MockMvc, TDD, JsonPath,
            Hamcrest, H2 Embedded DB, MySQL
          </Typography>
          <ul>
            <li>
              Explore the architecture of the Spring Boot testing framework and write integration
              tests
            </li>
            <li>Develop unit tests with JUnit 5 and supporting JUnit Assertions</li>
            <li>Mock Spring container dependencies using Mockito</li>
          </ul>
          <Box mt={2}>
            <Button variant="contained" color="primary" fullWidth>
              Add to cart
            </Button>
          </Box>
        </Box>
      ),
    },
    {
      id: 4,
      photo: 'https://i.pinimg.com/736x/34/f2/64/34f26409f2d179da0278279661d7ff6d.jpg',
      title: 'Làm việc với TypeScript',
      author: 'Lê Thị D',
      rating: 4.6,
      reviews: 1700,
      price: 110000,
      originalPrice: 210000,
      details: (
        <Box sx={{ p: 2 }}>
          <Typography fontWeight="bold">
            Spring Boot Unit Testing with JUnit, Mockito and MockMvc
          </Typography>
          <Typography color="">
            Updated <span style={{ color: 'green' }}>July 2024</span>
          </Typography>
          <Typography color="">10 total hours • Intermediate Level • Subtitles</Typography>
          <Typography mt={1} mb={1}>
            Develop Real-Time Spring Boot Unit Tests: JUnit 5, Mockito, MockMvc, TDD, JsonPath,
            Hamcrest, H2 Embedded DB, MySQL
          </Typography>
          <ul>
            <li>
              Explore the architecture of the Spring Boot testing framework and write integration
              tests
            </li>
            <li>Develop unit tests with JUnit 5 and supporting JUnit Assertions</li>
            <li>Mock Spring container dependencies using Mockito</li>
          </ul>
          <Box mt={2}>
            <Button variant="contained" color="primary" fullWidth>
              Add to cart
            </Button>
          </Box>
        </Box>
      ),
    },
    {
      id: 5,
      photo: 'https://i.pinimg.com/736x/34/f2/64/34f26409f2d179da0278279661d7ff6d.jpg',
      title: 'Khóa học CSS chuyên sâu',
      author: 'Nguyễn Thị E',
      rating: 4.9,
      reviews: 2100,
      price: 90000,
      originalPrice: 190000,
      details: (
        <Box sx={{ p: 2 }}>
          <Typography fontWeight="bold">
            Spring Boot Unit Testing with JUnit, Mockito and MockMvc
          </Typography>
          <Typography color="">
            Updated <span style={{ color: 'green' }}>July 2024</span>
          </Typography>
          <Typography color="">10 total hours • Intermediate Level • Subtitles</Typography>
          <Typography mt={1} mb={1}>
            Develop Real-Time Spring Boot Unit Tests: JUnit 5, Mockito, MockMvc, TDD, JsonPath,
            Hamcrest, H2 Embedded DB, MySQL
          </Typography>
          <ul>
            <li>
              Explore the architecture of the Spring Boot testing framework and write integration
              tests
            </li>
            <li>Develop unit tests with JUnit 5 and supporting JUnit Assertions</li>
            <li>Mock Spring container dependencies using Mockito</li>
          </ul>
          <Box mt={2}>
            <Button variant="contained" color="primary" fullWidth>
              Add to cart
            </Button>
          </Box>
        </Box>
      ),
    },
    {
      id: 6,
      photo: 'https://i.pinimg.com/736x/34/f2/64/34f26409f2d179da0278279661d7ff6d.jpg',
      title: 'HTML5 và Các Kỹ Thuật Mới',
      author: 'Vũ Văn F',
      rating: 4.4,
      reviews: 1400,
      price: 80000,
      originalPrice: 180000,
      details: (
        <Box sx={{ p: 2 }}>
          <Typography fontWeight="bold">
            Spring Boot Unit Testing with JUnit, Mockito and MockMvc
          </Typography>
          <Typography color="">
            Updated <span style={{ color: 'green' }}>July 2024</span>
          </Typography>
          <Typography color="">10 total hours • Intermediate Level • Subtitles</Typography>
          <Typography mt={1} mb={1}>
            Develop Real-Time Spring Boot Unit Tests: JUnit 5, Mockito, MockMvc, TDD, JsonPath,
            Hamcrest, H2 Embedded DB, MySQL
          </Typography>
          <ul>
            <li>
              Explore the architecture of the Spring Boot testing framework and write integration
              tests
            </li>
            <li>Develop unit tests with JUnit 5 and supporting JUnit Assertions</li>
            <li>Mock Spring container dependencies using Mockito</li>
          </ul>
          <Box mt={2}>
            <Button variant="contained" color="primary" fullWidth>
              Add to cart
            </Button>
          </Box>
        </Box>
      ),
    },
    {
      id: 7,
      photo: 'https://i.pinimg.com/736x/34/f2/64/34f26409f2d179da0278279661d7ff6d.jpg',
      title: 'Giới thiệu về Python',
      author: 'Phùng Thị G',
      rating: 4.5,
      reviews: 1600,
      price: 95000,
      originalPrice: 195000,
      details: (
        <Box sx={{ p: 2 }}>
          <Typography fontWeight="bold">
            Spring Boot Unit Testing with JUnit, Mockito and MockMvc
          </Typography>
          <Typography color="">
            Updated <span style={{ color: 'green' }}>July 2024</span>
          </Typography>
          <Typography color="">10 total hours • Intermediate Level • Subtitles</Typography>
          <Typography mt={1} mb={1}>
            Develop Real-Time Spring Boot Unit Tests: JUnit 5, Mockito, MockMvc, TDD, JsonPath,
            Hamcrest, H2 Embedded DB, MySQL
          </Typography>
          <ul>
            <li>
              Explore the architecture of the Spring Boot testing framework and write integration
              tests
            </li>
            <li>Develop unit tests with JUnit 5 and supporting JUnit Assertions</li>
            <li>Mock Spring container dependencies using Mockito</li>
          </ul>
          <Box mt={2}>
            <Button variant="contained" color="primary" fullWidth>
              Add to cart
            </Button>
          </Box>
        </Box>
      ),
    },
    {
      id: 8,
      photo: 'https://i.pinimg.com/736x/34/f2/64/34f26409f2d179da0278279661d7ff6d.jpg',
      title: 'Dự án Thực tế với Django',
      author: 'Thái Văn H',
      rating: 4.7,
      reviews: 2200,
      price: 130000,
      originalPrice: 230000,
      details: (
        <Box sx={{ p: 2 }}>
          <Typography fontWeight="bold">
            Spring Boot Unit Testing with JUnit, Mockito and MockMvc
          </Typography>
          <Typography color="">
            Updated <span style={{ color: 'green' }}>July 2024</span>
          </Typography>
          <Typography color="">10 total hours • Intermediate Level • Subtitles</Typography>
          <Typography mt={1} mb={1}>
            Develop Real-Time Spring Boot Unit Tests: JUnit 5, Mockito, MockMvc, TDD, JsonPath,
            Hamcrest, H2 Embedded DB, MySQL
          </Typography>
          <ul>
            <li>
              Explore the architecture of the Spring Boot testing framework and write integration
              tests
            </li>
            <li>Develop unit tests with JUnit 5 and supporting JUnit Assertions</li>
            <li>Mock Spring container dependencies using Mockito</li>
          </ul>
          <Box mt={2}>
            <Button variant="contained" color="primary" fullWidth>
              Add to cart
            </Button>
          </Box>
        </Box>
      ),
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '5%', // Điều chỉnh tỷ lệ để có được phần hiển thị 0.5 của slide
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Box pb="60px" overflow="hidden" sx={{ pt: { sm: '60px', lg: '0' } }}>
      <Container maxWidth="lg">
        <Box>
          <Typography variant="h5" mb={3}>
            Khóa học ngắn và thú vị dành cho bạn
          </Typography>
          <Slider {...settings}>
            {Courses.map((Course) => (
              <Tooltip
                title={Course.details}
                key={Course.id}
                placement="left"
                arrow
                PopperProps={{
                  sx: {
                    '& .MuiTooltip-tooltip': {
                      bgcolor: 'white',
                      color: 'black',
                      border: '1.5px solid rgba(0, 0, 0, 0.3)',
                      borderRadius: '8px',
                      padding: 2,
                    },
                  },
                }}
              >
                <Box key={Course.id} p={1}>
                  <img
                    src={Course.photo}
                    alt={Course.title}
                    width="100%"
                    style={{ borderRadius: '10px' }}
                  />
                  <Typography variant="h6" component="div" fontWeight="bold" mt={2}>
                    {Course.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {Course.author}
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <Rating
                      name="read-only"
                      value={Course.rating}
                      precision={0.1}
                      readOnly
                      size="small"
                      emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                    />
                    <Typography variant="body2" color="textSecondary" ml={1}>
                      ({Course.reviews.toLocaleString()})
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mt={1}>
                    <Typography variant="h6" fontWeight="bold" mr={1}>
                      đ{Course.price.toLocaleString()}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      style={{ textDecoration: 'line-through' }}
                    >
                      đ{Course.originalPrice.toLocaleString()}
                    </Typography>
                  </Box>
                </Box>
              </Tooltip>
            ))}
          </Slider>
        </Box>
      </Container>
    </Box>
  );
};

export default ShortCourseSlider;
