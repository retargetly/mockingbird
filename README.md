![mockingbird](mockingbird-logo.png?raw=true "Mockingbird")
# Mockingbird (v1.0.1)
Detect ad blockers and take actions with a simple standalone script.
----------------------
This is an on-line example: http://jsfiddle.net/retargetly/9vsha32h/5/

Also check the example folder, with a really simple code snippet.

Works on the following browsers
----------------------
- Chrome
- Firefox
- Opera
- Safari
- Internet Explorer (8+)

##Installation

Just download mockingbird.js (or mockingbird.min.js) and add it to your website. Then execute the only method "adsBlocked" with its parameters upon your desire.

##Code example
---------------------
```javascript
if(mockingbird)
{
	mockingbird.adsBlocked({
		containers: [{
			img: 'top_img.png',
			link: 'http://retargetly.com/#top',
			title: 'Get me there!',
			replaceContents: true,
			selector: '.container1'
		},{
			// img: '21589c.png',
			// link: 'http://retargetly.com/#top2',
			selector: '.container2,.container3',
			msg:'We live from Ads, help us to protect our content by disabling the ad blocker for our site.',
			msgClass:'msg',
			replaceContents: true,
		}],
		
		handler: function() {
			console.log("Ad Blocker detected")
		}
	})
}
```

## Explanation

Anywhere on the html of your site you can initiate mockingbird script with the method adsBlocked. It receives an object which can have the following properties:

* containers [array]
This is an array of Ads containers. Each ad container will be an object with the following properties:
    * selector: [string | jQueryObject] - Default: null -> css selector that will match containers. It is possible for this to be a jQuery object like $('.div1')
    * img: [string] (optional) - Default: null -> relative or absolute url PATH of the image that will replace the Ad if ad blocker enabled
    * link: [string] (optional) - Default: null -> full url of the ad destination
    * title: [string] (optional) - Default: 'link' -> title of the <a> tag
    * replaceContents: [boolean] (optional) - Default: true -> will replace all the content of the containers that match the selector
    * msg: [string] (optional) - Default: null -> The message to be displayed if ad blocker enabled
    * msgClass: [string] (optional) - Default: null -> The class of the span that will hold the message

* handler [function] (optional) - Default null -> Handler to be executed if user has ad blocker enabled


## Description

Mockingbird uses two different ways for detecting ad block. First by containers with common ads classes, and then it falls back into a request to a local fake url with many common adds tags.

## Recomendations

Download the file and change its name from mockingbird to something else so ad blockers won't block the load of the script.

## Next updates

* Add parameter to show popup with a message, and have the possibility to not let the user keep browsing on the site
* Integration with Retargetly's DMP to get stats about traffic with ad blockers, impressions and clicks counters served to those users, a/b testing of ads and messages, possibility to change messages whithin the platform without changing site code.