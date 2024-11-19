import { createTheme, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import { globalColors } from '@/globalColors';

/**
  * 프로젝트의 테마 설정을 정의하는 객체입니다.
  @description 컬러 팔레트, 기본 컴포넌트 세팅
  @example 프로젝트 전체 배경색 : skyblue
      - primary : hotpink 
      - secondary : vanilla
          - light : 300
          - main : 400
          - dark : 500
      - contrastText: primary와 secondary의 서로 반대 컬러['300']
*/
export let theme = createTheme({
  palette: {
    primary: {
      main: globalColors.hotpink['400'],
      light: globalColors.hotpink['300'],
      dark: globalColors.hotpink['500'],
      contrastText: globalColors.vanilla['300'],
    },
    secondary: {
      main: globalColors.vanilla['400'],
      light: globalColors.vanilla['300'],
      dark: globalColors.vanilla['500'],
      constrastText: globalColors.hotpink['300'],
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: `
        body {
          background-color: ${globalColors.skyblue['300']}; 
        }
      `,
    },
    // 타이포그래피
    MuiTypography: {
      defaultProps: {
        fontFamily: 'ChoseonGu',
      },
    },
    // 버튼
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        size: 'medium',
        color: 'primary',
        disableRipple: true,
      },
      styleOverride: {
        root: {
          fontSize: '2rem',
          marginTop: '10px',
        },
      },
    },
    // 테이블 헤드
    MuiTableHead: {
      defaultProps: {
        color: globalColors.vanilla['300'],
      },
      styleOverrides: {
        root: {
          backgroundColor: globalColors.hotpink['400'],
        },
      },
    },
    // 테이블 셀
    MuiTableCell: {
      styleOverrides: {
        root: {
          alignItems: 'center',
          fontSize: '0.75rem',
          whiteSpace: 'nowrap',
          padding: '0.125rem',
          verticalAlign: 'middle',
        },
        head: {
          color: 'white',
        },
      },
    },
  },
});

/**
 * 서브 타이틀
 * @type {import('@mui/system').StyledComponent<import('@mui/material').TypographyProps>}
 */
export const SubTitle = styled(Typography)(() => ({
  fontSize: '2rem',
  fontFamily: 'NEXON Lv1 Gothic OTF',
  fontWeight: 'bold',
  color: globalColors.white,
  textShadow: globalColors.shadow_text,
  marginBottom: '0.125rem',
  '@media (max-width:900px)': {
    fontSize: '1.5rem',
    lineHeight: '0.075rem',
  },
}));

/**
 * 디스크립션
 * @type {import('@mui/system').StyledComponent<import('@mui/material').TypographyProps>}
 */
export const DescriptionTypo = styled(Typography)(() => ({
  fontFamily: 'NEXON Lv1 Gothic OTF',
  color: globalColors.white,
  textShadow: globalColors.shadow_text,
  fontWeight: 'bold',
}));

/**
 * 넥슨 고딕 타이포그래피
 * @type {import('@mui/system').StyledComponent<import('@mui/material').TypographyProps>}
 */
export const NGTypo = styled(Typography)(() => ({
  fontFamily: 'NEXON Lv1 Gothic OTF',
}));

/**
 * 금액 타이포그래피
 * @type {import('@mui/system').StyledComponent<import('@mui/material').TypographyProps>}
 */
export const PriceTypo = styled(Typography)(() => ({
  fontFamily: 'ONE-Mobile-Title',
}));

/**
 * 초기 화면, 네브바의 로고 타이포그래피
 * @type {import('@mui/system').StyledComponent<import('@mui/material').TypographyProps>}
 */
export const LogoTypo = styled(Typography)(() => ({
  fontFamily: 'SBAggroB',
  fontWeight: 'bold',
  fontStyle: 'italic',
}));

/**
 * flex center Box
 * @returns {import('@mui/system').StyledComponent<import('@mui/material').BoxProps>}
 */
export const FlexCenterBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

/**
 * 테이블 컨테이너
 * @returns {import('@mui/system').StyledComponent<import('@mui/material').BoxProps>}
 */
export const TableContainer = styled(Box)(() => ({
  maxWidth: '62.5rem',
  marginTop: '1rem',
  backgroundColor: globalColors.white,
  borderRadius: '0.5rem',
  overflow: 'hidden',
  '@media (max-width:900px)': {
    maxWidth: '50rem',
    marginLeft: '1rem',
    marginRight: '1rem',
  },
  '@media (max-width:600px)': {
    maxWidth: '30rem',
    marginLeft: '1rem',
    marginRight: '1rem',
  },
}));

/**
 * 테이블 헤드 타이포그래피
 * @returns {import('@mui/system').StyledComponent<import('@mui/material').TypographyProps>}
 */
export const HeadTypo = styled(DescriptionTypo)(() => ({
  fontSize: '1.25rem',
  '@media (max-width:900px)': {
    fontSize: '0.688rem',
  },
}));
