# Outfit Archive v3

SEとしての市場価値向上を意識した、実務寄り設計のポートフォリオアプリです。  
フロントは **Next.js(App Router) + TypeScript + Tailwind CSS**、初期段階は **mock/localStorage** で開発し、将来的に Spring Boot + MySQL API へ移行しやすい構成を目指しています。

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- localStorage (mock repository)

## Architecture (v3)

- `app/`: 画面ルーティング
- `components/`: UIコンポーネント
  - `components/outfits/`: outfit機能向けUI
  - `components/ui/`: 汎用UI
- `features/outfits/`: 機能単位のロジック
  - `repositories/`: Repository interface / local実装
  - `schemas/`: 入力バリデーション
  - `utils/`: mapper等
- `lib/services/`: サービス公開層（現在はrepository委譲）
- `types/`: domain / api / dto 型

## Progress (Day1〜Day4)

- **Day1**: 初期構成、Tailwind、Lint/Format、ディレクトリ雛形
- **Day2**: 型拡張、DTO mapper、入力バリデーション
- **Day3**: Repository interface + Local 実装 + service 委譲
- **Day4**: 一覧フィルタ（検索/季節/公開状態）+ EmptyState/Container 追加

> ※ Day2 の項目はこの README では1回だけ記載しています（重複削除済み）。

## Current Features (MVP scope)

- コーデ一覧
- コーデ詳細
- 新規登録
- 編集
- 削除
- 検索/絞り込み（キーワード・季節・公開状態）
- レスポンシブUI

## Scripts

```bash
npm run dev
npm run lint
npm run format:check
npm run format
```

## API Migration Plan

現在は `LocalOutfitRepository` を利用しています。  
将来は `OutfitRepository` interface を実装した `ApiOutfitRepository`（Spring Boot API接続）を追加し、バインディング差し替えで移行する想定です。

## Notes

- DB接続・認証は未導入（v3初期フェーズ）。
- v2資産はバックアップ済みで、v3実装を優先しています。
