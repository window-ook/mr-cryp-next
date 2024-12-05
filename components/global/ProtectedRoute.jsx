import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Snackbar, Alert } from '@mui/material';

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_IS_TESTING === 'true') return;

    const storedUserId = localStorage.getItem('userId');
    setUserId(storedUserId);

    if (!storedUserId) {
      setOpen(true);
      setMessage('로그인이 필요합니다');
      setTimeout(() => {
        router.push('/');
      }, 2000);
    }
  }, [router]);

  const handleClose = reason => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      {children}
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
