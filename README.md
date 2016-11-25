# Crossdomain Data Request
After install and reload page, you can send crossdomain requests without CORS blocking from user or page scripts.

Usage (example):
```javascript
/* 
   CDDRequest.get(DataType, URL, callback, errorback);
   * known types: { "Blob" | "ArrayBuffer" | "Text" } (any other specify type return base64 string by default)
   * errorback - optional
*/

CDDRequest.get('Blob', 'http://worrydream.com/bret-victor-headshot.jpg', function (data) {
   console.info(data)
});

//> Blob {size: 178264, type: "image/jpeg"}
```
