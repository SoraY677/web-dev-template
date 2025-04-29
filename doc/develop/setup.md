<div align=center>

# セットアップ方法

</div>


## アプリケーション生成

### 1. 必須コマンド実行

```sh
make setup
```

### 2. docker-compose.yml を調整

### 3. サーバー起動

README.md からサーバ起動

### 4. `.env`ファイルにデータ書き込み

### 5. 任意コマンド実行

```sh
# 例
make setup-vite PROJECT_NAME=client
make setup-vite PROJECT_NAME=server
```

### 6. 各環境のpackage.jsonのスクリプトに追加設定

|コマンド|概要|
|:---:|:---:|
|setup|初期化設定|
|dev|開発環境起動|
|build|本番データビルド|
|start|本番環境起動|

### 6. docker-compose.yml を調整

必要なコンテナとコマンドを調整

## サーバーを再起動

README.md からサーバ再起動
