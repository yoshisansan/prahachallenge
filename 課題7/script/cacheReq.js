'use strict';
const publicUrl = `https://0750b9ea01f4.ngrok.io`;

// imgタグ挿入
const insertControlCacheImg = (url) => {
  const imgDOM = document.createElement('img');
  imgDOM.src = `${url}/nensyuu.jpg`;

  const insertTargetDOM = document.getElementById('CacheControlImg');
  insertTargetDOM.after(imgDOM);

  return;
}
const insertNotControlCacheImg = (url) => {
  const imgDOM = document.createElement('img');
  imgDOM.src = `${url}/not-cache-control/nensyuu.jpg`;

  const insertTargetDOM = document.getElementById('NotCacheControlImg');
  insertTargetDOM.after(imgDOM);

  return;
}

insertControlCacheImg(publicUrl);
insertNotControlCacheImg(publicUrl);

const getRequest = (url, dom) => {
  const XHR = new XMLHttpRequest();
  XHR.open('GET', url, true);
  // XHR.setRequestHeader('Content-Type', 'application/x-www-application/x-www-form-urlencoded;charset=UTF-8);
  XHR.setRequestHeader('If-Modified-Since', 'Fri, Jul 2021 07:28:00 GMT');
  XHR.onreadystatechange = () => {
    if (XHR.readyState === XMLHttpRequest.DONE && XHR.status === 200 || 304) {
      console.log(`受け取ったデータ： ${XHR.response}`);
      return (dom.innerText = `Done with HTTP status ${XHR.response}`);
    }

    return (dom.innerText = `waiting... Now HTTP status ${XHR.status}`);
  };
  XHR.onerror = (e) => {
    dom.innerText = `ErrorMsg: ${e}`;
  };
  XHR.send(null);

  return false;
};

const cahceControlGET = () => {
  console.log('GET');
  const url = `${publicUrl}/cache-control`,
    msgDom = document.getElementById('CahceControlDom');

  getRequest(url, msgDom);

  return;
};
<<<<<<< HEAD

const lastModifiedGET = () => {
  console.log('GET');
  const url = `${publicUrl}/last-modified`, msgDom = document.getElementById('LastModifiedDom');
  getRequest(url, msgDom);
  return;
};
=======
>>>>>>> 289653088e2aa8ea91cdbf17ff1cd38a917ade06
