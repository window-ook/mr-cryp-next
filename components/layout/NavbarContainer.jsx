import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { logoutGoogle } from '@/utils/firebase';
import axios from 'axios';
import NavBar from './Navbar';

export default function NavBarContainer() {
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

  const handleLogout = async () => {
    try {
      const socialType = localStorage.getItem('socialType');
      const accessToken = localStorage.getItem('accessToken');

      if (socialType === 'Google') {
        logoutGoogle();
      }

      if (socialType === 'Kakao') {
        await axios.post(
          'https://kapi.kakao.com/v1/user/logout',
          {},
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
      }

      localStorage.removeItem('accessToken');
      localStorage.removeItem('socialType');
      localStorage.removeItem('userId');
      localStorage.removeItem('imgUrl');
      localStorage.removeItem('nickname');
      localStorage.removeItem('activePage');
      router.push('/');
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

  return <NavBar {...props} />;
}
