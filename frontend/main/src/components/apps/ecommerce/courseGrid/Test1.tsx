import React from 'react';
import Slider from 'react-slick';
import { Typography, Box, Container, IconButton, Rating, Tooltip, Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import StarIcon from '@mui/icons-material/Star';

const products = [
  {
    id: 1,
    photo: 'https://i.pinimg.com/736x/34/f2/64/34f26409f2d179da0278279661d7ff6d.jpg',
    title: 'Spring Boot Unit Testing with JUnit, Mockito and MockMvc',
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
        <Typography color="textSecondary">
          Updated <span style={{ color: 'green' }}>July 2024</span>
        </Typography>
        <Typography color="textSecondary">
          10 total hours • Intermediate Level • Subtitles
        </Typography>
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
  // Thêm các sản phẩm khác ở đây...
];

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      style={{
        position: 'absolute',
        right: '-20px',
        top: '45%',
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
        left: '-20px',
        top: '45%',
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

const ProductSlider: React.FC = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '10%',
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Box pb="140px" overflow="hidden" sx={{ pt: { sm: '60px', lg: '0' } }}>
      <Container maxWidth="lg">
        <Box>
          <Typography variant="h5" mb={3}>
            Sản phẩm nổi bật
          </Typography>
          <Slider {...settings}>
            {products.map((product) => (
              <Tooltip
                key={product.id}
                title={product.details}
                placement="right"
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
                <Box p={1}>
                  <img
                    src={product.photo}
                    alt={product.title}
                    width="100%"
                    style={{ borderRadius: '10px' }}
                  />
                  <Typography variant="h6" component="div" fontWeight="bold" mt={2}>
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {product.author}
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <Rating
                      name="read-only"
                      value={product.rating}
                      precision={0.1}
                      readOnly
                      size="small"
                      emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                    />
                    <Typography variant="body2" color="textSecondary" ml={1}>
                      ({product.reviews.toLocaleString()})
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mt={1}>
                    <Typography variant="h6" fontWeight="bold" mr={1}>
                      đ{product.price.toLocaleString()}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      style={{ textDecoration: 'line-through' }}
                    >
                      đ{product.originalPrice.toLocaleString()}
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

export default ProductSlider;
