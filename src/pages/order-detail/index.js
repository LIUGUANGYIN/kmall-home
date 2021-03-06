require('pages/common/nav')
require('pages/common/search')
require('pages/common/side');
require('pages/common/footer')

require('./index.css')
var _util=require('util');
var _order=require('service/order');
var _side=require('pages/common/side');

var tpl = require('./index.tpl');

var page = {
	params:{
		orderNo:_util.getParamFromUrl('orderNo') || 1,
	},
	init:function(){
		this.onload();
		this.loadOrderDetail();
		this.bindEvent();
	},
	bindEvent:function(){
		var _this=this;
		$('.side-content').on('click','.btn-cancel',function(){
			if(_util.confirm('您确定取消该订单吗？')){
				_order.cancelOrder({orderNo:_this.params.orderNo},function(order){
					_this.renderOrderDetail(order);
				},function(msg){
					_util.showErrorMsg(msg);
				})
			}
		})
	},
	onload:function(){
		_side.render('order-list')
	},
	//绑定事件
	loadOrderDetail:function(){
		var _this=this;
		_order.getOrder(this.params,function(orders){
			_this.renderOrderDetail(orders);
		},function(msg){
            $('.side-content').html('<p class="empty-message">获取订单列表出错了,刷新试试看!!!</p>')
		})
	},
	renderOrderDetail:function(order){
		//图片处理
		if(order){
			order.productList.forEach(product=>{
				if(product.images){
					product.image = product.images.split(',')[0];
				}else{
					product.image = require('images/product-default.jpg');
				}
			})
			order.createdTime=new Date(order.createdAt).toLocaleString();
		}
		var html = _util.render(tpl,{
			order:order,
			notEmpty:!!order,
			needPay:order.status == 10,
			canCancel:order.status==10
		});
		$('.side-content').html(html)
	}
}

$(function(){
	page.init();
})