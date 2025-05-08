// pages/index.tsx
// 記事一覧ページ（サムネイル/リスト切替）

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  const [articles, setArticles] = useState<any[]>([])
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card')

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch('http://localhost:1337/api/articles?populate=*')
        const json = await res.json()

        const sorted = (json.data || []).sort((a: any, b: any) => {
          const dateA = new Date(a.updatedAt).getTime()
          const dateB = new Date(b.updatedAt).getTime()
          return dateB - dateA
        })

        setArticles(sorted)
      } catch (err) {
        console.error('記事の取得に失敗しました:', err)
      }
    }

    fetchArticles()
  }, [])

  return (
    <main className="max-w-6xl mx-auto p-4 sm:p-8">
      {/* ✅ ヒーローイメージ */}
      <div className="mb-10">
        <Image
          src="/hero.jpg"
          alt="Raisex Hero Banner"
          width={1200}
          height={300}
          className="w-full h-64 object-cover rounded-xl shadow"
          priority
        />
      </div>

      {/* ✅ 見出しと表示切替 */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">📝 レイズクロス Tech Blog</h1>
        <div>
          <button
            onClick={() => setViewMode('card')}
            className={`px-3 py-1 text-sm rounded-l border ${
              viewMode === 'card' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            カード
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1 text-sm rounded-r border ${
              viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            リスト
          </button>
        </div>
      </div>

      {/* ✅ 表示切替エリア */}
      {viewMode === 'card' ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.documentId}`}
              className="block border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition bg-white"
            >
              {/* サムネイル表示（あれば） */}
              {article.thumbnail?.url && (
                <div className="w-full h-40 relative">
                  <Image
                    src={`http://localhost:1337${article.thumbnail.url}`}
                    alt={article.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              )}
              <div className="p-4">
                <h2 className="text-lg font-semibold text-blue-600 mb-2">{article.title}</h2>
                <p className="text-sm text-gray-600">
                  投稿日: {article.publishedDate
                    ? new Date(article.publishedDate).toLocaleString()
                    : '不明'}
                </p>
                <p className="text-sm text-gray-500">
                  最終更新日: {article.updatedAt
                    ? new Date(article.updatedAt).toLocaleString()
                    : '不明'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <ul className="space-y-6">
          {articles.map((article) => (
            <li key={article.id} className="border rounded-lg p-4 hover:shadow-md transition bg-white">
              <Link href={`/articles/${article.documentId}`}>
                <h2 className="text-xl font-semibold text-blue-600 hover:underline">{article.title}</h2>
              </Link>
              <p className="text-gray-600 mt-1">
                投稿日: {article.publishedDate
                  ? new Date(article.publishedDate).toLocaleString()
                  : '不明'}
              </p>
              <p className="text-gray-500 text-sm">
                最終更新日: {article.updatedAt
                  ? new Date(article.updatedAt).toLocaleString()
                  : '不明'}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}