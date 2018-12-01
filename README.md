# GAS Kintai

[![clasp](https://img.shields.io/badge/built%20with-clasp-4285f4.svg)](https://github.com/google/clasp)

Google App Script と Slack で勤怠管理するやつ

## 設定方法

### 1. Slack で Incoming Webhooks を設定

Slack に投稿するための URL を取得する

### 2. 記録するためのスプレッドシートを作成

### 3. Google Apps Script で「スクリプトのプロパティ」を設定

SLACK_WEBHOOK_URL: 1. で取得した URL
SHEET_ID: 2. で作成したスプレッドシートの URL の末尾の文字列

設定例

```
TODO
```

### 4. Google Apps Script で「ウェブ アプリケーションとして導入」を実行

「公開」 > 「ウェブ アプリケーションとして導入」を使ってスクリプトを実行するための URL を発行する

### 5. Slack で Outgoing Webhooks を設定

4.で取得した URL を叩くための設定を Slack に追加する。

## TODO

- [x] アカウント別にシートを分ける。
- [x] Sheet のフォーマット固める。
- [x] Sheet 周りをキレイにする。
- [x] バリデーションかける。
- [ ] エラー処理。
- [ ] README ちゃんと書く。
- [x] 日をまたぐ勤怠。

## May

- [ ] 設定が煩雑なので簡易化できないか検討
