// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import UserLayout from 'src/layouts/user/UserLayout';


/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const ModernDash = Loadable(lazy(() => import('../views/dashboard/Modern')));
const EcommerceDash = Loadable(lazy(() => import('../views/dashboard/Ecommerce')));
const AdminCourse = Loadable(
    lazy(() => import('../views/applications/admin/course/CourseManagement')),
);
const AdminCategory = Loadable(
    lazy(() => import('../views/applications/admin/category/CategoryManagement')),
);
const AdminAccountUser = Loadable(
    lazy(() => import('../views/applications/admin/account-user/AccountUserManagement')),
);
const AdminAccountTeacher = Loadable(
    lazy(() => import('../views/applications/admin/account-teacher/AccountTeacherManagement')),
);

/* ****Apps***** */
const Blog = Loadable(lazy(() => import('../views/apps/blog/Blog')));
const BlogDetail = Loadable(lazy(() => import('../views/apps/blog/BlogPost')));

const TicketAdmin = Loadable(lazy(() => import('../views/ticket-admin/TicketAdmin')));
const TicketUser = Loadable(lazy(() => import('../views/ticket-user/TicketUser')));

const Notes = Loadable(lazy(() => import('../views/apps/notes/Notes')));
const Tickets = Loadable(lazy(() => import('../views/apps/tickets/Tickets')));
const Ecommerce = Loadable(lazy(() => import('../views/apps/eCommerce/Ecommerce')));
const LearningCourse = Loadable(lazy(() => import('../views/course-learning/LearningCourse')));
const FeatureComingSoon = Loadable(lazy(() => import('../views/feature-coming/FeatureComingSoon')));
const EcomProductList = Loadable(lazy(() => import('../views/apps/eCommerce/EcomProductList')));

const Checkout = Loadable(lazy(() => import('../views/apps/eCommerce/Checkout')));


const UserProfile = Loadable(
    lazy(() => import('../views/applications/user/user-account/UserProfile')),
);

const Email = Loadable(lazy(() => import('../views/apps/email/Email')));





//page
const AccountSetting = Loadable(
    lazy(() => import('../views/pages/account-setting/AccountSetting')),
);
const HomePage = Loadable(lazy(() => import('../views/apps/home/HomePage')));
const CourseManage = Loadable(lazy(() => import('../views/course/CourseManage')));



//table
const SearchTable = Loadable(lazy(() => import('../views/tables/SearchTable')));



// authentication
const Login = Loadable(lazy(() => import('../views/authentication/auth1/Login')));
const Login2 = Loadable(lazy(() => import('../views/authentication/auth2/Login2')));
const Register = Loadable(lazy(() => import('../views/authentication/auth1/Register')));
const Register2 = Loadable(lazy(() => import('../views/authentication/auth2/Register2')));
const ForgotPassword = Loadable(lazy(() => import('../views/authentication/auth1/ForgotPassword')));
const ForgotPassword2 = Loadable(
    lazy(() => import('../views/authentication/auth2/ForgotPassword2')),
);
const TwoSteps = Loadable(lazy(() => import('../views/authentication/auth1/TwoSteps')));
const TwoSteps2 = Loadable(lazy(() => import('../views/authentication/auth2/TwoSteps2')));
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Maintenance = Loadable(lazy(() => import('../views/authentication/Maintenance')));

// landingpage
const Landingpage = Loadable(lazy(() => import('../views/pages/landingpage/Landingpage')));

//Home
const Home = Loadable(lazy(() => import('../views/pages/home/Home')));

const DetailCourse = Loadable(lazy(() => import('../views/course/DetailCourse')));

const CourseCreation = Loadable(lazy(() => import('../views/course/CourseCreation')));

const Router = [
    {
        path: '/',
        element: <UserLayout />,
        children: [
            { path: '/', element: <Navigate to="/home" /> },
            { path: '/homepage', exact: true, element: <HomePage /> },
            { path: '/user-profile', element: <UserProfile /> },
            { path: '/dashboards/ecommerce', element: <EcommerceDash /> },
            { path: '/course/management', element: <CourseManage /> },
            
            { path: '/my-course', element: <Blog /> },
            { path: '/apps/blog/detail/:id', element: <BlogDetail /> },
            
            { path: '/ticket', element: <Email /> },
            { path: '/apps/notes', element: <Notes /> },
            { path: '*', element: <Navigate to="/auth/404" /> },
            { path: '/feature/coming-soon', element: <FeatureComingSoon /> },
            { path: '/admin/ticket', element: <TicketAdmin /> },
            { path: '/user/ticket', element: <TicketUser /> },
            { path: '/learning/course/:id', element: <LearningCourse /> },
           
        ],
    },
    {
        path: '/',
        element: <FullLayout />,
        children: [
            { path: '/admin/dashboards/modern', exact: true, element: <ModernDash /> },
            { path: '/admin', element: <Navigate to="/admin/dashboards/modern" /> },
            { path: '/admin/course', element: <AdminCourse /> },
            
           
            { path: '/admin/category', element: <AdminCategory /> },
            { path: '/admin/account/user', element: <AdminAccountUser /> },
            { path: '/admin/account/teacher', element: <AdminAccountTeacher /> },
            { path: '/apps/tickets', element: <Tickets /> },
            { path: '/apps/ecommerce/shop', element: <Ecommerce /> },
            { path: '/apps/ecommerce/eco-product-list', element: <EcomProductList /> },
            

          
            { path: '/user-profile', element: <AccountSetting /> },
           
            { path: '/tables/search', element: <SearchTable /> },
            
        ],
    },
    {
        path: '/',
        element: <BlankLayout />,
        children: [
            { path: '/auth/404', element: <Error /> },
            { path: '/auth/login', element: <Login /> },
            { path: '/auth/login2', element: <Login2 /> },
            { path: '/auth/register', element: <Register /> },
            { path: '/auth/register2', element: <Register2 /> },
            { path: '/auth/forgot-password', element: <ForgotPassword /> },
            { path: '/auth/forgot-password2', element: <ForgotPassword2 /> },
            { path: '/auth/two-steps', element: <TwoSteps /> },
            { path: '/auth/two-steps2', element: <TwoSteps2 /> },
            { path: '/auth/maintenance', element: <Maintenance /> },
            { path: '/landingpage', element: <Landingpage /> },
            { path: '/home', element: <Home /> },
            { path: '/checkout', element: <Checkout /> },
            { path: '/course/detail/:id', element: <DetailCourse /> },
            {path: '/courseCreation', element: <CourseCreation /> },
            { path: '*', element: <Navigate to="/auth/404" /> },
            
           
            
        ],
    },

];

export default Router;
