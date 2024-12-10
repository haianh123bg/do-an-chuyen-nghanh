import { configureStore } from '@reduxjs/toolkit';
import CustomizerReducer from './customizer/CustomizerSlice';
import EcommerceReducer from './apps/eCommerce/ECommerceSlice';
import ChatsReducer from './apps/chat/ChatSlice';
import NotesReducer from './apps/notes/NotesSlice';
import EmailReducer from './apps/email/EmailSlice';
import TicketReducer from './apps/tickets/TicketSlice';
import ContactsReducer from './apps/contacts/ContactSlice';
import UserProfileReducer from './apps/userProfile/UserProfileSlice';
import BlogReducer from './apps/blog/BlogSlice';
import SelectedReducer from './RouterSlice';
import usermeSlice from 'src/store/user/userme/usermeSlice';
import streamNotificationsSlice from 'src/store/sse/notification/streamNotificationsSlice';
import createCourseSlice from 'src/store/teacher/tmCourse/createCourseSlice';
import createItemSlice from 'src/store/teacher/tmCourse/createItemSlice';
import createModuleSlice from 'src/store/teacher/tmCourse/createModuleSlice';
import getPageCourseByTeacherSlice from 'src/store/teacher/tmCourse/getPageCourseByTeacherSlice';
import deleteListResourceSlice from 'src/store/teacher/tResource/deleteListResourceSlice';
import deleteResourceSlice from 'src/store/teacher/tResource/deleteResourceSlice';
import uploadListResourceSlice from 'src/store/teacher/tResource/uploadListResourceSlice';
import uploadResourceSlice from 'src/store/teacher/tResource/uploadResourceSlice';
import loginSlice from 'src/store/auth/loginSlice';
import registerSlice from 'src/store/auth/registerSlice';
import changeUserInfoP1Slice from 'src/store/user/account/changeUserInfoP1Slice';
import changeAvatarSlice from 'src/store/user/account/changeAvatarSlice';
import changeUserInfoP2Slice from 'src/store/user/account/changeUserInfoP2Slice';
import getUserInfoSlice from 'src/store/user/account/getUserInfoSlice';
import changePasswordSlice from 'src/store/user/account/changePasswordSlice';
import SelectItem from 'src/store/RouterSlice';
import addCourseToCartSlice from 'src/store/user/cart/addCourseToCartSlice';
import deleteCourseToCartSlice from 'src/store/user/cart/deleteCourseToCartSlice';
import getCartsSlice from 'src/store/user/cart/getCartsSlice';
import changeBankSlice from 'src/store/user/account/changeBankSlice';
// admin -> dashboard
import mOverviewSlice from 'src/store/admin/mdashboard/mOverviewSlice';
// admin -> course
import mOverviewCourseSlice from 'src/store/admin/mcource/mOverviewCourseSlice';
// admin -> category
import mOverviewCategorySlice from 'src/store/admin/mcategory/mOverviewCategorySlice';

import { combineReducers } from 'redux';
import {
    useDispatch as useAppDispatch,
    useSelector as useAppSelector,
    TypedUseSelectorHook,
} from 'react-redux';

export const store = configureStore({
    reducer: {
        customizer: CustomizerReducer,
        ecommerceReducer: EcommerceReducer,
        chatReducer: ChatsReducer,
        emailReducer: EmailReducer,
        notesReducer: NotesReducer,
        contactsReducer: ContactsReducer,
        ticketReducer: TicketReducer,
        userpostsReducer: UserProfileReducer,
        blogReducer: BlogReducer,
        userme: usermeSlice,
        changePasswordSlice: changePasswordSlice,
        streamNotificationsSlice: streamNotificationsSlice,
        createCourseSlice: createCourseSlice,
        createItemSlice: createItemSlice,
        createModuleSlice: createModuleSlice,
        getPageCourseByTeacherSlice: getPageCourseByTeacherSlice,
        deleteListResourceSlice: deleteListResourceSlice,
        deleteResourceSlice: deleteResourceSlice,
        uploadListResourceSlice: uploadListResourceSlice,
        uploadResourceSlice: uploadResourceSlice,
        // Authentication
        loginSlice: loginSlice,
        registerSlice: registerSlice,
        // user -> account
        changeUserInfoP1Slice: changeUserInfoP1Slice,
        changeAvatarSlice: changeAvatarSlice,
        changeUserInfoP2Slice: changeUserInfoP2Slice,
        getUserInfoSlice: getUserInfoSlice,
        selectItem: SelectItem,
        changeBankSlice: changeBankSlice,
        // admin -> dashboard
        mOverviewSlice: mOverviewSlice,
        // admin -> course
        mOverviewCourseSlice: mOverviewCourseSlice,
        // admin -> category
        mOverviewCategorySlice: mOverviewCategorySlice,
    },
});

const rootReducer = combineReducers({
    customizer: CustomizerReducer,
    ecommerceReducer: EcommerceReducer,
    chatReducer: ChatsReducer,
    emailReducer: EmailReducer,
    notesReducer: NotesReducer,
    contactsReducer: ContactsReducer,
    ticketReducer: TicketReducer,
    userpostsReducer: UserProfileReducer,
    blogReducer: BlogReducer,
    selectReducer: SelectedReducer,
    userme: usermeSlice,
    changePasswordSlice: changePasswordSlice,
    streamNotificationsSlice: streamNotificationsSlice,
    createCourseSlice: createCourseSlice,
    createItemSlice: createItemSlice,
    createModuleSlice: createModuleSlice,
    getPageCourseByTeacherSlice: getPageCourseByTeacherSlice,
    deleteListResourceSlice: deleteListResourceSlice,
    deleteResourceSlice: deleteResourceSlice,
    uploadListResourceSlice: uploadListResourceSlice,
    uploadResourceSlice: uploadResourceSlice,
    // Authentication
    loginSlice: loginSlice,
    registerSlice: registerSlice,
    // user -> account
    changeUserInfoP1Slice: changeUserInfoP1Slice,
    changeAvatarSlice: changeAvatarSlice,
    changeUserInfoP2Slice: changeUserInfoP2Slice,
    getUserInfoSlice: getUserInfoSlice,
    selectItem: SelectItem,
    changeBankSlice: changeBankSlice,
    addCourseToCartSlice: addCourseToCartSlice,
    deleteCourseToCartSlice: deleteCourseToCartSlice,
    getCartsSlice: getCartsSlice,
    // admin -> dashboard
    mOverviewSlice: mOverviewSlice,
    // admin -> course
    mOverviewCourseSlice: mOverviewCourseSlice,
    // admin -> category
    mOverviewCategorySlice: mOverviewCategorySlice,
});

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const { dispatch } = store;
export const useDispatch = () => useAppDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<AppState> = useAppSelector;

export default store;
