require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')

require('util/carousel')
require('./index.css')

var _util=require('util');
var keywordsTpl = require('./index.tpl')
var carouselTpl = require('./carousel.tpl')
var floorTpl = require('./floor.tpl')
var page={
	keyword:[
	    {item:[{name:'手机'},{name:'电脑'}]},
	    {item:[{name:'电视'},{name:'冰箱'}]},
	    {item:[{name:'厨卫'},{name:'家电'}]},
	    {item:[{name:'办公'},{name:'相机'}]},
	    {item:[{name:'家居'},{name:'家具'}]},
	    {item:[{name:'食品'},{name:'酒水'}]},
	    {item:[{name:'玩具'},{name:'童装'}]},
	    {item:[{name:'服装'},{name:'箱包'}]},
	    {item:[{name:'图书'},{name:'小说'}]},
	    {item:[{name:'理财'},{name:'房产'}]},
	],
	carousel:[
		{categoryId:'1111',image:require('images/carousel/carousel-01.jpg')},
		{categoryId:'2222',image:require('images/carousel/carousel-02.jpg')},
		{categoryId:'3333',image:require('images/carousel/carousel-03.jpg')}
	],
	floor:[
		{
			title:'F1 家用电器',
			item:[
				{image:require('images/floor/floor01-01.jpg'),text:'冰箱洗衣机',categoryId:'1111'},
				{image:require('images/floor/floor01-02.jpg'),text:'热水器',categoryId:'2222'},
				{image:require('images/floor/floor01-03.jpg'),text:'平板电视',categoryId:'3333'},
				{image:require('images/floor/floor01-04.jpg'),text:'空调',categoryId:'4444'},
				{image:require('images/floor/floor01-05.jpg'),text:'智能影音',categoryId:'5555'},
			]
		},	
		{
			title:'F2 智能数码',
			item:[
				{image:require('images/floor/floor02-01.jpg'),text:'相机频道',categoryId:'1111'},
				{image:require('images/floor/floor02-02.jpg'),text:'智能频道',categoryId:'2222'},
				{image:require('images/floor/floor02-03.jpg'),text:'单反相机',categoryId:'3333'},
				{image:require('images/floor/floor02-04.jpg'),text:'平衡车',categoryId:'4444'},
				{image:require('images/floor/floor02-05.jpg'),text:'汽车用品',categoryId:'5555'},
			]
		},
		{
			title:'F3 生活家电',
			item:[
				{image:require('images/floor/floor03-01.jpg'),text:'生活家电',categoryId:'1111'},
				{image:require('images/floor/floor03-02.jpg'),text:'日用家纺',categoryId:'2222'},
				{image:require('images/floor/floor03-03.jpg'),text:'厨具频道',categoryId:'3333'},
				{image:require('images/floor/floor03-04.jpg'),text:'个护健康',categoryId:'4444'},
				{image:require('images/floor/floor03-05.jpg'),text:'卫浴馆',categoryId:'5555'},
			]
		},					
	],
	init:function(){
		this.loadKeywords();
		this.loadCarousel();
		this.loadFloor();
	},
	loadKeywords:function(){
		var html = _util.render(keywordsTpl,{
			keywords:this.keyword
		});
		$('.keywords').html(html)
	},
	loadCarousel:function(){
		var html = _util.render(carouselTpl,{
			carousel:this.carousel
		})
		
		$('.carousel').html(html);

		var $caroulsel = $('.carousel').unslider({
			dots: true,
			keys: true
		});

		$('.arrow').on('click',function(){
			let direction = $(this).hasClass('next') ? 'next' : 'prev';
			$caroulsel.data('unslider')[direction]();
		})
	},
	loadFloor:function(){
		var html = _util.render(floorTpl,{
			floor:this.floor
		});
		$('.floor-wrap').html(html)
	},	
}

$(function(){
	page.init();
})