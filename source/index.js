"use strict"
import {initState} from './Observe/index.js' 
console.log('项目源码!')
function MinVue(options) {
	
	console.log('初始化MinVue')
	/*
		自定义数据初始化方法
		 @parmas options代表vue实例挂在的数据对象
	*/
	this._init(options)
}

/*
	使用原型链修改MinVue对象中原型方法_init 初始化数据
*/
MinVue.prototype._init = function(options) {
	var vm =this
	// this.$options表示MinVue()中的options参数  数据 
	vm.$options = options
	//重新初始化数据data
	initState(vm)
}

export default MinVue