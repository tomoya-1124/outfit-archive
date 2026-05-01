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

## Progress (Day1〜Day14)

- **Day1**: 初期構成、Tailwind、Lint/Format、ディレクトリ雛形
- **Day2**: 型拡張、DTO mapper、入力バリデーション
- **Day3**: Repository interface + Local 実装 + service 委譲
- **Day4**: 一覧フィルタ（検索/季節/公開状態）+ EmptyState/Container 追加
- **Day5**: 詳細表示コンポーネント分割 + 詳細/編集の not-found UX 改善
- **Day6**: UseCase 層を追加（create/update/delete/get/list）し、ページから直接service依存を排除
- **Day7**: 削除確認ダイアログ + 操作完了トースト（作成/更新/削除）を追加
- **Day8**: 一覧フィルタとURLクエリを同期（q/season/visibility）
- **Day9**: フォームのレスポンシブ最適化（入力レイアウトを2カラム化）
- **Day10**: APIクライアント/エンドポイント/ApiRepositoryスキャフォールド + Repository Factory導入
- **Day11**: 権限制御ポリシー層（canView/canEdit/canDelete）と mock user 導入
- **Day12**: API/画面のエラーハンドリングを共通化（ApiError + ErrorState + メッセージ整形）
- **Day13**: テスト計画/検証観点を明文化（test artifacts整備）
- **Day14**: README運用手順・最終チェックスクリプトを整備

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

## Backend (Spring Boot + MySQL minimal)

`backend/` に Spring Boot の最小構成を追加しました。

### 起動（Docker Compose）

```bash
docker compose up --build
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:8080/api/outfits
- MySQL: localhost:3306

### 備考

- 現時点の `ApiOutfitRepository` はスキャフォールドのため、フロントを `api` モードに切り替える前に実装が必要です。

## Environment Templates

以下をコピペして環境変数を作成してください。

### Frontend (`.env.local`)

```bash
cp .env.example .env.local
```

### Backend (`backend/.env`)

```bash
cp backend/.env.example backend/.env
```

> `backend/.env` を使う場合は、実行方法（IDE / docker compose）に合わせて環境変数を読み込む設定を行ってください。

## Release Readiness

完成判定に向けた最終チェックは以下で実行できます。

```bash
./scripts/verify-day14.sh
```

詳細チェックリストは `test/day13-day14-checklist.md` を参照してください。
