// pages/index.tsx
// 記事一覧ページ（サムネイル/リスト切替、投稿更新日のみ表示）

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const PAGE_SIZE = 15

export default function Home() {
  const [articles, setArticles] = useState<any[]>([])
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card')
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(articles.length / PAGE_SIZE)

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

  const paginatedArticles = articles.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  return (
    <main className="max-w-6xl mx-auto p-4 sm:p-8">
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

      {viewMode === 'card' ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedArticles.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.documentId}`}
              className="block border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition bg-white"
            >
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
                <p className="text-sm text-gray-500">
                  投稿更新日: {article.updatedAt ? new Date(article.updatedAt).toLocaleString() : '不明'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <ul className="space-y-6">
          {paginatedArticles.map((article) => (
            <li key={article.id} className="border rounded-lg p-4 hover:shadow-md transition bg-white">
              <Link href={`/articles/${article.documentId}`}>
                <h2 className="text-xl font-semibold text-blue-600 hover:underline">{article.title}</h2>
              </Link>
              <p className="text-gray-500 text-sm mt-1">
                投稿更新日: {article.updatedAt ? new Date(article.updatedAt).toLocaleString() : '不明'}
              </p>
            </li>
          ))}
        </ul>
      )}

      {/* ✅ ページネーション */}
      <div className="flex justify-center items-center mt-10 gap-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
          disabled={currentPage === 1}
        >
          ← 前へ
        </button>
        <span className="text-sm text-gray-700">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          次へ →
        </button>
      </div>

      <footer className="text-center text-gray-400 text-sm mt-12">
        © 2024 raisex, LLC. All rights reserved.
      </footer>
    </main>
  )
}