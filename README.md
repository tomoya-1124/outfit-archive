# Outfit Archive v3

Day1〜Day2 初期構成です。  
目的は、将来 Spring Boot + MySQL API へ移行しやすいフロント構成を整えることです。

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS

## Day1 で実施したこと

- プロジェクト初期化（既存 Next.js ベースを v3 用に整理）
- Tailwind CSS 利用前提の UI 構成
- Lint / Format スクリプト整備
- 実務寄りディレクトリ雛形作成

## Day2 で実施したこと

- 型定義を拡張（`types/common.ts`, `types/api.ts`, `types/outfit-dto.ts`）
- DTO ⇔ Domain の mapper を追加（`features/outfits/utils/outfit-mapper.ts`）
- 入力バリデーション関数を追加（`features/outfits/schemas/outfit-schema.ts`）
- `outfitService` の create/update でバリデーションを適用

## Day3 で実施したこと

- Repository interface を追加（`features/outfits/repositories/outfit-repository.ts`）
- Local 実装を追加（`features/outfits/repositories/local-outfit-repository.ts`）
- `outfitService` を Repository 実装に委譲する形へ変更（DI差し替えしやすい構造）

## Day4 で実施したこと

- 一覧ページを強化（キーワード + 季節 + 公開状態フィルタ）
- EmptyState / Container の共通 UI を追加
- 一覧の0件時導線を改善

## Scripts

```bash
npm run dev
npm run lint
npm run format:check
npm run format
```

## Directory (initial)

```txt
app/
components/
  outfits/
  ui/
features/
  outfits/
    components/
    hooks/
    repositories/
    usecases/
    services/
    constants/
    schemas/
    types/
    utils/
hooks/
lib/
  services/
types/
```

## Notes

- DB 接続/認証は未導入です。
- データ層は将来 API 差し替えしやすいよう `lib/services` を使用します。
- `react-hook-form` / `zod` 導入は、レジストリ制約が解除されたタイミングで Day3 以降に反映予定です。
