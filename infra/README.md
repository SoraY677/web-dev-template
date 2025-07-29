# インフラ

## デプロイ方法

(1回目のみ)

```sh
DOMAIN_HEAD=web-dev-template yarn build:${env}
```

## コンテキスト設定

以下のように、`cdk.context.json`にコンテキスト情報を記述

```json
{
  "context": {
    "dev": {
      // コンテキスト情報
    }
  }
}
```

## デプロイ

```sh
DOMAIN_HEAD=web-dev-template yarn deploy:${env}
```
