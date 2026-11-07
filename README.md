

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

#### 開発時

```sh
mise run dev
```

### テスト時

- 全体実行

```sh
mise run test
```

- 個別実行

```sh
mise run test:arg <target-directory>

# ex: `mise run test:arg 10-common`
```
