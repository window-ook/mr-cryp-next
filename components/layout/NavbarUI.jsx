import { globalColors } from '@/globalColors';
import { LogoTypo, NavTypo } from '@/defaultTheme';
import UserModal from '@/components/layout/UserModal';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

export default function NavBarUI({
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
}) {
  const pages = ['홈', '비전', '거래'];
  const settings = ['프로필 정보', '로그아웃'];
  const subMenus = ['실시간 오더북', '실시간 거래 내역', '차트'];

  return (
    <AppBar
      position="static"
      sx={{ top: 0, left: 0, right: 0, marginBottom: 4 }}
    >
      {/* 네비게이션바 */}
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* md 로고 타이포 */}
          <LogoTypo
            noWrap
            component="a"
            fontWeight="bold"
            fontSize={'50px'}
            sx={{
              display: { xs: 'none', md: 'flex' },
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              textShadow: globalColors.shadow_text,
              mr: 2,
            }}
          >
            Mr.Cryp
          </LogoTypo>
          {/* xs 네브바 메뉴 : 아이콘으로 활성화 */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{
                color: globalColors.white,
              }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map(page => (
                <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                  <NavTypo textAlign="center" fontSize={'18px'}>
                    {page}
                  </NavTypo>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* xs 로고 타이포 */}
          <LogoTypo
            fontSize={'32px'}
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              letterSpacing: '.3rem',
              color: 'inherit',
              textShadow: globalColors.shadow_text,
              textDecoration: 'none',
              mr: 2,
            }}
          >
            Mr.Cryp
          </LogoTypo>
          {/* md 네브바 메뉴 */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map(page => (
              <Button
                key={page}
                onClick={() => handleCloseNavMenu(page)}
                sx={{
                  my: 2,
                  mr: 2,
                  color: 'white',
                  display: 'block',
                  border: 'none',
                  boxShadow: 'none',
                }}
              >
                <NavTypo
                  sx={{
                    textShadow: globalColors.shadow_text,
                    fontSize: '32px',
                    '@media (max-width:1100px)': {
                      fontSize: '24px',
                    },
                  }}
                >
                  {page}
                </NavTypo>
              </Button>
            ))}
          </Box>
          {/* 유저 메뉴 */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="프로필 / 로그아웃">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <NavTypo
                  onClick={handleOpenUserMenu}
                  fontSize={32}
                  sx={{
                    p: 0,
                    color: globalColors.white['400'],
                    textShadow: globalColors.shadow_text,
                    '&:hover': {
                      opacity: '50%',
                      cursor: 'pointer',
                      transition: 'opacity 0.3s ease',
                    },
                    '@media (max-width:900px)': {
                      fontSize: 18,
                      lineHeight: 1.2,
                    },
                    my: 4,
                  }}
                >
                  프로필
                </NavTypo>
              </Box>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map(setting => (
                <MenuItem
                  key={setting}
                  onClick={() => handleCloseUserMenu(setting)}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
        {/* '거래' 하위 탭*/}
        {activePage === '거래' && (
          <Box
            sx={{
              display: 'flex',
              marginLeft: 37,
              '@media (max-width:900px)': {
                marginLeft: 0,
                justifyContent: 'center',
              },
            }}
          >
            {subMenus.map(subMenu => (
              <Button
                key={subMenu}
                onClick={() => handleToggleSubMenu(subMenu)}
                sx={{
                  my: 2,
                  mr: 2,
                  color:
                    activeSubMenu === subMenu ? 'secondary.light' : 'white',
                  display: 'block',
                  border: 'none',
                  boxShadow: 'none',
                }}
              >
                <NavTypo
                  fontSize={32}
                  sx={{
                    textShadow: globalColors.shadow_text,
                    '&:hover': {
                      textShadow: 'none',
                    },
                    '@media (max-width:1100px)': {
                      fontSize: '24px',
                    },
                    '@media (max-width:900px)': {
                      fontSize: '16px',
                    },
                    '@media (max-width:450px)': {
                      fontSize: '14px',
                    },
                  }}
                >
                  {subMenu}
                </NavTypo>
              </Button>
            ))}
          </Box>
        )}
      </Container>
      <UserModal open={open} handleClose={handleClose} />
    </AppBar>
  );
}
