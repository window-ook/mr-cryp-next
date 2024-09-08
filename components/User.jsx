import { useEffect, useState } from 'react';
import { Avatar, Box, Modal } from '@mui/material';
import { NGTypo } from '@/defaultTheme';

export default function User({ open, handleClose }) {
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          '@media (max-width:1000px)': {
            width: '80%',
          },
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Avatar
          alt="프로필 이미지"
          src={imgUrl}
          sx={{
            width: '100px',
            height: '100px',
            '&:hover': { opacity: 0.5, transition: 'opacity 0.3s ease' },
            '@media (max-width:450px)': {
              width: '60px',
              height: '60px',
            },
            '@media (max-width:175px)': {
              display: 'none',
            },
          }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center ',
            marginRight: 5,
            gap: 4,
          }}
        >
          <NGTypo
            fontSize={24}
            fontWeight={'bold'}
            sx={{
              '@media (max-width:450px)': {
                fontSize: 16,
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
              ? '구글 계정'
              : socialType === 'Kakao'
                ? '카카오 계정'
                : '로그인을 해주세요'}
          </NGTypo>
        </Box>
      </Box>
    </Modal>
  );
}
