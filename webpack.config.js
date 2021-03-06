const path=require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const publicpath='/';

//生成HtmlWebpackPlugin 配置
const getHtmlConfig=(name,title)=>({
		template:'./src/view/'+name+'.html',//模板文件
	    filename:name+'.html',
	    title:title,
        inject:true,//脚本写在那个标签里,默认是true(在body结束后)
        hash:true,//给生成的js/css文件添加一个唯一的hash
        chunks:['common',name]
})
//导出配置
module.exports={
	//模式
	mode:'development',
	// mode:'production',
	//多入口文件目录
	entry:{
		'common':'./src/pages/common/index.js',
		'index':'./src/pages/index/index.js',
		'list':'./src/pages/list/index.js',
		'detail':'./src/pages/detail/index.js',
		'cart':'./src/pages/cart/index.js',
		'order-confirm':'./src/pages/order-confirm/index.js',
		'order-list':'./src/pages/order-list/index.js',
		'order-detail':'./src/pages/order-detail/index.js',
		'user-login':'./src/pages/user-login/index.js',
		'user-register':'./src/pages/user-register/index.js',
		'user-center':'./src/pages/user-center/index.js',
		'user-update-password':'./src/pages/user-update-password/index.js',
		'result':'./src/pages/result/index.js',
		'payment':'./src/pages/payment/index.js',
	}, 
	//配置额外模块
    externals:{
        'jquery':'window.jQuery'
    },
	//多出口
	output:{
		//出口文件
		filename:'js/[name].js',
		publicPath:publicpath,
		//出口文件目录
		path:path.resolve(__dirname,'dist')
	},
	//配置别名
	resolve:{
		alias:{
			pages:path.resolve(__dirname,'./src/pages'),
			images:path.resolve(__dirname,'./src/images'),
		    util:path.resolve(__dirname,'./src/util'),
		    service:path.resolve(__dirname,'./src/service'),
		    node_modules:path.resolve(__dirname,'./node_modules'),	
		    common:path.resolve(__dirname,'./src/common'),	
		}

	},
	//配置loader
    module: {
    	
        rules: [
        //处理css
            {
	            test: /\.css$/,
	            use: [	                
	                {
			            loader: MiniCssExtractPlugin.loader,
			            options: {
                        }
                    },
                    'css-loader',
	            ]
            },
        //处理图像
            {
		        test: /\.(png|jpg|gif|ttf|woff2|woff|eot|svg)\??.*$/,
		        // test: /\.(png|jpg|gif)*$/,
		        use: [
			        {
			            loader:'url-loader',
			            options:{
			            	limit:100,
			            	name:'resource/[name].[ext]',
			            },
			        },
		        ]
		    },
		    {
	        test:/\.js$/,
	        exclude: /(node_modules)/,
	        use: {
	            loader: 'babel-loader',
	            options: {
	                presets: ['env','es2015','stage-3'],
	            }
	        }               
	        },
	        {
                test:/\.tpl$/,
                use: {
                    loader: 'html-loader',
                }               
            }       
        ]       
    },
    plugins:[
	    new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
	    new HtmlWebpackPlugin(getHtmlConfig('list','商品列表')),
	    new HtmlWebpackPlugin(getHtmlConfig('detail','商品详情')),
	    new HtmlWebpackPlugin(getHtmlConfig('cart','购物车')),
	    new HtmlWebpackPlugin(getHtmlConfig('order-confirm','订单确认')),
	    new HtmlWebpackPlugin(getHtmlConfig('order-list','订单列表')),
	    new HtmlWebpackPlugin(getHtmlConfig('order-detail','订单详情')),
	    new HtmlWebpackPlugin(getHtmlConfig('payment','支付页面')),
	    new HtmlWebpackPlugin(getHtmlConfig('user-login','用户登录')),
	    new HtmlWebpackPlugin(getHtmlConfig('user-register','用户注册')),  
	    new HtmlWebpackPlugin(getHtmlConfig('user-center','用户中心')),
	    new HtmlWebpackPlugin(getHtmlConfig('user-update-password','修改密码')),
	    new HtmlWebpackPlugin(getHtmlConfig('result','结果提示')),
	    new CleanWebpackPlugin(['dist']),
	    new MiniCssExtractPlugin({
	    	filename:'css/[name].css'
	    })
    ],
    devServer: {
        contentBase: './dist',
        port:3002,
        proxy:{
        	"/user":{
        		target:"http://127.0.0.1:3000",
        		changeOrigin:true
        	},
	        "/product":{
	            target:"http://127.0.0.1:3000",
	            changeOrigin: true
	        },
	        "/cart":{
	            target:"http://127.0.0.1:3000",
	            changeOrigin: true
	        },
	        "/order":{
	            target:"http://127.0.0.1:3000",
	            changeOrigin: true
	        }, 
	        "/shipping":{
	            target:"http://127.0.0.1:3000",
	            changeOrigin: true
	        }, 
	        "/payment":{
	            target:"http://127.0.0.1:3000",
	            changeOrigin: true
	        },      
        }
    }
}