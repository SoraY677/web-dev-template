<div align=center>

# セットアップ方法

</div>


## アプリケーション生成

### 1. 必須コマンド実行

```sh
make setup
```

### 2. `.env`ファイルにデータ書き込み

### 3. 任意コマンド実行

以下、必要な選んで実行

```sh
# クライアント
make setup-client
# サーバ
make setup-server
```

### 4. 各環境のpackage.jsonのスクリプトに追加設定

|コマンド|概要|
|:---:|:---:|
|setup|初期化設定|
|dev|開発環境起動|
|build|本番データビルド|
|start|本番環境起動|

### 5. docker-compose.yml を調整

必要なコンテナとコマンドを調整

## サーバーを起動

README.md からサーバ起動
