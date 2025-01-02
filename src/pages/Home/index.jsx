import React, { useEffect, useState } from 'react'
import { Col, Row, Card, Table } from 'antd'
import './index.css'
import { getData } from '../../api'
import * as Icon from '@ant-design/icons'
import * as echarts from 'echarts';
import MyEcharts from '../../components/Echarts'

// iconname转antd icons
const iconnameToElement = ((iconname) => React.createElement(Icon[iconname]))

// table列的数据
const columns = [
  {
    title: '课程',
    dataIndex: 'name'
  },
  {
    title: '今日购买',
    dataIndex: 'todayBuy'
  },
  {
    title: '本月购买',
    dataIndex: 'monthBuy'
  },
  {
    title: '总购买',
    dataIndex: 'totalBuy'
  }
]

// content 右上方统计数据
const countData = [
  {
    "name": "今日支付订单",
    "value": 1234,
    "icon": "CheckCircleOutlined",
    "color": "#2ec7c9"
  },
  {
    "name": "今日收藏订单",
    "value": 3421,
    "icon": "ClockCircleOutlined",
    "color": "#ffb980"
  },
  {
    "name": "今日未支付订单",
    "value": 1234,
    "icon": "CloseCircleOutlined",
    "color": "#5ab1ef"
  },
  {
    "name": "本月支付订单",
    "value": 1234,
    "icon": "CheckCircleOutlined",
    "color": "#2ec7c9"
  },
  {
    "name": "本月收藏订单",
    "value": 3421,
    "icon": "ClockCircleOutlined",
    "color": "#ffb980"
  },
  {
    "name": "本月未支付订单",
    "value": 1234,
    "icon": "CloseCircleOutlined",
    "color": "#5ab1ef"
  }
]

export default function Home() {
  // 创建echarts 响应数据
  const [echartData, setEchartData] = useState({})

  // 定义table数据
  const [tableData, setTableData] = useState([])

  // 传入[] 表示dom首次渲染完成
  useEffect(() => {
    getData().then((res) => {
      console.log('homeApi res data', res.data)
      const { tableData, orderData, userData, videoData } = res.data.data
      setTableData(tableData)

      // 组装MyEcharts组件所需数据
      // x轴数据
      const xData = orderData.date
      // series数据
      const keyArray = Object.keys(orderData.data[0])
      const series = []
      keyArray.forEach(key => {
        series.push({
          name: key,
          data: orderData.data.map(item => item[key]),
          type: 'line' // 折线图
        })
      })
      setEchartData({
        // 折线图
        order: {
          xData: xData,
          series: series
        },
        // 柱状图
        user: {
          xData: userData.map(item => item.date),
          series: [
            {
              name: '新增用户',
              data: userData.map(item => item.new),
              type: 'bar'
            },
            {
              name: '活跃用户',
              data: userData.map(item => item.active),
              type: 'bar'
            }
          ]
        },
        // 饼图
        video: {
          series: {
            data: videoData,
            type: 'pie'
          }
        }
      })
    })

    // 基于准备好的dom，初始化echarts实例
    // var myChart = echarts.init(document.getElementById('main'));
    // 绘制图表
    // myChart.setOption({
    //   title: {
    //     text: 'ECharts 入门示例'
    //   },
    //   tooltip: {},
    //   xAxis: {
    //     data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    //   },
    //   yAxis: {},
    //   series: [
    //     {
    //       name: '销量',
    //       type: 'bar',
    //       data: [5, 20, 36, 10, 10, 20]
    //     }
    //   ]
    // });

  }, [])

  const userImg = require('../../assets/images/user.png')
  return (
    <Row className='home'>

      {/* 左侧Col */}
      <Col span={8}>
        {/* 个人信息 */}
        <Card hoverable>
          <div className='user'>
            <img src={userImg} alt='user' />
            <div className='userInfo'>
              <p className='name'>Admin</p>
              <p className='access'>超级管理员</p>
            </div>
          </div>
          <div className='login-info'>
            <p>上次登录时间:<span>2025-01-01</span></p>
            <p>上次登录地点<span>上海</span></p>
          </div>
        </Card>
        {/* 左下方表格 */}
        <Card>
          <Table columns={columns} dataSource={tableData} rowKey={"name"} pagination={false} />
        </Card>
      </Col>

      {/* 右侧Col */}
      <Col span={16}>
        {/* 右上方订单统计数据 */}
        <div className='num'>
          {
            countData.map((item, index) => {
              return (
                // 这里key用index有风险
                <Card key={index} >
                  <div className='icon-box' style={{ background: item.color }}>{iconnameToElement(item.icon)}</div>
                  <div className='detail'>
                    <p className='value'>${item.value}</p>
                    <p className='name'>{item.name}</p>
                  </div>
                </Card>
              )
            })
          }
        </div>

        {/* <div id="main" style={{height: '300px'}}></div> */}
        {/* 短路操作 订单折线图*/}
        {echartData.order && <MyEcharts chartData={echartData.order} style={{ height: '280px' }} isAxisChart={true} />}
        <div className='graph'>
          {echartData.user && <MyEcharts chartData={echartData.user} style={{ height: '240px', width: '50%' }} isAxisChart={true} />}
          {echartData.video && <MyEcharts chartData={echartData.video} style={{ height: '260px', width: '50%' }} isAxisChart={false} />}
        </div>
      </Col>
    </Row>
  )
}
