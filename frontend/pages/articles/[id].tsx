// pages/articles/[id].tsx
// 記事詳細ページ（documentIdで取得）
// Markdown表示（画像中央寄せ＋レスポンシブ対応＋原寸超え防止）
// 投稿更新日のみ表示

import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useEffect } from 'react'

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

  const { title, content, updatedAt } = article

  return (
    <main className="px-4 sm:px-6 lg:px-8 py-8 max-w-4xl mx-auto">
      <div className="mb-4">
        <Link href="/" className="inline-block">
          <button className="text-sm px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition">
            ← 記事一覧に戻る
          </button>
        </Link>
      </div>

      <div className="mb-6 text-left">
        <h1 className="text-3xl sm:text-5xl font-extrabold break-words">{title}</h1>
        <p className="text-sm text-gray-500 mt-2">
          投稿更新日: {new Date(updatedAt).toLocaleString()}
        </p>
      </div>

      <div className="prose prose-lg max-w-none mx-auto">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            img: ({ ...props }) => (
              <img
                {...props}
                className="mx-auto my-6 rounded shadow w-auto h-auto max-w-full"
                alt={props.alt ?? '画像'}
              />
            ),
            code({ inline, className, children, ...props }) {
              if (inline) {
                return (
                  <code
                    {...props}
                    style={{
                      backgroundColor: '#FEF3C7',
                      color: '#B45309',
                      padding: '0.2rem 0.4rem',
                      borderRadius: '0.25rem',
                      fontFamily: 'monospace',
                      fontSize: '0.875rem',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {children}
                  </code>
                )
              } else {
                return (
                  <code className={`${className || ''} bg-transparent text-sm font-mono`} {...props}>
                    {children}
                  </code>
                )
              }
            },
            pre({ children }) {
              const childProps = (children as any)?.props || {}
              return (
                <div className="relative my-4 bg-gray-900 text-white rounded-md overflow-auto">
                  <button className="copy-button absolute top-2 right-2 px-2 py-1 text-xs bg-gray-700 rounded hover:bg-gray-600 transition">
                    📋 Copy
                  </button>
                  <pre className="p-4 text-sm">
                    <code className={childProps.className}>{childProps.children}</code>
                  </pre>
                </div>
              )
            },
            p({ children }) {
              const child = children?.[0]
              const isRecruitLink =
                typeof child === 'object' &&
                child !== null &&
                'props' in child &&
                child.props?.href === 'https://en-gage.net/raisex_jobs/'

              if (isRecruitLink) {
                const href = child.props.href
                return (
                  <div className="my-6 border rounded-lg shadow hover:shadow-lg transition overflow-hidden">
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col sm:flex-row items-stretch no-underline"
                    >
                      <div className="sm:w-2/3 p-4">
                        <h3 className="text-lg font-bold mb-1 text-gray-800">
                          合同会社raisexの採用・求人情報 - engage
                        </h3>
                        <p className="text-sm text-gray-600">私たちと一緒に働きませんか？</p>
                        <p className="text-sm text-blue-500 mt-1">{href}</p>
                      </div>
                      <div className="sm:w-1/3 h-40 sm:h-auto relative">
                        <img
                          src="/recruit-banner.jpg"
                          alt="採用バナー"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </a>
                  </div>
                )
              }

              return <p>{children}</p>
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
      </div>

      <div className="text-center mt-6">
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
      `http://localhost:1337/api/articles?filters[documentId][$eq]=${id}&populate=*`
    )
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