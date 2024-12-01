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
import changePasswordSlice from 'src/store/user/account/changePasswordSlice';
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
});

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const { dispatch } = store;
export const useDispatch = () => useAppDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<AppState> = useAppSelector;

export default store;
