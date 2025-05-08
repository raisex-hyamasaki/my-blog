# 📝 Strapi v5 + Next.js 14 ブログ構築ガイド
このプロジェクトは **Strapi v5**（ヘッドレスCMS）と **Next.js 14** を組み合わせて構築したブログシステムです。
記事一覧／記事詳細ページを構築し、API経由で動的に投稿データを取得しています。

------

## 📁 ディレクトリ構成
my-blog/
├── backend/ ← Strapi v5 プロジェクト
└── frontend/ ← Next.js 14 プロジェクト

------

## 🚀 使用技術

- [Strapi v5](https://strapi.io/) - CMS API サーバ
- [Next.js 14](https://nextjs.org/) - フロントエンドフレームワーク
- [Tailwind CSS](https://tailwindcss.com/) - スタイリング

---

## 🛠 セットアップ手順

### 1. Strapi（バックエンド）
cd backend
yarn install
yarn develop
------
初期設定後に行うこと：
Content Type Article を作成
title (Text)
content (Rich Text または Text)
documentId (UID or Text)
publishedDate (DateTime)

記事 コンテンツタイプの find / findOne パーミッションを public ロールで有効化

---

### 2. Next.js（フロントエンド）
cd frontend
yarn install
yarn dev

記事一覧ページ：http://localhost:3000/
記事詳細ページ：http://localhost:3000/articles/[documentId]

---

✅ 機能概要

１．投稿一覧表示：Strapi API /articles を取得し、一覧で表示
２．投稿詳細表示：URLパラメータ（documentId）に基づいて 1件の投稿を取得
３．動的ルーティング：[id].tsx にて getServerSideProps() で詳細記事を取得
４．Tailwind CSS適用：カード風の一覧、本文の整形・リンクスタイルなどをデザイン反映
５．一覧へのリンク：記事詳細ページから「← 一覧に戻る」リンクを表示
------
🧪 動作確認済み環境

Node.js: v18.x または v20.x
Yarn: v1.22.x
Strapi CLI: v5.x
Next.js: v14.x
Google Chrome / Firefox 最新版
※strapi-plugin-ja-pack（Strapi日本語化パック）が
動作するのに上記環境が必須
https://github.com/yasudacloud/strapi-plugin-ja-pack
------
💬 今後の改善候補

カテゴリ／タグ機能の追加
Markdown対応エディタ導入（Strapi）
静的ビルド対応（ISR/SSGへの切り替え）
レスポンシブデザイン強化
------
📄 ライセンス

MIT
------
✅ ステップ別：実装タスクリスト
1:一覧 ⇄ 詳細リンク導線
・backend（Strapi）→（既に対応済）
・frontend（Next.js）→ <Link href={/articles/${article.documentId}}>...</Link>

2:カテゴリ・タグの表示
・backend（Strapi）→ category・tagsを記事と関連付ける
・frontend（Next.js）→ populate=category,tags を fetch クエリに追加し表示

3:アイキャッチ画像の表示
・backend（Strapi）→ thumbnail Media型フィールドを追加し関連付け
・frontend（Next.js）→ populate=thumbnail 追加 → <Image src={article.thumbnail.url} />

4:Markdown形式の本文表示
・backend（Strapi）→ 記事本文に Markdown 記法で入力
・frontend（Next.js）→ react-markdown を使い <ReactMarkdown>{article.content}</ReactMarkdown>

5:投稿日・作成日の表示
・backend（Strapi）→ 自動生成フィールド（publishedAt / createdAt）
・frontend（Next.js）→ new Date(article.publishedAt).toLocaleString() などで表示

6:並び順：新着順に変更
・backend（Strapi）→ 無し
・frontend（Next.js）→ APIクエリに sort=publishedDate:desc を追加

7:デザイン・装飾の追加
・backend（Strapi）→ 無し
・frontend（Next.js）→ Tailwind CSS を使ってカードやレイアウトを整える
------