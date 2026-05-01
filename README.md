# Outfit Archive v3

SEとしての市場価値向上を意識した、実務寄り設計のポートフォリオアプリです。

## Tech Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Mock Data + localStorage

## Architecture
将来の Spring Boot + MySQL API 移行を想定し、データ取得処理を `lib/services` に分離しています。

- UI: `app/`, `components/`
- Domain Types: `types/`
- Data Access: `lib/services/outfit-service.ts`
- Initial Data: `lib/mock-outfits.ts`

## Main Features (MVP)
- コーデ一覧
- コーデ詳細
- 新規登録
- 編集
- 削除
- タグ / ブランド / 季節 / 公開状態
- 検索
- レスポンシブUI

## Run
```bash
npm install
npm run dev
```

open: http://localhost:3000

## API Migration Plan
`outfitService` を `fetch` ベース実装へ差し替えることで、UI層の変更を最小限にできます。
