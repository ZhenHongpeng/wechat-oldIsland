/**
 * 发送请求获取数据到组件中步骤2.封装HTTP请求函数并导出
 * */

import {config} from '../config.js'

const tips = {
  1:'抱歉,出现了一个错误',
  1005:'appkey无效',
  3000:'期刊不存在'
}
class HTTP {
  request(params) {
    if (!params.method) {
      params.method = 'GET'
    }
    wx.request({
      url: config.api_base_url + params.url,
      method: params.method,
      data: params.data,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      success: (res) => {
        let code = res.statusCode.toString()
        if (code.startsWith('2')) {
          // 将获取到的res返回给调用者
          params.success && params.success(res.data) //如果有回调函数再执行回调函数
        } else {
          // 处理错误信息
          let error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail: (err) => {
        this._show_error(1)
      }
    })
  }

  // 约定:下划线开头的一般是私有方法
  _show_error(error_code){
    if(!error_code){
      error_code = 1
    }
    wx.showToast({
      title: tips[error_code],
      icon: 'none',
      duration: 2000
    })
  }
}

export {HTTP}