/*
  发送请求获取数据到组件中步骤3.
  导入HTTP对象
* 使用ClassicModel继承HTTP 发送请求,
* 这样在各个页面中可以调用各自的请求函数达到封装作用
* */

import {HTTP} from '../util/http.js' // 导入请求函数

class ClassicModel extends HTTP {
    getLatest(sCallback) {
        this.request({
            url: 'classic/latest',
            success: (res) => {
                // 如何把res传递到classic页面?
                // classic页面调用getLastest时传入回调函数,将res发送到classic页面上
                sCallback(res)
                this._setLatestIndex(res.index)
                let key = this._getKey(res.index)
                wx.setStorageSync(key,res)
            }
        })
    }

    getClassic(index, nextOrPreviours, sCallback) {
        let key = nextOrPreviours == 'next' ? this._getKey(index + 1) : this._getKey(index - 1)
        let classic = wx.getStorageSync(key)
        if (!classic) {
            this.request({
                url: `classic/${index}/${nextOrPreviours}`,
                success: (res) => {
                    wx.setStorageSync(
                        this._getKey(res.index),
                        res
                    )
                    sCallback(res)
                }
            })
        }else {
            sCallback(classic)
        }
    }


    isFirst(index) {
        return index == 1 ? true : false
    }

    isLatest(index) {
        let latestIndex = this._getLatestIndex()
        return latestIndex == index ? true : false
    }

    getMyfavor(success){
        const params = {
            url: 'classic/favor',
            success:success
        }
        this.request(params)
    }

    // 将当前期号保存到微信缓存中,便于对比当前是否为最新一期
    _setLatestIndex(index) {
        wx.setStorageSync('latest', index)
    }

    _getLatestIndex() {
        const index = wx.getStorageSync('latest')
        return index
    }

    _getKey(index) {
        let key = 'classic-' + index
        return key
    }

}

export {ClassicModel}