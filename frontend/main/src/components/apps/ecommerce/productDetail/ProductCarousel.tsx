import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { useSelector, useDispatch } from 'src/store/Store';
import { useParams } from 'react-router-dom';

//Carousel slider for video
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carousel.css';

//Carousel slider data
import SliderData from './SliderData';

//fetch product
import { fetchProducts } from 'src/store/apps/eCommerce/ECommerceSlice';
import { ProductType } from 'src/types/apps/eCommerce';

const ProductCarousel = () => {
  const [state, setState] = React.useState<any>({ nav1: null, nav2: null });
  const slider1 = useRef();
  const slider2 = useRef();
  const dispatch = useDispatch();
  const Id: any = useParams();

  // Get Product
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Get Products
  const product: ProductType = useSelector((state) => state.ecommerceReducer.products[Id.id - 1]);
  const getProductVideo = product ? product.video : '';

  useEffect(() => {
    setState({
      nav1: slider1.current,
      nav2: slider2.current,
    });
  }, []);

  const { nav1, nav2 } = state;
  const settings = {
    focusOnSelect: true,
    infinite: true,
    slidesToShow: 5,
    arrows: false,
    swipeToSlide: true,
    slidesToScroll: 1,
    centerMode: true,
    className: 'centerThumb',
    speed: 500,
  };

  return (
    <Box>
      {/* Slider chính hiển thị video */}
      <Slider asNavFor={nav2} ref={(slider: any) => (slider1.current = slider)}>
        <Box>
          {/* Hiển thị video sản phẩm */}
          <video
            controls
            width="100%"
            style={{ borderRadius: '5px' }}
            src={getProductVideo}
          >
            Your browser does not support the video tag.
          </video>
        </Box>
        {SliderData.map((step) => (
          <Box key={step.id}>
            {/* Hiển thị các video khác từ SliderData */}
            <video
              controls
              width="100%"
              style={{ borderRadius: '5px' }}
              src={step.videoPath}
            >
              Your browser does not support the video tag.
            </video>
          </Box>
        ))}
      </Slider>

      {/* Slider điều khiển */}
      <Slider asNavFor={nav1} ref={(slider: any) => (slider2.current = slider)} {...settings}>
        <Box sx={{ p: 1, cursor: 'pointer' }}>
          {/* Hiển thị video sản phẩm điều khiển */}
          <video
            controls
            width="100%"
            style={{ borderRadius: '5px' }}
            src={getProductVideo}
          >
            Your browser does not support the video tag.
          </video>
        </Box>
        {SliderData.map((step) => (
          <Box key={step.id} sx={{ p: 1, cursor: 'pointer' }}>
            {/* Hiển thị các video nhỏ từ SliderData */}
            <video
              controls
              width="100%"
              style={{ borderRadius: '5px' }}
              src={step.videoPath}
            >
              Your browser does not support the video tag.
            </video>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default ProductCarousel;
