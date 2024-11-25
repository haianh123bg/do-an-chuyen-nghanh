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
});

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const { dispatch } = store;
export const useDispatch = () => useAppDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<AppState> = useAppSelector;

export default store;
