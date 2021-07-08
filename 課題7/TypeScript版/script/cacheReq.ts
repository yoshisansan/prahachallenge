'use strict';
const publicUrl: string = `https://b070ef488597.ngrok.io`;

const getRequest = (url: string, dom: HTMLElement | null): void => {
  if(dom === null) {
    console.log('DOMが取得できませんでした');

    return;
  }
  const XHR = new XMLHttpRequest();
  XHR.open('GET', url, true);
  // XHR.setRequestHeader('Content-Type', 'application/x-www-application/x-www-form-urlencoded;charset=UTF-8);
  XHR.setRequestHeader('If-Modified-Since', 'Fri, Jul 2021 07:28:00 GMT');
  XHR.onreadystatechange = () => {
    if (XHR.readyState === XMLHttpRequest.DONE && XHR.status === 200 || 304) {
      console.log(`受け取ったデータ： ${XHR.response}`);
      return (dom.innerText = `Done with HTTP ${XHR.status}`);
    }

    return (dom.innerText = `waiting... Now HTTP status ${XHR.status}`);
  };
  XHR.onerror = (e) => {
    dom.innerText = `ErrorMsg: ${e}`;
  };
  XHR.send(null);

  return;
};

const cahceControlGET = (): void => {
  console.log('GET');
  const url: string = `${publicUrl}/cache-control`,
    msgDom: HTMLElement | null = document.getElementById('CahceControlDom');

  getRequest(url, msgDom);

  return;
};
const lastModifiedGET = (): void => {
  console.log('GET');
  const url: string = `${publicUrl}/last-modified`,
    msgDom: HTMLElement | null = document.getElementById('LastModifiedDom');

  getRequest(url, msgDom);

  return;
};