# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/basics)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/basics/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![just-the-basics](https://github.com/withastro/astro/assets/2244813/a0a5533c-a856-4198-8470-2d67b1d7c554)

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page
is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put
any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into
our [Discord server](https://astro.build/chat).

```mermaid
gantt
    title イベントスケジュール
    dateFormat YYYY-MM-DD
    section 準備段階
        イベント企画          : 2024-07-01, 7d
        目的・テーマ明確化   : 2024-07-01, 2d
        ターゲット定義       : after 目的・テーマ明確化, 2d
        内容詳細設計       : after ターゲット定義, 5d
        スケジュール作成 : after 内容詳細設計, 3d
        会場選定・確保            : 2024-07-05, 5d
        候補会場リストアップ       : 2024-07-05, 2d
        会場下見・評価            : after 候補会場リストアップ, 2d
        会場予約・契約            : after 会場下見・評価, 1d
        予算策定                 : 2024-07-03, 3d
        収入源検討 (参加費等) : 2024-07-03, 1d
        費用項目洗い出し (会場費等) : after 収入源検討 (参加費等), 1d
        収支計画作成             : after 費用項目洗い出し (会場費等), 1d
        広報戦略策定             : 2024-07-10, 5d
        広報ターゲット設定       : 2024-07-10, 2d
        広報手段選定 (SNS等) : after 広報ターゲット設定, 2d
        広報コンテンツ企画・作成   : after 広報手段選定 (SNS等), 5d
        Webサイト/LP作成          : after 広報コンテンツ企画・作成, 7d
        SNS運用準備 : after 広報コンテンツ企画・作成, 3d
        チラシ・ポスターデザイン    : after 広報コンテンツ企画・作成, 5d
        参加者募集開始           : 2024-07-25, 30d
        募集開始告知 (Web等) : 2024-07-25, 2d
        参加申込受付              : after 募集開始告知 (Web等), 30d
        参加者リスト管理    : after 参加申込受付, 30d
        必要物品リスト作成   : 2024-07-15, 3d
        物品・備品調達            : 2024-07-18, 10d
        調達先選定・見積依頼   : 2024-07-18, 3d
        発注・契約              : after 調達先選定・見積依頼, 2d
        納品・検品              : after 発注・契約, 5d
        会場レイアウト設計        : 2024-07-20, 3d
        座席・導線計画        : 2024-07-20, 2d
        機材配置計画             : after 座席・導線計画, 1d
        スタッフ募集・役割分担     : 2024-07-23, 5d
        スタッフ募集告知         : 2024-07-23, 2d
        スタッフ選考・面談        : after スタッフ募集告知, 2d
        役割分担決定・通知        : after スタッフ選考・面談, 1d
        スタッフ説明会・研修      : 2024-08-01, 3d
        運営マニュアル作成 : 2024-08-04, 5d
        緊急時対応マニュアル作成   : after 運営マニュアル作成, 2d
        参加者へ事前連絡       : 2024-08-15, 3d
        参加案内メール作成        : 2024-08-15, 1d
        メール送信        : after 参加案内メール作成, 1d
        問い合わせ対応準備       : after メール送信, 1d
        会場設営                 : 2024-08-20, 2d
        備品搬入・設置           : 2024-08-20, 1d
        会場装飾               : after 備品搬入・設置, 1d
        最終リハーサル・確認      : 2024-08-21, 1d
        スタッフ最終打合せ     : 2024-08-21, 1d
        機材動作確認             : after スタッフ最終打合せ, 1d
        資料最終準備             : after 機材動作確認, 1d

    section イベント当日
        開場準備                 : 2024-08-22, 1h
        受付準備 (受付設置等) : 2024-08-22, 30m
        最終会場チェック           : after 受付準備 (受付設置等), 30m
        参加者受付開始           : 2024-08-22, 1h
        参加者誘導               : after 参加者受付開始, 4h
        イベント開始 (オープニング) : 2024-08-22, 30m
        プログラム1              : after イベント開始 (オープニング), 1h
        プログラム2              : after プログラム1, 1h30m
        休憩                     : after プログラム2, 30m
        プログラム3              : after 休憩, 1h30m
        プログラム4              : after プログラム3, 1h
        イベント終了 (クロージング) : 2024-08-22, 30m
        退場案内           : after イベント終了 (クロージング), 30m
        アンケート実施 (QR案内等) : after 退場案内, 1h
        忘れ物確認               : after アンケート実施 (QR案内等), 30m
        参加者見送り               : after 忘れ物確認, 30m

    section 終了後
        会場撤収・片付け         : 2024-08-23, 3h
        備品撤去・搬出           : 2024-08-23, 1h
        会場清掃                 : after 備品撤去・搬出, 1h
        ゴミ処理                 : after 会場清掃, 30m
        忘れ物対応 (問合せ対応) : after ゴミ処理, 2d
        レンタル品返却           : 2024-08-24, 1d
        業者支払い手続き       : 2024-08-25, 2d
        イベント報告書作成       : 2024-08-25, 3d
        アンケート集計・分析 : after イベント報告書作成, 3d
        反省会・改善点洗い出し    : 2024-08-28, 2d
        スタッフ感謝         : 2024-08-30, 1d
        イベント収支報告         : 2024-08-30, 2d
```
