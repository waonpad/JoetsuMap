# 環境準備

### Java JDK, node, git の環境は無ければ各自行ってください

## VSCode の拡張機能をインストール

以下の拡張機能をインストール

- ESLint
- Prettier - Code formatter
- Extension Pack for Java
- Spring Boot Extension Pack

## VSCode の設定を変更(コードの自動整形を有効化)

default formatter: prettier  
format on save: true

## expo の開発に必要なパッケージをグローバルにインストール

```
npm install -g expo-cli
npm install -g eas-cli
```

## AndroidStudio の導入

https://developer.android.com/studio/install?hl=ja

公式サイトや適当な記事を見たりして上手くやってください  
https://akira-watson.com/android/adt-windows.html

#### mac への AndroidStudio と iOS シミュレータの導入は所持者各自行ってください

### 環境変数の設定

特にインストール時のパスを弄ってなければこれでいいはず

ANDROID_HOME として新しく設定  
C:\Users\ユーザー名\AppData\Local\Android\Sdk

Path に以下 3 つを追加  
C:\Users\ユーザー名\AppData\Local\Android\Sdk\tools  
C:\Users\ユーザー名\AppData\Local\Android\Sdk\tools\bin  
C:\Users\ユーザー名\AppData\Local\Android\Sdk\platform-tools

## エミュレータの作成

https://developer.android.com/studio/run/managing-avds?hl=ja

## expo にログイン(アカウントが無ければ作成する)

```
expo login
```

## リポジトリを clone する

```
git clone https://github.com/waonpad/JoetsuMap.git
cd JoetsuMap
```

# フロントエンドのセットアップ

```
cd frontend/mobile
```

## 環境変数ファイルを作成

```
cp .env.example .env
```

## パッケージインストール

```
npm install
```

# バックエンドのセットアップ

## データベース

#### ローカルを汚したくない場合仮想化を行ってください

localhost:3306 で立てた mysql に joetsumap データベースを作成  
ユーザー: root  
パスワード: 空白

# 動作確認

## バックエンド

拡張機能の Spring Boot Dashboard を開く(六角形のアイコン)  
joetsumap を RUN  
エラーになると... xx common frames omitted と出た後強制終了する

## フロントエンド

frontend/mobile ディレクトリで

```
npx expo start
```

a を入力すると AndroidStudio でアプリが開く  
Expo Go で起動しているパスを入力しても開くことが出来る  
mac の場合、i で IOS シミュレータが起動

#### スマホから開く場合

トネリング用パッケージをインストール

```
npm install -g localtunnel
```

トネリング時のサブドメインを設定する
frontend/mobile/.env の LOCAL_TUNNEL_SUBDOMAIN を世界中で重複の無いサブドメイン名に書き換え

バックエンドをウェブに公開

```
lt --port 8080 --subdomain <上述で設定したサブドメイン>
```

※一週間に一度、localtunnel の認証をする※
your url is: の後に表示されている URL にアクセス、
手順通りに https://ipv4.icanhazip.com にアクセスして ip アドレスを登録

Expo Go をストアから事前にインストールしておき、

```
npx expo start --tunnel
```

QR コードを読み込むとアプリが開く
