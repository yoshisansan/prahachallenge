'use strict';
const publicUrl = `https://6eb3e8d15afb.ngrok.io`;

const postRequest = (data, url, dom) => {
  const XHR = new XMLHttpRequest();
  XHR.open('POST', url, true);
  XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
  XHR.onreadystatechange = () => {
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

const encodeUrl = (data) => {
  // オブジェクトを配列化してencodeURIのフォームに変える処理
  const encoded = Object.entries(data).map(
    ([encodeKey, encodeValue]) =>
      encodeURIComponent(encodeKey) + '=' + encodeURIComponent(encodeValue)
  )[0];

  return encoded;
};

const ajaxAllowPOST = () => {
  console.log('POST');
  const url = `${publicUrl}/simple-req`,
    msgDom = document.getElementById('messageAllowPOST'),
    inputData = document.getElementById('allowCORSinput').value,
    data = { inputText: String(inputData) },
    urlEncodedData = encodeUrl(data);

  postRequest(urlEncodedData, url, msgDom);

  return;
};

const ajaxNotAllowPOST = () => {
  console.log('POST');
  const url = `${publicUrl}/simple-req-cors`,
    msgDom = document.getElementById('messageNotAllowPOST'),
    inputData = document.getElementById('notAllowCORSinput').value,
    data = { inputText: inputData },
    urlEncodedData = encodeUrl(data);

  postRequest(urlEncodedData, url, msgDom);

  return;
};
