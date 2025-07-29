<div align=center>

# ウェブ開発テンプレート

</div>

## 開発情報

### 環境

- Docker version 27.1.1, build 631258

### コマンド

[コマンド可変引数]

- `{service}`: 各サービスの指定
  - `client`: クライアント
  - `server`: サーバー
  - `infra`: インフラ

#### 起動・停止

```sh
docker compose up -d          # 起動
docker compose up -d --build  # ビルド起動

docker compose restart        # 再起動

docker compose down           # 停止
```

#### コンテナログイン

```sh
docker compose exec root sh
```

#### セットアップ

```sh
docker compose exec root yarn setup
```

#### ビルド

```sh
docker compose exec root "DOMAIN_HEAD=${ドメイン先頭} yarn build:${env}"
```

#### デプロイ(インフラのみ)

```sh
# 作成
docker compose exec root "DOMAIN_HEAD=${ドメイン先頭} yarn deploy:${env}"

# 削除
docker compose exec root "DOMAIN_HEAD=${ドメイン先頭} yarn destroy:${env}"
```

#### テスト

```sh
docker compose exec root yarn test
```

#### リント

```sh
docker compose exec root yarn lint      # チェックのみ
docker compose exec root yarn lint:fix  # 矯正含む
```

### 各サービスエンドポイント

|種別|パス|
|:---:|:----|
|クライアント|[`http://localhost/`](http://localhost/)|
|サーバ|[`http://localhost:8000/`](http://localhost:8000/)|

### ドキュメント一覧

- [コーディングルール](./doc/develop/coding-rule.md)
- [その他Tips](https://github.com/SoraY677/web-dev-template/wiki)
