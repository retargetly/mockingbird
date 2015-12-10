# Mockingbird (v1.0.0)
Detect ad blockers and take actions with a simple standalone script.
----------------------
This is an on-line example: http://jsfiddle.net/retargetly/9vsha32h/

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
		msg:'We live from Ads, help us to protect our content by disabling the ad blocker for our site.', //simple message that will be displayed if user has ad blocker

		msgClass:'msg', //custom class for the message that will be displayed

		selector: '.container3,.container4', // Selector. This will run jquery if available, or document.querySelectorAll. If selector is not present, the message will be present on the parent container from where this script is executed
		
		replaceContents: true, //true if you want to delete all contents within the containers given by selector
		
		handler: function() {
			console.log("Ad Blocker detected")
		} // callback function to be executed after detecting that ad blocker is present
	})
}
```

## Description

Mockingbird uses two different ways for detecting ad block. First by containers with common ads classes, and then it falls back into a request to a local fake url with many common adds tags.

## Recomendations

Download the file and change its name from mockingbird to something else so ad blockers won't block the load of the script.