// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import PageContainer from 'src/components/apps/ecommerce/productGrid/PageContainer';

import Banner from '../../../components/landingpage/banner/Banner';
import C2a2 from '../../../components/landingpage/c2a/C2a2';
import Features from '../../../components/landingpage/features/Features';
import LpHeader from '../../../components/landingpage/header/Header';
import Testimonial from '../../../components/landingpage/testimonial/Testimonial';
import CourseSlider from 'src/components/apps/ecommerce/courseGrid/FeaturedCourse';
import RecommendCourseSlider from 'src/components/apps/ecommerce/courseGrid/RecommendCourse';
import ShortCourseSlider from 'src/components/apps/ecommerce/courseGrid/ShortCourse';
import NewCourseSlider from 'src/components/apps/ecommerce/courseGrid/NewCourse';

const Landingpage = () => {
    return (
        <PageContainer title="Modernize Elearning" description="this is Landingpage">
            <LpHeader />
            <Banner />
            <CourseSlider />
            <RecommendCourseSlider />
            <ShortCourseSlider />
            {/* <NewCourseSlider /> */}
            <Testimonial />
            <Features />
            <C2a2 />
        </PageContainer>
    );
};

export default Landingpage;
