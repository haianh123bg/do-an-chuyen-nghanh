import React, { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'src/store/Store';
import { useParams, Link } from 'react-router-dom';

// Carousel slider for video
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carousel.css';

// Fetch product
import { fetchProducts } from 'src/store/apps/eCommerce/ECommerceSlice';
import { ProductType } from 'src/types/apps/eCommerce';

const CourseVideo = () => {
    const [state, setState] = React.useState<any>({ nav1: null });
    const slider1 = useRef();
    const dispatch = useDispatch();
    const Id: any = useParams();

    // Get Product
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    // Get Products
    const product: ProductType = useSelector((state) => state.ecommerceReducer.products[Id.id - 1]);

    useEffect(() => {
        setState({
            nav1: slider1.current,
        });
    }, []);

    const { nav1 } = state;

    const getProductVideo = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";  // Giả sử đây là URL video

    // Chỉ cần chuyển đổi URL trên thành định dạng nhúng
    const videoEmbedUrl = getProductVideo.replace("https://www.youtube.com/watch?v=", "https://www.youtube.com/embed/");

    return (
        <Box sx={{ position: 'relative' }}>
            {/* Tiêu đề khóa học, nằm ở góc trên trái */}
            <Typography
                component={Link}
                to="/my-course"  // Liên kết đến trang my-course
                variant="h5"
                sx={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    color: 'white',
                    fontWeight: 'bold',
                    textDecoration: 'none',
                    zIndex: 10,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    padding: '5px 10px',
                    borderRadius: '5px',
                }}
            >
                {product?.title} {/* Tiêu đề khóa học */}
            </Typography>

            {/* Slider chính hiển thị video */}
            <Slider asNavFor={nav1} ref={(slider: any) => (slider1.current = slider)}>
                <Box>
                    {/* Hiển thị video sản phẩm bằng iframe */}
                    <iframe
                        width="100%"
                        height="315"
                        src={videoEmbedUrl}  // Sử dụng URL nhúng trực tiếp
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </Box>
            </Slider>
        </Box>
    );
};

export default CourseVideo;
