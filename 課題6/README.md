## 始め方🚀  
node index.js で２つのサーバーを立ち上げます  
  
src/script/simpleReq.js もしくは src/script/notSimpleReq.js の 変数publicUrl に ngrok で生成されたURLを貼ります。    
  
localhost:4040/simple-req  
localhost:4040/not-simple-req  
のどちらかのページへアクセスして動作を確認します。
  
  
## サーバーの説明📕  
２つのサーバーがあり役割が異なります。
  
### appViewServer.js  
View側専用のサーバー。HTMLを表示する処理が入っています。例外としてGlitchサーバーへリクエストを投げる処理も入っています。  
  
localhost:4040/simple-req  
localhost:4040/not-simple-req  
の２つのHTMLページに分けています。前者はシンプルなリクエスト処理、後者はシンプルでないリクエスト処理が入っています。
  
  
### appPostReqServer.js  
リクエストの受け用サーバー。HTML側のフォームに値を入れて送信するとその内容でPOSTされたリクエストをappPostReqServerdで受け取ります。  
  
  
## srcファイルの説明🍶
  
scriptディレクトリはHTML側のscriptタグへ挿入されたファイルが入っています。送信ボタンを押した際に発火するアクションが入っています。
  
  
  
viewsディレクトリはHTMLファイルとcssファイルが入っています。
  
  
