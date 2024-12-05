import { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import {
  setCode,
  setRate,
  setPrevPrice,
  setCurrPrice,
} from '@/utils/redux/chartSlice';
import { DescriptionTypo, NGTypo, PriceTypo } from '@/defaultTheme';
import { globalColors } from '@/globalColors';
import { TableContainer, TextField, InputAdornment } from '@mui/material';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';

const StyledTableContainer = styled(TableContainer)(() => ({
  maxWidth: '100%',
  height: 'calc(58rem - 3.438rem)',
  overflowY: 'auto',
  overflowX: 'hidden',
  margin: 0,
  padding: 0,
  backgroundColor: globalColors.white,
}));

export default function MarketList({ codeMap, tickers }) {
  const [searchKeyword, setSearchKeyword] = useState('');

  const dispatch = useDispatch();

  const handleRowClick = (code, rate, prevPrice, currPrice) => {
    dispatch(setCode(code));
    dispatch(setRate(rate));
    dispatch(setPrevPrice(prevPrice));
    dispatch(setCurrPrice(currPrice));
  };

  const filteredTickers = useMemo(() => {
    return tickers.filter(ticker => {
      const marketName = codeMap[ticker.code] || codeMap[ticker.market];
      return (
        (marketName && marketName.includes(searchKeyword.toLowerCase())) ||
        (ticker.code &&
          ticker.code.toLowerCase().includes(searchKeyword.toLowerCase())) ||
        (ticker.market &&
          ticker.market.toLowerCase().includes(searchKeyword.toLowerCase()))
      );
    });
  }, [tickers, searchKeyword, codeMap]);

  return (
    <>
      <TextField
        label="마켓 검색하기"
        id="outlined"
        fullWidth
        value={searchKeyword}
        onChange={e => setSearchKeyword(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ bgcolor: 'white', borderRadius: 1 }}
      />
      <StyledTableContainer>
        <table className="w-full">
          <thead className="sticky top-0 z-10 bg-main">
            <tr>
              <th className="w-[6.75rem] py-[0.25rem]">
                <DescriptionTypo fontSize={12}>코인</DescriptionTypo>
              </th>
              <th className="w-[4rem] py-[0.25rem]">
                <DescriptionTypo fontSize={12}>현재가</DescriptionTypo>
              </th>
              <th className="w-[4rem] py-[0.25rem]">
                <DescriptionTypo fontSize={12}>전일대비</DescriptionTypo>
              </th>
              <th className="w-[4rem] py-[0.25rem]">
                <DescriptionTypo fontSize={12}>거래대금</DescriptionTypo>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTickers &&
              filteredTickers.map(ticker => (
                <tr
                  className="hover:bg-list_hover hover:cursor-pointer"
                  key={`${ticker.acc_trade_price} + ${ticker.signed_change_rate}`}
                  onClick={() => {
                    handleRowClick(
                      ticker.code || ticker.market,
                      ticker.signed_change_rate,
                      ticker.prev_closing_price,
                      ticker.trade_price,
                    );
                  }}
                >
                  <td className="table-cell w-[6.75rem] border-b-[0.063rem] border-color:rgba(224, 224, 224, 1)] border-solid whitespace-nowrap">
                    <NGTypo
                      fontSize={11}
                      fontWeight={'bold'}
                      sx={{ maxWidth: '5rem' }}
                    >
                      {codeMap[ticker.code] || codeMap[ticker.market]}
                    </NGTypo>
                    <NGTypo fontSize={10} color={globalColors.market_code}>
                      {ticker.code || ticker.market}
                    </NGTypo>
                  </td>
                  <td
                    className={`table-cell w-[4rem] border-b-[0.063rem] border-color:rgba(224, 224, 224, 1)] border-solid text-right ${
                      ticker.signed_change_rate > 0
                        ? 'text-color_pos'
                        : ticker.signed_change_rate < 0
                          ? 'text-color_neg'
                          : 'text-black'
                    }`}
                  >
                    <PriceTypo fontSize={11} fontWeight={'bold'}>
                      {ticker.trade_price !== undefined &&
                      ticker.trade_price !== null
                        ? ticker.trade_price.toLocaleString()
                        : 0}
                    </PriceTypo>
                  </td>
                  <td
                    className={`table-cell w-[4rem] border-b-[0.063rem] border-color:rgba(224, 224, 224, 1)] border-solid text-right ${
                      ticker.signed_change_rate > 0
                        ? 'text-color_pos'
                        : ticker.signed_change_rate < 0
                          ? 'text-color_neg'
                          : 'text-black'
                    }`}
                  >
                    <div className="flex flex-col">
                      <PriceTypo fontSize={10} fontWeight={'bold'}>
                        {(ticker.signed_change_rate * 100).toFixed(2)}%
                      </PriceTypo>
                      <PriceTypo fontSize={10} fontWeight={'bold'}>
                        {ticker.signed_change_price.toLocaleString()}
                      </PriceTypo>
                    </div>
                  </td>
                  <td className="table-cell w-[4rem] border-b-[0.063rem] border-color:rgba(224, 224, 224, 1)] border-solid whitespace-nowrap">
                    <div className="flex flex-col">
                      <PriceTypo fontSize={10}>
                        {Math.round(
                          parseInt(ticker.acc_trade_price_24h) / 1000000,
                        ).toLocaleString()}
                      </PriceTypo>
                      <NGTypo fontSize={10}>백만</NGTypo>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </StyledTableContainer>
    </>
  );
}
