// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useState } from 'react';
import { Divider, Box } from '@mui/material';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/apps/ecommerce/productGrid/PageContainer';
import ChatSidebar from 'src/components/chats/ChatSidebar';
import ChatContent from 'src/components/chats/ChatContent';
import ChatMsgSent from 'src/components/chats/ChatMsgSent';
import AppCard from 'src/components/shared/AppCard';

const TicketUser = () => {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <PageContainer title="Ticket hỗ trợ" description="Đây là trang hỗ trợ">
      <Breadcrumb title="Ticket hỗ trợ" subtitle="Nhắn tin" />
      <AppCard>
        {/* ------------------------------------------- */}
        {/* Left part */}
        {/* ------------------------------------------- */}

        <ChatSidebar
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={() => setMobileSidebarOpen(false)}
        />
        {/* ------------------------------------------- */}
        {/* Right part */}
        {/* ------------------------------------------- */}

        <Box flexGrow={1}>
          <ChatContent toggleChatSidebar={() => setMobileSidebarOpen(true)} />
          <Divider />
          <ChatMsgSent />
        </Box>
      </AppCard>
    </PageContainer>
  );
};

export default TicketUser;
