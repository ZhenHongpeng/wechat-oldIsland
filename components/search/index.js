import {KeywordModel} from "../../models/keyword";
import {BookModel} from "../../models/book";
import {paginationBev} from '../behaviors/pagination'

const keywordModel = new KeywordModel()
const bookModel = new BookModel()


// components/search/index.js
Component({

    behaviors: [paginationBev],
    /**
     * 组件的属性列表
     */
    properties: {
        more: {
            type: String,
            observer: 'loadMore'
        },
    },
    /**
     * 组件的初始数据
     */
    data: {
        historyWords: [],
        hotWords: [],
        searching: false,
        q: '',
        loading: false,
        loadingCenter:false
    },


    attached() {
        const historyWords = keywordModel.getHistory()
        const hotWords = keywordModel.getHot()

        Promise.all([historyWords, hotWords])
            .then(res => {
                this.setData({
                    historyWords: res[0],
                    hotWords: res[1].hot
                })
            })
    },

    /**
     * 组件的方法列表
     */
    methods: {
        loadMore() {
            if (!this.data.q) {
                return
            }
            if (this.isLocked()) {// 加锁,发送请求时不允许重新发送请求
                return
            }
            if (this.hasMore()) {
                this.locked()
                bookModel.search(this.getCurrentStart(), this.data.q)
                    .then(res => {
                        this.setMoreData(res.books)
                        this.unLocked()
                    },()=>{
                        this.unLocked()
                    })
            }
        },

        onCancel(event) {
            this.initialize()
            this.triggerEvent('cancel', {}, {})
        },

        onConfirm(event) {
            const q = event.detail.value || event.detail.text

            this.initialize()
            this._showResult(q)
            this._showLoadingCenter()

            bookModel.search(0, q).then(res => {
                this.setMoreData(res.books)
                this.setTotal(res.total)

                // 服务器返回正确的数据后,再将关键字添加到history中,保证历史记录中的数据都是有效的
                keywordModel.addToHistory(q)
                this._hiddenLoadingCenter()
            })

        },

        onDelete() {
            this.setData({
                loadingCenter:false,
                noneResult:false
            })
            this._closeResult()
        },


        _showResult(q){
            this.setData({
                searching: true,
                q: q,
            })
        },

        _closeResult(){
            this.setData({
                searching: false,
                q: ''
            })
        },

        _showLoadingCenter(){
            this.setData({
                loadingCenter:true
            })
        },
        _hiddenLoadingCenter(){
            this.setData({
                loadingCenter:false
            })
        },

    }
})
