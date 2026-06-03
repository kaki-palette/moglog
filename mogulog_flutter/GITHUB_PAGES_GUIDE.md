# もぐログ GitHub Pages公開手順

この手順は、PCを起動しっぱなしにせず、スマホから `https://ユーザー名.github.io/リポジトリ名/` で開ける公開版を作るためのものです。

## できること

- スマホのChrome / Safariで、外出先からもぐログを開けます。
- スマホで撮った料理写真をアップロードできます。
- 追加したカードは、そのスマホのブラウザ内に保存されます。
- ホーム画面に追加すると、アプリに近い感覚で起動できます。

## まだできないこと

- スマホとPCの完全なクラウド同期はまだできません。
- GitHub Pagesは静的サイトなので、サーバー側の `web_app/server.js` は動きません。
- Google Mapsの有料Places API連携はまだ入れていません。

## 1. GitHubにリポジトリを作る

1. GitHubにログインします。
2. 右上の `+` から `New repository` を押します。
3. Repository name に `mogulog` など分かりやすい名前を入れます。
4. 無料でGitHub Pagesを使うなら、まずは `Public` を選びます。
5. `Create repository` を押します。

GitHub Freeの場合、GitHub PagesはPublicリポジトリで使えます。PrivateリポジトリからPages公開したい場合は、有料プランが必要になる場合があります。

## 2. このフォルダをGitHubへアップロードする

Git操作に慣れていない場合は、GitHub Desktopを使うのが簡単です。

1. GitHub Desktopをインストールします。
2. `File` -> `Add local repository` を押します。
3. `D:\codexテスト\スキルテスト` を選びます。
4. 変更内容をCommitします。
5. `Publish repository` または `Push origin` を押します。

## 3. GitHub Pagesを有効にする

1. GitHubのリポジトリ画面を開きます。
2. `Settings` を開きます。
3. 左メニューの `Pages` を開きます。
4. `Build and deployment` の `Source` を `GitHub Actions` にします。
5. `Actions` タブで `Deploy MoguLog Web to GitHub Pages` が成功するのを待ちます。

成功すると、Pages画面にURLが表示されます。

```text
https://ユーザー名.github.io/リポジトリ名/
```

## 4. スマホで確認する

1. スマホで上のURLを開きます。
2. 右下のカメラボタンを押します。
3. `写真を選択 / 撮影する` を押します。
4. 料理写真を撮る、またはアルバムから選びます。
5. 料理名・店名・エリア・ジャンル・コメントを入れます。
6. `カードを生成して投稿する` を押します。

画面右上が `スマホ保存` や `ローカル保存中` の場合は正常です。GitHub Pages版では、その端末のブラウザ内に保存されます。

## 5. ホーム画面に追加する

### iPhone Safari

1. Safariでサイトを開きます。
2. 共有ボタンを押します。
3. `ホーム画面に追加` を押します。
4. 名前を `もぐログ` にして追加します。

### Android Chrome

1. Chromeでサイトを開きます。
2. 右上のメニューを押します。
3. `ホーム画面に追加` または `アプリをインストール` を押します。

## 注意

GitHub Pages版は公開URLです。自分だけのメモとして使う場合、URLを他人に共有しないでください。

写真データはブラウザ内保存なので、ブラウザの履歴・サイトデータを削除すると消える可能性があります。大切な記録を長く残す段階になったら、SupabaseやFirebaseでクラウド同期を入れます。
