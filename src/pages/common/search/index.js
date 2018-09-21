require('./index.css')

var _util=require('util');


var pape = {
	init:function(){
		this.onload();
		this.bindEvent();
	},
	onload:function(){
		//搜索框关键字回填
		var keyword=_util.getParamFromUrl('keyword');
		if(keyword){
			$('#search-input').val(keyword);
		}
	},
	//绑定事件
	bindEvent:function(){
		var _this=this;
		//点击提交
		$('#btn-search').on('click',function(){
			_this.submit();
		})
		//回车提交
		$('#search-input').on('keyup',function(e){
			if(e.keyCode == 13){
				_this.submit();
			}
		})
	},
	submit:function(){
		var keyword=$.trim($('#search-input').val())
		window.location.href="./list.html?keyword="+keyword;
	},
}

$(function(){
	pape.init();
})