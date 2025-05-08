// pages/articles/[id].tsx
// 記事詳細ページ（documentIdで取得）Markdown表示（画像中央寄せ＋レスポンシブ対応）

import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type Article = {
  id: number
  title: string
  content: string
  publishedAt: string
  updatedAt: string
}

type Props = {
  article: Article | null
}

export default function ArticleDetail({ article }: Props) {
  if (!article) return <p>記事が見つかりません</p>

  const { title, content, publishedAt, updatedAt } = article

  return (
    <main className="p-8 prose prose-lg max-w-none">
      {/* 上部に控えめな記事一覧に戻るボタン */}
      <div className="mb-4">
        <Link href="/" className="inline-block">
          <button className="text-sm px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition">
            ← 記事一覧に戻る
          </button>
        </Link>
      </div>

      {/* タイトルとメタ情報 */}
      <div className="mb-6">
        <h1 className="text-5xl font-extrabold">{title}</h1>
        <p className="text-sm text-gray-500 mt-2">
          投稿日: {new Date(publishedAt).toLocaleString()} / 最終更新日: {new Date(updatedAt).toLocaleString()}
        </p>
      </div>

      {/* Markdown本文（画像は中央寄せ＆レスポンシブ） */}
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          img: ({ ...props }) => (
            <img
              {...props}
              className="mx-auto my-6 rounded shadow w-full max-w-md h-auto"
              alt={props.alt ?? '画像'}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>

      {/* 下部にも戻るボタン */}
      <Link href="/" className="inline-block mt-6">
        <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700">
          ← 記事一覧に戻る
        </button>
      </Link>

      {/* ✅ フッター */}
      <footer className="text-center text-gray-400 text-sm mt-12">
        © 2024 raisex, LLC. All rights reserved.
      </footer>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context: GetServerSidePropsContext
) => {
  const { id } = context.params ?? {}

  if (typeof id !== 'string') {
    return { props: { article: null } }
  }

  try {
    const res = await fetch(`http://localhost:1337/api/articles?filters[documentId][$eq]=${id}&populate=*`)
    const json = await res.json()

    if (!json.data || json.data.length === 0) {
      return { props: { article: null } }
    }

    const item = json.data[0]
    const { title, content, publishedAt, updatedAt } = item

    return {
      props: {
        article: {
          id: item.id,
          title,
          content,
          publishedAt,
          updatedAt,
        },
      },
    }
  } catch (err) {
    console.error('記事取得エラー:', err)
    return { props: { article: null } }
  }
}