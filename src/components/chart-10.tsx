import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import { createEchartsOptions } from '../shared/create-echarts-options'
import { faker } from '@faker-js/faker'

let qu = []
const getData = () => {
  for (let i = 0; i < 5; i++) {
    qu.push(faker.finance.amount() / 10)
  }
  return qu
}
console.log(getData())
export const Chart10 = () => {
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

  const x = (data) => {
    myChart.current.setOption(
      createEchartsOptions({
        xAxis: {
          data: ['入室抢劫', '当街偷盗', '团伙诈骗', '刑事案件', '民事案件'],
          axisTick: { show: false },
          axisLine: {
            lineStyle: { color: '#083B70' },
          },
          axisLabel: {
            formatter(val: string) {
              if (val.length > 2) {
                const array = val.split('')
                array.splice(2, 0, '\n')
                return array.join('')
              } else {
                return val
              }
            },
          },
        },

        yAxis: {
          splitLine: { show: false },
          axisLine: {
            show: true,
            lineStyle: { color: '#083B70' },
          },
        },
        series: [
          {
            type: 'bar',
            data: data,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#0A97FB',
              },
              {
                offset: 1,
                color: '#1E34FA',
              },
            ]),
          },
        ],
      })
    )
  }
  useEffect(() => {
    myChart.current = echarts.init(divRef.current)
    x(data)
  }, [])

  return <div ref={divRef} className="chart"></div>
}
