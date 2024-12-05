import { DescriptionTypo, NGTypo, PriceTypo } from '@/defaultTheme';
import { styled } from '@mui/system';
import { globalColors } from '@/globalColors';

const HeadTypo = styled(DescriptionTypo)(() => ({
  fontSize: '1.25rem',
  '@media (max-width:900px)': {
    fontSize: '0.688rem',
  },
}));

export default function TradeHistory({ tradeData }) {
  const timestampToTime = timestamp => {
    const time = new Date(timestamp);
    const timeStr = time.toLocaleTimeString();
    return timeStr;
  };

  return (
    <div className="max-w-[62.5rem] h-[28.1rem] overflow-auto bg-white">
      {tradeData?.length > 0 && (
        <table className="w-full">
          <thead className="sticky top-0 z-10 bg-main">
            <tr>
              <th className="py-[0.25rem] bg-main">
                <HeadTypo>체결 시간</HeadTypo>
              </th>
              <th className="py-[0.25rem] bg-main">
                <HeadTypo>체결 가격</HeadTypo>
              </th>
              <th className="py-[0.25rem] bg-main">
                <HeadTypo>체결량</HeadTypo>
              </th>
              <th className="py-[0.25rem] bg-main">
                <HeadTypo>체결금액</HeadTypo>
              </th>
            </tr>
          </thead>
          <tbody>
            {tradeData.slice().map(data => (
              <tr
                key={`${data.sequential_id}-${data.timestamp}-${Math.random()}`}
              >
                <td className="table-cell border-b-[0.063rem] border-color:rgba(224, 224, 224, 1)] border-solid text-center">
                  <NGTypo fontSize={12}>
                    {timestampToTime(data.timestamp)}
                  </NGTypo>
                </td>
                <td className="table-cell border-b-[0.063rem] border-color:rgba(224, 224, 224, 1)] border-solid text-center">
                  <NGTypo fontSize={12}>
                    {Number(data.trade_price).toLocaleString()}원
                  </NGTypo>
                </td>
                <td className="table-cell border-b-[0.063rem] border-color:rgba(224, 224, 224, 1)] border-solid text-center">
                  <PriceTypo
                    fontSize={12}
                    color={
                      data.ask_bid === 'ASK'
                        ? globalColors.color_pos['400']
                        : globalColors.color_neg['400']
                    }
                  >
                    {data.trade_volume}
                  </PriceTypo>
                </td>
                <td className="table-cell border-b-[0.063rem] border-color:rgba(224, 224, 224, 1)] border-solid text-center">
                  <PriceTypo
                    fontSize={12}
                    color={
                      data.ask_bid === 'ASK'
                        ? globalColors.color_pos['400']
                        : globalColors.color_neg['400']
                    }
                  >
                    {Math.round(
                      data.trade_volume * data.trade_price,
                    ).toLocaleString()}
                    원
                  </PriceTypo>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
