## 始め方 🚀

node index.js で２つのサーバーを立ち上げます

src/script/simpleReq.js もしくは src/script/notSimpleReq.js の 変数 publicUrl に ngrok で生成された URL を貼ります。

localhost:4040/simple-req  
localhost:4040/not-simple-req  
のどちらかのページへアクセスして動作を確認します。

## サーバーの説明 📕

２つのサーバーがあり役割が異なります。

### appViewServer.js

View 側専用のサーバー。HTML を表示する処理が入っています。例外として Glitch サーバーへリクエストを投げる処理も入っています。

localhost:4040/simple-req  
localhost:4040/not-simple-req  
の２つの HTML ページに分けています。前者はシンプルなリクエスト処理、後者はシンプルでないリクエスト処理が入っています。

### appPostReqServer.js

リクエストの受け用サーバー。HTML 側のフォームに値を入れて送信するとその内容で POST されたリクエストを appPostReqServerd で受け取ります。

## src ファイルの説明 🍶

script ディレクトリは HTML 側の script タグへ挿入されたファイルが入っています。送信ボタンを押した際に発火するアクションが入っています。

views ディレクトリは HTML ファイルと css ファイルが入っています。
