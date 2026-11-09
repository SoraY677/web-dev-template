<div align=center>

# Web Develop TEMPLATE

</div>

## セットアップ手順

### ツール群

- mise(`v2026.7.0`): https://mise.jdx.dev/getting-started.html

### 実行コマンド

#### セットアップ時

> [!NOTE]
> 初回のみ実行する

```sh
mise install　
```

#### ローカルサーバ起動

```sh
mise run dev
```

#### コンテナの対話型シェル起動

```sh
mise run shell
```

#### DBマイグレーション

- マイグレーション用ファイル生成

```sh
mise run migration-ready
```

- マイグレーション実施

```sh
mise run migration-run
```

#### テスト時

- 全体実行

```sh
mise run test
```

- 個別実行

```sh
mise run test:arg <target-directory>

# ex: `mise run test:arg 10-common`
```

## ローカルURL

|画面名称|URL|
|:---:|:----|
|DBテーブル管理画面|https://local.drizzle.studio/|

## リリース手順

- リポジトリのGitHubActionsから `Release` ワークフローを実行してリリース
  - https://github.com/SoraY677/<対象リポジトリ名>/actions/workflows/release.yml
  - バージョンは `vX.X.X` 形式
    - 先頭 `v?.x.x`: メジャーアップデート / 互換性のない大幅な変更(APIの変更、既存機能が動かなくなる修正など)
    - 中間 `vx.?.x`: マイナーアップデート / 後方互換性がある機能追加(新しい機能の追加、非推奨機能の追加など)
    - 末尾 `vx.x.?`: パッチアップデート / 後方互換性があるバグ修正(不具合の修正、軽微なパフォーマンス改善など)
