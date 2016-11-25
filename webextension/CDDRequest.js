var CDDRequest = (function() {
	
	var promises = {},
		user_id = "123___8";
	
	function init_fn(event) {
		if (event.source !== this || !event.data || event.data.userId !== user_id)
			return;
		if ( event.data.to in promises ) {
			var promis = promises[event.data.to];
			if ('result'   in event.data && promis.resolve instanceof Function) {
				promis.resolve(dataURLTo(promis.type, event.data.result));
			} else
			if ('error'    in event.data) {
				promis.reject(event.data.error);
			}
			delete promises[event.data.to];
		}
	}
	function scReqCD(type, uri, resolve, reject) {
		var uid = getRandUid(6);
		promises[uid] = {
			type    : type,
			resolve : resolve,
			reject  : reject instanceof Function ? reject : error_fn
		}
		window.postMessage({
			appId: "xGthFD",
			uri  : uri,
			from : uid,
			name : 'XHR' 
		}, '*');
	}
	function getRandUid(size) {
		var text = "",
			pass = "=0123456789abc_zip+nf,uhek;LMGD";
		for (var i = 0; i < size; i++) {
			text += pass.charAt(Math.floor(Math.random() * pass.length));
			if (text in promises)
				i--;
		}
		return text;
	}
	function dataURLTo(dataType, dataURL) {
		if (!dataType || (
			 dataType = dataType.toLowerCase()) !== 'text' &&
			 dataType !== 'blob' && dataType !== 'arraybuffer')
			return dataURL;
			
		var binaryString = atob((
			dataURL = dataURL.split(','))[1]);
		if (dataType === 'text')
			return binaryString;
	
		var length = binaryString.length,
			bytes = new Uint8Array(length);
		for (var i = 0; i < length; i++) {
			bytes[i] = binaryString.charCodeAt(i);
		}
	
		if (dataType === 'arraybuffer')
			return bytes.buffer;
		if (dataType === 'blob')
			return new Blob([bytes], {type: (/^data:(.*);/.exec(dataURL[0]) || ['binary/octet-stream'])[1]});
	}
	function error_fn(err) {
		console.error('CDDRequest [x]: '+ err.url +'('+ err.status + (err.text ? ' '+ err.text : '') + ')');
	}
	
	window.addEventListener("message", init_fn, false);
	
	return {
		get: scReqCD
	}
})();
