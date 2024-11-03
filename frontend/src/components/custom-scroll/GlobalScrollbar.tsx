// src/components/custom-scroll/GlobalScrollbar.tsx
import React from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css'; // Import the SimpleBar styles

interface GlobalScrollbarProps {
  children: React.ReactNode;
}

const GlobalScrollbar = ({ children }: GlobalScrollbarProps) => {
  return <SimpleBar style={{ maxHeight: '100vh', overflowX: 'hidden' }}>{children}</SimpleBar>;
};

export default GlobalScrollbar;
