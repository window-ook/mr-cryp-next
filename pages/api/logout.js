import axios from 'axios';

export default async function logoutKakao() {
  try {
    await axios.post(
      'https://kapi.kakao.com/v1/user/logout',
      {},
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      },
    );

    localStorage.removeItem('socialType');
    localStorage.removeItem('userId');
    localStorage.removeItem('imgUrl');
    localStorage.removeItem('nickname');
    localStorage.removeItem('activePage');
    console.log('카카오 로그아웃');
  } catch (error) {
    console.error('카카오 로그아웃 오류 : ', error);
  }
}
