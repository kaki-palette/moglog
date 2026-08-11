# もぐログ GitHub Pages反映手順

現在 `https://kaki-palette.github.io/mogulog/` が404になる原因は、GitHub上の `main` ブランチに公開用ファイルが上がっていないためです。

この `mogulog_github_upload` フォルダの中身を、GitHub Desktopで開いている `mogulog` フォルダへコピーしてください。

## 手順

1. GitHub Desktopを開く
2. 右側の `Show in Explorer` を押す
3. 開いた `mogulog` フォルダの中へ、このフォルダの中身をコピーする

コピーするもの:

```text
.github
mogulog_flutter
UPLOAD_STEPS.md
```

4. GitHub Desktopに戻る
5. `Changes` に `.github` と `mogulog_flutter` が表示されることを確認する
6. Summaryに次を入力する

```text
Deploy MoguLog web app
```

7. `Commit to main` を押す
8. `Push origin` を押す
9. GitHubの `Actions` で緑チェックになるまで待つ
10. スマホで次を開く

```text
https://kaki-palette.github.io/mogulog/?v=5
```

## 注意

GitHub上で `mogulog_flutter/web_app/index.html` が見える状態になっていれば、公開用ファイルのアップロードは成功です。
