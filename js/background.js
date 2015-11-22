var scroller_on = false;
var scroller;
var speed;

function load_all(){
	chrome.tabs.onUpdated.addListener(function(id, info, tab){
		chrome.pageAction.show(tab.id);
	});

	chrome.pageAction.onClicked.addListener(function(tab){
		chrome.storage.sync.get({
			speed: 25
		}, function(items) {
			speed = items.speed;
			scroller_on = !scroller_on;
			if (scroller_on){
				chrome.tabs.executeScript(tab.id, {code: "scroller = setInterval(function(){scrollTo(scrollX, scrollY+1)}, "+(101-speed)+");"});
				chrome.pageAction.setTitle({"tabId":tab.id, "title":"Auto Scroll (ON: "+speed+")"});
			} else {
				chrome.tabs.executeScript(tab.id, {code: "clearInterval(scroller);"});
				chrome.pageAction.setTitle({"tabId":tab.id, "title":"Auto Scroll (OFF)"});
			}
		});
	});
}

document.addEventListener('DOMContentLoaded', load_all);