import {observe} from './index.js'
class Observe{
	// console.log('数据进入观察者模式',data)
	/*
		这块的data 为vm_data
	*/
	constructor(data) {
		this.awake(data)
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
	
	Object.defineProperty(data,key,{
		get() {
			return value
		},
		set(newValue) {
			if(newValue === value) {
				return 
			}else{
				value = newValue
				// 递归判断数据是不是对象
				observe(value)
			}
		}
	})
}

export default Observe