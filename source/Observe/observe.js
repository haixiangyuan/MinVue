import {observe} from './index.js'
import {arrayMethods,observeArray} from './array.js'
import Dep from './dep.js'
class Observe{
	// console.log('数据进入观察者模式',data)
	/*
		这块的data 为vm_data
	*/
	constructor(data) {
		if(Array.isArray(data)) {
			data.__proto__ = arrayMethods
			observeArray()
		}else{
			this.awake(data)
		}
	}
	awake(data) {
		var keys = Object.keys(data)
		for(var i=0;i<keys.length;i++) {
			var key = keys[i]
			var value = data[keys[i]]
			//监听对象数据 键值的变化
			listenData(data,key,value)
		}
	}
}

export function listenData(data,key,value) {
	//观察数据是不是对象
	observe(value)
    let dep = new Dep() // 新增代码：一个key对应一个dep
	Object.defineProperty(data,key,{
		get() {
			if(Dep.target) {
				//让dep保存watcher  也让watcher保存dep
				dep.depend()
			}
			return value
		},
		set(newValue) {
			if(newValue === value) return 			
				value = newValue
				// 递归判断数据是不是对象
				observe(value)
				// 当设置属性的时候，实现更新
				dep.notify()
				
		}
	})
}

export default Observe