// 高阶组件
import React from 'react'
import { Navigate } from 'react-router-dom'

// 通过children获取插槽内容，内部对象
export default function RouterAuth({ children }) {
    const token = localStorage.getItem("token")
    if (!token) {
        return <Navigate to="/login" replace></Navigate>
    }
    return children
}
