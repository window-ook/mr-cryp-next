import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Snackbar, Alert } from '@mui/material';

export default function ProtectedRoute({ children }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const accessToken =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  const router = useRouter();

  useEffect(() => {
    if (!accessToken) {
      setOpen(true);
      setMessage('로그인을 해주세요');
      setTimeout(() => {
        router.push('/');
      }, 2000);
    }
  }, [accessToken, router]);

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
