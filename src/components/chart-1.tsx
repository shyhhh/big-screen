import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import { createEchartsOptions } from '../shared/create-echarts-options'
import { faker } from '@faker-js/faker'

let data1 = []
const qu = ['拱墅区', '西湖区', '滨江区', '萧山区', '余杭区', '上城区', '钱塘区', '临平区']
const getData = (name) => {
  for (let i = 0; i < name.length; i++) {
    data1.push(name[i])
  }
  return data1
}
let quData = []
const amount = (length) => {
  for (let i = 0; i < length; i++) {
    quData.push(faker.finance.amount())
  }
  return quData
}

export const Chart1 = () => {
  const divRef = useRef(null)
  const myChart = useRef(null)

  const data = amount(8)
  console.log(data)
  useEffect(() => {
    var myChart = echarts.init(divRef.current)
    setInterval(() => {
      quData = []
      const newData = amount(8)
      x(newData)
    }, 1500)
  }, [])
  const x = (data: any) => {
    myChart.current.setOption(
      createEchartsOptions({
        xAxis: {
          data: qu,
          axisTick: { show: false },
          axisLine: {
            lineStyle: { color: '#083B70' },
          },
          axisLabel: {
            formatter(val) {
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
    <div className="bordered 管辖统计">
      <h2>部分案发派出所管辖统计</h2>
      <div ref={divRef} className="chart"></div>
    </div>
  )
}
