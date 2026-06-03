# もぐログ クラウド同期の費用メモ

確認日: 2026-05-31

## まず無料で進める構成

最初はこの構成が安全です。

```text
公開: GitHub Pages
保存: スマホのブラウザ内保存
料金: 0円
弱点: スマホとPCの完全同期はまだできない
```

GitHub Pagesは、GitHub FreeでもPublicリポジトリなら利用できます。PrivateリポジトリからPages公開する場合は、有料プランが必要になる場合があります。

参考: https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages

## B案のおすすめ: Supabase

クラウド同期を入れるなら、最初の候補はSupabaseが扱いやすいです。

無料枠の目安:

- 月額: 0ドル
- Database: 500 MB
- Storage: 1 GB
- Bandwidth / Egress: 5 GB
- Auth MAU: 50,000
- Edge Functions: 500,000回
- 注意: Freeプロジェクトは1週間使われないと一時停止されます

有料になりやすい条件:

- 写真をたくさん保存してStorage 1 GBを超える
- データベースが500 MBを超える
- 画像表示などの通信量が5 GBを超える
- 自動バックアップ、メールサポート、独自ドメイン、より大きいアップロード上限が必要になる
- Freeの一時停止を避けたい

Proの目安:

- 月額: 25ドル
- Database: 8 GB込み、超過は追加課金
- Storage: 100 GB込み、超過は追加課金
- Bandwidth: 250 GB込み

参考:

- https://supabase.com/pricing
- https://supabase.com/docs/guides/platform/billing-on-supabase
- https://supabase.com/docs/guides/storage/pricing

## Firebase案

Firebaseも無料のSparkプランから始められます。支払い方法なしで開始できます。

ただし、無料枠を超えた場合は、その月の該当機能が止まります。続けて使うにはBlazeプランへ上げる必要があります。

有料になりやすい条件:

- Firestoreの読み書きが無料枠を超える
- Cloud StorageやFunctionsを多く使う
- Google Cloudの請求アカウントを紐づける
- Google Maps APIなど、Google Cloud側の有料機能を同じプロジェクトで使う

参考:

- https://firebase.google.com/pricing
- https://firebase.google.com/docs/projects/billing/firebase-pricing-plans

## Google Maps / Places API

今のもぐログは、有料APIを勝手に使わず、OpenStreetMap/LeafletとGoogle Mapsで開くリンクを使っています。

本格的にGoogle Places APIで店舗検索・営業時間の自動取得をする場合は、Google Cloudの請求設定が必要です。

Places APIの目安:

- Geocoding: 月10,000回まで無料枠、その後は1,000回あたり5ドルから
- Place Details Essentials: 月10,000回まで無料枠、その後は1,000回あたり5ドルから
- Nearby Search Pro: 月5,000回まで無料枠、その後は1,000回あたり32ドルから
- 写真取得系は別SKUで課金されます

有料化しやすい使い方:

- 店名検索のたびにPlaces APIを呼ぶ
- 候補一覧、詳細、写真、営業時間を毎回取りに行く
- APIキーの制限をかけず、第三者に使われる

参考:

- https://developers.google.com/maps/documentation/places/web-service/usage-and-billing
- https://developers.google.com/maps/billing-and-pricing/pricing

## 今の判断

1. GitHub Pagesでスマホ公開版を確認する
2. 実写真アップロードとスマホ保存の使い勝手を見る
3. 継続利用できそうならSupabaseでクラウド同期を入れる
4. Google Places APIは、営業時間の自動取得が本当に必要になった段階で導入する

無料優先なら、Google Places APIはまだ入れない方が安全です。
