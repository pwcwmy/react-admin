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
npm install @reduxjs/toolkit react-redux