// 使用语法检查严格模式
"use strict"
console.log("-----MiVue项目webpack配置加载start-----")
//项目路径相关
const path = require('path')
//打包编译html文件工具
const HtmlWebpackPlugin = require('html-webpack-plugin')
// webpack 配置
const webpack = require('webpack')

module.exports = {
	entry: './src/index.js', //项目入口配置
	output: {
		// path 组件可以获取当前项目路径		
		path: path.resolve(__dirname,'dist'),  //知道打包路径为根目录下dist文件夹 
		filename: 'MinVue.min.js'  //指定打包产品文件名称为 MinVue.min.js
	},
	// devServer: {
	//     contentBase: './dist',
	//     hot: true
	// },
	devtool: 'inline-source-map',//生成一个 DataUrl 形式的 SourceMap 文件.
	module: {
		rules: [
			{
				test: /\.js$/,  //指定了查找js文件
				/*
				 //这里指定node_modules  通常情况下一个一个项目包含有一个包的,
				 但是对于开发 生产 测试环境不同到吗环境功用包的情况下  这个地方
				 的配置就很有用,不需要每个项目根目录下都有node_modules文件夹,
				 这样可以节省磁盘空间
				*/
				exclude: ['/node_modules/','/source/'], 
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env']
					}
				}
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin(
			{
				filename: 'index.html',//知道项目首页文件
				template: 'index.html',//指定模板
				injeft:true
			}
		),
		new webpack.NamedModulesPlugin(), //webpack模板命名插件
		new webpack.HotModuleReplacementPlugin() //webpack自带模板热替换插件
		
	]
}



















console.log("-----MiVue项目webpack配置加载end-----")