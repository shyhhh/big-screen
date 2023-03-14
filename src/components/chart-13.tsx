import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import { createEchartsOptions } from '../shared/create-echarts-options'
import { faker } from '@faker-js/faker'
const data = (value, name) => ({ value, name })
const nameChart13 = ['东岗路', '段家滩', '雁北', '五泉山', '中山路', '庆阳路', '武都路', '酒泉路', '天水路']

let data1 = []
const getData = (names) => {
  for (let i = 0; i < names.length; i++) {
    data1.push(data(faker.finance.amount() / 10000, names[i]))
  }
  return data1
}
export const Chart13 = () => {
  const divRef = useRef(null)
  const myChart = useRef(null)
  const data = getData(nameChart13)
  useEffect(() => {
    var myChart = echarts.init(divRef.current)
    const id = setInterval(() => {
      data1 = []
      const newData = getData(nameChart13)
      x(newData)
    }, 1600)
    return () => {
      clearInterval(id)
    }
  }, [])
  const x = (data) => {
    myChart.current.setOption(
      createEchartsOptions({
        xAxis: {
          data: data.map(i => i.name),
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
          axisLabel: {
            formatter(value: number) {
              return (value * 100).toFixed(0) + '%'
            },
          },
        },
        series: [
          {
            type: 'bar',
            data: data.map(i => i.value),
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
