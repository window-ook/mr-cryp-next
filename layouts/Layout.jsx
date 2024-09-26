import React from 'react';
import ResponsiveAppBar from '@/components/Navbar';

export default function Layout({ children }) {
  return (
    <div>
      <ResponsiveAppBar />
      <main>{children}</main>
    </div>
  );
}
