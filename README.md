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
docker compose up -d          # 通常起動
docker compose up -d --build  # ビルド付起動(node_modulesの追加時等)

docker compose down           # 停止

docker compose restart        # 再起動
```

#### セットアップ

```sh
docker compose exec root yarn setup # 一括
docker compose exec {service} yarn setup # 各サービスごと
```

#### ビルド

```sh
docker compose exec root yarn build      # 一括
docker compose exec {service} yarn build # 各サービスごと
```

#### テスト

- 一括
```sh
docker compose exec root yarn test      # 一括
docker compose exec {service} yarn test # 各サービスごと
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
