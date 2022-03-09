import React, { useEffect, useRef, useMemo } from 'react';
import { createChart } from 'lightweight-charts';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { toK } from '../../utils/utils';

dayjs.extend(utc);

export const CHART_TYPES = {
  BAR: 'BAR',
  AREA: 'AREA',
};

const formattedNum = (value, units) => `${units + toK(value)}`;

// constant height for charts
const HEIGHT = 300;

const TradingViewChart = ({
  type = CHART_TYPES.BAR,
  data = [],
  base,
  baseChange,
  field,
  title,
  width,
  units = '$',
  chainId = 1,
  useWeekly = false,
}) => {
  // reference for DOM element to create with chart
  const ref = useRef();

  // parse the data and format for tardingview consumption
  const formattedData = useMemo(() => {
    return data.map((entry) => {
      return {
        time: dayjs.unix(entry[0]).utc().format('YYYY-MM-DD'),
        value: parseFloat(entry[field]),
      };
    });
  }, [data, field]);

  // adjust the scale based on the type of chart
  const topScale = type === CHART_TYPES.AREA ? 0.32 : 0.2;

  const darkMode = false;

  useEffect(() => {
    const textColor = darkMode ? 'white' : 'black';
    const crossHairColor = darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(32, 38, 46, 0.1)';

    const chart = createChart(ref.current, {
      width: width,
      height: HEIGHT,
      layout: {
        backgroundColor: 'transparent',
        textColor: textColor,
      },
      rightPriceScale: {
        scaleMargins: {
          top: topScale,
          bottom: 0,
        },
        borderVisible: false,
      },
      timeScale: {
        borderVisible: false,
      },
      grid: {
        horzLines: {
          color: 'rgba(197, 203, 206, 0.5)',
          visible: false,
        },
        vertLines: {
          color: 'rgba(197, 203, 206, 0.5)',
          visible: false,
        },
      },
      crosshair: {
        horzLine: {
          visible: false,
          labelVisible: false,
        },
        vertLine: {
          visible: true,
          style: 0,
          width: 2,
          color: crossHairColor,
          labelVisible: false,
        },
      },
      localization: {
        priceFormatter: (val) => formattedNum(val, units),
      },
    });

    const series =
      type === CHART_TYPES.BAR
        ? chart.addHistogramSeries({
            color: '#394990',
            priceFormat: {
              type: 'volume',
            },
            scaleMargins: {
              top: 0.32,
              bottom: 0,
            },
            lineColor: '#394990',
            lineWidth: 3,
          })
        : chart.addAreaSeries({
            topColor: '#394990',
            bottomColor: 'rgba(112, 82, 64, 0)',
            lineColor: '#394990',
            lineWidth: 3,
          });

    series.setData(formattedData);

    const prevTooltip = document.getElementById('tooltip-id' + chainId + type);
    const node = document.getElementById('test-id' + chainId + type);

    if (prevTooltip && node) {
      node.removeChild(prevTooltip);
    }

    const toolTip = document.createElement('div');
    toolTip.setAttribute('id', 'tooltip-id' + chainId + type);
    toolTip.className = darkMode ? 'three-line-legend-dark' : 'three-line-legend';

    ref.current.appendChild(toolTip);

    toolTip.style.display = 'block';
    toolTip.style.fontWeight = '500';
    toolTip.style.left = 0;
    toolTip.style.top = '-6px';
    toolTip.style.backgroundColor = 'transparent';
    toolTip.style.position = 'absolute';

    // format numbers
    let percentChange = baseChange?.toFixed(2);
    let formattedPercentChange = (percentChange > 0 ? '+' : '') + percentChange + '%';
    let color = percentChange >= 0 ? 'green' : 'red';

    // get the title of the chart
    function setLastBarText() {
      toolTip.innerHTML =
        `<div style="font-size: 16px; margin: 4px 0px; color: ${textColor};">${title} ${
          type === CHART_TYPES.BAR && !useWeekly ? '(24hr)' : ''
        }</div>` +
        `<div style="font-size: 22px; margin: 4px 0px; color:${textColor}" >` +
        formattedNum(base ?? 0, units) +
        (baseChange
          ? `<span style="margin-left: 10px; font-size: 16px; color: ${color};">${formattedPercentChange}</span>`
          : '') +
        '</div>';
    }
    setLastBarText();

    // update the title when hovering on the chart
    chart.subscribeCrosshairMove(function (param) {
      if (
        param === undefined ||
        param.time === undefined ||
        param.point.x < 0 ||
        param.point.x > width ||
        param.point.y < 0 ||
        param.point.y > HEIGHT
      ) {
        setLastBarText();
      } else {
        let dateStr = useWeekly
          ? dayjs(param.time.year + '-' + param.time.month + '-' + param.time.day)
              .startOf('week')
              .format('MMMM D, YYYY') +
            '-' +
            dayjs(param.time.year + '-' + param.time.month + '-' + param.time.day)
              .endOf('week')
              .format('MMMM D, YYYY')
          : dayjs(param.time.year + '-' + param.time.month + '-' + param.time.day).format('MMMM D, YYYY');

        const price = param.seriesPrices.get(series);

        toolTip.innerHTML =
          `<div style="font-size: 16px; margin: 4px 0px; color: ${textColor};">${title}</div>` +
          `<div style="font-size: 22px; margin: 4px 0px; color: ${textColor}">` +
          formattedNum(price, units) +
          '</div>' +
          '<div>' +
          dateStr +
          '</div>';
      }
    });

    chart.timeScale().fitContent();

    return () => {
      chart.remove();
    };
  }, [base, baseChange, title, topScale, type, useWeekly, width, units, formattedData, darkMode]);

  return (
    <div style={{ position: 'relative' }}>
      <div ref={ref} id={'test-id' + chainId + type} />
    </div>
  );
};

export default TradingViewChart;
