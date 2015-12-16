var mockingbird = (function () {
    var adb = 0;
	
    var callbacks = []

    domReady()

    dadb()

    return {
    	adsBlocked: function(obj) {
    		if(adb == -1 || (typeof obj.msg == "undefined" && typeof obj.handler != "function"))
    			return

    		var s_fn = null

    		var fn = obj.handler || null
    		var containers = obj.containers || null
    		var selector

    		if(containers)
    		{
    			s_fn = function()
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
						    			sp = createMsg(containers[i].msg,containers[i].msgClass)
						    		}

						    		if(sp)
						    		{
										addHtml(cs[j],sp,containers[i].replaceContents)
						    		}

						    	}
				    		}
			    		}
				    })
    			}
    		}

    		if(adb == 1) //ad blocker detected
    		{
    			if(typeof s_fn == "function")
					s_fn()

				if(typeof fn == "function")
					fn()
    		}
			else if(adb==0)
			{
				addCallback(s_fn)
				addCallback(fn)
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

    function createMsg(msg,msgClass)
    {
    	var s = document.createElement('span')

		if(typeof msgClass != "undefined")
			s.className = msgClass

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
						executeCallbacks()
					}
					else
					{
						var url = '/ads/advertise/adsense/banner/smart/atlas/appnexus/adserver/ads.json?adsize=300x250&advid='+parseInt(Math.random()*100000000)
						var xhr = cors('GET', url, false);
						if(xhr)
							xhr.send()
					}
				}, 20); //20ms to give time to browser to add blockers filters
			}
				
		})

	}

	function cors(method, url, async) {
		var onReady = function() {
			if(this.readyState == 4)
			{
				if(this.status == 0)
				{
					adb = 1
					executeCallbacks()
				}
				else
				{
					adb = -1
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

		return xhr;
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

	function executeCallbacks()
	{
		for(var i=0;i<callbacks.length;i++)
		{
			callbacks[i]()
		}
	}

})();