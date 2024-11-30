function SubIndicator({ label, value, valueStyle }) {
  return (
    <>
      <div className="flex justify-between w-[12.5rem] max-1180:w-[9.375rem]">
        <span className="font-ng text-[0.75rem] max-1180:text-[0.5rem] self-end">
          {label}
        </span>
        <span
          className={`font-oneTitle text-[0.75rem] self-end ${valueStyle === 'neg' ? 'text-color_neg' : valueStyle === 'pos' ? 'text-color_pos' : 'text-black'}`}
        >
          {Number(value).toLocaleString()}
        </span>
      </div>
      <div className="bg-gray-300 w-full h-[0.05rem]" />
    </>
  );
}

export default function MarketDetail({ codeMap, ticker, numColor }) {
  return (
    <div className="h-[6.25rem] border-dashed border-[0.313rem] border-main bg-white box-border">
      <div className="flex flex-wrap ml-[0.125rem] gap-0.5 items-end">
        <span className="font-ng font-bold text-[1.25rem]">
          {codeMap[ticker.market]}
        </span>
        <span className="font-ng text-[0.938rem] text-right">
          {ticker.market}
        </span>
      </div>
      <div className="bg-gray-300 w-full h-[0.05rem]" />

      <div className="flex flex-wrap justify-between pl-1">
        <div className="flex flex-col justify-center mt-[0.5rem]">
          <div className="flex items-end">
            <span
              className={`text-[1.25rem] font-bold font-oneTitle ${numColor}`}
            >
              {Number(ticker.trade_price).toLocaleString()}
            </span>
            <span className={`font-bold ${numColor}`}>KRW</span>
          </div>
          <div className="flex justify-between gap-2 items-center">
            <span className="text-[0.75rem] text-market_code font-bold">
              전일대비
            </span>
            <span className={`font-oneTitle ${numColor}`}>
              {Number(ticker.signed_change_rate) > 0 ? '+' : ''}
              {Number(ticker.signed_change_rate * 100).toFixed(2)}%
            </span>
            <span className={`font-oneTitle ${numColor}`}>
              {Number(ticker.signed_change_price) < 0
                ? '▼'
                : Number(ticker.signed_change_price) > 0
                  ? '▲'
                  : ''}
              {Number(ticker.change_price).toLocaleString()}
            </span>
          </div>
        </div>
        <div className="flex gap-2 mr-2 max-500:hidden">
          <div className="flex flex-col justify-center flex-shrink flex-grow basis-full">
            <SubIndicator
              label="고가"
              value={ticker.high_price}
              valueStyle={'pos'}
            />
            <SubIndicator
              label="저가"
              value={ticker.low_price}
              valueStyle={'neg'}
            />
          </div>
          <div className="flex flex-col justify-center flex-shrink flex-grow basis-full">
            <SubIndicator
              label="52주 신고가"
              value={ticker.highest_52_week_price}
              valueStyle={'pos'}
            />
            <SubIndicator
              label="52주 신저가"
              value={ticker.lowest_52_week_price}
              valueStyle={'neg'}
            />
          </div>
          <div className="flex flex-col justify-center flex-shrink flex-grow basis-full">
            <SubIndicator
              label="거래량(24H)"
              value={ticker.acc_trade_volume_24h}
              valueStyle={'normal'}
            />
            <SubIndicator
              label="거래대금(24H)"
              value={Math.round(ticker.acc_trade_price_24h)}
              valueStyle={'normal'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
