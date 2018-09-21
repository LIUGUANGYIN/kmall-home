require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')

require('./index.css')

var _util = require('util');
var _shipping = require('service/shipping');
var _order = require('service/order');
var _modal = require('./modal.js')

var productTpl = require('./product.tpl');
var shippingTpl = require('./shipping.tpl');

var page = {
	data:{
		shippingId:null
	},
	init:function(){
		this.$shippingBox=$('.shipping-box');
		this.onload();
		this.bindEvent();
	},
	onload:function(){
		this.loadShippingList();
		this.loadProductList();
	},
	bindEvent:function(){
		var _this = this;
		//绑定新增地址事件
		this.$shippingBox.on('click','.shipping-add',function(){
			_modal.show({
				success:_this.renderShipping.bind(_this)
			})
		})
		//绑定删除事件
	    this.$shippingBox.on('click','.shipping-delete',function(e){
			e.stopPropagation();
			var $this=$(this);
			var shippingId=$this.parents('.shipping-item').data('shipping-id');
			if(_util.confirm("你确定要删除该地址吗？")){
				_shipping.deleteShipping({shippingId:shippingId},function(shippings){
				    _this.renderShipping(shippings);
			    },function(msg){
				    _util.showErrorMsg(msg);
			    })
			}
		})
		// //编辑
		this.$shippingBox.on('click','.shipping-edit',function(e){
			e.stopPropagation();
			var $this=$(this);
			var shippingId=$this.parents('.shipping-item').data('shipping-id');
			_shipping.getShipping({shippingId:shippingId},function(shipping){
				_modal.show({
					data:shipping,
					success:_this.renderShipping.bind(_this)
				})
			},function(msg){
				_util.showErrorMsg(msg);
			})
		});
		//选择地址
		this.$shippingBox.on('click','.shipping-item',function(){
			var $this=$(this);
			$this.addClass('active')
			.siblings('.shipping-item').removeClass('active');
			_this.data.shippingId=$this.data('shipping-id');
		});
		//提交订单
		$('.product-box').on('click','.btn-submit',function(){
			if(_this.data.shippingId){
				_order.createOrder({shippingId:_this.data.shippingId},function(order){
					window.location.href="./payment.html?orderNo="+order.orderNo;
				},function(msg){
					_util.showErrorMsg(msg);
				})
			}else{
				_util.showErrorMsg('请选择地址后在提交。。。')
			}
		});
	},

	loadShippingList:function(){
		var _this = this;
		_shipping.getShippingList(function(shippings){
			_this.renderShipping(shippings);
		},function(msg){
            _this.$shippingBox.html('<p class="empty-message">获取地址列表出错了,刷新试试看!!!</p>')
		})
	},
	renderShipping:function(shippings){
		var _this=this;
		shippings.forEach(function(shipping){
			if(shipping._id == _this.data.shippingId){
				shipping.isActive=true;
			}
		})
		
		var html=_util.render(shippingTpl,{
			shippings:shippings
		});
		_this.$shippingBox.html(html);

	},
	loadProductList:function(){
		var _this = this;
		_order.getOrderProductList(function(result){
			//购物车数据适配
			result.cartList.forEach(item=>{
				if(item.product.images){
					item.product.image = item.product.images.split(',')[0];
				}else{
					item.product.image = require('images/product-default.jpg');
				}
			})
			result.notEmpty = !!result.cartList.length;

		    var html=_util.render(productTpl,result);
		    $('.product-box').html(html);
		},function(){
            $('.product-box').html('<p class="empty-message">获取商品列表出错了,刷新试试看!!!</p>')
		})
	},
}

$(function(){
	page.init();
})