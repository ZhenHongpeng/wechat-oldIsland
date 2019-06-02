// components/episode/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: { // 注意:properties和data中的变量不能同名!data中的变量会覆盖properties
        index: {
            type: String,
            // 注意: 不能在observer中修改属性本身的值,否则会死循环!!!
            observer: function (newVal, oldVal, changedPath) {
                let val = newVal < 10 ? '0' + newVal : newVal
                // console.log(val); // 08
                this.setData({
                    _index:val
                })
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        year: 0,
        month: '',
        _index: '',
        months:['壹月','贰月','叁月','肆月','伍月','陆月','柒月','捌月','玖月','拾月','拾壹月','腊月',]
    },

    /**
     * 组件的方法列表
     */
    methods: {},
    attached: function () {
        let date = new Date()
        let year = date.getFullYear()
        let month = date.getMonth()

        this.setData({
            year: year,
            month: this.data.months[month]
        })
    }
})