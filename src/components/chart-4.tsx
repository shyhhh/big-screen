import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import { createEchartsOptions } from '../shared/create-echarts-options'
import { px } from '../shared/px'
import { faker } from '@faker-js/faker'

let qu = []
const getData = () => {
  for (let i = 0; i <= 12; i++) {
    qu.push(faker.finance.amount()/1000)
  }
  return qu
}
export const Chart4 = () => {
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
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24],
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
                  color: '#414a9f',
                },
                {
                  offset: 1,
                  color: '#1b1d52',
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
    <div className="bordered 案发时段">
      <h2>全年案发时段分析</h2>
      <div ref={divRef} className="chart" />
    </div>
  )
}
