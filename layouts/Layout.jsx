import NavBar from '@/components/Navbar';
import React from 'react';

export default function Layout({ children }) {
  return (
    <div>
      <NavBar />
      <main>{children}</main>
    </div>
  );
}
