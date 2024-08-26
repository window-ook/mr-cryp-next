import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Snackbar, Alert } from '@mui/material';

export default function ProtectedRoute({ children }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const accessToken =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  const refreshToken =
    typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null;
  const router = useRouter();

  useEffect(() => {
    if (!accessToken && !refreshToken) {
      setOpen(true);
      setMessage('로그인을 해주세요');
      setTimeout(() => {
        router.push('/signin');
      }, 2000);
    } else if (!accessToken && refreshToken) {
      setOpen(true);
      setMessage('다시 로그인 해주세요');
    }
  }, [accessToken, refreshToken, router]);

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
