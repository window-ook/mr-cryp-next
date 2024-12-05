import { useEffect, useState } from 'react';
import { Avatar, Box, Modal } from '@mui/material';
import { NGTypo, theme } from '@/defaultTheme';
import { styled } from '@mui/system';

const ModalBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '31.25rem',
  '@media (max-width:1000px)': {
    width: '80%',
  },
  backgroundColor: '#fff',
  border: '0.25rem solid',
  borderColor: `${theme.palette.primary.main}`,
  padding: '2rem 4rem 2rem 4rem',
  boxShadow: '1rem',
}));

const ProfileImage = styled(Avatar)(() => ({
  width: '8rem',
  height: '8rem',
  '&:hover': { opacity: 0.5, transition: 'opacity 0.3s ease' },
  '@media (max-width:450px)': {
    width: '4rem',
    height: '4rem',
  },
  '@media (max-width:175px)': {
    display: 'none',
  },
}));

const ProfileBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center ',
  marginRight: '0.3rem',
  gap: '0.25rem',
}));

export default function ProfileModal({ open, handleClose }) {
  const [imgUrl, setImgUrl] = useState('');
  const [nickname, setNickname] = useState('');
  const [socialType, setSocialType] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setImgUrl(localStorage.getItem('imgUrl'));
      setNickname(localStorage.getItem('nickname'));
      setSocialType(localStorage.getItem('socialType'));
    }
  }, []);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalBox>
        <ProfileImage alt="프로필 이미지" src={imgUrl} />
        <ProfileBox>
          <NGTypo
            fontSize={24}
            fontWeight={'bold'}
            sx={{
              '@media (max-width:450px)': {
                fontSize: '1rem',
              },
            }}
          >
            {nickname}
          </NGTypo>
          <NGTypo
            sx={{
              '@media (max-width:200px)': {
                display: 'none',
              },
            }}
          >
            {socialType === 'Google'
              ? '구글 로그인'
              : socialType === 'Kakao'
                ? '카카오 로그인'
                : '네이버 로그인'}
          </NGTypo>
        </ProfileBox>
      </ModalBox>
    </Modal>
  );
}
