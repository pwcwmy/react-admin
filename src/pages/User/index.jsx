import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Table, Popconfirm, Modal, InputNumber, Select, DatePicker } from 'antd'
import './index.css'
import { getUser, createUser, updateUser, deleteUser } from '../../api'
import dayjs from 'dayjs'



export default function User() {

  const [listData, setListData] = useState({
    name: ""
  })

  // 如果这里不初始化为数组, table的datasource 会报错rawData.some is not a function
  const [tableData, setTableData] = useState([])

  // 0 新增 1 编辑
  const [modalType, setModalType] = useState(0)

  // isModalOpen
  const [isModalOpen, setIsModalOpen] = useState(false)

  // 弹窗确定
  const handleOK = () => {
    // 1. 表单校验  
    form.validateFields().then((val) => {
      val.birth = dayjs(val.birth).format('YYYY-MM-DD')
      // 2. 调用后端接口
      if (modalType === 0) {
        // 0  新增
        createUser(val).then(() => {
          handleCancel()
          getTableData()
        })
      } else {
        // 1  编辑
        updateUser(val).then(() => {
          handleCancel()
          getTableData()
        })
      }
    }).catch((err) => {
      console.log('新增或编辑用户信息发生错误', err)
    }
    )
  }
  // 弹窗取消
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  // 创建（新增和编辑）表单实例
  const [form] = Form.useForm()

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

  // 表格列定义
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name'
    },
    {
      title: '年龄',
      dataIndex: 'age'
    },
    {
      title: '性别',
      dataIndex: 'sex',
      render: (val) => {
        return val ? '女' : '男'
      }
    },
    {
      title: '出生日期',
      dataIndex: 'birth'
    },
    {
      title: '地址',
      dataIndex: 'addr'
    },
    {
      title: '操作',
      render: (rowData) => {
        return (
          <div className='flex-box'>
            <Button style={{ marginRight: '5px' }} onClick={() => handleClick('edit', rowData)}>编辑</Button>
            <Popconfirm
              title='提示'
              description="此操作将删除该用户,是否继续?"
              okText='确认'
              cancelText='取消'
              onConfirm={() => handleDelete(rowData)}
            // onCancel={}
            >
              <Button type="primary" danger>删除</Button>
            </Popconfirm>
          </div>
        )
      }

    },
  ]

  // 删除
  const handleDelete = ({ id }) => {
    // body 传入对象{id}
    deleteUser({ id }).then(() => {
      // 重新获取表格数据
      getTableData()
    })
  }

  // 点击搜索按钮, 提交表单
  const handleFinish = (e) => {
    console.log('表单内容', e)
    setListData({
      name: e.keyword
    })
  }

  // tableData随搜索框的listData一起变化
  useEffect(() => {
    getTableData()
  }, [listData])

  const getTableData = () => {
    getUser(listData).then(({ data }) => {
      setTableData(data.list)
    })

  }
  useEffect(() => {
    // 调用后端接口获取用户列表数据
    getTableData()
  }, [])
  return (
    <div className='user'>
      <div className='flex-box space-between'>
        {/* 上方新增按钮和搜索框 */}
        <Button type='primary' onClick={() => handleClick('add')}>+新增</Button>
        <Form layout='inline' onFinish={handleFinish}>
          <Form.Item name="keyword">
            <Input placeholder='请输入用户名' />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type='primary'>搜索</Button>
          </Form.Item>
        </Form>
      </div>

      {/* 表格主体 */}
      <Table style={{marginTop: '10px'}} columns={columns} dataSource={tableData} rowKey={"id"} />

      {/* 新增、编辑共用的弹窗 */}
      <Modal
        title={modalType ? '编辑用户' : '新增用户'}
        open={isModalOpen}
        onOk={handleOK}
        onCancel={handleCancel}
        okText='确定'
        cancelText='取消'
      >
        {/* 去antd看布局 */}
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          labelAlign='left'
          form={form}
        >
          {/* 先写表单域Form.Item */}

          {/* 编辑时需要记录的id 短路模式*/}
          {modalType === 1 && <Form.Item
            name="id" // name属性用于标识， 需要data里面恰好有id
            hidden
          >
            <Input></Input>
          </Form.Item>}

          <Form.Item
            label="姓名"
            name="name"
            rules={[
              {
                required: true,
                message: '请输入姓名',
              },
            ]}
          >
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item
            label="年龄"
            name="age"
            rules={[
              {
                type: 'number',
                message: '年龄必须是数字',
              },
              {
                required: true,
                message: '请输入年龄',
              },
            ]}
          >
            <InputNumber placeholder="请输入年龄" />
          </Form.Item>
          <Form.Item
            label="性别"
            name="sex"
            rules={[
              {
                required: true,
                message: '性别是必选项',
              },
            ]}
          >
            <Select
              placeholder="请选择性别"
              options={[
                { value: 0, label: '男' },
                { value: 1, label: '女' }
              ]}
            ></Select>
          </Form.Item>
          <Form.Item
            label="出生日期"
            name="birth"
            rules={[
              {
                required: true,
                message: '请选择出生日期',
              },
            ]}
          >
            <DatePicker placeholder="请选择" format="YYYY/MM/DD" />
          </Form.Item>
          <Form.Item
            label="地址"
            name="addr"
            rules={[
              {
                required: true,
                message: '请填写地址',
              },
            ]}
          >
            <Input placeholder="请填写地址" />
          </Form.Item>

        </Form>
      </Modal>

    </div>
  )
}
