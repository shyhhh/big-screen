import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import { createEchartsOptions } from '../shared/create-echarts-options'
import { px } from '../shared/px'

export const Chart3 = () => {
  const divRef = useRef(null)
  const myChart = useRef(null)
  const data = [
    { name: '2015', h1: 0.01, h2: 0.05, h3: 0.09, h4: 0.09, h5: 0.02 },
    { name: '2016', h1: 0.02, h2: 0.04, h3: 0.08, h4: 0.13, h5: 0.11 },
    { name: '2017', h1: 0.03, h2: 0.02, h3: 0.07, h4: 0.15, h5: 0.09 },
    { name: '2018', h1: 0.04, h2: 0.09, h3: 0.06, h4: 0.06, h5: 0.01 },
    { name: '2019', h1: 0.11, h2: 0.13, h3: 0.04, h4: 0.03, h5: 0.03 },
    { name: '2020', h1: 0.22, h2: 0.09, h3: 0.05, h4: 0.02, h5: 0.07 },
    { name: '2021', h1: 0.2,  h2: 0.03, h3: 0.07, h4: 0.01, h5: 0.08 },
    { name: '2022', h1: 0.08, h2: 0.01, h3: 0.09, h4: 0.03, h5: 0.03 },
    { name: '2023', h1: 0.01, h2: 0.02, h3: 0.01, h4: 0.13, h5: 0.18 },
  ]
  useEffect(() => {
    var myChart = echarts.init(divRef.current)
    setInterval(() => {
      const newData = [
        { name: '2015', h1: Math.random()/10, h2:  Math.random()/10, h3:  Math.random()/10, h4:  Math.random()/10, h5:  Math.random()/10 },
        { name: '2016', h1:  Math.random()/10, h2:  Math.random()/10, h3:  Math.random()/10, h4:  Math.random()/10, h5:  Math.random()/10 },
        { name: '2017', h1:  Math.random()/10, h2:  Math.random()/10, h3:  Math.random()/10, h4:  Math.random()/10, h5:  Math.random()/10 },
        { name: '2018', h1:  Math.random()/10, h2:  Math.random()/10, h3:  Math.random()/10, h4:  Math.random()/10, h5:  Math.random()/10 },
        { name: '2019', h1:  Math.random()/10, h2:  Math.random()/10, h3:  Math.random()/10, h4:  Math.random()/10, h5:  Math.random()/10 },
        { name: '2020', h1:  Math.random()/10, h2:  Math.random()/10, h3:  Math.random()/10, h4:  Math.random()/10, h5:  Math.random()/10 },
        { name: '2021', h1:  Math.random()/10, h2:  Math.random()/10, h3:  Math.random()/10, h4:  Math.random()/10, h5:  Math.random()/10 },
        { name: '2022', h1:  Math.random()/10, h2:  Math.random()/10, h3:  Math.random()/10, h4:  Math.random()/10, h5:  Math.random()/10 },
        { name: '2023', h1:  Math.random()/10, h2:  Math.random()/10, h3:  Math.random()/10, h4:  Math.random()/10, h5:  Math.random()/10 },
      ]
      x(newData)
    }, 3000)
  }, [])
  const x = (data: any) => {
    myChart.current.setOption(
      createEchartsOptions({
        legend: {
          bottom: px(10),
          textStyle: { color: 'white' },
          itemWidth: px(30),
          itemHeight: px(16),
        },
        grid: {
          x: px(20),
          x2: px(20),
          y: px(20),
          y2: px(70),
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: data.map((i: any) => i.name),
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
            name: '抢劫',
            type: 'line',
            data: data.map((i: any) => i.h1).reverse(),
          },
          {
            name: '醉驾',
            type: 'line',
            data: data.map((i: any) => i.h2).reverse(),
          },
          {
            name: '盗窃',
            type: 'line',
            data: data.map((i: any) => i.h3).reverse(),
          },
          {
            name: '故意杀人',
            type: 'line',
            data: data.map((i: any) => i.h4).reverse(),
          },
          {
            name: '故意伤人',
            type: 'line',
            data: data.map((i: any) => i.h5).reverse(),
          },
        ].map(obj => ({
          ...obj,
          symbol: 'circle',
          symbolSize: px(12),
          lineStyle: { width: px(2) },
        })),
      })
    )
  }
    useEffect(() => {
      myChart.current = echarts.init(divRef.current)
      x(data)
  }, [])

  return (
    <div className="bordered 发案趋势">
      <h2>发案趋势分析</h2>
      <div ref={divRef} className="chart" />
    </div>
  )
}
