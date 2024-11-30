import { globalColors } from '@/globalColors';
import { LogoTypo } from '@/defaultTheme';
import { styled, useMediaQuery } from '@mui/system';
import ProfileModal from '@/components/layout/ProfileModal';
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

const NavTypo = styled(Typography)(() => ({
  fontFamily: 'SBAggroB',
  fontWeight: 500,
}));

const NavbarButton = styled(Button)(() => ({
  margin: '1rem 0 1rem 1rem',
  color: 'white',
  display: 'block',
  border: 'none',
  boxShadow: 'none',
}));

const NavbarButtonTypo = styled(NavTypo)(({}) => ({
  textShadow: globalColors.shadow_text,
  fontSize: '2rem',
  '@media (max-width:1100px)': {
    fontSize: '1.5rem',
  },
}));

const OverMdBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexGrow: 1,
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const OverMdLogoTypo = styled(LogoTypo)(({ theme }) => ({
  display: 'flex',
  flexGrow: 1,
  marginRight: '0.5rem',
  fontSize: '3rem',
  fontWeight: 'bold',
  letterSpacing: '.3rem',
  color: 'inherit',
  textShadow: globalColors.shadow_text,
  textDecoration: 'none',

  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const UnderMdBox = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

const UnderMdLogoTypo = styled(LogoTypo)(({ theme }) => ({
  display: 'flex',
  flexGrow: 1,
  fontSize: '2rem',
  marginRight: '0.5rem',
  letterSpacing: '.3rem',
  color: 'inherit',
  textShadow: globalColors.shadow_text,
  textDecoration: 'none',

  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

const SubNavbar = styled(Box)(({}) => ({
  display: 'flex',
  marginLeft: '18rem',
  '@media (max-width:900px)': {
    marginLeft: 0,
    justifyContent: 'center',
  },
}));

const SubNavbarButton = styled(Button)(({}) => ({
  my: '0.5rem',
  mr: '0.5rem',
  display: 'block',
  border: 'none',
  boxShadow: 'none',
}));

const SubNavbarButtonTypo = styled(NavTypo)(({}) => ({
  fontSize: '2rem',
  textShadow: globalColors.shadow_text,
  '&:hover': {
    textShadow: 'none',
  },
  '@media (max-width:1100px)': {
    fontSize: '1.5rem',
  },
  '@media (max-width:900px)': {
    fontSize: '1rem',
  },
  '@media (max-width:450px)': {
    fontSize: '0.875rem',
  },
}));

const UserMenuTypo = styled(NavTypo)(({ theme }) => ({
  padding: 0,
  color: globalColors.white[400],
  textShadow: globalColors.shadow_text,
  fontSize: '2rem',
  minHeight: '1.5rem',

  '&:hover': {
    opacity: '50%',
    cursor: 'pointer',
    transition: 'opacity 0.3s ease',
  },

  [theme.breakpoints.down('sm')]: {
    fontSize: '1.125rem',
    lineHeight: '1rem',
    minHeight: '1rem',
  },
}));

export default function NavBar({
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
  const isOverMd = useMediaQuery('(min-width:900px)');
  const NavbarMenu = ['홈', '비전', '거래'];
  const settings = ['프로필 정보', '로그아웃'];
  const subNavbarMenu = ['실시간 오더북', '실시간 거래 내역', '차트'];

  return (
    <AppBar
      position="static"
      sx={{ top: 0, left: 0, right: 0, marginBottom: '0.25rem' }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          {isOverMd ? (
            <Box sx={{ display: 'flex' }}>
              <OverMdLogoTypo
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
              >
                Mr.Cryp
              </OverMdLogoTypo>
              <OverMdBox>
                {NavbarMenu.map(page => (
                  <NavbarButton
                    key={page}
                    onClick={() => handleCloseNavMenu(page)}
                  >
                    <NavbarButtonTypo>{page}</NavbarButtonTypo>
                  </NavbarButton>
                ))}
              </OverMdBox>
            </Box>
          ) : (
            <Box
              sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}
            >
              <UnderMdBox>
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
                  {NavbarMenu.map(page => (
                    <MenuItem
                      key={page}
                      onClick={() => handleCloseNavMenu(page)}
                    >
                      <NavTypo textAlign="center" fontSize={'1.5rem'}>
                        {page}
                      </NavTypo>
                    </MenuItem>
                  ))}
                </Menu>
              </UnderMdBox>
              <UnderMdLogoTypo
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
              >
                Mr.Cryp
              </UnderMdLogoTypo>
            </Box>
          )}

          {/* 유저 메뉴 */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="프로필 / 로그아웃">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <UserMenuTypo onClick={handleOpenUserMenu}>프로필</UserMenuTypo>
              </Box>
            </Tooltip>
            <Menu
              sx={{ mt: '2.5rem' }}
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

        {/* 서브 네브바*/}
        {activePage === '거래' && (
          <SubNavbar>
            {subNavbarMenu.map(page => (
              <SubNavbarButton
                key={page}
                onClick={() => handleToggleSubMenu(page)}
                sx={{
                  color: activeSubMenu === page ? 'secondary.light' : 'white',
                }}
              >
                <SubNavbarButtonTypo>{page}</SubNavbarButtonTypo>
              </SubNavbarButton>
            ))}
          </SubNavbar>
        )}
      </Container>
      <ProfileModal open={open} handleClose={handleClose} />
    </AppBar>
  );
}
