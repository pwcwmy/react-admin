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
```
const [tableData, setTableData] = useState([]) // 如果这里不初始化为数组, table的datasource 会报错rawData.some is not a function
![alt text](image.png)


          <Form.Item
            label="年龄"
            name='age'
            rules={[
                // 细节：这里必须用列表[]包裹rules
              {
                require: true,
                message: '请输入年龄'
              },
              {
                type: 'number',
                message: '年龄必须为数字'
              }
            ]}
          >
            <InputNumber placeholder='请输入年龄'></InputNumber>
          </Form.Item>

const form = Form.useForm()  报错Cannot set properties of undefined (setting 'name')
在 React 中，const [form] = Form.useForm() 这一行代码使用了数组解构赋值的语法特性。这里的 [] 并不是直接与 Form.useForm() 函数调用相关联，而是用于从 Form.useForm() 返回的结果中提取特定值的一种方式。具体来说，Form.useForm() 方法返回的是一个数组，这个数组的第一个元素是一个 FormInstance 对象，它提供了许多用于操作表单的方法和属性5。

## dayjs 日期转换


数据回填
```
const handleClick = (type, rowData) => {
    setIsModalOpen(!isModalOpen)
    console.log('rowData', rowData)
    if (type === 'add') {
      setModalType(0) // 新增
    } else {
      setModalType(1) // 编辑
      // 数据回显
      // 深拷贝
      const cloneData = JSON.parse(JSON.stringify(rowData))
      cloneData.birth = dayjs(cloneData.birth)
      form.setFieldsValue(cloneData) // key和name一定要对应, 区分于setFieldValue
    }
  }



删除按钮带一个确认弹窗
```
<Popconfirm
  title='提示'
  description='此操作将删除该用户,是否继续?'
  okText='确认'
  cancelText='取消'
  onConfirm={() => handleDelete(rowData)}
// onCancel={}
>
  <Button type="primary" danger>删除</Button>
</Popconfirm>
```

在 JavaScript 模块系统中，使用 `import` 语句来引入其他模块导出的变量、函数或对象时，是否使用大括号 `{}` 主要取决于你想要导入的内容是默认导出（default export）还是命名导出（named export）。这不仅影响到语法结构，也涉及到如何在当前文件中使用这些导入的内容。下面详细解释 `import { selectMenuList } from '../../store/reducers/tab'` 中的大括号 `{}` 加与不加的区别。

### 使用大括号 `{}` 导入命名导出

当你看到如下代码：

```javascript
import { selectMenuList } from '../../store/reducers/tab';
```

这里的 `{}` 表明你正在从 `'../../store/reducers/tab'` 模块中导入一个或多个**命名导出**。这意味着 `'../../store/reducers/tab'` 模块内部通过 `export` 关键字明确地导出了一个名为 `selectMenuList` 的变量、函数或类等。这种方式允许你在同一个模块中导出多个不同的值，并且在导入时可以精确地选择需要使用的部分。

例如，在 `'../../store/reducers/tab'` 模块中可能有如下定义：

```javascript
export const selectMenuList = (state) => state.tab.menuList;
// 其他导出...
```

这样做的好处是你可以仅导入所需的部分，从而减少不必要的全局命名空间污染，并且有助于提高代码的可读性和维护性。

### 不使用大括号 `{}` 导入默认导出

相比之下，如果你省略了大括号，像这样：

```javascript
import selectMenuList from '../../store/reducers/tab';
```

则表示你正在导入 `'../../store/reducers/tab'` 模块的**默认导出**。每个模块只能有一个默认导出，默认导出可以是一个匿名函数、类、对象或其他任何类型的表达式。当使用这种形式的导入时，你可以为它指定任意名称，因为它不是根据原始模块中的名称进行绑定的。

例如，在 `'../../store/reducers/tab'` 模块中可能有如下定义：

```javascript
const selectMenuList = (state) => state.tab.menuList;

export default selectMenuList;
```

在这种情况下，即使模块内部定义了 `selectMenuList`，但它是作为默认导出被提供的，所以在导入时不需要用大括号，并且可以给它起一个新的名字：

```javascript
import mySelectMenuList from '../../store/reducers/tab';
```

这里 `mySelectMenuList` 和原来的 `selectMenuList` 是相同的引用，只是名称不同而已。

### 总结

- **带大括号 `{}`**：用于导入模块中的**命名导出**。你需要知道并使用导出的确切名称。
- **不带大括号 `{}`**：用于导入模块的**默认导出**。你可以自由选择导入后的名称，而不必受限于原始模块中的名称。

对于你的例子 `import { selectMenuList } from '../../store/reducers/tab'`，它表明 `'../../store/reducers/tab'` 模块中有一个名为 `selectMenuList` 的命名导出，而你希望在当前文件中以相同的名字使用它。如果你尝试去掉大括号直接导入，那么只有当 `'../../store/reducers/tab'` 模块确实提供了一个默认导出并且该默认导出恰好是你所需要的 `selectMenuList` 函数时，这段代码才会按预期工作。

因此，正确理解模块的导出方式（默认导出 vs. 命名导出）对于编写清晰、准确的 `import` 语句至关重要。此外，遵循一致的编码风格和良好的文档习惯也能帮助团队成员更好地理解和维护代码库。