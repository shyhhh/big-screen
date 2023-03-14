import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import { createEchartsOptions } from '../shared/create-echarts-options'
import { px } from '../shared/px'
import { faker } from '@faker-js/faker'
let qu = []
const getData = () => {
  for (let i = 0; i < 8; i++) {
    qu.push((faker.finance.amount() / 16000).toFixed(2))
  }
  return qu
}
export const Chart9 = () => {
  const divRef = useRef(null)
  const myChart = useRef(null)
  const data = getData()
  useEffect(() => {
    var myChart = echarts.init(divRef.current)
    setInterval(() => {
      qu = []
      const newData = getData()
      x(newData)
    }, 2500)
  }, [])
  const x = (data: any) => {
    myChart.current.setOption(
      createEchartsOptions({
        color: '#F7A110',
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [10, 18, 28, 38, 48, 58, 68, 78],
          splitLine: { show: true, lineStyle: { color: '#073E78' } },
          axisTick: { show: false },
          axisLine: { show: false },
        },
        yAxis: {
          type: 'value',
          splitLine: { lineStyle: { color: '#073E78' } },
          axisLabel: {
            formatter(val: number) {
              return val * 100 + '%'
            },
          },
        },
        series: [
          {
            type: 'line',
            data: data,
            symbol: 'circle',
            symbolSize: px(12),
            lineStyle: { width: px(2) },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#F7A110',
                },
                {
                  offset: 1,
                  color: '#1B1D52',
                },
              ]),
            },
          },
        ],
      })
    )
  }

  useEffect(() => {
    myChart.current = echarts.init(divRef.current)
    x(data)
  }, [])

  return (
    <div className="年龄段-图3">
      <h3>犯罪年龄趋势图</h3>
      <div ref={divRef} className="chart"></div>
    </div>
  )
}
