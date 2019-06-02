
// 为什么定义Behavior组件?
    // 因为有很多共用的重复的属性或方法,可以定义在Behavior中重复使用

// 定义Behavior组件->导出组件
// Behavior组件中可以填写properties,data,methods和小程序生命周期函数
let classicBeh = Behavior ({
    properties: {
        img:String,
        content:String,
        hidden:Boolean
    },
    data:{

    },
    attached:function () {

    },
    methods:{

    }

})

// 导出classicBeh组件->easay.js中导入
export {classicBeh}