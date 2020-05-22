import Observe from './observe.js'
export function initState(vm) {
	console.log('重新初始化MinVue实例数据')
	var opt = vm.$options
	/*
		判断options是否含有data属性
	*/	
	if(opt.data) {
		initData(vm)
	}	
}

function initData(vm) {
	var data = vm.$options.data
	/*
		判断用户传入vm实例的data属性是不是函数 如果是函数  
		在则使用call 原型函数 将data绑定在vm实例上
		如果data传入的是一个值 则使用该值
	*/
   data = vm._data = typeof data === 'function' ? data.call(vm) : data || {}
   console.log('判断数据的数据类型',data)
   /*
		将vm的指定key的键和值代理在vm._data上
   */
	for(let key in data) {
		//给所有data中对于的字段代理到_data上 
		//vm.data.msg          vm._data.msg
		proxy(vm,'_data',key)
	}
	
	// 观察者模式  观察vm实例上数据变化
	observe(data)
}

/*
	数据代理方法
	@target 需要代理的对象
	@source 需要代理的字段 _data
	@key   被绑定的字段
*/
function proxy(vm,source,key) {
	Object.defineProperty(vm,key,{
		get() {
			return vm[source][key]
		},
		set(newValue) {
			return vm[source][key] = newValue
		}
	})
}

export function observe(data) {
	if(typeof data !== 'object' || data == null) {
		return 
	}else{
		return new Observe(data)
	}
}