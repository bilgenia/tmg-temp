テンプレートプロジェクトで採用予定だったビルドツールが便利だった為、そのまま採用しています。
コマンドラインでの操作になりますが、プラグインや個人環境に依存せずに制作が行えるモダン開発環境です。
wp-envを使ったローカル開発環境も立ち上げられますが、win11との親和性が悪いのか初回起動は時間がかかるため注意してください。
開発環境で作業するだけだったら、特定フォルダにビルドしたものをアップロードもできるようコマンドも作成しています。
鍵ファイル、ID/PWの設定ファイルをローカルへ持たせる必要がある（セキュリティのため）ので最初に作成してください。


# 使用技術

## Node.js / npm

パッケージ管理システム。後述するViteを動かすために入れています。
誰が展開しても同じ機能とバージョンをパッケージとして使えるので、開発環境の一貫性が保たれます。
後述する`vite` `wp-env` `docker`と組み合わせて運用します。

## Vite

ある程度の規模のプロジェクトで使われるビルドツールです。
本プロジェクトでは以下の理由で導入しています。

- 開発品質の担保
  - 設定ファイルを見てSCSSをCSSへコンパイル、JSをバンドルするため品質が一定に保たれる。
  - 例えば「軽い画像ファイルをimportしている場合はインライン化して軽量化」「CSSへビルドするときは軽量化」など。
  - VScodeを必ずしも使う必要がなくなる。
- 開発環境の最適化
  - ローカルで仮想サーバーを立ち上げられる`docker`を使い高速な開発環境を自動構築。
  - ホットリロードリプレイスメント（HMR）の実装でストレスフリーな制作環境を構築。

## wp-env

Dockerコンテナを利用してWordPressをローカルで動かせます。
コマンド1つで環境の起動と停止ができ、複雑なサーバ設定が不要なのが特徴です。
テーマやプラグイン開発・テスト・デバッグが容易にできます。
`Vite`と組み合わせて即時反映される製作環境を構築します。

## Docker

アプリケーション実行環境です。


# 使用方法

## コマンド一覧

```
npm install
```
最初に実行してください。必要なパッケージをインストールしてくれます。

```
npm run start
```
そのまま、制作開始です。ローカルサーバーが立ち上がり、ホットリロード環境でサクサク開発が可能です。

```
npm run stop
```
作業が終わったらこれで立ち上がっている環境が終了します。負荷が上がるのでつけっぱなしは気をつけましょう。

```
npm run build
```
制作が終わったらこのコマンドを打ち込むと`dist`フォルダが作られます。
このフォルダ内に`my-snow-monkey`内に置くファイル全てが格納され、ファイルパスも自動解決します。

```
npm run upload
```
アップロード設定に基づいてファイルを指定サーバーへアップロードさせます。
FTPを開いて特定階層へ移動し、ファイルをドラッグして渡す作業がコマンド一発で終わります。
またアップもれや不要ファイルまで残ってしまう問題を解消したかった為、ディレクトリ内を一度まっさらにしてからアップロードするようにしています。
※本番環境で予期せぬことが起きないよう開発環境のみにしてください。


## 画像ファイルをCSSで呼び出す


```
background-image: url('@/img/icon_sns_instagram.svg');
```
このように記述してください。


# ディレクトリ構造


```
.
├── dist
├── node_modules
├── public
│   └── img
├── server
├── src
│   ├── img
│   ├── js
│   │   ├── modules
│   │   └── app.js
│   ├── sass
│   │   └── ※FLOCSSルール
│   ├── template
│   ├── index.html
│   ├── my-snow-monkey.php
│   └── README.mdd
├── .gitignore
├── .wp-env.json
├── index.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
└── vite.config.js
```

パッケージ追加や修正しない限りは`src`の中がメイン作業スペースです。`public`も触ることがあります。
ルートディレクトリで`build`すると`dist`が生成されるので、その中身を`***/wp-content/plugins/my-snow-monkey`へすべてアップロードしてください。
アップロードパッケージを使ってる場合はbuildコマンドはデバッグくらいでしか使わないです。


# WordPress環境設定


## 導入プラグイン

- Advanced Custom Fields
- All-in-One WP Migration
- Converter for Media
- https://downloads.wordpress.org/plugin/contact-form-7.zip
- https://downloads.wordpress.org/plugin/flexible-table-block.zip
- My Snow Monkey
- https://downloads.wordpress.org/plugin/post-types-order.zip
- Smash Balloon Instagram Feed
- Snow Monkey Blocks
- Snow Monkey Editor
- https://downloads.wordpress.org/plugin/svg-support.zip
- https://downloads.wordpress.org/plugin/webp-converter-for-media.zip
- WordPressインポートツール
- WP Multibyte Patch
- WP Optimizer


# file rule

- src
- dist
- public
- node_modules
- .gitignore
- .wp-env.jspn
- index.js
- package-lock.json
- package.json
- postcss.confg.js


# 使用技術

- PHP
- sass(scss)
- ES6 module
- Vite
  - node.js / npm

## Vite

ビルドツールです。npmパッケージを使ってプラグインをインストールして機能を盛り込んでいくイメージです。
例えばsassのコンパイルもnpmインストールし、それをviteで実行させています。

採用理由

- 環境依存とスキル依存の解消
- 誰が触っても事前にとりまとめたルールでコンパイルされるようにした
- テンプレートプロジェクトでJSはモジュール化する必要があった（必要機能・不要機能の切り離し）

- OPTION:wp-envを利用したストレスフリーな開発環境を手に入れた。
- OPTION:npmのアップロードツールも使えるようになったのでアップロードのめんどくささが減った。

- 将来性:今すぐでなくともモダン開発環境はいつか必須に変わります。LLMとMCPの登場でさらに必須です。

## 画像呼び出しルール

```
public/img/
```

```
background-image: url('~/img/img_top_about_back_pc.png');
```

公開フォルダに入れてるものを呼び出す場合


```
src/img/
```

```
background-image: url('@/img/***.svg');
```

### フォルダの違い

publicは公開フォルダという扱いで、本来の使い方をするならsitemap.xmlなどの公開ファイルを設置する場所。
記事ファイルなどの画像フォルダとしても使えたりする、コンパイルを行わずそのままのファイルが移植される。

src内にあるimgフォルダはインライン化させたいファイルを設置するフォルダ。
軽量なファイルだけ対応できて、*KB以上のファイルはpublicへ設置して読み込む形にしてください。
あくまでインライン化させて使うファイルを置いておく場所という認識でお願いします。


# STYLE

## font-size

デザイン指定は以下。

h1 28px 30px
h2 28px 28px
h3 21px 21px
h4 18px 18px
p  16px 16px

アートボードサイズ 390px 1920px

これに対して `rem` or `vw`　の指定あり。
だったが、リンク先の記述は `clamp()関数`。

### 問題点

clampは最小と最大の間に1.5倍くらいは差があれば意味をなしてくる。
今の大きさの下辺では、.01px単位での可変だった。
メディアクエリでの対応で十分良いと思われる。