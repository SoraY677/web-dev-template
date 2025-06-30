<div align=center>

# ウェブ開発テンプレート

</div>

## 開発情報

### 環境

- Docker version 27.1.1, build 631258

### コマンド

#### 立ち上げ

- 通常起動

```sh
docker compose up -d
```

- ビルド付起動(node_modulesの追加時等)

```sh
docker compose up -d --build
```

- 停止

```sh
docker compose down
```

- 再起動
```sh
docker compose restart
```


#### セットアップ

- 一括
```sh
docker compose exec root yarn setup 
```

#### ビルド

- 一括
```sh
docker compose exec root yarn build 
```

- クライアント
```sh
docker compose exec client yarn build 
```

- サーバ
```sh
docker compose exec server yarn build 
```

- インフラ
```sh
docker compose exec infra yarn build 
```

#### 静的検証

- リントチェック

```sh
docker compose exec root yarn lint 
```

- リント矯正
```sh
docker compose exec root yarn lint:fix
```

### 各サービスエンドポイント

|種別|パス|
|:---:|:----|
|クライアント|`http://localhost/`|
|サーバ|`http://localhost:8000/`|

### ドキュメント一覧

- [コーディングルール](./doc/develop/coding-rule.md)
- [その他Tips](https://github.com/SoraY677/web-dev-template/wiki)
