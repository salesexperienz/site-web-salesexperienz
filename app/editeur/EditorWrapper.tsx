'use client'
import dynamic from 'next/dynamic'

const EditorApp = dynamic(
  () => import('@/components/newsletter/EditorApp').then((m) => m.EditorApp),
  { ssr: false, loading: () => <div className="flex-1 bg-stone-50" /> }
)

export default function EditorWrapper() {
  return <EditorApp />
}
