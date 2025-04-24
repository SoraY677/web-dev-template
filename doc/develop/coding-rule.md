<div align=center>

# コーディング規約

</div>

## 命名規則

|        対象        |        命名規則        |           例            |           備考           |
| :----------------: | :--------------------: | :---------------------: | :----------------------: |
|     ファイル名     |       `.`つなぎ        |     user.usecase.ts     | 役割を拡張子との間に記載 |
|       変数名       |     キャメルケース     |        userName         |                          |
|       定数名       | アッパースネークケース | USER_GENDER_MEN = 'men' |                          |
|       関数名       |     キャメルケース     |     fetchUserData()     |      動詞から始める      |
|      クラス名      |     パスカルケース     |       UserService       |                          |
| インターフェース名 |     パスカルケース     |         UserIF          |        末尾に IF         |
|         型         |     パスカルケース     |        UserType         |       末尾に Type        |
|        enum        |                        |        UserEnum         |       末尾に Enum        |
|  enum のメンバー   | アッパースネークケース |          USER           |                          |
|  コンポーネント名  |     パスカルケース     |        UserCard         |                          |
|     CSS(SCSS)      |      ケバブケース      |        user-card        |                          |
|   ID 属性 (HTML)   |      ケバブケース      |        user-list        |                          |
|   ディレクトリ名   |     パスカルケース     |       UserProfile       |                          |
