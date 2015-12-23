var mockingbird = (function () {
    var adb = 0;
	
    var callbacks = []

    var handlerFn = null

    domReady()

    dadb()

    return {
    	adsBlocked: function(obj) {
    		if(adb == -1 || (typeof obj.msg == "undefined" && typeof obj.handler != "function"))
    			return

    		var fn = null

    		xqfn(obj.handler,true)
    		var containers = obj.containers || null
    		var popup = obj.popup || null
    		var selector

    		if(containers)
    		{
    			fn = function()
	    		{
				    docReady(function(){
		    			for(var i=0;i<containers.length;i++)
		    			{
		    				selector = containers[i].selector

				    		if(selector)
				    		{
						    	var cs = getContainers(selector)

							    for(var j=0;j<cs.length;j++)
						    	{
						    		var sp = null

						    		if(typeof containers[i].img === "string" && typeof containers[i].link === "string")
						    		{
						    			sp = getA(containers[i].img,containers[i].link,containers[i].title)
						    		}
						    		else if(typeof containers[i].msg === "string")
						    		{
						    			sp = createMsg(containers[i].msg,containers[i].classes)
						    		}
						    		else if(typeof containers[i].src === "string")
						    		{
						    			
						    			resolveCDN(cs[j],containers[i].src,containers[i].replaceContents)
						    		}

						    		if(typeof containers[i].classes != "undefined" && typeof containers[i].classes.container != "undefined")
						    			cs[j].className += ' '+containers[i].classes.container

						    		if(sp)
						    		{
										addHtml(cs[j],sp,containers[i].replaceContents)
						    		}

						    	}
				    		}
			    		}
				    })
    			}

    			xqfn(fn)
    		}

    		if(popup)
    		{
    			fn = function() {
    				if(typeof popup.msg == "undefined")
    					return
    				
    				if(typeof popup.title == "undefined")
    					popup.title = ''

    				if(popup.type != 'full')
    					popup.type = 'small'


    				if(popup.type == 'small')
    				{

    					var div = cDiv({
    						msg: popup.msg,
    						exit: popup.exitButton,
    						classes: popup.classes
    					})

    					div.style.zIndex = '999'
    				}
    				else
    				{
    					var div = cDiv({
    						msg: popup.msg,
    						exit: popup.exitButton,
    						title: popup.title,
    						label: popup.buttonLabel,
    						classes: popup.classes
    					})

    					var transparent = document.createElement('div')

    					transparent.setAttribute("style", "filter:progid:DXImageTransform.Microsoft.Alpha(opacity=50)");

    					transparent.style.zIndex = '998'
    					transparent.style.opacity = 0.5
						transparent.style.position='fixed'
						transparent.style.top='0'
						transparent.style.right='0'
						transparent.style.bottom='0'
						transparent.style.left='0'
						transparent.style.width='100%'
						transparent.style.background='#000'
    					
    					var parent = document.createElement('div')
    					parent.style.zIndex = '998'
						parent.style.width='100%'
						parent.style.height='100%'
						parent.style.position='fixed'
						parent.style.top='0'
    					
						div.style.margin='0 auto'
						div.style.marginTop='15%'
						div.style.border='1px solid #bababa'
						div.style.background='#FFF'
						div.style.textAlign='center'
						
						div.style.width='400px'
						div.style.height='auto'

    					transparent.appendChild(div)

    					parent.appendChild(div)
    					div = parent
    					document.body.appendChild(transparent)
    				}

    				document.body.appendChild(div)
    			}

    			xqfn(fn)
    		}
    	}
    }

    function cDiv(obj)
    {
    	var small = true
    	if(typeof obj.title != "undefined")
    		small = false

    	if(typeof obj.exit == "undefined")
    		obj.exit = true

    	var div = document.createElement('div')
		var html = ''
    		
    	var containerStyle,titleStyle,buttonStyle,msgStyle

    	if(small)
    	{
			if(typeof obj.classes == "object" && typeof obj.classes.container == "string" && obj.classes.container != "")
				containerStyle = ' class="'+(typeof obj.classes.container == "string"?obj.classes.container:'')+'"'
			else
				containerStyle = ' style="text-align:center;font-size: 14px !important;box-sizing: border-box;font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif;padding:8px;border: 1px solid transparent;border-radius: 0 0 4px 4px;color: #a94442;background-color: #f2dede;border-color: #ebccd1;"'

			if(typeof obj.classes == "object" && typeof obj.classes.exitButton == "string" && obj.classes.exitButton != "")
		    	buttonStyle = ' class="'+(typeof obj.classes.exitButton == "string"?obj.classes.exitButton:'')+'"'
			else
		    	buttonStyle = ' style="margin-left:8px;font-family: Verdana,sans-serif;color: #000;opacity: 0.4;text-shadow: 0 1px 0 #fff;float: right;text-decoration: none !important;line-height: 1.2;"'
		    
			if(typeof obj.classes == "object" && typeof obj.classes.msg == "string" && obj.classes.msg != "")
		    	msgStyle = ' class="'+(typeof obj.classes.msg == "string"?obj.classes.msg:'')+'"'
		    else
		    	msgStyle = ''

    		html += '<div style="max-width:600px;position:fixed;top:0;left:0;right:0;margin:0 auto">'
	    		html += '<div'+containerStyle+'>'
	    		if(obj.exit)
	    			html += '<a href="javascript:;" onmouseover="this.style.opacity = 1" onmouseout="this.style.opacity = 0.4" onclick="var p = this.parentElement.parentElement.parentElement; var a = this.parentElement.parentElement; p.removeChild(a);"'+buttonStyle+'>×</a>'
	    		html += '<span'+msgStyle+'>'+obj.msg+'</span>'
	    		html += '</div>'
    		html += '</div>'
    	}
    	else
    	{

    		if(typeof obj.classes == "object" && typeof obj.classes.container == "string" && obj.classes.container != "")
				containerStyle = ' class="'+(typeof obj.classes.container == "string"?obj.classes.container:'')+'"'
			else
		    	containerStyle = ' style="top: 0;left: 0;max-width: 276px;padding: 1px;font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif;font-size: 14px;font-style: normal;font-weight: 400;line-height: 1.42857143;text-align: start;text-decoration: none;text-shadow: none;text-transform: none;letter-spacing: normal;word-break: normal;word-spacing: normal;word-wrap: normal;white-space: normal;background-color: #fff;background-clip: padding-box;border: 1px solid rgba(0,0,0,.2);border-radius: 6px;box-shadow: 0 5px 10px rgba(0,0,0,.2);"'

    		if(typeof obj.classes == "object" && typeof obj.classes.title == "string" && obj.classes.title != "")
				titleStyle = ' class="'+(typeof obj.classes.title == "string"?obj.classes.title:'')+'"'
			else
		    	titleStyle = ' style="padding: 8px 14px;margin: 0;font-size: 14px;background-color: #f7f7f7;border-bottom: 1px solid #ebebeb;border-radius: 5px 5px 0 0;"'

			if(typeof obj.classes == "object" && typeof obj.classes.exitButton == "string" && obj.classes.exitButton != "")
		    	buttonStyle = ' class="'+(typeof obj.classes.exitButton == "string"?obj.classes.exitButton:'')+'"'
			else
		    	buttonStyle = ' style="display: inline-block;padding: 6px 12px;margin-bottom: 8px;font-size: 14px;text-decoration:none;font-weight: 400;line-height:1.42857143;text-align:center;white-space: nowrap;vertical-align: middle;-ms-touch-action: manipulation;touch-action: manipulation;cursor: pointer;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;background-image: none;border: 1px solid transparent;border-radius: 4px;color: #fff;background-color: #5cb85c;border-color: #4cae4c;"'
		    
			if(typeof obj.classes == "object" && typeof obj.classes.msg == "string" && obj.classes.msg != "")
		    	msgStyle = ' class="'+(typeof obj.classes.msg == "string"?obj.classes.msg:'')+'"'
		    else
		    	msgStyle = ''

    		if(typeof obj.label == "undefined")
    			obj.label = 'Cancel'

	    	html += '<div'+containerStyle+'>'
			    html += '<h3'+titleStyle+'>'+obj.title+'</h3>'
			    html += '<div style="padding: 9px 14px;">'
			    html += '<span'+msgStyle+'>'+obj.msg+'</span>'
			    html += '</div>'

		    if(obj.exit)
		    	html += '<a href="javascript:;" title="'+obj.label+'" onclick="var p = this.parentElement.parentElement.parentElement; var a = this.parentElement.parentElement; var b = a.previousSibling; p.removeChild(a); p.removeChild(b);" '+buttonStyle+'>'+obj.label+'</a>'

			html += '</div>'
    	}

    	div.innerHTML = html;
		
		return div.firstChild
    }

    function resolveCDN(cnt,cdn,replace)
    {
    	var cb = function(obj)
    	{
	    	if(typeof obj.img == "string" && typeof obj.title == "string" && typeof obj.url == "string")
	    	{
	    		var sp = getA(obj.img,obj.url,obj.title)

	    		addHtml(cnt,sp,replace)
	    	}
    	}

    	cdnData('GET',cdn,true,cb)
    }

    function xqfn(fn,handler)
    {
    	if(adb==0)
		{
			if(handler)
				handlerFn = fn
			else
				addCallback(fn)
		}
		else
		{
			if(handler && typeof fn == "function")
			{
				fn(adb==1)
			}
			else if(adb == 1) //ad blocker detected
			{
				if(typeof fn == "function")
					fn()
			}
		}
		
    }

    function addCallback(fn)
    {
    	if(typeof fn != "function")
    		return

    	callbacks.push(fn)

    	return
    }

    function getContainers(selector)
    {
    	var cs = []

    	if(typeof jQuery != "undefined")
    	{
    		if(!(selector instanceof jQuery))
			{
				selector = jQuery(selector)
    		}

			for(var i=0;i<selector.length;i++)
			{
				cs.push(selector[i])
			}
    	}
    	else
    	{
    		cs = document.querySelectorAll(selector)
    	}

    	return cs
    }

    function createMsg(msg,classes)
    {
    	var s = document.createElement('span')

		if(typeof classes != "undefined" && typeof classes.msg != "undefined")
			s.className = classes.msg

		s.innerHTML = msg

		return s
    }

	function getParentTag()
	{
		var scriptTag = document.scripts[document.scripts.length - 1];
		return scriptTag.parentNode;
	}

	function dadb()
	{
		docReady(function(){
			var div = document.createElement('div')
			div.className='ad-placement ad-unit'
			div.id='mockingbird-unit-id'
			div.style.width='1px'
			div.style.height='1px'
			div.style.position='absolute'
			div.style.top='0'
			div.style.left='0'

			document.body.appendChild(div)

			var elem = document.getElementById('mockingbird-unit-id')

			if(elem)
			{
				setTimeout(function() {
					if(elem.offsetWidth==0 && elem.offsetHeight==0)
					{
						executeCallbacks(true)
					}
					else
					{
						var url = '/ads/advertise/adsense/banner/smart/atlas/appnexus/adserver/ads.json?adsize=300x250&advid='+parseInt(Math.random()*100000000)
						var xhr = cors('GET', url, false);
					}
				}, 20); //20ms to give time to browser to add blockers filters
			}
				
		})

	}

	function cdnData(method, url, async, callback) {
		var onReady = function() {
			if(this.readyState == 4)
			{
				if(this.status == 200)
				{
					var data;
				    if (!xhr.responseType || xhr.responseType === "text") {
				        data = xhr.responseText;
				    } else if (xhr.responseType === "document") {
				        data = xhr.responseXML;
				    } else {
				        data = xhr.response;
				    }

				    var ret = null

				    try
				    {
				    	ret = JSON.parse(data)
					}
					catch(e)
					{
						ret = null
					}

					callback(ret)

					return
				}
			}
		}

		var xhr = new XMLHttpRequest();

		if ("withCredentials" in xhr) {
			// Check if the XMLHttpRequest object has a "withCredentials" property.
			// "withCredentials" only exists on XMLHTTPRequest2 objects.
			xhr.onreadystatechange = onReady
			xhr.open(method, url, true);
		} else if (typeof XDomainRequest != "undefined") {
			// Otherwise, check if XDomainRequest.
			// XDomainRequest only exists in IE, and is IE's way of making CORS requests.
			xhr = new XDomainRequest();
			xhr.onreadystatechange = onReady
			xhr.open(method, url);
		} else {
			// Otherwise, CORS is not supported by the browser.
			xhr = null;
		}

		if(xhr)
			xhr.send()

		return
	}
	function cors(method, url, async) {
		var onReady = function() {
			if(this.readyState == 4)
			{
				if(this.status == 0)
				{
					adb = 1
				}
				else
				{
					adb = -1
				}

				executeCallbacks(adb==1)
			}
		}

		var xhr = new XMLHttpRequest();

		if ("withCredentials" in xhr) {
			// Check if the XMLHttpRequest object has a "withCredentials" property.
			// "withCredentials" only exists on XMLHTTPRequest2 objects.
			xhr.onreadystatechange = onReady
			xhr.open(method, url, true);
		} else if (typeof XDomainRequest != "undefined") {
			// Otherwise, check if XDomainRequest.
			// XDomainRequest only exists in IE, and is IE's way of making CORS requests.
			xhr = new XDomainRequest();
			xhr.onreadystatechange = onReady
			xhr.open(method, url);
		} else {
			// Otherwise, CORS is not supported by the browser.
			xhr = null;
		}

		if(xhr)
			xhr.send()

		return
	}

	function domReady()
	{
		(function(funcName, baseObj) {
		    funcName = funcName || "docReady";
		    baseObj = baseObj || window;
		    var readyList = [];
		    var readyFired = false;
		    var readyEventHandlersInstalled = false;

		    function ready() {
		        if (!readyFired) {
		            readyFired = true;
		            for (var i = 0; i < readyList.length; i++) {
		                readyList[i].fn.call(window, readyList[i].ctx);
		            }
		            readyList = [];
		        }
		    }

		    function readyStateChange() {
		        if ( document.readyState === "complete" ) {
		            ready();
		        }
		    }

		    baseObj[funcName] = function(callback, context) {
		        if (readyFired) {
		            setTimeout(function() {callback(context);}, 1);
		            return;
		        } else {
		            readyList.push({fn: callback, ctx: context});
		        }
		        if (document.readyState === "complete") {
		            setTimeout(ready, 1);
		        } else if (!readyEventHandlersInstalled) {
		            if (document.addEventListener) {
		                document.addEventListener("DOMContentLoaded", ready, false);
		                window.addEventListener("load", ready, false);
		            } else {
		                document.attachEvent("onreadystatechange", readyStateChange);
		                window.attachEvent("onload", ready);
		            }
		            readyEventHandlersInstalled = true;
		        }
		    }
		})("docReady", window);
	}

	function getA(img,link,title)
	{
		var objImg = new Image()
		objImg.alt=''
		objImg.src=img

		var a = document.createElement("a");
		a.appendChild(objImg);
		a.href=link
		a.title= title || 'Link'
		a.target='_blank'

		return a
	}

	function addHtml(cnt,sp,replace)
	{
		if(typeof replace == "undefined" || replace == true)
			cnt.innerHTML = ''

		cnt.appendChild(sp)
	}

	function executeCallbacks(blocked)
	{
		if(blocked)
		{
			for(var i=0;i<callbacks.length;i++)
			{
				callbacks[i]()
			}
		}

		if(handlerFn)
			handlerFn(blocked)
	}

})();