import RestoreIcon from '@mui/icons-material/Restore';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NGTypo, theme, MobModalTypo } from '@/defaultTheme';
import { globalColors } from '@/globalColors';
import {
  Alert,
  Radio,
  Box,
  Button,
  IconButton,
  Snackbar,
  TextField,
  Tooltip,
} from '@mui/material';
import { TabPanel } from '@mui/lab';

const textFieldStyle = {
  width: 150,
  '@media (max-width:500px)': {
    width: 80,
  },
};

const flexCenter = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const resetStyle = {
  width: '100px',
  '@media (max-width:500px)': {
    width: 80,
  },
  color: theme.palette.primary.main,
  backgroundColor: globalColors.white_retro,
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.light,
  },
};

export default function OrderPanel({ value, addOrder, askablePrice }) {
  const code = useSelector(state => state.chart.code);
  const currPrice = useSelector(state => state.chart.currPrice);
  const bidableCash = 3000000;
  const [selectedValue, setSelectedValue] = useState('a');
  const [price, setPrice] = useState(currPrice || 0);
  const [balance, setBalance] = useState(1);
  const [accPrice, setAccPrice] = useState(0);
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState('');

  const handleRadio = event => {
    setSelectedValue(event.target.value);
  };

  const handlePriceIncrement = () => {
    setPrice(prevPrice => Math.max(0, parseFloat(prevPrice) + 1000));
  };

  const handlePriceDecrement = () => {
    setPrice(prevPrice => Math.max(0, parseFloat(prevPrice) - 1000));
  };

  const handlePriceChange = event => {
    if (!isNaN(event.target.value)) {
      setPrice(Math.max(0, parseFloat(event.target.value)));
    }
    if (event.target.value.length === 0) setPrice(0);
  };

  const handleBalanceIncrement = () => {
    setBalance(prevBalance => Math.max(0, parseFloat(prevBalance) + 1));
  };

  const handleBalanceDecrement = () => {
    setBalance(prevBalance => Math.max(0, parseFloat(prevBalance) - 1));
  };

  const handleBalanceChange = event => {
    if (!isNaN(event.target.value)) {
      setBalance(Math.max(0, parseFloat(event.target.value)));
    }
    if (event.target.value.length === 0) setBalance(0);
  };

  const handleOpen = async () => {
    try {
      if (bidableCash > accPrice && accPrice > 0) {
        setSuccess('success');
      } else {
        setSuccess('error');
      }
      setOpen(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClose = reason => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleReset = () => {
    setPrice(0);
    setBalance(1);
    setAccPrice(0);
  };

  const handleOrder = () => {
    try {
      if (bidableCash > accPrice && accPrice > 0) {
        const orderType = value === '1' ? '매수' : '매도';
        const newOrder = {
          orderTime: new Date().toLocaleString(),
          marketName: code,
          type: orderType,
          unitPrice: price,
          orderPrice: accPrice,
          orderQuantity: balance,
          unfilledQuantity: balance,
        };
        addOrder(newOrder);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleButtonClick = () => {
    handleOrder();
    handleOpen();
    handleReset();
  };

  useEffect(() => {
    setAccPrice(price * balance);
  }, [price, balance]);

  return (
    <>
      <TabPanel value={value}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* 모바일 주문유형 */}
          <Box
            sx={{
              display: 'none',
              '@media (max-width:500px)': {
                display: 'block',
              },
            }}
          >
            <Box sx={{ ...flexCenter, flexDirection: 'column' }}>
              <Box sx={{ ...flexCenter, gap: 2 }}>
                <MobModalTypo>지정가</MobModalTypo>
                <MobModalTypo>시장가</MobModalTypo>
                <MobModalTypo>예약-지정가</MobModalTypo>
              </Box>
              <Box sx={{ ...flexCenter, gap: 2 }}>
                <Radio
                  checked={selectedValue === 'a'}
                  onChange={handleRadio}
                  value="a"
                  name="radio-buttons"
                  inputProps={{ 'aria-label': '지정가' }}
                />
                <Radio
                  checked={selectedValue === 'b'}
                  onChange={handleRadio}
                  value="b"
                  name="radio-buttons"
                  inputProps={{ 'aria-label': '시장가' }}
                />
                <Radio
                  checked={selectedValue === 'c'}
                  onChange={handleRadio}
                  value="c"
                  name="radio-buttons"
                  inputProps={{ 'aria-label': '예약-지정가' }}
                />
              </Box>
            </Box>
          </Box>
          {/* 데스크탑 주문유형 */}
          <Box
            sx={{
              ...flexCenter,
              gap: 2,
              '@media (max-width:500px)': {
                display: 'none',
              },
            }}
          >
            <NGTypo>주문유형</NGTypo>
            <Box sx={flexCenter}>
              <Radio
                checked={selectedValue === 'a'}
                onChange={handleRadio}
                value="a"
                name="radio-buttons"
                inputProps={{ 'aria-label': '지정가' }}
              />
              <NGTypo>지정가</NGTypo>
              <Radio
                checked={selectedValue === 'b'}
                onChange={handleRadio}
                value="b"
                name="radio-buttons"
                inputProps={{ 'aria-label': '시장가' }}
              />
              <NGTypo>시장가</NGTypo>
              <Radio
                checked={selectedValue === 'c'}
                onChange={handleRadio}
                value="c"
                name="radio-buttons"
                inputProps={{ 'aria-label': '예약-지정가' }}
              />
              <NGTypo>예약-지정가</NGTypo>
            </Box>
          </Box>
          {/* 주문가능 금액 */}
          <Box sx={flexCenter}>
            <MobModalTypo>주문가능</MobModalTypo>
            <MobModalTypo>
              {value === '1'
                ? parseFloat(bidableCash).toLocaleString()
                : parseFloat(askablePrice).toLocaleString()}{' '}
              KRW
            </MobModalTypo>
          </Box>
          {/* 매수가격 / 매도가격 */}
          <Box sx={flexCenter}>
            <Box>
              <MobModalTypo>
                {value === '1' ? '매수가격' : '매도가격'}
              </MobModalTypo>
              <MobModalTypo>(KRW)</MobModalTypo>
            </Box>
            <Box sx={flexCenter}>
              <TextField
                value={price}
                sx={textFieldStyle}
                onChange={handlePriceChange}
              />
              <IconButton onClick={handlePriceDecrement}>-</IconButton>
              <IconButton onClick={handlePriceIncrement}>+</IconButton>
            </Box>
          </Box>
          {/* 주문수량 */}
          <Box sx={flexCenter}>
            <Box>
              <MobModalTypo>주문수량</MobModalTypo>
              <MobModalTypo>({code})</MobModalTypo>
            </Box>
            <Box sx={flexCenter}>
              <TextField
                value={balance}
                sx={textFieldStyle}
                onChange={handleBalanceChange}
              />
              <IconButton onClick={handleBalanceDecrement}>-</IconButton>
              <IconButton onClick={handleBalanceIncrement}>+</IconButton>
            </Box>
          </Box>
          {/* 주문총액 */}
          <Box sx={flexCenter}>
            <Box>
              <MobModalTypo>주문총액</MobModalTypo>
              <MobModalTypo>(KRW)</MobModalTypo>
            </Box>
            <TextField
              sx={{
                width: 203,
                '@media (max-width:500px)': {
                  width: 120,
                },
              }}
              value={accPrice}
            />
          </Box>
          {/* 안내문 */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              gap: 3,
            }}
          >
            <NGTypo fontSize={12}>최소주문 금액: 5,000 KRW</NGTypo>
            <NGTypo fontSize={12}>수수료(부가세 포함): 0.05%</NGTypo>
          </Box>
          {/* 버튼 */}
          <Box sx={flexCenter}>
            <Tooltip title="초기화">
              <Button
                sx={resetStyle}
                onClick={() => {
                  handleReset();
                }}
              >
                <RestoreIcon />
              </Button>
            </Tooltip>
            <Tooltip title="주문">
              <Button
                sx={{
                  width: '250px',
                  '@media (max-width:500px)': {
                    width: 80,
                  },
                }}
                onClick={() => handleButtonClick()}
              >
                {value === '1' ? (
                  <NGTypo fontWeight={'bold'}>매수</NGTypo>
                ) : (
                  <NGTypo fontWeight={'bold'}>매도</NGTypo>
                )}
              </Button>
            </Tooltip>
          </Box>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={success} variant="filled">
              {success === 'success'
                ? '주문했습니다'
                : '주문총액을 다시 확인해주세요'}
            </Alert>
          </Snackbar>
        </Box>
      </TabPanel>
    </>
  );
}
