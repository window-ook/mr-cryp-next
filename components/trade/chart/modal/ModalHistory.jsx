import { useState, Fragment } from 'react';
import { TabPanel } from '@mui/lab';
import { FlexCenterBox, NGTypo, theme } from '@/defaultTheme';
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
import { styled } from '@mui/system';

const CellTypo = styled(NGTypo)(() => ({
  textAlign: 'center',
  '@media (max-width: 500px)': { fontSize: '0.625rem' },
}));

const CancelButton = styled(Button)(() => ({
  backgroundColor: globalColors.white_retro,
  color: theme.palette.primary.light,
  '&:hover': {
    color: theme.palette.secondary.main,
  },
}));

export default function ModalHistory({ value, orders, removeOrder }) {
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
        <FlexCenterBox sx={{ justifyContent: 'start' }}>
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
        </FlexCenterBox>
        <Box sx={{ overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell rowSpan={2}>
                  <CellTypo>주문시간</CellTypo>
                </TableCell>
                <TableCell>
                  <CellTypo>마켓명</CellTypo>
                </TableCell>
                <TableCell>
                  <CellTypo>단위가격</CellTypo>
                </TableCell>
                <TableCell>
                  <CellTypo>주문량</CellTypo>
                </TableCell>
                <TableCell rowSpan={2}>
                  <CellTypo>취소</CellTypo>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <CellTypo>구분</CellTypo>
                </TableCell>
                <TableCell>
                  <CellTypo>주문가격</CellTypo>
                </TableCell>
                <TableCell>
                  <CellTypo>미체결량</CellTypo>
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
                        <CellTypo>
                          {date}
                          <br />
                          {time}
                        </CellTypo>
                      </TableCell>
                      <TableCell>
                        <CellTypo>{order.marketName}</CellTypo>
                      </TableCell>
                      <TableCell>
                        <CellTypo>{order.unitPrice}</CellTypo>
                      </TableCell>
                      <TableCell>
                        <CellTypo>{order.orderQuantity}</CellTypo>
                      </TableCell>
                      <TableCell rowSpan={2}>
                        <CancelButton onClick={() => handleCancel(index)}>
                          취소
                        </CancelButton>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <CellTypo
                          sx={{
                            color:
                              order.type === '매도'
                                ? globalColors.color_neg['400']
                                : globalColors.color_pos['400'],
                          }}
                        >
                          {order.type}
                        </CellTypo>
                      </TableCell>
                      <TableCell>
                        <CellTypo>{order.orderPrice}</CellTypo>
                      </TableCell>
                      <TableCell>
                        <CellTypo>{order.unfilledQuantity}</CellTypo>
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
