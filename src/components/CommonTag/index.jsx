import React from 'react'
import { Tag, Space } from 'antd'
import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import { closeTab, setCurrentMenu } from '../../store/reducers/tab'
import { useLocation, useNavigate } from 'react-router-dom'

export default function CommonTag() {
    const tabList = useSelector(state => state.tab.tabList)
    const currentMenu = useSelector(state => state.tab.currentMenu)
    console.log('useSelector 获取到 tabList', tabList)
    console.log('useSelector 获取到 currentMenu', currentMenu)

    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const handleClose = (tag, index) => {
        let len = tabList.length - 1
        dispatch(closeTab(tag))
        // 关闭的不是当前的tag
        if (tag.path !== location.pathname) {
            return
        }
        if (index === len) { // 说明关闭的是当前的tag
            // 设置当前数据(也就是前一位) 并路由跳转
            const curData = tabList[index - 1]
            dispatch(setCurrentMenu(curData))
            navigate(curData.path)
        } else {
            // 点击关闭的是中间， 跳转下一位, tagList要至少存在一个
            if (tabList.length > 1) {
                const nextData = tabList[index + 1]
                dispatch(setCurrentMenu(nextData))
                navigate(nextData.path)
            }
        }
    }

    // 点击tag 切换page
    const handleChange = (tag) => {
        dispatch(setCurrentMenu(tag))
        navigate(tag.path)
    }

    // tag的显示函数
    const setTag = (flag, item, index) => {
        return (
            flag ?
                <Tag key={item.path} color='#55acee' closeIcon onClose={() => handleClose(item, index)}>{item.label}</Tag>
                :
                <Tag key={item.path} onClick={() => handleChange(item)} >{item.label}</Tag>
        )
    }

    return (
        <Space className='common-tag' size={[0, 8]} wrap>
            {/* <Tag>首页</Tag>
            <Tag color='#55acee' closeIcon onClose={() => handleClose()}>用户列表</Tag> */}
            {
                currentMenu.name && tabList.map((item, index) => setTag(item.path === currentMenu.path, item, index)
                    //   如果有多个渲染，建议专门一个函数
                )
            }
        </Space>
    )
}
