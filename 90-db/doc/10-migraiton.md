## マイグレーション作成ルール

- `/90-db/src/schema`配下で作成し、同ディレクトリ内に集約
  - 最終的には `/90-db/src/schema/index.ts`から呼び出す形に
  - 参考例: [Userテーブル](./resources/ExampleUserShema.ts)
