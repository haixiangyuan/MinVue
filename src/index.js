import MinVue from '../source/index.js'

console.log('项目主入口文件')

const vm = new MinVue({
	el: '#app',
	data() {
		return {
			projectName: 'MintVue',
			projectInfo: {
				companyName: '三国集团',
				companyOwner: '司马懿'
			},
			arr:[2,3,{name:'孙悟空'}]
		}
	}
})

const vm1 = new MinVue({
	el: '#h11',
	data() {
		return {
			author: 'Mr.right',
			
		}
	}
})

vm._data.projectName = 'MintVue Plus'
vm._data.projectInfo = {
	companyName: '晋朝',
	companyOwner: '晋文帝'
}
vm.arr = ['1','2',{name:'无量天尊'}]
vm.arr[1] = '8'
vm.arr.push({des:'群魔乱舞'})
console.log(vm)

console.log(vm.projectInfo)