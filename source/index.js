"use strict"
import {initState} from './Observe/index.js' 
import {complier} from './Observe/compiler.js'
import Watcher from './Observe/Watcher.js'
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
	/*
		初始化渲染页面
	*/
	if(vm.$options.el) {
		vm.$mount()
	}
	
}
MinVue.prototype.$mount = function(){
	let vm = this
	let el = vm.$options.el
	/*
		将当前el属性挂载在vm实例的$el属性上 并从dom元素中获取当前节点
	*/
	el = vm.$el = query(el)
	/*
		获取组件  更新组件值
	*/
	let updateComponent = () =>{
		
		vm._update()
	}
	console.log('更新和渲染页面dom组件',updateComponent)
	new Watcher(vm,updateComponent)
}

function query(el) {	
	if(typeof el === 'string'){
		console.log('当前dom元素的el属性为:',document.querySelector(el))
		return document.querySelector(el)
	}
	return el
}

MinVue.prototype._update = function() {
	let vm = this
	let el = vm.$el
	//渲染所有元素 ,把元素替换为数据
	let node = document.createDocumentFragment()
	let firstChild 
	while(firstChild = el.firstChild) {
		node.appendChild(firstChild)
	}
	// 编译文本
	complier(node,vm)
	//将文本替换 重新更新到页面
	el.appendChild(node)
	
}

export default MinVue