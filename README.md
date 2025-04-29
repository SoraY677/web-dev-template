<div align=center>

# ウェブ開発テンプレート

</div>

## 開発情報

### 環境

- Docker version 27.1.1, build 631258
- node v20

### コマンド

- [セットアップ方法](./doc/develop/setup.md)

```sh
make start # 起動
make stop # 停止
make restart # 再起動

# リント
make lint # チェック
make lint-fix # 矯正

# yarnコマンド実行
make exec COMMAND=${コマンド} CONTAINER=${コンテナ}
```

### ドキュメント

- [コーディングルール](./doc/develop/coding-rule.md)
