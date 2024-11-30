import NavBarContainer from '@/components/layout/NavbarContainer';
import React from 'react';

export default function Layout({ children }) {
  return (
    <div>
      <NavBarContainer />
      <main>{children}</main>
    </div>
  );
}
