import axios from 'axios'

const baseUrl = '/api'

// axios二次封装核心
class HttpRequest {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }

    getInsideConfig() {
        return {
            baseUrl: this.baseUrl,
            header: {}
        }
    }

    interception(instance) {
        // Add a request interceptor
        instance.interceptors.request.use(function (config) {
            return config;
        }, function (error) {
            return Promise.reject(error);
        });

        // Add a response interceptor
        instance.interceptors.response.use(function (response) {
            return response;
        }, function (error) {
            return Promise.reject(error);
        });
    }

    request(options) {
        options = { ...this.getInsideConfig, ...options }
        // 创建axios实例
        const instance = axios.create()
        // 实例拦截器的绑定
        this.interception(instance)
        
        return instance(options)
    }
}

export default new HttpRequest(baseUrl)