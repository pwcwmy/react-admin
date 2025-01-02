## 一、动态配置路由
配置文件如下
```
export default  [
    {
        path: '/home',
        name: 'home',
        label: '首页',
        icon: 'HomeOutlined',
        url: '/home/index'
    },
    {
        path: '/mall',
        name: 'mall',
        label: '商品管理',
        icon: 'ShopOutlined',
        url: '/mall/index'
    },
    {
        path: '/user',
        name: 'user',
        label: '用户管理',
        icon: 'UserOutlined',
        url: '/user/index'
    },
    {
        path: '/other',
        label: '其他',
        icon: 'SettingOutlined',
        children: [
        {
            path: '/other/pageOne',
            name: 'page1',
            label: '页面1',
            icon: 'SettingOutlined'
        },
        {
            path: '/other/pageTwo',
            name: 'page2',
            label: '页面2',
            icon: 'SettingOutlined'
        }
        ]
    }
]
```

获取路由配置，来源后端接口返回
```
import MenuConfig from '../../config'
const iconnameToElement = ((iconname) => React.createElement(Icon[iconname]))
const items = MenuConfig.map((item) => {
  // 没有子菜单
  const child = {
    key: item.key,
    label: item.label,
    icon: iconnameToElement(item.icon)
  }
  // 有子菜单就在chidren属性内部 map return
  if (item.children) {
    child.children = item.children.map((item) => {
      return {
        key: item.key,
        label: item.label
      }
    })
  }
  // 合并return child
  return child
})
```


## 下拉菜单
<Dropdown menu={{items}}> 
这里注意是{{}}
因为获取const变量也需要{}

## 三、redux store reducers
如何安装
```
npm install @reduxjs/toolkit react-redux
```
```
import { useDispatch } from 'react-redux';
import {collapseMenu} from '../../store/reducers/tab'

  // 创建dispatch
  const dispatch = useDispatch()
  // 点击展开收起按钮回调
  const setCollapsed = () => {
    console.log('CommonHeader中点击按钮后',collapsed)
    dispatch(collapseMenu())
  }
```
  这里为什么要多余创建一个dispatch


  (0 , _store_reducers_tab__WEBPACK_IMPORTED_MODULE_2__.collapseMenu) is not a function TypeError: (0 , _store_reducers_tab__WEBPACK_IMPORTED_MODULE_2__.collapseMenu) is not a function

  这里需要把reducer/tab.js中reducer改为reducers
  ```
  import { createSlice } from "@reduxjs/toolkit";

const tabSlice = createSlice({
    name: 'tab',
    initialState: {
        isCollapse: false
    },
    reducers: {
        collapseMenu: state => {
            state.isCollapse = !state.isCollapse
        }
    }
})

export const {collapseMenu} = tabSlice.actions
export default tabSlice.reducer
  ```

## 四、axios二次封装
https://axios-http.com/docs/interceptors

## Mock.js
Mock.mock()
3个参数
rurl
rtype
template

## 自适应 栅格 flex

## Echarts
```
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
        order: {
          xData: xData,
          series: series
        }
      })
```