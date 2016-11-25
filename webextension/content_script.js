var APP_CONTEXT = {
	id: "xGthFD",
	EXT_ID: chrome.runtime.id,
	promises: {}
}

chrome.runtime.connect(APP_CONTEXT['EXT_ID'], {name: APP_CONTEXT.id})
chrome.runtime.onMessage.addListener(function(result, sender, sendResponse) {
	if ((sender.extensionId || sender.id) !== APP_CONTEXT['EXT_ID'])
		return;
	if (result.to in APP_CONTEXT.promises) {
		result.userId = "123___8";
		window.postMessage(result, '*');
		delete APP_CONTEXT.promises[result.to];
	}
});

window.addEventListener("message", function(event) {
	if (event.source !== this || !event.data || event.data.appId !== APP_CONTEXT.id)
		return;
	if (event.data.from) {
		APP_CONTEXT.promises[event.data.from] = event.data;
		chrome.runtime.sendMessage(event.data);
	}
}, false);

var cddReq        = document.createElement('script');
	cddReq.src    = chrome.extension.getURL('CDDRequest.js');
	cddReq.onload = function() { this.remove() };
	(document.head || document.documentElement).appendChild(cddReq);
	