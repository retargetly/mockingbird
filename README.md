<p align="center">
	<img src="mockingbird-logo.png?raw=true" alt="mockingbird" />
</p>
# Mockingbird (v1.1.0)

##Detect ad blockers and take actions with a simple standalone script.

This is an on-line fiddle where you can play with the code: http://jsfiddle.net/retargetly/9vsha32h/

And this is the on-line web example preview: http://dmp.retargetly.com/mockingbird

Also check the example folder, you can download it and test it on your local machine.

##Description

Mockingbird is an open source plugin for detecting users with ad blockers that navigate your site, and show them different messages, or even static advertising using your own servers as the ad server.

##Works on the following browsers

- Chrome
- Firefox
- Opera
- Safari
- Internet Explorer (8+)

##Installation

Just download mockingbird.js (or mockingbird.min.js) and add it to your website. Then execute the only method "adsBlocked" with its parameters upon your desire.

##Javascript code example

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
			selector: '.container2',
			msg:'We live from Ads, help us to protect our content by disabling the ad blocker for our site.',
			classes: {
				container:'cnt',
				msg:'msg',
			},
			replaceContents: true,
		},{
			selector: '.container3',
			src:'https://dnzhvivadqvt4.cloudfront.net/setup/test.json',
			classes: {
				container:'cnt3',
				msg:'msg',
			},
			replaceContents: true,
		}],
		popup: {
			title: 'WARNING',
			msg: '<strong>Please</strong> disable your ad blocker',
			buttonLabel: 'Keep browsing',
			type: 'small',
			classes: {
				title: '',
				msg: '',
				container: '',
				exitButton: ''
			},
			exitButton: true
		},
		requestValidation: false,
		handler: function(blocked) {
			if(blocked)
				console.log("Ad Blocker detected")
			else
				console.log("User not using an Ad blocker")
		}
	})
}
```

##HTML code example

```html
	<!-- this example uses google DFP tags -->
	<div class="container1" style="margin:0 auto;width:728px;height:90px;background:#000;">
		<div id="div-gpt-ad-1450125646903-0" style="height:90px; width:728px;">
			<script type='text/javascript'>
			googletag.cmd.push(function() { googletag.display('div-gpt-ad-1450125646903-0'); });
			</script>
		</div>
		<!-- if the adblocker blocked ads, then this container (.container1) will be emptied and then will be loaded with whatever message or ad you configured -->
	</div>
```


## Method Properties

Anywhere on the html of your site you can initiate mockingbird script with the method adsBlocked. It receives an object which can have the following properties:

* containers [array]
This is an array of Ads containers. Each ad container will be an object with the following properties:

    * selector: [string | jQueryObject] - Default: null -> css selector that will match containers. It is possible for this to be a jQuery object like $('.div1')
    * src: [string] (optional) - Default: null -> ONLY for mockingbird Ad Server integration, this let's load dynamic banners even when ad blockers enabled
    * img: [string] (optional) - Default: null -> relative or absolute url PATH of the image that will replace the Ad if ad blocker enabled
    * link: [string] (optional) - Default: null -> full url of the ad destination
    * title: [string] (optional) - Default: 'link' -> title of the <a> tag
    * replaceContents: [boolean] (optional) - Default: true -> will replace all the content of the containers that match the selector
    * msg: [string] (optional) - Default: null -> The message to be displayed if ad blocker enabled. Also accepts html markup string
    * classes: [obj] (optional) - Default: null -> Object with classes properties
        * container: [string] (optional) - Default: null -> The class that will be added to the containers matched in "selector" property if ads blocked
        * msg: [string] (optional) - Default: null -> The class that will be added to the message if ads blocked

* popup [object]
This is the popup object that will define the popup behaviour, can be a full page popup or a small notification on the top of the page. It has the following properties:

    * title: [string] (optional) - Default: null -> [Only for type:'full']. Is the title of the popup window. Also accepts html markup string
    * buttonLabel: [string] (optional) - Default: 'Cancel' -> [Only for type:'full' and exitButton: true]. This is the button label. Also accepts html markup string
    * msg: [string] - Default: null -> This is the main message that will be displayed on the popup. Also accepts html markup string
    * type: [string] (optional) - Values: ['full','small'] - Default: 'small' -> The popup type. 'full' is a popup that occupies the whole page, 'small' is a small text on the top of the page
    * exitButton: [boolean] (optional) - Default: true -> Enables/disables a button to close the popup
    * classes: [object] (optional) - Default: null -> Object with classes properties
        * title: [string] (optional) - Default: null -> [Only for type:'full']. Removes default css of popup title and adds the value as class
        * msg: [string] (optional) - Default: null -> Removes default css of popup message and adds the value as class
        * container: [string] (optional) - Default: null -> Removes default css of popup container and adds the value as class
        * exitButton: [string] (optional) - Default: null -> [Only for exitButton: true]. Removes default css of popup close button and adds the value as class


* handler [function] (optional) - Default: null -> Handler to be executed after checking if ad blocker enabled. This function receives one boolean parameter, true if user has an ad blocker, false if not

* requestValidation [boolean] (optional) - Default: false -> Enables/disables an http request to a local fake url with common adds tags. This ensures a secondary ad blocker detection.

You have to put either img and link properties, or msg property, one of them is mandatory for the plugin to work. If image is provided then link should be provided as well.

## How it works

Mockingbird uses two different ways for detecting ad block. First by containers with common ads classes, and then it optionally falls back into a request to a local fake url with many common adds tags.

## Recomendations

Download the file and change its name from mockingbird to something else so ad blockers won't block the load of the script. Also you can rename the method "adsBlocked" to anything else inside mockingbird.js and then rename it also on your html code.

## Next updates

* New optional parameter 'redirect URL' so, if present, all traffic with ad blockers enabled goes to that URL until gets ad blocker disabled.
* Integration with Retargetly's DMP to get stats about traffic with ad blockers, impressions and clicks counters served to those users, a/b testing of ads and messages, possibility to change messages whithin the platform without changing site code.


## Contact

For suggestions, doubts, or any kind of question you may have please e-mail federico@retargetly.com
