import NavBar from '@/components/layout/Navbar';
import React from 'react';

export default function Layout({ children }) {
  return (
    <div>
      <NavBar />
      <main>{children}</main>
    </div>
  );
}
