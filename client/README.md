# クライアント開発ルール

## コマンド

```sh
# ローカル起動
yarn dev

# ビルド
yarn build

# テスト
yarn test
```

## 主要なディレクトリ構成

- `public/`: 臨時的なデータ置き場(自動生成物など)
- `src/`
  - `assets/`: アプリケーションと結合するような基本的な静的ファイル置き場
  - `components/`: アトミックデザインを基にしたコンポーネント集約
    - `00-commons`
    - `01-atoms`
    - `02-molecules`
    - `03-orgnisms`
    - `04-templates`
    - `05-pages`
  - `composables/`: VueComposable依存のラップ関数置き場
    - `router/`: VueRouter依存
    - `state/`: Vue状態遷移ライブラリ(Pinia依存)
  - `configs/`: 設定値などの定義
  - `tests/`: テスト(Vitest)のファイル置き場
  - `types/`: 型
  - `usecases/`: 共通・複雑・詳細な処理等の抽出

## 開発ルール

### アトミックデザインを基にしたコンポーネント分け

<details>

  <summary>アトミックデザインについて</summary>

  参考：https://spice-factory.co.jp/web/about-atmicdesign/

  > Lv.1 原子 / Atoms
  “原子”とは、UIの最小単位となるデザインパーツを指します。当社では、最小の html タグとほぼ同等の意味で解釈しています。ボタンやアイコン、フォントなどが原子に値します。こうした最小単位からデザインを構築し、最終的なUIへと組み合わせていきます。

  >Lv.2 分子 / Molecules
  “分子”とは、いくつかの原子を組み合わせた集合体を指します。分子単位での使い回しや、原子の集合にUIパーツ的な意味づけ行うといった目的があります。また、分子はデザインや UI の観点から再利用可能な単位で汎用性が高い特徴があります。

  > Lv.3 生体 / Organisms
  “生体”とは、単体で機能するアプリケーションパーツ（widget）のことで、原子と分子を組み合わせて構築されます。特定の役割にしか使用されず、他の役割での再利用は行われないという特徴があります。生体ではサーバーとの通信やローカルストレージへのアクセスなども行われ、生体単位で役割に沿った命名を行います。

  > Lv.4 テンプレート / Templates
  “テンプレート”とは、画面のレイアウトのことです。原子と分子、生体を組み合わせて作成します。この段階では、まだ具体的なテキストや画像は挿入されません。また当社でのテンプレートは、フロントエンドフレームワークの Next.js の pages で表現しています。

  > Lv.5 ページ / Pages
“ページ”とは、ユーザー側に表示される最終的な画面のことです。テンプレートにテキストや画像を挿入することで、実際のサービスイメージを明確にできます。また、生体やテンプレートの段階では発見できなかった抜け漏れに気づくことができます。
</details>
<br>

`src/components/`配下のコンポーネント役割区分は以の通り

|ディレクトリ名|アトミックデザインとの関連付け|参照可能|状態管理|
|:----|:---:|:----|:---:|
|`00-commons`|-|||
|`01-atoms`|ATOMS(原子)|`00`||
|`02-molecules`|MOLECULES(分子)|`00`, `01`||
|`03-orgnisms`|ORGANISMS（有機体）|`01`, `02`|✅|
|`04-templates`|TEMPLATE（テンプレート）|`03`|✅|
|`05-pages`|PAGE(ページ)|`03`,`04`|✅|

### ルーティング

- ライブラリ: [Vue-Router](https://v3.router.vuejs.org/ja/guide/)
- `src/composables/router/RouterComponent.ts`および設定ファイルでルーティング設定を追加することでパス追加可能

### 状態管理

- ライブラリ: [Pinia](https://pinia.vuejs.org/)
- `src/composables/state/` 配下に必要な状態管理ファイルを必要に応じて定義
  - ファイル名は`xxxState.ts`
  - 関数名は`useXXXStore`


```typescript:CounterState.ts
import { defineStore } from 'pinia'

interface CounterState {
  count: number;
}

export const useCounterStore = defineStore('counter', {
  state: (): CounterState => ({
    count: 0,
  }),
  actions: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    },
    reset() {
      this.count = 0
    },
  },
})
```

### テスト

Todo
