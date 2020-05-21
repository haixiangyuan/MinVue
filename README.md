# 笔记

## 一、项目构建步骤

- 开发环境

  - ```
    首先确保电脑上已经安装最新版本nodejs环境
    查看本机是否安装node环境cmd命令   node -v
    ```

    

- 新建项目根目录初始化webpack初始化package.json

  - ```
    mkdir MinVue
    cd MinVue
    npm init -y   //会发现项目根目录已经创建成功package.json文件
    ```

- 安装项目必须依赖项目

  - ```
    npm install webpack webpack-cli webpack-dev-server  html-webpack-plugin clean-webpack-plugin babel-preset-env babel-loader@7.1.5  babel-core --save -dev
    ```

- 修改package.json文件自定义项目启动命令

  - ```
     "scripts": {	
        "dev": "webpack-dev-server --open --mode development",
      	"start": "npm run dev"
      },
    ```

    项目根目录cmd窗口运行

    ```
    npm run dev
    //结果  ｢wds｣: Project is running at http://localhost:8080/ 说明npm run dev命令ok
    ```

- 配置项目webpack配置文件x项目根目录 /webpack.config.js

  - ```
    cd.>webpack.config.js   //新建文件
    ```

    webpack.config.js文件输入代码，待会验证配置文件是否配置成功有用

    ```
    // 使用语法检查严格模式
    "use strict"
    console.log("-----MiVue项目webpack配置加载start-----")
    
    console.log("-----MiVue项目webpack配置加载end-----")
    ```

- 修改package.json文件  设置项目打包命令

  - ```
     "scripts": {	
        ...
      	"build": "webpack --config webpack.config.js --mode production"
      },
    ```

- 验证打包命令是否正确加载配置文件

  - ```
    //项目根目录cmd
    npm run build
    /*
      结果：
      	-----MiVue项目webpack配置加载start----
        -----MiVue项目webpack配置加载end-----
        注意：如果出现上述内容，则证明我们添加的webpack.config.js命令生效
    */
    ```

- 修改webpack.config.js 添加webpack打包具体配置

  - ```
    // 使用语法检查严格模式
    "use strict"
    console.log("-----MiVue项目webpack配置加载start-----")
    //项目路径相关
    const path = require('path')
    //打包编译html文件工具
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    // webpack 配置
    const webpack = require('webpack')
    
    console.log("-----MiVue项目webpack配置加载end-----")
    ```

    **注意**

    ```
    在这里 我们先使用 npm run build 命令在项目根目录检查  
    如果  console.log("-----MiVue项目webpack配置加载end-----")  正确打印，则表示上述依成功下载且正确配置。  如果报错，检查相关依赖是否有 或者因为node版本问题  这里不赘述。
    下面我们还将继续编辑webpack.config.js  切记边写边检查配置信息。
    
    ```

  - 项目根目录新建源码src目录且新建src源码主文件 index.js

    - /src/index.js

      - ```
        console.log('项目源码!')
        ```

    - webpack.config.js中新增项目打包入口

      - ```
        module.exports = {
        	entry: './src/index.js', //项目入口配置	
        }
        ```

        

    ```
    //index.js
    /*结果：
     如果cmd窗口在运行npm run build命令之后  出现下面内容，则表示src源码打包加载配置成功；
    
    > MinVue@1.0.0 build D:\95522\MinVue
    > webpack --config webpack.config.js --mode production
    
    -----MiVue项目webpack配置加载start-----
    -----MiVue项目webpack配置加载end-----
    Hash: 18212ce65e09b340030a
    Version: webpack 4.43.0
    Time: 639ms
    Built at: 2020-05-21 10:47:39 PM
      Asset       Size  Chunks             Chunk Names
    main.js  957 bytes       0  [emitted]  main
    Entrypoint main = main.js
    [0] ./src/index.js 27 bytes {0} [built]
    
    */
    
    
    这个时候我们会发现再项目更目录产生了一个dist文件夹，这个文件夹为我们项目打包之后的产品目录
    打开dist/main.js   ctrl+f  回想  我们之前在src新建的index.js文件中代码 console.log('项目源码)“项目源码”,   现在我们在dist/main.js中ctrl+f搜索内容“项目源码”，会发现，是有这个内容的 ，因此证明 我们src下源码目录打包成功！
    
    
    ```

