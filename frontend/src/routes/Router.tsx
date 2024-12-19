// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import UserLayout from 'src/layouts/user/UserLayout';
import ProductCheckout from 'src/components/apps/ecommerce/productCheckout/ProductCheckout';
import { ProtectedRoute } from 'src/service/guard';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const ModernDash = Loadable(lazy(() => import('../views/dashboard/Modern')));

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
const MyCourse = Loadable(lazy(() => import('../views/applications/user/mycourse/mycourse1')));
const BlogDetail = Loadable(lazy(() => import('../views/applications/user/mycourse/mycoursepost')));

const TicketAdmin = Loadable(
    lazy(() => import('../views/applications/admin/ticket-admin/TicketAdmin')),
);
const TicketUser = Loadable(
    lazy(() => import('../views/applications/user/ticket-user/TicketUser')),
);

const Notes = Loadable(lazy(() => import('../views/apps/notes/Notes')));

const LearningCourse = Loadable(
    lazy(() => import('../views/applications/user/course-learning/LearningCourse')),
);
const FeatureComingSoon = Loadable(
    lazy(() => import('../views/applications/user/feature-coming/FeatureComingSoon')),
);

const Checkout = Loadable(lazy(() => import('../views/apps/eCommerce/Checkout')));

const UserProfile = Loadable(
    lazy(() => import('../views/applications/user/user-account/UserProfile')),
);

const Email = Loadable(lazy(() => import('../views/apps/email/Email')));

//page
const AccountSetting = Loadable(
    lazy(() => import('../views/pages/account-setting/AccountSetting')),
);
const ListCourse = Loadable(
    lazy(() => import('../views/applications/user/listcourse/listcourse1')),
);
const CourseManage = Loadable(lazy(() => import('../views/course/CourseManage')));

//table
const SearchTable = Loadable(lazy(() => import('../views/tables/SearchTable')));

// authentication
const Login = Loadable(lazy(() => import('../views/authentication/auth1/Login')));

const Register = Loadable(lazy(() => import('../views/authentication/auth1/Register')));

const ForgotPassword = Loadable(lazy(() => import('../views/authentication/auth1/ForgotPassword')));

const TwoSteps = Loadable(lazy(() => import('../views/authentication/auth1/TwoSteps')));

const Error = Loadable(lazy(() => import('../views/authentication/Error')));

//Home
const Home = Loadable(lazy(() => import('../views/pages/home/Home')));

const DetailCourse = Loadable(lazy(() => import('../views/course/DetailCourse')));

const CourseCreation = Loadable(lazy(() => import('../views/course/CourseCreation')));

const Router = [
    {
        path: '/',
        element: <UserLayout />,
        children: [
            { path: '/listcourse', exact: true, element: <ProtectedRoute element={ListCourse} /> },
            { path: '/user-profile', element: <ProtectedRoute element={UserProfile} /> },
            { path: '/course/management', element: <ProtectedRoute element={CourseManage} /> },
            { path: '/mycourse', element: <ProtectedRoute element={MyCourse} /> },
            { path: '/apps/blog/detail/:id', element: <ProtectedRoute element={BlogDetail} /> },
            { path: '/ticket', element: <ProtectedRoute element={Email} /> },
            { path: '/apps/notes', element: <ProtectedRoute element={Notes} /> },
            // { path: '*', element: <Navigate to="/auth/404" /> },
            {
                path: '/feature/coming-soon',
                element: <ProtectedRoute element={FeatureComingSoon} />,
            },
            { path: '/user/ticket', element: <ProtectedRoute element={TicketUser} /> },
            { path: '/learning/course/:id', element: <ProtectedRoute element={LearningCourse} /> },
        ],
    },
    {
        path: '/',
        element: <FullLayout />,
        children: [
            { path: '/admin/dashboards/modern', exact: true, element: <ModernDash /> },
            { path: '/admin', element: <Navigate to="/admin/dashboards/modern" /> },
            { path: '/admin/course', element: <AdminCourse /> },

            { path: '/admin/ticket', element: <TicketAdmin /> },

            { path: '/admin/category', element: <AdminCategory /> },
            { path: '/admin/account/user', element: <AdminAccountUser /> },
            { path: '/admin/account/teacher', element: <AdminAccountTeacher /> },
            { path: '/user-profile', element: <AccountSetting /> },

            { path: '/tables/search', element: <SearchTable /> },
        ],
    },
    {
        path: '/',
        element: <BlankLayout />,
        children: [
            { path: '/', element: <Navigate to="/home" /> },
            { path: '/home', element: <Home /> },
            { path: '/auth/404', element: <Error /> },
            { path: '/auth/login', element: <Login /> },
            { path: '/auth/register', element: <Register /> },
            { path: '/auth/forgot-password', element: <ForgotPassword /> },
            { path: '/auth/two-steps', element: <TwoSteps /> },
            { path: '/home', element: <Home /> },
            { path: '/checkout', element: <Checkout /> },
            { path: '/course/detail/:id', element: <DetailCourse /> },
            { path: '/courseCreation', element: <CourseCreation /> },
            // { path: '*', element: <Navigate to="/auth/404" /> },
            { path: '/apps/ecommerce/eco-checkout', element: <ProductCheckout /> },
        ],
    },
];

export default Router;
