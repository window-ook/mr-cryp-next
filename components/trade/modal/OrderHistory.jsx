import { useState, Fragment } from 'react';
import { TabPanel } from '@mui/lab';
import { NGTypo, theme } from '@/defaultTheme';
import { globalColors } from '@/globalColors';
import {
  Alert,
  Radio,
  Box,
  Button,
  Snackbar,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';

const flexCenter = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const cellStyle = {
  textAlign: 'center',
  '@media (max-width: 500px)': { fontSize: '10px' },
};

export default function OrderHistory({ value, orders, removeOrder }) {
  const [selectedValue, setSelectedValue] = useState('a');
  const [open, setOpen] = useState(false);

  const handleRadio = event => {
    setSelectedValue(event.target.value);
  };

  const handleOpen = async () => {
    try {
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

  const handleCancel = index => {
    removeOrder(index);
    handleOpen();
  };

  return (
    <TabPanel value={value}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ ...flexCenter, justifyContent: 'start' }}>
          <Radio
            checked={selectedValue === 'a'}
            onChange={handleRadio}
            value="a"
            name="radio-buttons"
            inputProps={{ 'aria-label': '미체결' }}
          />
          <NGTypo>미체결</NGTypo>
          <Radio
            checked={selectedValue === 'b'}
            onChange={handleRadio}
            value="b"
            name="radio-buttons"
            inputProps={{ 'aria-label': '체결' }}
          />
          <NGTypo>체결</NGTypo>
        </Box>
        <Box sx={{ overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell rowSpan={2}>
                  <NGTypo sx={cellStyle}>주문시간</NGTypo>
                </TableCell>
                <TableCell>
                  <NGTypo sx={cellStyle}>마켓명</NGTypo>
                </TableCell>
                <TableCell>
                  <NGTypo sx={cellStyle}>단위가격</NGTypo>
                </TableCell>
                <TableCell>
                  <NGTypo sx={cellStyle}>주문량</NGTypo>
                </TableCell>
                <TableCell rowSpan={2}>
                  <NGTypo sx={cellStyle}>취소</NGTypo>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <NGTypo sx={cellStyle}>구분</NGTypo>
                </TableCell>
                <TableCell>
                  <NGTypo sx={cellStyle}>주문가격</NGTypo>
                </TableCell>
                <TableCell>
                  <NGTypo sx={cellStyle}>미체결량</NGTypo>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order, index) => {
                const spliting = order.orderTime.indexOf('오');
                const date = order.orderTime.substring(0, spliting - 1);
                const time = order.orderTime.substring(spliting);
                return (
                  <Fragment key={index}>
                    <TableRow>
                      <TableCell rowSpan={2}>
                        <NGTypo sx={cellStyle}>
                          {date}
                          <br />
                          {time}
                        </NGTypo>
                      </TableCell>
                      <TableCell>
                        <NGTypo sx={cellStyle}>{order.marketName}</NGTypo>
                      </TableCell>
                      <TableCell>
                        <NGTypo sx={cellStyle}>{order.unitPrice}</NGTypo>
                      </TableCell>
                      <TableCell>
                        <NGTypo sx={cellStyle}>{order.orderQuantity}</NGTypo>
                      </TableCell>
                      <TableCell rowSpan={2}>
                        <Button
                          sx={{
                            backgroundColor: globalColors.white_retro,
                            color: theme.palette.primary.light,
                            '&:hover': {
                              color: theme.palette.secondary.main,
                            },
                          }}
                          onClick={() => handleCancel(index)}
                        >
                          취소
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <NGTypo
                          sx={{
                            ...cellStyle,
                            color:
                              order.type === '매도'
                                ? globalColors.color_neg['400']
                                : globalColors.color_pos['400'],
                          }}
                        >
                          {order.type}
                        </NGTypo>
                      </TableCell>
                      <TableCell>
                        <NGTypo sx={cellStyle}>{order.orderPrice}</NGTypo>
                      </TableCell>
                      <TableCell>
                        <NGTypo sx={cellStyle}>{order.unfilledQuantity}</NGTypo>
                      </TableCell>
                    </TableRow>
                  </Fragment>
                );
              })}
            </TableBody>
          </Table>
        </Box>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" variant="filled">
            주문을 취소했습니다
          </Alert>
        </Snackbar>
      </Box>
    </TabPanel>
  );
}
