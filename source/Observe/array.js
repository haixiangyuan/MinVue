import {observe} from './index.js'
//获取Array对象原型链上的方法
let oldArrayPrototypeMethods = Array.prototype
//使用原型链上的方川创建新的对象
export let arrayMethods = Object.create(oldArrayPrototypeMethods)
 // 准备修改原型链上的数组操作方法
let methods = ['push','pop','shift','unshift','reverse','sort','splice']

export function observeArray(methodsArray) {
	if(methodsArray !== undefined){
		for(var i=0;i< methodsArray.length;i++) {
			observe(methodsArray[i])
		}
	}
}


methods.forEach(method =>{
	arrayMethods[method] = function(...arg) {
		//将原型链上的方法进行修改 监听后绑定到当前对象上
		var res = oldArrayPrototypeMethods[method].apply(this,arg)
		console.log('修改Array原型链上的方法后的值',res)
		/*
			上面的methods对象 我们只定义了默认的几个修改的方法名称
			对于用户新增的方法名称 我们这里也得做修改和监听
		*/
	    var inserted 
		switch(method) {
			case 'push':
			case 'unshift':
				inserted = arg
				break
			case 'splice':
				inserted = arg.slice(2)
				break
			default:
				break				
		}
		/*
			实现新增属性的监听
		*/
		if(inserted) {
			observeArray(inserted)
		}
		return res
	}	
})