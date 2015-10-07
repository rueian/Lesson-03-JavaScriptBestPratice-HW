'use strict';

function XHRequest(method, url) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.responseType = 'json';
    xhr.onreadystatechange = function(e) {
      if (this.readyState === 4 && this.status === 200) {
        var listData = this.response;
        // The flow ends here.
        resolve(listData);
      } else if (this.status !== 200 ){
        reject(this);
      }
    };
    xhr.send();
  });
}
