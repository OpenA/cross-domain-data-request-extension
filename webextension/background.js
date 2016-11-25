
// Set up request application action.
chrome.runtime.onMessage.addListener(onMessageHandler);

function onMessageHandler(request, sender, sendResponse) {
	if (!request || request.appId !== "xGthFD")
		return;
	switch (request.name) {
		case 'XHR':
			var xhr = new XMLHttpRequest();
				xhr.responseType = 'blob';
				xhr.onreadystatechange = function() {
					if (this.readyState !== 4)
						return;
					if (this.status === 200) {
						var reader = new FileReader();
							reader.onload = function() {
								chrome.tabs.sendMessage(sender.tab.id, {
									to  : request.from,
									url : xhr.responseURL,
									result: reader.result
								});
							}
							reader.readAsDataURL(this.response);
					} else {
						chrome.tabs.sendMessage(sender.tab.id, {
							to    : request.from,
							error : {
								status: this.status,
								text: this.statusText,
								url: this.responseURL }
						});
					}
				};
				xhr.open('GET', request.uri, true);
				xhr.send(null);
	}
}
