import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import userApi from './mockServeData/user'
Mock.mock(/home\/getData/, homeApi.getStatisticalData)
Mock.mock(/user\/getUser/, userApi.getUserList)

Mock.mock(/user\/createUser/, userApi.createUser)
Mock.mock(/user\/updateUser/, userApi.updateUser)
Mock.mock(/user\/deleteUser/, userApi.deleteUser)