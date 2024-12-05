import { useDispatch } from 'react-redux';
import { setOpen } from '@/utils/redux/chartSlice';
import { DescriptionTypo } from '@/defaultTheme';
import axios from 'axios';
import dynamic from 'next/dynamic';
import MarketListContainer from '@/components/trade/chart/marketList/MarketListContainer';
import MarketDetailContainer from '@/components/trade/chart/marketDetail/MarketDetailContainer';
import TradeHistoryContainer from '@/components/trade/chart/tradeHistory/TradeHistoryContainer';
import OrderbookContainer from '@/components/trade/chart/orderbook/OrderbookContainer';

const HighStockChart = dynamic(
  () => import('@/components/trade/chart/highCharts/HighChartsContainer'),
  {
    ssr: false,
  },
);

const OrderModal = dynamic(
  () => import('@/components/trade/chart/modal/OrderModal'),
  {
    ssr: false,
  },
);

function HighChartGrid() {
  return (
    <div>
      <HighStockChart />
    </div>
  );
}

export async function getStaticProps() {
  const domain = process.env.NEXT_PUBLIC_API_URL;
  let marketCodes = [];

  try {
    const response = await axios.get(`${domain}/api/marketCodes`);
    marketCodes = response.data.marketCodes;
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      marketCodes,
    },
    revalidate: 60 * 10,
  };
}

export default function Chart({ marketCodes }) {
  const dispatch = useDispatch();
  const handleOpen = () => dispatch(setOpen(true));
  const handleClose = () => dispatch(setOpen(false));

  return (
    <div className="mt-12 mb-12">
      <div className="container mx-auto max-w-[75rem] h-[58rem] border border-gray-300 shadow-md">
        <div className="flex flex-wrap">
          {/* Left */}
          <div className="w-full md:w-3/12">
            <MarketListContainer marketCodes={marketCodes} />
          </div>

          {/* Right */}
          <div className="w-full md:w-9/12">
            <MarketDetailContainer marketCodes={marketCodes} />

            <div className="relative">
              <HighChartGrid />
              <button
                className="absolute right-2 top-2 bg-main shadow-md p-2 rounded-lg hover:opacity-60 transition duration-200 ease-in"
                onClick={handleOpen}
              >
                <DescriptionTypo>주문하기</DescriptionTypo>
              </button>
            </div>

            <div className="flex flex-wrap">
              <div className="w-full md:w-7/12">
                <TradeHistoryContainer />
              </div>
              <div className="w-full md:w-5/12">
                <OrderbookContainer />
              </div>
            </div>
          </div>
        </div>
      </div>

      <OrderModal handleClose={handleClose} />
    </div>
  );
}
