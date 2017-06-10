﻿//Ves v2.0 Copyright Â© 2014-2016 Chen QingZhu All rights reserved.

(function() {

	var $data={
		_ready:[],
		_loaded:[],
		isReady:false,
		isLoaded:false,
		ajaxCount: 0
	};
	ves=function(slt,prt) {
		if(typeof (slt)=='function') {
			if($data.isReady) {
				slt.call(ves);
				return;
			}
			$data._ready.push(slt);
			if($data._ready.length==1) {
				var readyTime=setInterval(function() {
					if(document.body) {
						$data.isReady=true;
						for(var i=0;i<$data._ready.length;i++) {
							$data._ready[i].call(ves);
						}
						delete $data._ready;				
						clearInterval(readyTime);
						readyTime=null;
					}
				},10);
			}
		}
		else return new init(slt,prt);
	};

	ves.ready=function(fun){
		if(typeof(fun)=='function')ves(fun);
	};

	ves.loaded=function(fun){
		if(typeof (fun)=='function') {
			if($data.isLoaded) {
				fun.call(ves);
				return;
			}
			$data._loaded.push(fun);
			if($data._loaded.length==1) {
				$data.images=nodeListToArray(document.images);
				var loadTime=setInterval(function() {
					if(document.body) {
						for(var i=0;i<$data.images.length;i++){
							if(!$data.images[i].complete)return;
							$data.images.splice(i,1);i-=1;
						}
						for(var i=0;i<$data._loaded.length;i++) {
							$data._loaded[i].call(ves);
						}
						delete $data._loaded;
						clearInterval(loadTime);
						loadTime=null;
					}
				},200);
			}
		}
	};

	var $=ves;

	function init(slt,prt) {
		this.$=[];
		if(typeof (slt)=='string') {
			if(slt.indexOf('<')> -1) {
				var holder=document.createElement('div');
				holder.innerHTML=slt;
				this.$ = [holder];
			}
			else {
				prt=prt?prt:[document];
				this.$=selector(slt,prt);
			}
		}
		else if(slt!=null) {
			if(slt instanceof Array) this.$=slt;
			else if((typeof (HTMLCollection)!='undefined'&&slt instanceof HTMLCollection)||(typeof (NodeList)!='undefined'&&slt instanceof NodeList)) this.$=nodeListToArray(slt);
			else if(slt.$ instanceof Array) this.$=slt.$;
			else if((slt instanceof Node)||slt==window||slt==document) this.$=[slt];
			this.$=this.$.unique();
		}
		this.length=this.$.length;
		for(var i=0;i<this.length;i++) {
			this[i]=this.$[i];
		}
	}
	init.prototype={
		parent: function() {
			var arr=[];
			for(var i=0;i<this.$.length;i++) {
				if(this.$[i].parentNode&&this.$[i]!==ves.html[0])
					arr.push(this.$[i].parentNode);
			}
			return new init(arr);
		},
		parents: function(slt) {
			var arr=[];
			for(var i=0;i<this.$.length;i++) {
				(function() {
					if(this.parentNode&&this!==ves.html[0]) {
						arr.push(this.parentNode);
						arguments.callee.call(this.parentNode);
					}
				}).call(this.$[i]);
			}
			if(typeof (slt)=='string') arr=filter(slt,arr);
			else if(typeof (slt)=='number') {
				if(slt>arr.length-1) arr=[];
				else arr=arr.unique()[slt];
			}
			return new init(arr);
		},
		children: function(slt) {
			var arr=[];var _arr;
			for(var c=0;c<this.$.length;c++) {
				_arr=this.$[c].childNodes;
				for(var i=0;i<_arr.length;i++)
				{ if(_arr[i].tagName&&_arr[i].tagName.toLowerCase()!='br') arr.push(_arr[i]); }
			}
			if(typeof (slt)=='string') arr=filter(slt,arr);
			else if(typeof (slt)=='number') arr=arr.unique()[slt];
			return new init(arr);
		},
		find: function(slt) {
			return new init(selector(slt,this.$));
		},
		filter: function(slt) {
			return new init(filter(slt,this.$));
		},
		siblings: function(slt) {
			var parent=this.parent();
			var arr=parent.children().$.exclude(this.$);
			if(typeof (slt)=='string') arr=filter(slt,arr);
			else if(typeof (slt)=='number') arr=arr.unique()[slt];
			return new init(arr);
		},
		next: function() {
			var arr=[];
			for(var i=0;i<this.$.length;i++) {
				(function() {
					if(this.tagName&&this.tagName.toLowerCase()!='br') { arr.push(this);return; }
					if(this.nextSibling) arguments.callee.call(this.nextSibling);
				}).call(this.$[i].nextSibling);
			}
			return new init(arr);
		},
		nexts: function(slt) {
			var arr=[];
			for(var i=0;i<this.$.length;i++) {
				(function() {
					if(this.tagName&&this.tagName.toLowerCase()!='br') { arr.push(this); }
					if(this.nextSibling) arguments.callee.call(this.nextSibling);
				}).call(this.$[i].nextSibling);
			}
			if(typeof (slt)=='string') arr=filter(slt,arr);
			else if(typeof (slt)=='number') arr=arr.unique()[slt];
			return new init(arr);
		},
		prev: function() {
			var arr=[];
			for(var i=0;i<this.$.length;i++) {
				(function() {
					if(this.tagName&&this.tagName.toLowerCase()!='br') { arr.push(this);return; }
					if(this.previousSibling) arguments.callee.call(this.previousSibling);
				}).call(this.$[i].previousSibling);
			}
			return new init(arr);
		},
		prevs: function(slt) {
			var arr=[];
			for(var i=0;i<this.$.length;i++) {
				(function() {
					if(this.tagName&&this.tagName.toLowerCase()!='br') { arr.push(this); }
					if(this.previousSibling) arguments.callee.call(this.previousSibling);
				}).call(this.$[i].previousSibling);
			}
			if(typeof (slt)=='string') arr=filter(slt,arr);
			else if(typeof (slt)=='number') arr=arr.unique()[slt];
			return new init(arr);
		},
		index: function() {
			var s=this.parent().children().$;
			for(var c=0;c<s.length;c++) {
				if(s[c]==this.$[0])
					return c;
			}
			return -1;
		},
		eq: function(num) {
			var arr=[];if(this.$.length==0) return new init(arr);
			if(typeof (num)=='number') num=[num];
			else if(typeof (num)=='string') num=num.split(/[,\s\|][\s]*/gi);
			if(num instanceof Array) {
				for(var d=0;d<num.length;d++) {
					num[d]=parseInt(num[d]);
					if(num[d]<0||num[d]>(this.$.length-1)) continue;
					arr.push(this.$[num[d]]);
				}
			}
			return new init(arr);
		},
		lt: function(num) {
			if(num>this.$.length-1) num=this.$.length-1;
			return new init(this.$.slice(0,num));
		},
		gt: function(num) {
			if(num>this.$.length-1) num=this.$.length-1;
			return new init(this.$.slice(num));
		},
		not: function(slt) {
			return new init(this.$.exclude(selector(slt)));
		},
		is: function(slt) {
			if(selector(slt).contains(this.$)) return true;
			return false;
		},
		contains: function(dom) {
			var it=this.$[0];
			var valid=false;
			if(dom instanceof Array) {
				for(var i=0;i<dom.length;i++) {
					valid=false;
					(function() {
						if(this.parentNode) {
							if(this.parentNode==it) {
								valid=true;
								return;
							}
							arguments.callee.call(this.parentNode);
						}
					}).call(dom[i]);
					if(valid==false)
						return false;
				}
				return true;
			}
			else {
				(function() {
					if(this.parentNode) {
						if(this.parentNode==it) {
							valid=true;
							return;
						}
						arguments.callee.call(this.parentNode);
					}
				}).call(dom);
			}
			return valid;
		},
		each: function(fun) {
			for(var i=0;i<this.$.length;i++) {
				if(fun.call(this.$[i],i)==false)
					break;
			}
			return this;
		},
		css: function(key,value,relative) {
			var val,_value;
			if(typeof (key)=='object') {
				var _key={};
				for(var n in key) _key[n.replace(/-[a-z]{1}/gi,function(m) { return m.substring(1).toUpperCase(); })]=key[n];
				for(var i=0;i<this.$.length;i++) {
					for(var n in _key) {
						_value=getStyle(this.$[i],n);
						if(typeof (_key[n])=='function') {
							val=_key[n].call(this.$[i],_value);
							val=setStyle(_value,val,value);
							if(typeof (val)!='undefined') {
								this.$[i].style[n]=val;
								privateStyle(this.$[i],n,val);
							}
						}
						else {
							val=setStyle(_value,_key[n],value);
							this.$[i].style[n]=val;
							privateStyle(this.$[i],n,val);
						}
					}
				}
				return this;
			}
			key=key.replace(/-[a-z]{1}/gi,function(m) { return m.substring(1).toUpperCase(); });
			switch(typeof (value)) {
				case 'undefined':
					{
						if(this.$.length==0) return;
						value=getStyle(this.$[0],key);
						val=parseFloat(value);
						if(isNaN(val)) val=value;
						return val;
					}
				case 'function':
					{
						for(var i=0;i<this.$.length;i++) {
							_value=getStyle(this.$[i],key);
							val=value.call(this.$[i],getStyle(this.$[i],key));
							val=setStyle(_value,val,relative);
							if(typeof (val)!='undefined') {
								this.$[i].style[key]=val;
								privateStyle(this.$[i],key,val);
							}
						}
						break;
					}
				default:
					{
						for(var i=0;i<this.$.length;i++) {
							_value=getStyle(this.$[i],key);
							val=setStyle(_value,value,relative);
							this.$[i].style[key]=val;
							privateStyle(this.$[i],key,val);
						}
						break;
					}
			}
			return this;
		},
		attr: function(key,value) {
			if(typeof (key)=='object') {
				for(var i=0;i<this.$.length;i++) {
					for(var n in key) {
						if(typeof (key[n])=='function') {
							var val=key[n].call(this.$[i],this.$[i].getAttribute(n));
							if(typeof (val)!='undefined') {
								if(val!=null) this.$[i].setAttribute(n,val);
								else this.$[i].removeAttribute(n);
							}
						}
						else this.$[i].setAttribute(n,key[n]);
					}
				}
				return this;
			}
			if(value===null) {
				for(var i=0;i<this.$.length;i++)
					this.$[i].removeAttribute(key);
				return this;
			}
			switch(typeof (value)) {
				case 'undefined':
					{
						if(this.$.length==0) return;
						return this.$[0].getAttribute(key);
					}
				case 'function':
					{
						for(var i=0;i<this.$.length;i++) {
							val=value.call(this.$[i],this.$[i].getAttribute(key));
							if(typeof (val)!='undefined') {
								if(val!=null) this.$[i].setAttribute(key,val);
								else this.$[i].removeAttribute(key);
							}
						}
						break;
					}
				default:
					{
						for(var i=0;i<this.$.length;i++)
							this.$[i].setAttribute(key,value);
						break;
					}
			}
			return this;
		},
		_attr: function(key,value) {
			if(typeof (key)=='object') {
				for(var i=0;i<this.$.length;i++) {
					for(var n in key) {
						if(typeof (key[n])=='function') {
							var val=key[n].call(this.$[i],this.$[i][n]);
							if(typeof (val)!='undefined') {
								if(val!=null) this.$[i][n]=val;
								else if(this.$[i][n]) delete this.$[i][n];
							}
						}
						else this.$[i][n]=key[n];
					}
				}
				return this;
			}
			if(value===null) {
				for(var i=0;i<this.$.length;i++) {
					if(this.$[i][key]) delete this.$[i][key];
				}
				return this;
			}
			switch(typeof (value)) {
				case 'undefined':
					{
						if(this.$.length==0) return;
						return this.$[0][key];
					}
				case 'function':
					{
						for(var i=0;i<this.$.length;i++) {
							val=value.call(this.$[i],this.$[i][key]);
							if(typeof (val)!='undefined') {
								if(val!=null) this.$[i][key]=val;
								else if(this.$[i][key]) delete this.$[i][key];
							}
						}
						break;
					}
				default:
					{
						for(var i=0;i<this.$.length;i++)
							this.$[i][key]=value;
						break;
					}
			}
			return this;
		},
		height: function(value,relative) {
			if(!value&&value!=0) {
				if(this.$.length==0) return -1;
				if(this.$[0]==document){
					return document.documentElement.clientHeight;
				}
				else if(this.$[0]==window) {
					return window.screen.height;
				}
				return this.css('height');
			}
			this.css('height',value,relative);
			return this;
		},
		width: function(value,relative) {
			if(!value&&value!=0) {
				if(this.$.length==0) return -1;
				if(this.$[0]==document){
					return document.documentElement.clientWidth;
				}
				else if(this.$[0]==window) {
					return window.screen.width;
				}
				return this.css('width');
			}
			this.css('width',value,relative);
			return this;
		},
		addClass: function(name) {
			var _name;
			if(name instanceof Array==false) name=name.split(/[,\s\|][\s]*/gi);
			for(var i=0;i<this.$.length;i++) {
				_name=this.$[i].className.split(/[\s]+/g);
				this.$[i].className=_name.union(name).join(' ').trim();
			}
			return this;
		},
		removeClass: function(name) {
			var _name;
			if(name instanceof Array==false) name=name.split(/[,\s\|][\s]*/gi);
			for(var i=0;i<this.$.length;i++) {
				_name=this.$[i].className.split(/[\s]+/g);
				this.$[i].className=_name.exclude(name).join(' ').trim();
				if(this.$[i].className=='') this.$[i].removeAttribute('class');
			}
			return this;
		},
		toggleClass: function(name) {
			var _name;
			if(name instanceof Array==false) name=name.split(/[,\s\|][\s]*/gi);
			for(var i=0;i<this.$.length;i++) {
				_name=this.$[i].className.split(/[\s]+/g);
				this.$[i].className=_name.exclude(name).union(name.exclude(_name)).join(' ').trim();
				if(this.$[i].className=='') this.$[i].removeAttribute('class');
			}
			return this;
		},
		hasAttr: function(name) {
			if(name instanceof Array==false) name=name.split(/[,\s\|][\s]*/gi);
			for(var i=0;i<this.$.length;i++) {
				for(var c=0;c<name.length;c++) {
					if(typeof (this.$[i].getAttribute(name[c])||this.$[i][name[c]])=='undefined')
						return false;
				}
			}
			return true;
		},
		noAttr: function(name) {
			if(name instanceof Array==false) name=name.split(/[,\s\|][\s]*/gi);
			for(var i=0;i<this.$.length;i++) {
				for(var c=0;c<name.length;c++) {
					if(typeof (this.$[i].getAttribute(name[c])||this.$[i][name[c]])!='undefined')
						return false;
				}
			}
			return true;
		},
		hasClass: function(name) {
			if(name instanceof Array==false) name=name.split(/[,\s\|][\s]*/gi);
			for(var i=0;i<this.$.length;i++) {
				for(var c=0;c<name.length;c++) {
					if(this.$[i].className.split(/[\s]+/g).contains(name[c])==false)
						return false;
				}
			}
			return true;
		},
		noClass: function(name) {
			if(name instanceof Array==false) name=name.split(/[,\s\|][\s]*/gi);
			for(var i=0;i<this.$.length;i++) {
				for(var c=0;c<name.length;c++) {
					if(this.$[i].className.split(/[\s]+/g).contains(name[c]))
						return false;
				}
			}
			return true;
		},
		val: function(value) {
			var type=typeof (value);
			if(type=='string'||type=='number') {
				for(var i=0;i<this.$.length;i++)
					this.$[i].value=value;
				return this;
			}
			else if(type=='function') {
				for(var i=0;i<this.$.length;i++)
					this.$[i].value=value.call(this.$[i]);
				return this;
			}
			if(this.$.length==0) return null;
			return this.$[0].value;
		},
		html: function(value) {
			if(this.$.length==0) return;
			var type=typeof (value);
			if(value==undefined)
				return this.$[0].innerHTML;
			if(type=='string'||type=='number') {
				for(var i=0;i<this.$.length;i++)
					this.$[i].innerHTML=value;
			}
			else if(type=='function') {
				for(var i=0;i<this.$.length;i++)
					this.$[i].innerHTML=value.call(this.$[i]);
			}
			var viewModel,script;
			for(var i=0;i<this.$.length;i++) {
				script=ves('script',this.$[i]);
				script.each(function() {
					eval(this.innerHTML);
				});
				if(typeof (ko)!='undefined') {
					viewModel=ko.contextFor(this.$[i]);
					if(viewModel) {
						viewModel=viewModel.$root;
						ko.bind(viewModel,this.$[i]);
					}
				}
			}
			return this;
		},
		text: function(value) {
			var type=typeof (value);
			if(type=='string'||type=='number') {
				if(this.$[0].innerText) {
					for(var i=0;i<this.$.length;i++)
						this.$[i].innerText=value;
				}
				else {
					for(var i=0;i<this.$.length;i++)
						this.$[i].textContent=value;
				}
				return this;
			}
			else if(type=='function') {
				if(this.$[0].innerText) {
					for(var i=0;i<this.$.length;i++)
						this.$[i].innerText=value.call(this.$[i]);
				}
				else {
					for(var i=0;i<this.$.length;i++)
						this.$[i].textContent=value.call(this.$[i]);
				}
				return this;
			}
			if(this.$.length==0) return;
			if(this.$[0].innerText) return this.$[0].innerText;
			else return this.$[0].textContent;
		},
		insertBefore: function(dom) {
			if(dom instanceof Array==false) {
				if((typeof (HTMLCollection)!='undefined'&&dom instanceof HTMLCollection)||(typeof (NodeList)!='undefined'&&dom instanceof NodeList)) dom=nodeListToArray(dom);
				else if(dom.$ instanceof Array) dom=dom.$;
				else dom=[dom];
			}
			var prt=dom[0].parentNode;
			for(var i=0;i<this.$.length;i++)
				prt.insertBefore(this.$[i],dom[0]);
			for(var i=1;i<dom.length;i++) {
				prt=dom[i].parentNode;
				for(var c=0;c<this.$.length;c++)
					prt.insertBefore(this.$[c].cloneNode(true),dom[i]);
			}
			return this;
		},
		insertAfter: function(dom) {
			if(dom instanceof Array==false) {
				if((typeof (HTMLCollection)!='undefined'&&dom instanceof HTMLCollection)||(typeof (NodeList)!='undefined'&&dom instanceof NodeList)) dom=nodeListToArray(dom);
				else if(dom.$ instanceof Array) dom=dom.$;
				else dom=[dom];
			}
			var prt=dom[0].parentNode;
			if(!dom[0].nextSibling) {
				for(var i=0;i<this.$.length;i++)
					prt.appendChild(this.$[i]);
			}
			else {
				var next=dom[0].nextSibling;
				for(var i=0;i<this.$.length;i++)
					prt.insertBefore(this.$[i],next);
			}
			for(var i=1;i<dom.length;i++) {
				prt=dom[i].parentNode;
				if(!dom[i].nextSibling) {
					for(var c=0;c<this.$.length;c++)
						prt.appendChild(this.$[c].cloneNode(true));
				}
				else {
					var next=dom[i].nextSibling;
					for(var c=0;c<this.$.length;c++)
						prt.insertBefore(this.$[c].cloneNode(true),next);
				}
			}
			return this;
		},
		append: function(dom,index) {
			if(this.$.length==0) return this;
			if(dom instanceof Array==false) {
				if((typeof (HTMLCollection)!='undefined'&&dom instanceof HTMLCollection)||(typeof (NodeList)!='undefined'&&dom instanceof NodeList)) dom=nodeListToArray(dom);
				else if(dom.$ instanceof Array) dom=dom.$;
				else dom=[dom];
			}
			if(typeof (index)!='number') {
				for(var i=0;i<dom.length;i++)
					this.$[0].appendChild(dom[i]);
				for(var i=1;i<this.$.length;i++) {
					for(var c=0;c<dom.length;c++)
						this.$[i].appendChild(dom[c].cloneNode(true));
				}
			}
			else {
				var cs=this.eq(0).children();
				var _index=index;
				if(_index>cs.$.length-1) index=cs.$.length-1;
				var to=cs.$[_index];
				for(var i=0;i<dom.length;i++)
					this.$[0].insertBefore(dom[i],to);
				for(var i=1;i<this.$.length;i++) {
					cs=this.eq(i).children();
					_index=index;
					if(_index>cs.$.length-1) _index=cs.$.length-1;
					to=cs.$[_index];
					for(var c=0;c<dom.length;i++)
						this.$[i].insertBefore(dom[c].cloneNode(true),to);
				}
			}
			return this;
		},
		remove: function() {
			for(var i=0;i<this.$.length;i++) {
				if(this.$[i].parentNode)
					this.$[i].parentNode.removeChild(this.$[i]);
			}
		},
		animate: function(anm,fun) {
			var _anm={},ex;
			for(var n in anm) {
				if(typeof (anm[n])=='function') ex=anm[n];
				else ex=(anm[n]+'').replace('px','');
				_anm[n.replace(/-([a-z]{1})/gi,function(m) { return m.substring(1).toUpperCase(); })]=ex;
			}
			anm={};
			for(var i=0;i<this.$.length;i++) {
				for(var n in _anm) {
					if(typeof (_anm[n])=='function') {
						ex=_anm[n].call(this.$[i])+'';
					}
					else ex=_anm[n];
					if(ex.indexOf('=')>0) {
						ex=ex.replace('=','');
						if(ex.indexOf('%')> -1) {
							anm[n]=parseFloat(ex)/100*parseFloat(getStyle(this.$[i].parentNode,n));
						}
						else anm[n]=parseFloat(ex);
					}
					else {
						if(ex.indexOf('%')> -1) {
							anm[n]=parseFloat(ex)/100*parseFloat(getStyle(this.$[i].parentNode,n))-parseFloat(getStyle(this.$[i],n));
						}
						else anm[n]=parseFloat(ex);
					}
				}
				if(this.$[i].animateState)
					delete this.$[i].animateState;
				var timer=null;
				(function(anm,timer) {
					var it=$(this),
					speed=0,
					result=0,
					go=true;
					clearInterval(timer);
					timer=setInterval(function() {
						switch(this.animateState) {
							case 'pause': { return; }
							case 'stop':
								{
									delete this.animateState;
									if(fun) fun.call(it[0]);
									go=false;
								}
							case 'end':
								{
									it.css(anm);
									delete this.animateState;
									if(fun) fun.call(it[0]);
									go=false;
								}
						}
						if(!go) {
							clearInterval(timer);
							timer=null;
							return;
						}
						var cur;
						for(var n in anm) {
							cur=it.css(n);
							speed=(anm[n]-cur)/30;
							speed=speed>0?Math.ceil(speed):Math.floor(speed);
							result=cur+speed;
							it.css(n,result);
							if(result===anm[n]) {
								clearInterval(timer);
								timer=null;
							}
						}
					},0);
				}).call(this.$[i],anm,timer);
			}
			return this;
		},
		pause: function(type) {
			switch(type) {
				case 0:
					{
						for(var i=0;i<this.length;i++) {
							if(this.$[i].animateState)
								delete this.$[i].animateState;
						}
						break;
					}
				case 2:
					{
						for(var i=0;i<this.length;i++) {
							if(this.$[i].animateState)
								delete this.$[i].animateState;
							else this.$[i].animateState='pause';
						}
						break;
					}
				default:
					{
						for(var i=0;i<this.length;i++)
							this.$[i].animateState='pause';
						break;
					}
			}
			return this;
		},
		stop: function(end) {
			if(end) {
				for(var i=0;i<this.length;i++) {
					if(this.$[i].animateState)
						this.$[i].animateState='end';
				}
			}
			else {
				for(var i=0;i<this.length;i++) {
					if(this.$[i].animateState)
						this.$[i].animateState='stop';
				}
			}
			return this;
		},
		bind: function(evt,fun,_fun) {
			if(typeof (evt)!='string'||evt.length==0) return this;
			if(evt instanceof Array==false)
				evt=evt.split(/[,\s\|][\s]*/gi);
			if(typeof (fun)!='function') {
				for(var i=0;i<this.$.length;i++) {
					for(var d=0;d<evt.length;d++) {
						this.$[i][evt[d]]();
					}
				}
				return this;
			}
			for(var c=0;c<evt.length;c++) {
				if($event.comEvent[evt[c]])
					$event.comEvent[evt[c]].fun.call(this,fun);
				else {
					for(var i=0;i<this.$.length;i++) {
						addEvent(this.$[i],evt[c],fun,_fun);
					}
				}
			}
			return this;
		},
		unbind: function(evt,fun) {
			if(evt instanceof Array==false)
				evt=evt.split(/[,\s\|][\s]*/gi);
			var count=evt.length;
			for(var i=0;i<count;i++) {
				if($event.comEvent[evt[i]]) {
					evt.insert($event.comEvent[evt[i]].events);
					evt.splice(i,1);
					i-=1;
				}
			}
			if(typeof (fun)!='function') {
				for(var i=0;i<this.$.length;i++) {
					for(var b=0;b<evt.length;b++) {
						for(var c=0;c<$.event.collect.length;c++) {
							if($.event.collect[c].element==this.$[i]&&$.event.collect[c].fun!=$event.events[evt[b]])
								removeEvent(this.$[i],evt[b],$.event.collect[c]._fun||$.event.collect[c].fun);
						}
					}
				}
			}
			else {
				for(var i=0;i<this.$.length;i++) {
					for(var c=0;c<evt.length;c++)
						removeEvent(this.$[i],evt[c],fun);
				}
			}
			return this;
		}
	};
	init.prototype.on=init.prototype.bind;
	init.prototype.off=init.prototype.unbind;

	$.event={
		data: {},collect: [],
		stopParent: function() {
			$.event.self.stopPropagation();
		},
		stopDefault: function() {
			var self=$.event.self;
			if(self.preventDefault)
				self.preventDefault();
			else if(self.returnValue) {
				self.returnValue=false;
			}
		}
	};
	function addEvent(element,event,fun,_fun) {
		var eventAdded=false,funAdded=false;
		for(var i=0;i<$.event.collect.length;i++) {
			if($.event.collect[i].element==element&&$.event.collect[i].event==event) {
				eventAdded=true;
				if($.event.collect[i].fun==fun)
					funAdded=true;
			}
		}
		if(!eventAdded) {
			var _event=$event.events[event]||$event.eventInfo;
			if(element.addEventListener) element.addEventListener(event,_event,false);
			else element.attachEvent('on'+event,_event,false);
			$.event.collect.push({ event: event,element: element,fun: _event });
			if(fun==_event) funAdded=true;
		}
		if(!funAdded) {
			if(element.addEventListener) element.addEventListener(event,fun,false);
			else element.attachEvent('on'+event,fun,false);
			$.event.collect.push({ event: event,element: element,fun: fun,_fun: _fun });
		}
	}
	function removeEvent(element,event,fun) {
		var count=0,index,_fun,
		_event=$event.events[event]||$event.eventInfo;
		for(var i=0;i<$.event.collect.length;i++) {
			if($.event.collect[i].element==element&&$.event.collect[i].event==event) {
				_fun=$.event.collect[i]._fun||$.event.collect[i].fun;
				if(_fun==fun&&_fun!=_event) {
					if(element.removeEventListener) element.removeEventListener(event,$.event.collect[i].fun,false);
					else element.detachEvent('on'+event,$.event.collect[i].fun,false);
					$.event.collect.splice(i,1);
					i-=1;
				}
				else {
					if($.event.collect[i].fun==_event) {
						index=i;
					}
					count+=1;
				}
			}
		}
		if(count==1&&typeof (index)=='number') {
			if(element.removeEventListener) element.removeEventListener(event,_event,false);
			else element.detachEvent('on'+event,_event,false);
			$.event.collect.splice(index,1);
		}
	}
	var $event={
		eventInfo: function(e) {
			var target=e.currentTarget||document.activeElement,
			related=(e.type=='mouseout')?'toElement':'fromElement';
			related=e.relatedTarget||e[related];
			if(!related||(related!=target&&$(target).contains(related)==false))
				$.event.isRelated=false;
			else $.event.isRelated=true;
			$.event.related=related;
			$.event.target=target;
			if((e.type.indexOf('click')> -1||e.type.indexOf('mouse')> -1)&&$event.touchLastTime) {
				if((new Date()).getTime()-this.touchLastTime<1000) $.event.stop=true;
				else delete $.event.stop;
				$event.touchLastTime=null;
			}
			if(e.type.indexOf('touch')> -1) {
				$event.touchLastTime=(new Date()).getTime();
				delete $.event.stop;
			}
			$.event.self=e;
		},
		comEvent: {
			tap: {
				fun: function(f) {
					this.bind('click',function(e){
						if($.event.stop)return;
						return f.call(this,e);
					},f);
					this.bind('touchstart',$event.events.touchstart);
					this.bind('touchend',function(e) {
						var x=$.event.data['moveXL'];
						var y=$.event.data['moveYL'];
						var back=0;
						if(x> -3&&x<3&&y> -3&&y<3)
							back=f.call(this,e);
						return back;
					},f);
					return this;
				},
				events: 'click,touchend'
			},
			tapin: {
				fun: function(f) {
					this.bind('mouseover',function(e){
						if($.event.stop)return;
						return f.call(this,e);
					},f);
					this.bind('touchstart',f);
					return this;
				},
				events: 'mouseover,touchstart'
			},
			tapout: {
				fun: function(f) {
					this.bind('mouseover',$event.events.mouseover);
					this.bind('mouseout',function(e){
						if($.event.stop)return;
						return f.call(this,e);
					},f);
					var it=this;
					$(this).bind('touchstart',function() {
						$.event.stopParent();
						$.body.bind('touchstart',function(e) {
							$.body.unbind('touchstart',arguments.callee);
							return f.call(it,e);
						});
					},f);
					return this;
				},
				events: 'mouseout,touchstart'
			},
			tapstart: {
				fun: function(f) {
					this.bind('mousedown',function(e){
						if($.event.stop)return;
						return f.call(this,e);
					},f);
					this.bind('touchstart',f);
					return this;
				},
				events: 'mousedown,touchstart'
			},
			tapend: {
				fun: function(f) {
					this.bind('mousedown',$event.events.mousedown)
						.bind('touchstart',$event.events.touchstart);
					this.bind('mouseup',function(e){
						if($.event.stop)return;
						return f.call(this,e);
					},f);
					this.bind('touchend',f);
					return this;
				},
				events: 'mouseup,touchend'
			},
			press:{
				fun: function(f) {
					this.bind('touchend',$event.events.touchend)
						.bind('mouseup',$event.events.mouseup)
						.bind('mousemove',$event.events.mousemove)
						.bind('touchmove',$event.events.touchmove);
					this.bind('touchstart,mousedown',function(e){
						if($.event.stop)return;
						var start=$.event.data.startT;
						var it=this;
						window.setTimeout(function(){
							if(start===$.event.data.startT&&(!$.event.data.endT||$.event.data.endT<$.event.data.startT)){
								var x=$.event.data['moveXL']; 
								var y=$.event.data['moveYL'];
								if((x==undefined||x> -3&&x<3)&&(y==undefined||y> -3&&y<3)){
									f.call(it,e);
								}
							}
						},500);
					},f);
					return this;
				},
				events: 'touchstart,mousedown'
			},
			swipe: {
				fun: function(f) {
					this.bind('mousedown',$event.events.mousedown)
						.bind('touchstart',$event.events.touchstart);
					this.bind('mouseup,touchend',function(e) {
						var x=$.event.data['moveXL'];
						var y=$.event.data['moveYL'];
						var back=0;
						if(x< -3||x>3||y< -3||y>3)
							back=f.call(this,e);
						return back;
					},f);
					return this;
				},
				events: 'mouseup,touchend'
			},
			swiping: {
				fun: function(f) {
					var handle=function(e) {
						if(typeof ($.event.data.moveXS)!='undefined')
							f.call(this,e);
						$.event.stopDefault();
					};
					this.bind('mousedown',function(e) {
						$(this).bind('mousemove',handle);
						$(this).bind('mouseup,mouseout',function() {
							$(this).unbind('mousemove',handle)
							.unbind('mouseup,mouseout',arguments.callee);
						});
					},f);
					this.bind('touchstart',$event.events.touchstart);
					this.bind('touchmove',handle,f);
					return this;
				},
				events: 'mousedown,touchmove'
			},
			animationstart: {
				fun: function(f) {
					this.bind('animationstart,webkitAnimationStart',f);
					return this;
				},
				events: 'animationstart,webkitAnimationStart'
			},
			animationend: {
				fun: function(f) {
					this.bind('animationend,webkitAnimationEnd',f);
					return this;
				},
				events: 'animationend,webkitAnimationEnd'
			},
			animationiteration: {
				fun: function(f) {
					this.bind('animationiteration,webkitAnimationIteration',f);
					return this;
				},
				events: 'animationiteration,webkitAnimationIteration'
			},
			transitionend: {
				fun: function(f) {
					this.bind('transitionend,webkitTransitionEnd',f);
					return this;
				},
				events: 'transitionend,webkitTransitionEnd'
			}
		},
		touchLastTime: null,
		events: {
			touchstart: function(e) {
				$event.eventInfo(e);
				e=$.event.self;
				var touch=e.targetTouches[0];
				if(typeof ($.event.data['startX'])!='undefined') {
					$.event.data['startXL']=touch.clientX-$.event.data['startX'];
					$.event.data['startYL']=touch.clientY-$.event.data['startY'];
				}
				$.event.data['startX']=touch.clientX;
				$.event.data['startY']=touch.clientY;
				$.event.data['startT']=new Date();
				$event.deleteEventData();
			},
			touchmove: function(e) {
				$event.eventInfo(e);
				e=$.event.self;
				var touch=e.changedTouches[0];
				if(typeof ($.event.data['moveX'])!='undefined') {
					var xl=touch.clientX-$.event.data['moveX'];
					if(xl!=0) {
						if($.event.data['moveXR']==undefined) $.event.data['moveXR']=0;
						else if(xl!==$.event.data['moveXS']) $.event.data['moveXR']+=1;
						$.event.data['moveXS']=xl;
						if($.event.data['moveXSS']==undefined)
							$.event.data['moveXSS']=xl;
					}
					var yl=touch.clientY-$.event.data['moveY'];
					if(yl!=0) {
						if($.event.data['moveYR']==undefined) $.event.data['moveYR']=0;
						else if(yl!==$.event.data['moveYS']) $.event.data['moveYR']+=1;
						$.event.data['moveYS']=yl;
						if($.event.data['moveYSS']==undefined)
							$.event.data['moveYSS']=yl;
					}
				}
				$.event.data['moveX']=touch.clientX;
				$.event.data['moveY']=touch.clientY;
				$.event.data['moveXL']=$.event.data['moveX']-$.event.data['startX'];
				$.event.data['moveYL']=$.event.data['moveY']-$.event.data['startY'];
				if($.event.data['startT']){
					$.event.data['moveT']=((new Date()).getTime()-$.event.data['startT'].getTime())/1000;
				}
			},
			touchend: function(e) {
				$event.eventInfo(e);
				e=$.event.self;
				var touch=e.changedTouches[0];
				if(typeof ($.event.data['endX'])!='undefined') {
					$.event.data['endXL']=touch.clientX-$.event.data['endX'];
					$.event.data['endYL']=touch.clientY-$.event.data['endY'];
				}
				$.event.data['endX']=touch.clientX;
				$.event.data['endY']=touch.clientY;
				$.event.data['moveXL']=$.event.data['endX']-$.event.data['startX'];
				$.event.data['moveYL']=$.event.data['endY']-$.event.data['startY'];
				$.event.data['endT']=new Date();
				$.event.data['moveT']=($.event.data['endT'].getTime()-$.event.data['startT'].getTime())/1000;
			},
			mouseover: function(e) {
				$event.eventInfo(e);
				e=$.event.self;
				if(typeof ($.event.data['startX'])!='undefined') {
					$.event.data['startXL']=e.clientX-$.event.data['startX'];
					$.event.data['startYL']=e.clientY-$.event.data['startY'];
				}
				$.event.data['startX']=e.clientX;
				$.event.data['startY']=e.clientY;
				$.event.data['startT']=new Date();
				$event.deleteEventData();
			},
			mousedown: function(e) {
				$event.eventInfo(e);
				e=$.event.self;
				if(typeof ($.event.data['startX'])!='undefined') {
					$.event.data['startXL']=e.clientX-$.event.data['startX'];
					$.event.data['startYL']=e.clientY-$.event.data['startY'];
				}
				$.event.data['startX']=e.clientX;
				$.event.data['startY']=e.clientY;
				$.event.data['startT']=new Date();
				$event.deleteEventData();
			},
			mouseup: function(e) {
				$event.eventInfo(e);
				e=$.event.self;
				if(typeof ($.event.data['endX'])!='undefined') {
					$.event.data['endXL']=e.clientX-$.event.data['endX'];
					$.event.data['endYL']=e.clientY-$.event.data['endY'];
				}
				$.event.data['endX']=e.clientX;
				$.event.data['endY']=e.clientY;
				$.event.data['moveXL']=$.event.data['endX']-$.event.data['startX'];
				$.event.data['moveYL']=$.event.data['endY']-$.event.data['startY'];
				$.event.data['endT']=new Date();
				$.event.data['moveT']=($.event.data['endT'].getTime()-$.event.data['startT'].getTime())/1000;
			},
			mouseout: function(e) {
				$event.eventInfo(e);
				e=$.event.self;
				if(typeof ($.event.data['endX'])!='undefined') {
					$.event.data['endXL']=e.clientX-$.event.data['endX'];
					$.event.data['endYL']=e.clientY-$.event.data['endY'];
				}
				$.event.data['endX']=e.clientX;
				$.event.data['endY']=e.clientY;
			},
			mousemove: function(e) {
				$event.eventInfo(e);
				e=$.event.self;
				if(typeof ($.event.data['moveX'])!='undefined') {
					var xl=e.clientX-$.event.data['moveX'];
					if(xl!=0) {
						if($.event.data['moveXR']==undefined) $.event.data['moveXR']=0;
						else if(xl!==$.event.data['moveXS']) $.event.data['moveXR']+=1;
						$.event.data['moveXS']=xl;
						if($.event.data['moveXSS']==undefined)
							$.event.data['moveXSS']=xl;
					}
					var yl=e.clientY-$.event.data['moveY'];
					if(yl!=0) {
						if($.event.data['moveYR']==undefined) $.event.data['moveYR']=0;
						else if(yl!==$.event.data['moveYS']) $.event.data['moveYR']+=1;
						$.event.data['moveYS']=yl;
						if($.event.data['moveYSS']==undefined)
							$.event.data['moveYSS']=yl;
					}
				}
				$.event.data['moveX']=e.clientX;
				$.event.data['moveY']=e.clientY;
				$.event.data['moveXL']=$.event.data['moveX']-$.event.data['startX'];
				$.event.data['moveYL']=$.event.data['moveY']-$.event.data['startY'];
				if($.event.data['startT']){
					$.event.data['moveT']=((new Date()).getTime()-$.event.data['startT'].getTime())/1000;
				}
			},
			click: function(e) {
				$event.eventInfo(e);
				e=$.event.self;
				if(typeof ($.event.data['startX'])!='undefined') {
					$.event.data['startXL']=e.clientX-$.event.data['startX'];
					$.event.data['startYL']=e.clientY-$.event.data['startY'];
				}
				$.event.data['startX']=e.clientX;
				$.event.data['startY']=e.clientY;
				$event.deleteEventData();
			}
		},
		deleteEventData: function() {
			if(typeof ($.event.data['moveX'])!='undefined') {
				delete $.event.data['moveX'];
				delete $.event.data['moveY'];
				delete $.event.data['moveT'];
				delete $.event.data['moveXS'];
				delete $.event.data['moveXL'];
				delete $.event.data['moveYS'];
				delete $.event.data['moveYL'];
				delete $.event.data['moveXR'];
				delete $.event.data['moveYR'];
				delete $.event.data['moveXSS'];
				delete $.event.data['moveYSS'];
			}
		}
	};
	function selector(slt,prt) {
		prt=prt?prt:[document];
		if(prt instanceof Array==false) {
			if((typeof (HTMLCollection)!='undefined'&&prt instanceof HTMLCollection)||(typeof (NodeList)!='undefined'&&prt instanceof NodeList)) prt=nodeListToArray(prt);
			else if(prt.$ instanceof Array) prt=prt.$;
			else prt=[prt];
		}
		var a1=slt.split(/,/gi),a2,a3,a4,a5,a6,a7,k,f,tag,check,g;
		var dom=[],_dom;
		for(var i=0;i<a1.length;i++) {
			_dom=prt;
			a2=a1[i].split(/[\s>~\+]+/gi);
			g=0;
			for(var c=0;c<a2.length;c++) {
				if(c>0) g+=a2[c-1].length;
				if(c>0&&_dom[0]==document) {
					if(_dom.length==1) break;
					else _dom.shift();
				}
				if(a2[c].indexOf('#')> -1) {
					a3=a2[c].split('#')[1].split(/[.:\[]+/gi);
					a3=document.getElementById(a3[0]);
					if(a3!=null) _dom=a4=[a3];
					else a4=[];
					continue;
				}
				a3=a2[c].split(':')[0].replace(/\[[^\]]+\]/gi,'');
				a3=a3.split('.');
				tag=a3[0]!=''?a3[0]:'*';
				a3.shift();a4=a5=[];
				if(a1[i].charAt(g)=='>') {
					for(var d=0;d<_dom.length;d++) {
						a5=ves(_dom[d]).children();
						if(tag!='*') a5=a5.filter(tag);
						a5=nodeListToArray(a5);
						a4=a4.union(a5);
					}
				}
				else {
					for(var d=0;d<_dom.length;d++)
						a4=a4.union(nodeListToArray(_dom[d].getElementsByTagName(tag)));
				}
				if(a3.length>0) {
					for(var d=0;d<a4.length;d++) {
						if(typeof (a4[d].className)=='string'&&a4[d].className.split(' ').contains(a3))
							a5.push(a4[d]);
					}
					a4=a5;
				}
				a3=a2[c].split(':')[0];
				if(a3.indexOf('[')> -1) {
					a3=('a'+a3+'a').split(/[(\[)|(\])|(\]\[)]+/gi);
					a3.shift();a3.pop();
					a5=[];
					for(var d=0;d<a4.length;d++) {
						check=true;
						for(var x=0;x<a3.length;x++) {
							if(a3[x].indexOf('*=')> -1) {
								a6=a3[x].split(/[\s]*\*=[\s]*[\'\"]*/gi);
								a7=a6[1].split(/[\'\"]$/gi)[0];
								a6=a4[d].getAttribute(a6[0])||a4[d][a6[0]];
								if(!a6||a6.indexOf(a7)<0) { check=false;break; }
							}
							else if(a3[x].indexOf('^=')> -1) {
								a6=a3[x].split(/[\s]*\^=[\s]*[\'\"]*/gi);
								a7=a6[1].split(/[\'\"]$/gi)[0];
								a6=a4[d].getAttribute(a6[0])||a4[d][a6[0]];
								if(!a6||a6.indexOf(a7)!=0) { check=false;break; }
							}
							else if(a3[x].indexOf('$=')> -1) {
								a6=a3[x].split(/[\s]*\$=[\s]*[\'\"]*/gi);
								a7=a6[1].split(/[\'\"]$/gi)[0];
								a6=a4[d].getAttribute(a6[0])||a4[d][a6[0]];
								if(!a6) { check=false;break; }
								f=k.indexOf(a7);
								if(f> -1&&(f+a7.length)!=k.length) { check=false;break; }
							}
							else if(a3[x].indexOf('!=')> -1) {
								a6=a3[x].split(/[\s]*\!=[\s]*[\'\"]*/gi);
								a7=a6[1].split(/[\'\"]$/gi)[0];
								a6=a4[d].getAttribute(a6[0])||a4[d][a6[0]];
								if(!a6||a6==a7) { check=false;break; }
							}
							else if(a3[x].indexOf('=')> -1) {
								a6=a3[x].split(/[\s]*[=]+[\s]*[\'\"]*/gi);
								a7=a6[1].split(/[\'\"]$/gi)[0];
								a6=a4[d].getAttribute(a6[0])||a4[d][a6[0]];
								if(!a6||a6!=a7) { check=false;break; }
							}
							else if(a3[x].indexOf('(')> -1) {
								a6=a3[x].split(/[\s]*\([\s]*[\'\"]*/gi);
								a7=a6[1].split(/[\'\"\)]$/gi)[0];
								a7=new RegExp(a7,'gi');
								a6=a4[d].getAttribute(a6[0])||a4[d][a6[0]];
								if(!a6||a7.test(a6)==false) { check=false;break; }
							}
							else if(!a4[d][a3[x]]&&a4[d].getAttribute(a3[x])==null)
							{ check=false;break; }
						}
						if(check==true) a5.push(a4[d]);
					}
					a4=a5;
				}
				a3=a2[c].split(':');
				if(a3.length>1&&a4.length>0) {
					switch(a3[1]) {
						case 'first': { a4=[a4[0]];break; }
						case 'last': { a4=[a4[a4.length-1]];break; }
						case 'odd': { for(var d=1;d<a4.length;d++) a4.splice(d,1);break; }
						case 'even': { for(var d=0;d<a4.length;d++) a4.splice(d,1);break; }
						default:
							{
								if(a3[1].indexOf('(')> -1) {
									a6=a3[1].split(/[\(\)]/gi);
									k=parseInt(a6[1]);
									switch(a6[0]) {
										case 'eq':
											{
												if(a6[1].indexOf('|')> -1) {
													a5=[];a6=a6[1].split('|');
													for(var d=0;d<a6.length;d++) {
														k=parseInt(a6[d]);
														if(k<0||k>(a4.length-1)) continue;
														a5.push(a4[k]);
													}
													a4=a5;
												}
												else{
													if(k<0||k>(a4.length-1))a4=[];
													else a4=[a4[k]];
												}
												break;
											}
										case 'lt': { a4.splice(k,a4.length-k);break; }
										case 'gt': { a4.splice(0,k+1);break; }
										case 'not': { a4=a4.exclude(selector(a6[1]));break; }
									}
								}
								break;
							}
					}
				}
				_dom=a4;
			}
			dom=dom.union(a4);
		}
		if(a1.length>1)
			dom=dom.unique();
		return dom;
	}
	function filter(slt,arr) {
		var a1=slt.split(/,/gi),a2,a3,a5,a6,a7,k,f,tag,check;
		for(var i=0;i<a1.length;i++) {
			a2=a1[i].split(/[\s>~\+]+/gi);
			for(var c=0;c<a2.length;c++) {
				a3=a2[c].split(':')[0].replace(/\[[^\]]+\]/gi,'');
				a3=a3.split('.');
				tag=a3[0];
				a3.shift();a5=[];

				if(tag) {
					for(var d=0;d<arr.length;d++) {
						if(arr[d].tagName.toLowerCase()==tag)
							a5.push(arr[d]);
					}
					arr=a5;
				}
				if(a3.length>0) {
					a5=[];
					for(var d=0;d<arr.length;d++) {
						if(typeof (arr[d].className)=='string'&&arr[d].className.split(' ').contains(a3))
							a5.push(arr[d]);
					}
					arr=a5;
				}
				a3=a2[c].split(':')[0];
				if(a3.indexOf('[')> -1) {
					a3=('a'+a3+'a').split(/[(\[)|(\])|(\]\[)]+/gi);
					a3.shift();a3.pop();
					a5=[];
					for(var d=0;d<arr.length;d++) {
						check=true;
						for(var x=0;x<a3.length;x++) {
							if(a3[x].indexOf('*=')> -1) {
								a6=a3[x].split(/[\s]*\*=[\s]*[\'\"]*/gi);
								a7=a6[1].split(/[\'\"]$/gi)[0];
								a6=arr[d].getAttribute(a6[0])||arr[d][a6[0]];
								if(!a6||a6.indexOf(a7)<0) { check=false;break; }
							}
							else if(a3[x].indexOf('^=')> -1) {
								a6=a3[x].split(/[\s]*\^=[\s]*[\'\"]*/gi);
								a7=a6[1].split(/[\'\"]$/gi)[0];
								a6=arr[d].getAttribute(a6[0])||arr[d][a6[0]];
								if(!a6||a6.indexOf(a7)!=0) { check=false;break; }
							}
							else if(a3[x].indexOf('$=')> -1) {
								a6=a3[x].split(/[\s]*\$=[\s]*[\'\"]*/gi);
								a7=a6[1].split(/[\'\"]$/gi)[0];
								a6=arr[d].getAttribute(a6[0])||arr[d][a6[0]];
								if(!a6) { check=false;break; }
								f=k.indexOf(a7);
								if(f> -1&&(f+a7.length)!=k.length) { check=false;break; }
							}
							else if(a3[x].indexOf('!=')> -1) {
								a6=a3[x].split(/[\s]*\!=[\s]*[\'\"]*/gi);
								a7=a6[1].split(/[\'\"]$/gi)[0];
								a6=arr[d].getAttribute(a6[0])||arr[d][a6[0]];
								if(!a6||a6==a7) { check=false;break; }
							}
							else if(a3[x].indexOf('=')> -1) {
								a6=a3[x].split(/[\s]*[=]+[\s]*[\'\"]*/gi);
								a7=a6[1].split(/[\'\"]$/gi)[0];
								a6=arr[d].getAttribute(a6[0])||arr[d][a6[0]];
								if(!a6||a6!=a7) { check=false;break; }
							}
							else if(a3[x].indexOf('(')> -1) {
								a6=a3[x].split(/[\s]*\([\s]*[\'\"]*/gi);
								a7=a6[1].split(/[\'\"\)]$/gi)[0];
								a7=new RegExp(a7,'gi');
								a6=arr[d].getAttribute(a6[0])||arr[d][a6[0]];
								if(!a6||a7.test(a6)==false) { check=false;break; }
							}
							else if(!arr[d][a3[x]]&&arr[d].getAttribute(a3[x])==null)
							{ check=false;break; }
						}
						if(check==true) a5.push(arr[d]);
					}
					arr=a5;
				}
				a3=a2[c].split(':');
				if(a3.length>1&&arr.length>0) {
					switch(a3[1]) {
						case 'first': { arr=[arr[0]];break; }
						case 'last': { arr=[arr[arr.length-1]];break; }
						case 'odd': { for(var d=1;d<arr.length;d++) arr.splice(d,1);break; }
						case 'even': { for(var d=0;d<arr.length;d++) arr.splice(d,1);break; }
						default:
							{
								if(a3[1].indexOf('(')> -1) {
									a6=a3[1].split(/[\(\)]/gi);
									k=parseInt(a6[1]);
									switch(a6[0]) {
										case 'eq':
											{
												if(a6[1].indexOf('|')> -1) {
													a5=[];a6=a6[1].split('|');
													for(var d=0;d<a6.length;d++) {
														k=parseInt(a6[d]);
														if(k<0||k>(arr.length-1)) continue;
														a5.push(arr[k]);
													}
													arr=a5;
												}
												else{
													if(k<0||k>(arr.length-1))arr=[];
													else arr=[arr[k]];
												}
												break;
											}
										case 'lt': { arr.splice(k,arr.length-k);break; }
										case 'gt': { arr.splice(0,k+1);break; }
										case 'not': { arr=arr.exclude(selector(a6[1]));break; }
									}
								}
								break;
							}
					}
				}
			}
		}
		return arr;
	}
	$.extend=function() {
		var src,copyIsArray,copy,name,options,clone,
		target=arguments[0]||{},
		i=1,
		length=arguments.length,
		deep=false;
		if(typeof target==="boolean") {
			deep=target;
			target=arguments[i]||{};
			i++;
		}
		if(typeof target!="object"&&typeof (target)!='function') {
			target={};
		}
		if(i==length) {
			target=this;
			i--;
		}
		for(;i<length;i++) {
			if((options=arguments[i])!=null) {
				for(name in options) {
					src=target[name];
					copy=options[name];
					if(target==copy) {
						continue;
					}
					if(deep&&copy&&(typeof (copy)=='object'||(copyIsArray=(copy instanceof Array)))) {
						if(copyIsArray) {
							copyIsArray=false;
							clone=src&&(src instanceof Array)?src:[];

						} else {
							clone=src&&typeof (src)=='object'?src:{};
						}
						target[name]=$.extend(deep,clone,copy);
					} else if(copy!=undefined) {
						target[name]=copy;
					}
				}
			}
		}
		return target;
	};
	$.prototype=function(name,value) {
		if(!init.prototype[name]) init.prototype[name]=value;
	};
	$.ajax=function(para) {
		if(typeof (para.url)=='undefined')
			para.url=window.location.href;
		if(para.url==null) return;
		var isOut=para.url.indexOf('://')> -1;
		if(isOut||(para.dataType=='script'&&para.async!==false)) {
			var hostname=isOut?para.url.split('://')[1].split(/\/|:/)[0]:"";
			if(hostname!=window.location.hostname) {
				var script=document.createElement('script');
				script.type='text/javascript';script.src=para.url;
				script.async='async';
				if(para.charset) script.setAttribute('charset',para.charset);
				if(typeof (para.loading)=='function') {
					para.loading.call(para.context);
				}
				if(typeof (para.success)=='function') {
					script.onload=script.onreadystatechange=function() {
						if(!this.readyState||this.readyState=='loaded'||this.readyState=='complete')
							para.success.call(para.context);
					};
				}
				if(typeof (para.error)=='function') {
					script.onerror=function() {
						para.error.call(para.context);
					};
				}
				$.head.append(script);
				return this;
			}
		}
		if(para.file) {
			para.file=$(para.file);
			if(para.file.$.length==0) return this;
			var ifr=document.createElement('iframe');
			$data.ajaxCount+=1;
			ifr.name='$ajax_iframe_'+$data.ajaxCount;
			ifr.id=ifr.name;
			ifr.style.display='none';
			$.body.append(ifr);
			if(typeof (para.loading)=='function') {
				para.loading.call(para.context);
			}
			if(typeof (para.success)=='function') {
				ifr.onload=function() {
					var data=null;
					var html=this.contentWindow.document.getElementsByTagName('body')[0].innerHTML;
					para.dataType=para.dataType||'html';
					switch(para.dataType.toLowerCase()) {
						case 'json':
							{
								if(html.length>0) {
									var start=html.indexOf('{');
									var last=html.lastIndexOf('}')+1;
									var str=html.substring(start,last);
									try { data=eval('('+str+')'); }
									catch(e) { data=html; }
								}
								break;
							}
						default:
							{
								data=html;
								break;
							}
					}
					para.success.call(para.context,data);
					this.parentNode.removeChild(this);
				};
			}
			if(typeof (para.error)=='function') {
				ifr.onerror=function() {
					para.error.call(para.context);
				};
			}
			var form=para.file.$[0].form;
			form.enctype='multipart/form-data';
			form.method='post';
			form.target=ifr.name;
			if(!form.action) form.action=window.location.href;
			if(para.url) {
				var action=form.action;
				form.action=para.url;
				form.submit();
				form.action=action;
			}
			else form.submit();
			return this;
		}
		para.type=para.type?para.type.toUpperCase():'GET';
		para.charset=para.charset?para.charset:'UTF-8';
		if(!para.contentType) para.contentType='text/html;charset='+para.charset;
		if(typeof (para.async)=='undefined') para.async=true;
		var xmlhttp=null;
		if(window.XMLHttpRequest) xmlhttp=new XMLHttpRequest();
		else {
			try {
				xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch(e) {
				xmlhttp=new ActiveXObject("Msxml2.XMLHTTP");
			}
		}
		if(para.data) {
			para.contentType='application/x-www-form-urlencoded;charset='+para.charset;
			para.type='POST';
			if(typeof (para.data)=='object') {
				var _data='';
				for(var key in para.data) {
					if(para.data[key])
						_data+=key+'='+encodeURIComponent(para.data[key])+'&';
					else _data+=key+'=&';
				}
				_data=_data.substr(0,_data.length-1);
				para.data=_data;
			}
		}
		if(!para.cache) {
			var now=new Date();
			now='_='+now.getFullYear()+(now.getMonth()+1)+now.getDate()+now.getHours()+now.getMinutes()+now.getSeconds();
			if(para.url.indexOf('?')> -1)
				para.url+='&'+now;
			else para.url+='?'+now;
		}
		xmlhttp.onreadystatechange=function() {
			if(xmlhttp.readyState==2) {
				if(typeof (para.loading)=='function') {
					para.loading.call(para.context);
				}
			}
			else if(xmlhttp.readyState==4) {
				if(xmlhttp.status!=200) {
					if(typeof (para.error)=='function') {
						para.error.call(para.context);
					}
				}
				else if(typeof (para.success)=='function') {
					var request=null;
					if(!para.dataType) {
						var getType=xmlhttp.getResponseHeader("Content-Type");
						if(getType) {
							if(getType.indexOf('/json')) para.dataType='json';
							else if(getType.indexOf('/javascript')) para.dataType='script';
							else if(getType.indexOf('/xml')) para.dataType='xml';
							else if(getType.indexOf('/html')) para.dataType='html';
							else para.dataType='text';
						}
						else para.dataType='text';
					}
					switch(para.dataType.toLowerCase()) {
						case 'json':
							{
								try {
									request=eval('('+xmlhttp.responseText+')');
								}
								catch(e) { request=xmlhttp.responseText; }
								break;
							}
						case 'script':
							{
								try {
									eval(xmlhttp.responseText);
								}
								catch(e) { }
								break;
							}
						case 'xml':
							{
								request=xmlhttp.responseXML;
								break;
							}
						default:
							{
								request=xmlhttp.responseText;
								break;
							}
					}
					para.success.call(para.context,request);
				}
			}
		};
		xmlhttp.open(para.type,para.url,para.async);
		if(para.type=='POST') xmlhttp.setRequestHeader('Content-Type',para.contentType);
		xmlhttp.setRequestHeader('Accept','*/*');
		if(para.dataType) xmlhttp.setRequestHeader('dataType',para.dataType);
		try { xmlhttp.send(para.data); } catch(e) {
			if(typeof (para.error)=='function') {
				para.error.call(para.context);
			}
		}
		return this;
	};
	Array.prototype.contains=function(e) {
		if(e instanceof Array) {
			for(var i=0;i<e.length;i++) {
				if(this.contains(e[i])==false)
					return false;
			}
			return true;
		}
		else {
			for(var i=0;i<this.length;i++) {
				if(this[i]===e) return true;
			}
		}
		return false;
	};
	Array.prototype.unique=function() {
		var arr=[];
		for(var i=0;i<this.length;i++) {
			if(!arr.contains(this[i])) arr.push(this[i]);
		}
		return arr;
	};
	Array.prototype.union=function() {
		var arr=this.slice(0);
		for(var i=0;i<arguments.length;i++)
			arr=arr.concat(arguments[i]);
		return arr.unique();
	};
	Array.prototype.inall=function() {
		var arr=this.slice(0);
		for(var i=0;i<arr.length;i++) {
			for(var b=0;b<arguments.length;b++) {
				if(arguments[b].contains(arr[i])==false) {
					arr.splice(i,1);i-=1;
					break;
				}
			}
		}
		return arr;
	};
	Array.prototype.exclude=function(e) {
		var arr=[];
		if(e instanceof Array==false) e=[e];
		for(var i=0;i<this.length;i++) {
			if(!e.contains(this[i]))
				arr.push(this[i]);
		}
		return arr;
	};
	Array.prototype.insert=function(value,index) {
		if(value instanceof Array==false) {
			var type=typeof (value);
			if(type=='string') value=value.split(/[,\s\|][\s]*/gi);
			else if(type=='function') {
				value=value.call(this);
				if(value instanceof Array==false) {
					type=typeof (value);
					if(type=='string') value=value.split(/[,\s\|][\s]*/gi);
					else value=[value];
				}
			}
			else value=[value];
		}
		if(typeof (index)!='number'||index>this.length-1) {
			for(var i=0;i<value.length;i++)
				this.push(value[i]);
		}
		else if(index>0==false) {
			for(var i=0;i<value.length;i++)
				this.unshift(value[i]);
		}
		else {
			var arr=this.splice(0,index);
			for(var i=0;i<value.length;i++)
				arr.push(value[i]);
			for(var i=arr.length-1;i> -1;i--)
				this.unshift(arr[i]);
		}
		return this;
	};
	String.prototype.trim=function() {
		return this.replace(/(^[\s]+)|([\s]+$)/gi,'');
	};
	String.prototype.trimLeft=function() {
		return this.replace(/^[\s]+/gi,'');
	};
	String.prototype.trimRight=function() {
		return this.replace(/[\s]+$/gi,'');
	};
	function nodeListToArray(list) {
		var arr=[];
		for(var i=0;i<list.length;i++)
			arr.push(list[i]);
		return arr;
	}
	function getStyle(dom,key) {
		return window.getComputedStyle?window.getComputedStyle(dom,null)[key]:dom.currentStyle?dom.currentStyle[key]:dom.runtimeStyle[key];
	}
	function setStyle(_value,value,relative) {
		var val=value-0;
		if(isNaN(val)==false) value=val;
		if(typeof (_value)=='undefined'||_value==null) return value;
		var unit=(_value+'').replace(/[0-9.\-\+]+/gi,'');
		if(relative) value=parseFloat(_value)+parseFloat(value);
		if(typeof (value)=='number') value=value+unit;
		else if(typeof (value)=='string'&&value.indexOf('=')> -1) {
			value=parseFloat(value.replace('=',''));
			value=parseFloat(_value)+value+unit;
		}
		return value;
	}
	function privateStyle(dom,key,val) {
		key=key.charAt(0).toUpperCase()+key.substring(1);
		if(typeof (val)=='string')
			dom.style[$.browser.core+key]=val.replace('transform','-'+$.browser.core+'-transform');
		else dom.style[$.browser.core+key]=val;
	}
	$.query={};$.cookie={};$.browser={};
	$.queryUrl=function(){
		var url=window.location.hostname+window.location.pathname,_query='';
		for(var key in $.query) _query+=key+'='+$.query[key]+'&';
		if(_query)url+='?'+_query.substring(0,_query.length-1);
		if(window.location.hash)url+='#'+window.location.hash;
		url='http://'+url;
		return url;
	};
	$.setCookie=function(key,value,options) {
		options=options||{};
		var expires='';
		var date=new Date();
		if(options.expires&&(typeof options.expires=='number'||options.expires.toUTCString)) {
			if(typeof options.expires=='number') {
				date=new Date();
				date.setTime(date.getTime()+(options.expires*24*60*60*1000));
			} else {
				date=options.expires;
			}
			expires=';expires='+date.toUTCString();
		}
		var path=options.path?';path='+options.path:'';
		var domain=options.domain?';domain='+options.domain:'';
		var secure=options.secure?';secure':'';
		if(value==null) {
			date=new Date();date.setTime(date.getTime-10000);
			expires=';expires='+date.toUTCString();
			document.cookie=[key,'=','',expires,path,domain,secure].join('');
			delete $.cookie[key];
		}
		else {
			document.cookie=[key,'=',encodeURIComponent(value),expires,path,domain,secure].join('');
			if(document.cookie=='') return $;
			$.cookie[key]=value;
		}
		return $;
	};
	(function() {
		var qs=window.location.href.split('?');
		if(qs.length>1) {
			qs=qs[1].split('#')[0];
			qs=qs.split('&');
			var index,name,val=null;
			for(var i=0;i<qs.length;i++) {
				if(qs[i].length==0) continue;
				index=qs[i].indexOf('=');
				if(index<0||index==qs[i].length-1) val='';
				else val=decodeURIComponent(qs[i].substring(index+1));
				name=qs[i].split('=');
				name=name[0].toLowerCase();
				$.query[name]=val;
			}
			if($.query._)
				delete $.query._;
		}
		if(document.cookie&&document.cookie!='') {
			var name,val=null;
			qs=document.cookie.split(';');
			for(var i=0;i<qs.length;i++) {
				index=qs[i].trim().indexOf('=');
				if(index<0) { name=qs[i];val=''; }
				else {
					name=qs[i].substring(0,index).trim();
					val=qs[i].substr(index+1);
					if(val!='') val=decodeURIComponent(val);
				}
				if(name.length>0) $.cookie[name]=val;
			}
		}
		var ua=window.navigator.userAgent.toLowerCase();
		if(ua.indexOf('trident')> -1) $.browser.core='ms';
		else if(ua.indexOf('presto')>1) $.browser.core='o';
		else if(ua.indexOf('applewebkit')> -1) $.browser.core='webkit';
		else if(ua.indexOf('firefox')> -1) $.browser.core='moz';
		$.browser.device={
			mobile: ua.indexOf('mobile')> -1, 
			ios: ua.indexOf('mac os x')> -1, 
			android: ua.indexOf('android')> -1||ua.indexOf('linux')> -1, 
			iphone: ua.indexOf('iphone')> -1||ua.indexOf('mac')> -1, 
			ipad: ua.indexOf('ipad')> -1 
		};
		$.browser.app={
			wechat: ua.indexOf('micromessenger')> -1, 
			qq: ua.indexOf('qq/')> -1, 
			qqb: ua.indexOf('qqbrowser')> -1,
			uc: ua.indexOf('ucbrowser')> -1
		};
		if($.browser.core=='ms') {
			var msie=ua.split('msie ');
			if(msie.length>1) $.browser.version=parseInt(msie[1].split('.')[0]);
			else $.browser.version=parseInt(ua.split('rv:')[1].split('.')[0]);
		}
		$(function() {
			$.html=$('html');
			$.body=$('body');
			$.head=$('head');
			var className=[$.browser.core];
			if($.browser.core=='ms') {
				className.push('ms'+$.browser.version);
				if($.browser.version<9) className.push('msl9');
				else className.push('msg8');
			}
			for(var key in $.browser.device) {
				if($.browser.device[key]) className.push(key);
			}
			for(var key in $.browser.app) {
				if($.browser.app[key]) className.push(key);
			}
			$.html.addClass(className);
		});
	})();
})();