import mock from './mock';
import '../components/apps/mycourse/mycoursedata';
import './contacts/ContactsData';
import './chat/Chatdata';
import './notes/NotesData';
import './ticket/TicketData';
import '../components/apps/ecommerce/productGrid/ProductsData';
import './email/EmailData';
import './userprofile/PostData';
import './userprofile/UsersData';

mock.onAny().passThrough();
