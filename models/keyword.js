import {HTTP} from "../util/http-p";

/**
 * 搜索关键词业务
 * */
class KeywordModel extends HTTP {
    key = 'q'
    maxLength = 10

    getHistory(){
        const words = wx.getStorageSync(this.key)
        if (!words) {
            return []
        }
        return words
    }


    getHot(){
        return this.request({
            url:'/book/hot_keyword'
        })
    }

    addToHistory(keyword){
        // let words = this.getHistory() || []

        let words = this.getHistory()
        const has = words.includes(keyword)
        if (!has) {
            // 数组长度超过最大长度时,把末尾元素删除,再添加新的元素到数组头
            const length = words.length
            if (length >= this.maxLength) {
                words.pop()
            }
            words.unshift(keyword)
            wx.setStorageSync(this.key, words)
        }
    }
}


export {KeywordModel}