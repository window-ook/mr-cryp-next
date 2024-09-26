import logoutKakao from '@/pages/api/logout';
import NavBarUI from './NavbarUI';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { logoutGoogle } from '@/pages/api/firebase';

export default function NavBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [activePage, setActivePage] = useState('홈');
  const [activeSubMenu, setActiveSubMenu] = useState('');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const router = useRouter();

  useEffect(() => {
    const activePage = localStorage.getItem('activePage');
    if (activePage) setActivePage(activePage);
  }, []);

  const handleLogout = () => {
    try {
      const socialType = localStorage.getItem('socialType');
      if (socialType === 'Google') {
        logoutGoogle();
        router.push('/');
      } else if (socialType === 'Kakao') {
        logoutKakao();
        router.push('/');
      } else {
        return;
      }
    } catch (error) {
      console.error('로그아웃 에러');
    }
  };

  /** 로그아웃 혹은 프로필 정보 모달 열기 */
  const handleCloseUserMenu = action => {
    setAnchorElUser(null);
    if (action === '로그아웃') handleLogout();
    if (action === '프로필 정보') {
      handleOpen();
    }
  };

  /** 페이지 메뉴 토글 */
  const handleCloseNavMenu = page => {
    setAnchorElNav(null);
    setActivePage(page);
    localStorage.setItem('activePage', page);
    if (page === '홈') router.push('/home');
    if (page === '거래') router.push('/trade');
    if (page === '비전') router.push('/vision');
  };

  /** 서브메뉴 토글 */
  const handleToggleSubMenu = subMenu => {
    setActiveSubMenu(subMenu);
    if (subMenu === '실시간 거래 내역') router.push('/trade/tradeHistory');
    if (subMenu === '실시간 오더북') router.push('/trade/orderbook');
    if (subMenu === '차트') router.push('/trade/chart');
  };

  /** 반응형 xs 메뉴바 클릭 -> 드롭다운 */
  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget);
  };

  /** 유저 프로필 사진 클릭 -> 드롭다운 */
  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const props = {
    handleOpenNavMenu,
    handleCloseNavMenu,
    handleOpenUserMenu,
    handleCloseUserMenu,
    handleClose,
    handleToggleSubMenu,
    activePage,
    activeSubMenu,
    anchorElNav,
    anchorElUser,
    open,
  };

  return <NavBarUI {...props} />;
}
