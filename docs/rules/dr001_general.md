# 開発全般ルール

## 命名規則

| 対象             | 命名規則             | 記法例                           | 
|------------------|----------------------|-----------------------------------|
| 変数名           | camelCase            | `userName`, `itemCount`           |
| 定数             | UPPER_SNAKE_CASE     | `MAX_RETRY`, `API_URL`            | |
| 関数名           | camelCase(動詞始まり) | `getUser()`, `fetchData()` |
| クラス名         | PascalCase           | `UserService`, `AppConfig`        |
| コンポーネント名 | PascalCase           | `UserCard`, `LoginForm`           | 
| ファイル名       | PascalCase           | `UserService.ts`, `LoginForm.vue` |
| ディレクトリ名   | kebab-case | `components`, `user-profile`      |
| enum名           | PascalCase           | `UserRole`, `HttpStatus`          |
| enum値           | UPPER_SNAKE_CASE     | `ADMIN`, `NOT_FOUND`              |
| 型エイリアス名   | PascalCase + `Type`  | `UserInfoType`, `ApiResponseType` |
| インターフェース名 | PascalCase + `Interface` | `UserInterface`, `ProductInterface` |
| URLパス         | kebab-case           | `/user-profile`, `/api-client`    |


## コメント

- 関数の先頭には以下例に示すようなJSDocのコメントを残すこと
```ts
/**
 * @description テキストを分割
 * @param text テキスト
 * @return １文字ずつ分割した文字列配列
 */
const splitText = (text: string) => { 
  return text.split('')
}

```