- 修改webpack.config.js中项目打包出口文件配置

  - ```
    module.exports = {
    	entry: './src/index.js', //项目入口配置
    	output: {
    		// path 组件可以获取当前项目路径		
    		path: path.resolve(__dirname,'dist'),  //知道打包路径为根目录下dist文件夹 
    		filename: 'MinVue.mini.js'  //指定打包产品文件名称为 MinVue.min.js
    	}
    }
    ```

    **注意**:

    ```
    删除上述npm run build目录生成的dist目录，重现运行npm run build命令，查看上一步配置的出口文件配置是否生效
    /*结果：
    > MinVue@1.0.0 build D:\95522\MinVue
    > webpack --config webpack.config.js --mode production
    
    -----MiVue项目webpack配置加载start-----
    -----MiVue项目webpack配置加载end-----
    Hash: 09306b22eea1b119e10b
    Version: webpack 4.43.0
    Time: 149ms
    Built at: 2020-05-21 11:06:05 PM
             Asset       Size  Chunks             Chunk Names
    MinVue.mini.js  957 bytes       0  [emitted]  main
    Entrypoint main = MinVue.mini.js
    [0] ./src/index.js 27 bytes {0} [built]
    */
    
    查看项目dist文件夹  发现MinVue.min.js已经生成  
    ```

- webpack.config.js修改项目dev环境启动默认方面服务目录为dist文件夹

  - ```
    devServer: {
    	    contentBase: './dist',
    	    hot: true
    	},
    devtool: 'inline-source-map',//生成一个 DataUrl 形式的 SourceMap
    ```

- webpack.config.js指定项目依赖包文件目录

  - ```
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
    				exclude: '/node_modules/', 
    				use: {
    					loader: 'babel-loader',
    					options: {
    						presets: ['env']
    					}
    				}
    			}
    		]
    	}
    ```

- 根目录下新建项目源码首页  index.html

  - ```
    <!DOCTYPE html>
    <html>
    	<head>
    		<meta charset="utf-8">
    		<title>MinVue</title>
    	</head>
    	<body>
    		
    		MinVue
    	</body>
    </html>
    
    ```

    

- webpack.config.js指定打包插件

  - ```
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
    ```

    **注意**

    ```
    添加完上述位置之后 一定得先npm run build  查看项目是否能够正常打包
    /*结果:
    	> MinVue@1.0.0 build D:\95522\MinVue
    > webpack --config webpack.config.js --mode production
    
    -----MiVue项目webpack配置加载start-----
    -----MiVue项目webpack配置加载end-----
    Hash: 8ac7749bc322bb37530c
    Version: webpack 4.43.0
    Time: 2662ms
    Built at: 2020-05-21 11:41:41 PM
             Asset       Size  Chunks             Chunk Names
    MinVue.mini.js   63.7 KiB       0  [emitted]  main
        index.html  141 bytes          [emitted]
    Entrypoint main = MinVue.mini.js
    [./src/index.js] 43 bytes {0} [built]
    Child HtmlWebpackCompiler:
         1 asset
        Entrypoint HtmlWebpackPlugin_0 = __child-HtmlWebpackPlugin_0
        [./node_modules/html-webpack-plugin/lib/loader.js!./index.html] 402 bytes {0} [built]
    */
    
    
    出现内容 则表明项目可以正常打包  
    此时 我们npm run dev 查看项目是否能够正常加载dist目录下index.html
    此时dos窗口出现如下内容则表示项目正常启动
    
    /*结果：
    > MinVue@1.0.0 dev D:\95522\MinVue
    > webpack-dev-server --open --mode development
    
    -----MiVue项目webpack配置加载start-----
    -----MiVue项目webpack配置加载end-----
    i ｢wds｣: Project is running at http://localhost:8080/
    i ｢wds｣: webpack output is served from /
    i ｢wds｣: Content not from webpack is served from ./dist
    i ｢wdm｣: wait until bundle finished: /
    i ｢wdm｣: Hash: ab20922890f8395b579e
    Version: webpack 4.43.0
    Time: 5206ms
    Built at: 2020-05-21 11:46:28 PM
             Asset       Size  Chunks             Chunk Names
    MinVue.mini.js   1.36 MiB    main  [emitted]  main
        index.html  166 bytes          [emitted]
    Entrypoint main = MinVue.mini.js
    */
    
    此时 我们访问localhost:8080端口  访问页面后 发现 “MinVue” 字样，表示  我们项目打包js机html页面成功
    ```


## 二、项目上传git

- 新建git账户

- git上创建项目

  - ```
    https://github.com/haixiangyuan/MinVue.git
    ```

    

- 本地ide安装git插件，本地安装git小乌龟64位

- 设置本地git连接远程git账户名及邮箱

  - ```
    进入项目根目录
    鼠标右键 git bash 打开git的dos窗口
    git config --list  //查看本地git设置
    git config --global user.name Mr.chen   //全局设置代码提交的git显示的账户名
    git config --global user.email xxxxxx @qq.com  //全局设置git账户的预留邮箱
    
    echo "# MinVue" >> README.md
    git init
    git add README.md
    git commit -m "初始导入"
    git remote add origin https://github.com/haixiangyuan/MinVue.git
    //弹出窗口需要登录git  输入自己的账户名和密码
    git push -u origin master
    
    ```

    





- [ ] 