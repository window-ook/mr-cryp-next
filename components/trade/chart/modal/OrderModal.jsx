import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Modal, Tab } from '@mui/material';
import { TabContext, TabList } from '@mui/lab';
import { styled } from '@mui/system';
import { theme } from '@/defaultTheme';
import ModalHistory from './ModalHistory';
import ModalPanel from './ModalPanel';

const ModalBox = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  '@media (max-width:500px)': {
    width: '18.75rem',
  },
  backgroundColor: '#fff',
  border: '0.5rem solid',
  borderColor: theme.palette.primary.main,
  boxShadow: '1.5rem',
  padding: '0.25rem',
}));

export default function OrderModal({ handleClose }) {
  const [value, setValue] = useState('1');
  const [orders, setOrders] = useState([]);
  const open = useSelector(state => state.chart.open);

  const addOrder = newOrder => {
    setOrders(prevOrders => [...prevOrders, newOrder]);
  };

  const removeOrder = index => {
    setOrders(prevOrders => prevOrders.filter((order, i) => i !== index));
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const askablePrice = orders
    .filter(order => order.type === '매수')
    .reduce((acc, order) => acc + parseFloat(order.orderPrice), 0);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalBox>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="매수 매도 주문">
              <Tab fontFamily="NEXON Lv1 Gothic OTF" label="매수" value="1" />
              <Tab fontFamily="NEXON Lv1 Gothic OTF" label="매도" value="2" />
              <Tab
                fontFamily="NEXON Lv1 Gothic OTF"
                label="거래내역"
                value="3"
              />
            </TabList>
          </Box>
          <ModalPanel value="1" addOrder={addOrder} />
          <ModalPanel
            value="2"
            addOrder={addOrder}
            askablePrice={askablePrice}
          />
          <ModalHistory value="3" orders={orders} removeOrder={removeOrder} />
        </TabContext>
      </ModalBox>
    </Modal>
  );
}
