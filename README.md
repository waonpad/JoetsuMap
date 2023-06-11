# 環境準備

### Java JDK, node, git の環境は無ければ各自行ってください

## makefile のインストール

#### windows

これを参考に  
https://zenn.dev/genki86web/articles/6e61c167fbe926

#### mac

Command Line Tools for Xcode を入れると自動で入る  
https://developer.apple.com/download/all/?q=command%20line%20tools

## VSCode の拡張機能をインストール

以下の拡張機能をインストール

- ESLint
- Prettier - Code formatter
- Extension Pack for Java
- Spring Boot Extension Pack

## VSCode の設定を変更(コードの自動整形を有効化)

default formatter: prettier  
format on save: true

## AndroidStudio の導入

https://developer.android.com/studio/install?hl=ja

公式サイトや適当な記事を見たりして上手くやってください  
https://akira-watson.com/android/adt-windows.html

#### mac への AndroidStudio 導入で躓いてます・・・

###　（windows） 環境変数の設定

特にインストール時のパスを弄ってなければこれでいいはず

ANDROID_HOME として新しく設定  
C:\Users\ユーザー名\AppData\Local\Android\Sdk

Path に以下 3 つを追加  
C:\Users\ユーザー名\AppData\Local\Android\Sdk\tools  
C:\Users\ユーザー名\AppData\Local\Android\Sdk\tools\bin  
C:\Users\ユーザー名\AppData\Local\Android\Sdk\platform-tools

## エミュレータの作成

https://developer.android.com/studio/run/managing-avds?hl=ja

## （Mac）　 iOS Simulator の導入

https://expfrom.me/launch-react-native-with-ios-simulator/

## リポジトリを clone する

```
git clone https://github.com/waonpad/JoetsuMap.git
cd JoetsuMap
```

## 簡略化されたセットアップ手順と起動手順を見る

win.mkとmac.mkにそれぞれ記載

## expo の開発に必要なパッケージをグローバルにインストール

```
npm install -g expo-cli
npm install -g eas-cli
```

## expo にログイン(アカウントが無ければ作成する)

```
expo login
```

## OS を指定する

```
cp .env.example .env
```

.env ファイルの OS を win か mac、自分のものに設定する

## (Mac) シェルスクリプトの権限を付与する

```
[bakcendディレクトリで] chmod +x gradlew
[bakcendディレクトリで]  chmod +x run-terminal.sh
[frontend/mobileディレクトリで] chmod +x run-terminal.sh
```

# フロントエンドのセットアップ

```
cd frontend/mobile
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
  
もしくは

```
[backendディレクトリで] ./gradlew bootRun
```

## フロントエンド

```
[frontend/mobile ディレクトリで] npx expo start
```

a を入力すると AndroidStudio でアプリが開く  
Expo Go で起動しているパスを入力しても開くことが出来る  
mac の場合、i で IOS シミュレータが起動

#### スマホから開く場合

トネリング用パッケージをインストール

```
npm install -g localtunnel
```

##### トネリング時のサブドメインを設定する

frontend/mobile/.env を開く  
LOCAL_TUNNEL_SUBDOMAIN を世界中で重複の無いサブドメイン名に書き換え  
IS_TUNNEL を true に書き換え 1(localhost を使う場合 false に戻す)

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
