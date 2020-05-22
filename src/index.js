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
			}
		}
	}
})


vm._data.projectName = 'MintVue Plus'
vm._data.projectInfo = {
	companyName: '晋朝',
	companyOwner: '晋文帝'
}

console.log(vm)

console.log(vm.projectInfo)