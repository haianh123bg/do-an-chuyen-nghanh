// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import PageContainer from 'src/components/container/PageContainer';

// components
import Banner from '../../../components/landingpage/banner/Banner';
import C2a from '../../../components/landingpage/c2a/C2a';
import C2a2 from '../../../components/landingpage/c2a/C2a2';
// import DemoSlider from '../../../components/landingpage/demo-slider/DemoSlider';
import Features from '../../../components/landingpage/features/Features';
import Footer from '../../../components/landingpage/footer/Footer';
// import Frameworks from '../../../components/landingpage/frameworks/Frameworks';
import LpHeader from '../../../components/landingpage/header/Header';
import Testimonial from '../../../components/landingpage/testimonial/Testimonial';
import CourseSlider from 'src/components/apps/ecommerce/courseGrid/FeaturedCourse';
import RecommendCourseSlider from 'src/components/apps/ecommerce/courseGrid/RecommendCourse';
import ShortCourseSlider from 'src/components/apps/ecommerce/courseGrid/ShortCourse';
// import ProductSlider from 'src/components/apps/ecommerce/courseGrid/Test1';
import NewCourseSlider from 'src/components/apps/ecommerce/courseGrid/NewCourse';

const Landingpage = () => {
  return (
    <PageContainer title="DevPath Academy" description="this is Landingpage">
      <LpHeader />
      <Banner />
      <CourseSlider />
      <RecommendCourseSlider />
      <ShortCourseSlider />
      <NewCourseSlider />
      {/* <ProductSlider /> */}
      {/* <DemoSlider /> */}
      {/* <Frameworks /> */}
      <Testimonial />
      <Features />
      <C2a />
      <C2a2 />
      <Footer />
    </PageContainer>
  );
};

export default Landingpage;
