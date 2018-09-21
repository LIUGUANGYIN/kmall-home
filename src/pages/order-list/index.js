require('pages/common/nav')
require('pages/common/search')
require('pages/common/side');
require('pages/common/footer')
//引入分页插件
require('util/pagination')
require('./index.css')
var _util=require('util');
var _order=require('service/order');
var _side=require('pages/common/side');

var tpl = require('./index.tpl');

var page = {
	params:{
		page:_util.getParamFromUrl('page') || 1,
	},
	init:function(){
		this.initPagination();
		this.onload();
		this.loadOrderList();
	},
	onload:function(){
		_side.render('order-list')
	},
	initPagination:function(){
		var _this = this;
		var $pagination = $('.pagination-box');
		$pagination.on('page-change',function(e,value){
			_this.params.page = value;
			_this.loadOrderList();
		});
		$pagination.pagination();
	},
	//绑定事件
	loadOrderList:function(){
		_order.getOrderList(this.params,function(orders){
			//图片处理
			let list=orders.list.map(order=>{
				order.productList.forEach(product=>{
					if(product.images){
						product.image = product.images.split(',')[0];
					}else{
						product.image = require('images/product-default.jpg');
					}
				})
				order.createdTime=new Date(order.createdAt).toLocaleString();
				return order;
			})
			var html = _util.render(tpl,{
				list:list,
				notEmpty:!!list.length
			});
			$('.order-box').html(html)

			$('.pagination-box').pagination('render',{
				current:orders.current,
				total:orders.total,
				pageSize:orders.pageSize,
			})
		},function(msg){
            $('.order-box').html('<p class="empty-message">获取订单列表出错了,刷新试试看!!!</p>')
		})
	}
}

$(function(){
	page.init();
})