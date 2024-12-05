import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { globalColors } from '@/globalColors';
import axios from 'axios';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import indicators from 'highcharts/indicators/indicators';

indicators(Highcharts);
Highcharts.setOptions({
  lang: {
    rangeSelectorZoom: '기간', // 범위 설렉터 설명
  },
  time: {
    useUTC: false, // UTC 시간 사용 여부
  },
});

const initialOptions = {
  chart: {
    maxWidth: 900,
    height: 400,
    zooming: {
      mouseWheel: {
        enabled: true, // 마우스 휠줌 가능
        sensitivity: 1.3, // 감도
      },
    },
  },

  accessibility: {
    enabled: false,
  },

  credits: {
    enabled: true, // 차트 우측 하단에 Highcharts.com 표시 여부
    text: 'Mr Cryp',
  },

  navigator: {
    enabled: true, // 구간을 선택할 수 있는 네비게이터 사용 여부
  },

  yAxis: [
    {
      labels: {
        align: 'right', // 정렬
        x: -4, // 차트 우측으로부터의 거리
        // y축 천 단위 구분 기호 설정
        formatter: function () {
          return Highcharts.numberFormat(Number(this.value), 0, '', ',');
        },
      },
      height: '80%', // y축 높이
      lineWidth: 2, // y축 선 굵기
      // 마우스 포인터 위치를 나타내는 크로스헤어
      crosshair: {
        snap: false,
      },
    },
    {
      labels: {
        align: 'right',
        x: -3,
      },
      top: '80%',
      height: '20%', // 레이블의 높이
      offset: 0,
      lineWidth: 2, // 볼륨 선 굵기
    },
  ],

  plotOptions: {
    candlestick: {
      color: globalColors.color_neg['400'], // 음봉
      upColor: globalColors.color_pos['400'], // 양봉
    },
    sma: {
      linkedTo: 'upbit', // 이동평균선 연결
      lineWidth: 0.8, // 이동평균선 굵기
      zIndex: 1, // 이동평균선 z-index
      marker: {
        enabled: false, // 마커 표시 여부
      },
      enableMouseTracking: false, // 마우스 트래커 표시 여부
    },
  },

  tooltip: {
    shared: true, // 여러 series를 한 번에 설정하는 옵션
    formatter: function () {
      let tooltipText = `<b>${Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x)}</b><br/><br/>`; // x축 기준 시간

      this.points.forEach(point => {
        if (point.series.type === 'candlestick') {
          const color =
            point?.point?.close > point?.point?.open
              ? globalColors.color_pos
              : globalColors.color_neg;

          tooltipText += `
            <span style="color:${color[400]}">●</span> <b>${point.series.name}</b><br/>
            시가: ${Highcharts.numberFormat(point.point.open, 0, '.', ',')}<br/>
            고가: ${Highcharts.numberFormat(point.point.high, 0, '.', ',')}<br/>
            저가: ${Highcharts.numberFormat(point.point.low, 0, '.', ',')}<br/>
            종가: ${Highcharts.numberFormat(point.point.close, 0, '.', ',')}<br/><br/>
          `;
        } else if (point.series.type === 'column') {
          tooltipText += `<span style="color:${point.color}">●</span> <b>${point.series.name}</b><br/>${point.y}<br/>`;
        }
      });

      return tooltipText;
    },

    style: {
      fontSize: '0.75rem', // 툴팁의 폰트 크기
    },

    backgroundColor: globalColors.tooltip_bgColor,
    borderRadius: 4,
    borderWidth: 1,
    shadow: false,
  },
};

export default function HighChartsGrid() {
  const [options, setOptions] = useState(initialOptions);
  const [candles, setCandles] = useState([]);

  const code = useSelector(state => state.chart.code);

  const fetchCandles = useCallback(
    async type => {
      let fetchedCandles;
      try {
        const response = await axios.get('/api/candles', {
          params: {
            type,
            unit: type.replace('min', ''),
            ticker: code,
            count: 200,
          },
        });
        fetchedCandles = response.data;
      } catch (error) {
        console.error('캔들 다운로드 중 에러 발생 :', error);
        return;
      }
      setCandles(fetchedCandles);
    },
    [code],
  );

  useEffect(() => {
    fetchCandles('1min'); // 기본값 1분봉
  }, [fetchCandles]);

  const rangeSelector = useMemo(
    () => ({
      allButtonsEnabled: true,
      inputEnabled: false,
      buttons: [
        {
          text: '1분봉',
          events: {
            click: () => fetchCandles('1min'),
          },
        },
        {
          text: '5분봉',
          events: {
            click: () => fetchCandles('5min'),
          },
        },
        {
          text: '일봉',
          events: {
            click: () => fetchCandles('days'),
          },
        },
        {
          text: '주봉',
          events: {
            click: () => fetchCandles('weeks'),
          },
        },
        {
          text: '월봉',
          events: {
            click: () => fetchCandles('months'),
          },
        },
      ],
    }),
    [fetchCandles],
  );

  useEffect(() => {
    if (candles.length > 0) {
      candles.sort((a, b) => a.timestamp - b.timestamp);
      const ohlc = candles.map(candle => [
        candle.timestamp,
        candle.opening_price,
        candle.high_price,
        candle.low_price,
        candle.trade_price,
      ]);
      const minTimestamp = ohlc[0][0];
      const maxTimestamp = ohlc[ohlc.length - 1][0];
      const volume = candles.map(candle => ({
        x: candle.timestamp,
        y: candle.candle_acc_trade_volume,
        color:
          candle.opening_price <= candle.trade_price
            ? globalColors.hotpink['200']
            : globalColors.skyblue['200'],
      }));

      setOptions(prevOptions => ({
        ...prevOptions,
        // x 축
        xAxis: {
          min: minTimestamp,
          max: maxTimestamp,
        },
        // 범위 셀렉터
        rangeSelector,
        // 시리즈
        series: [
          // 기간별 캔들스틱 차트
          {
            type: 'candlestick',
            name: code,
            id: 'upbit',
            data: ohlc,
          },
          // 이동평균선 15
          {
            type: 'sma',
            params: {
              period: 15,
            },
            color: globalColors.sma_15,
          },
          // 이동평균선 50
          {
            type: 'sma',
            params: {
              period: 50,
            },
            color: globalColors.sma_50,
          },
          // 누적 거래량 막대 그래프
          {
            type: 'column',
            name: '누적 거래량',
            data: volume,
            yAxis: 1,
          },
        ],
      }));
    }
  }, [candles, code, fetchCandles, rangeSelector]);

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'stockChart'}
        options={options}
      />
    </div>
  );
}
