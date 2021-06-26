'use strict';
// ここに ngrok で生成したリンクを貼る
const publicUrl = `https://7d38bf2cee76.ngrok.io`;

const postRequest = (data, url, dom) => {
  const XHR = new XMLHttpRequest();
  XHR.open('POST', url, true);
  // XHR.withCredentials = true;
  XHR.setRequestHeader('Content-Type', 'application/json');
  XHR.setRequestHeader('Access-Control-Allow-Origin', '*');
  XHR.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  XHR.setRequestHeader('Access-Control-Max-Age', '200');
  XHR.onreadystatechange = () => {
    console.log(XHR.method);
    if (XHR.readyState === XMLHttpRequest.DONE && XHR.status === 200) {
      console.log(`受け取ったデータ： ${XHR.response}`);
      return (dom.innerText = 'Done with HTTP status 200');
    }

    return (dom.innerText = `waiting... Now HTTP status ${XHR.status}`);
  };
  XHR.onerror = (e) => {
    dom.innerText = `ErrorMsg: ${e}`;
  };
  XHR.send(data);

  return false;
};

const ajaxAllowPOST = () => {
  console.log('POST');
  const url = `${publicUrl}/not-simple-req`,
    msgDom = document.getElementById('messageAllowPOST'),
    inputData = document.getElementById('allowCORSinput').value,
    data = { inputText: String(inputData) },
    dataJSON = JSON.stringify(data);

  postRequest(dataJSON, url, msgDom);

  return;
};

const ajaxNotAllowPOST = () => {
  console.log('POST');
  const url = `${publicUrl}/not-simple-req-cors`,
    msgDom = document.getElementById('messageNotAllowPOST'),
    inputData = document.getElementById('notAllowCORSinput').value,
    data = { inputText: inputData },
    dataJSON = JSON.stringify(data);

  postRequest(dataJSON, url, msgDom);

  return;
};
