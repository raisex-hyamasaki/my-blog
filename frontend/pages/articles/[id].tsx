// pages/articles/[id].tsx
// Markdown表示（画像中央寄せ＋レスポンシブ対応＋原寸超え防止）
// 投稿更新日とタグ表示に対応（Strapi v5構造対応）
// インラインコードに黄色背景＋黒文字対応済み（CSSで補強）

import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { useEffect } from 'react'

type Tag = {
  id: number
  name: string
}

type Article = {
  id: number
  title: string
  content: string
  publishedAt: string
  updatedAt: string
  tags?: Tag[]
  thumbnailUrl?: string
}

type Props = {
  article: Article | null
}

export default function ArticleDetail({ article }: Props) {
  useEffect(() => {
    const buttons = document.querySelectorAll('.copy-button')
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const code = btn.parentElement?.querySelector('code')?.textContent
        if (code) {
          navigator.clipboard.writeText(code)
          btn.textContent = '✅ Copied!'
          setTimeout(() => {
            btn.textContent = '📋 Copy'
          }, 1500)
        }
      })
    })
  }, [])

  if (!article) return <p>記事が見つかりません</p>

  const { title, content, updatedAt, tags, thumbnailUrl } = article

  return (
    <main className="px-6 sm:px-8 lg:px-12 py-10 max-w-3xl mx-auto">
      <div className="mb-6">
        <Link href="/" className="inline-block">
          <button className="text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition">
            ← 記事一覧に戻る
          </button>
        </Link>
      </div>

      <article>
        <header className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight">
            {title}
          </h1>

          {Array.isArray(tags) && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <span
                  key={tag.id}
                  className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}

          <p className="text-sm text-gray-500 mt-2">
            投稿更新日: {new Date(updatedAt).toLocaleString()}
          </p>

          {thumbnailUrl && (
            <img
              src={thumbnailUrl}
              alt="記事のサムネイル"
              className="mx-auto my-6 rounded shadow-md w-auto h-auto max-w-full"
            />
          )}
        </header>

        <section className="prose prose-neutral prose-lg max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              img: ({ ...props }) => (
                <img
                  {...props}
                  className="mx-auto my-6 rounded shadow-md w-auto h-auto max-w-full"
                  alt={props.alt ?? '画像'}
                />
              ),
              code({ inline, children, className, ...props }) {
                if (inline) {
                  return (
                    <code
                      {...props}
                      style={{
                        backgroundColor: '#fef08a', // yellow for inline only
                        color: '#1f2937',
                        padding: '0.2rem 0.4rem',
                        borderRadius: '0.25rem',
                        fontFamily: 'monospace',
                        fontSize: '0.85rem',
                      }}
                    >
                      {children}
                    </code>
                  )
                }
                // 🚫 Remove background style from block code
                return (
                  <code
                    className={`${className || ''} text-sm font-mono`}
                    {...props}
                  >
                    {children}
                  </code>
                )
              },
              pre({ children }) {
                return (
                  <div className="relative my-6 bg-gray-900 text-white rounded-lg overflow-auto">
                    <button className="copy-button absolute top-2 right-2 px-2 py-1 text-xs bg-gray-700 rounded hover:bg-gray-600">
                      📋 Copy
                    </button>
                    <pre className="p-4 text-sm">{children}</pre>
                  </div>
                )
              },
              a({ href, children, ...props }) {
                return (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                    {...props}
                  >
                    {children}
                  </a>
                )
              },
            }}
          >
            {content}
          </ReactMarkdown>
        </section>
      </article>

      <div className="text-center mt-10">
        <Link href="/" className="inline-block">
          <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700">
            ← 記事一覧に戻る
          </button>
        </Link>
      </div>

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
    const res = await fetch(
      `http://localhost:1337/api/articles?filters[documentId][$eq]=${id}&populate[tags]=true&populate[thumbnail]=true`
    )
    const json = await res.json()

    if (!json.data || json.data.length === 0) {
      return { props: { article: null } }
    }

    const item = json.data[0]

    const tagList = Array.isArray(item.tags)
      ? item.tags.map((tag: any) => ({
          id: tag.id,
          name: tag.name,
        }))
      : []

    const thumbnailUrl = item.thumbnail?.url
      ? `http://localhost:1337${item.thumbnail.url}`
      : undefined

    return {
      props: {
        article: {
          id: item.id,
          title: item.title,
          content: item.content,
          publishedAt: item.publishedAt,
          updatedAt: item.updatedAt,
          tags: tagList,
          thumbnailUrl,
        },
      },
    }
  } catch (err) {
    console.error('記事取得エラー:', err)
    return { props: { article: null } }
  }
}