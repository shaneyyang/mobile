// 导入校验模块
// 1、导入localize模块函数
import { extend, localize } from 'vee-validate'

// 2、导入要使用的语言
import zhCN from 'vee-validate/dist/locale/zh_CN.json'

// 导入全部规则
import * as rules from 'vee-validate/dist/rules'

// 3、对导入的语言做注册
localize({
  // 对象成员简易赋值
  zhCN
})

// 4、使用具体的语言
localize('zhCN')

// 导入默认校验规则
// 获得对象中的全部的属性名称
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule])
})

// 自定义校验规则
extend('phone', {
  validate: value => {
    // return true 校验成功
    // return false 校验失败
    const reg = /^1[35789]\d{9}$/
    return reg.test(value)
  },
  // 校验失败的错误信息{_field_} 代表被校验项目的name的名称
  message: '{_field_}格式不正确'
})
