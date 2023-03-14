import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import { createEchartsOptions } from '../shared/create-echarts-options'
import { px } from '../shared/px'
import { faker } from '@faker-js/faker'

const dataChart3 = (i) => ({
  name: i, h1: faker.finance.amount(), h2: faker.finance.amount(), h3: faker.finance.amount(), h4: faker.finance.amount(), h5: faker.finance.amount()
})
let data1 = []
const getData = (action) => {
  for (let i = 1; i <= 12; i++) {
    data1.push(action(i))
  }
  return data1
}
export const Chart3 = () => {
  const divRef = useRef(null)
  const myChart = useRef(null)
  const data = getData(dataChart3)
  useEffect(() => {
    var myChart = echarts.init(divRef.current)
    const id = setInterval(() => {
      data1 = []
      const newData = getData(dataChart3)
      x(newData)
    }, 3000)
    return () => {
      clearInterval(id)
    }
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
              return Math.floor((val / 150)) + '%'
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
      <h2>历年发案趋势分析</h2>
      <div ref={divRef} className="chart" />
    </div>
  )
}
