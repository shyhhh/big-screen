import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import { createEchartsOptions } from '../shared/create-echarts-options'
import { px } from '../shared/px'
// import china from '../geo/china.json';
import china from '../geo/hangzhou.json'

export const Chart6 = () => {
  const divRef = useRef(null)
  const colors = { 余杭区: '#BB31F7', 滨江区: '#15B8FD', 下沙区: '#06E1EE' }
  useEffect(() => {
    var myChart = echarts.init(divRef.current)
    // @ts-ignore
    echarts.registerMap('CN', china)
    myChart.setOption(
      createEchartsOptions({
        xAxis: { show: false },
        yAxis: { show: false },
        series: [
          {
            type: 'map',
            mapType: 'CN', // 自定义扩展图表类型
            data: [{ name: '余杭区', value: 1 }],
            label: { show: false, color: 'white' },
            itemStyle: {
              areaColor: '#010D3D',
              color: colors['余杭区'],
              borderColor: '#01A7F7',
              emphasis: {
                label: { color: 'white' },
                areaColor: '#5470C6',
              },
            },
          },
          {
            type: 'map',
            mapType: 'CN', // 自定义扩展图表类型
            data: [{ name: '拱墅区', value: 100 }],
            itemStyle: {
              areaColor: '#010D3D',
              color: colors['拱墅区'],
              borderColor: 'yellow',
              emphasis: {
                label: { color: 'white' },
                areaColor: '#5470C6',
              },
            },
          },
          {
            type: 'map',
            mapType: 'CN', // 自定义扩展图表类型
            data: [{ name: '滨江区', value: 100 }],
            itemStyle: {
              areaColor: '#010D3D',
              color: colors['滨江区'],
              borderColor: '#01A7F7',
              emphasis: {
                label: { color: 'white' },
                areaColor: '#5470C6',
              },
            },
          },
        ],
      })
    )
  }, [])

  return (
    <div className="bordered 籍贯">
      <h2>全市犯罪人员籍贯分布地</h2>
      <div className="wrapper">
        <div ref={divRef} className="chart" />
        <div className="legend bordered">
          <span className="icon" style={{ background: colors['余杭区'] }} />
          余杭区
          <span className="icon" style={{ background: colors['拱墅区'] }} />
          拱墅区
          <span className="icon" style={{ background: colors['滨江区'] }} />
          滨江区
        </div>
        <div className="notes">此地图仅显示了中国的部分区域</div>
      </div>
    </div>
  )
}
