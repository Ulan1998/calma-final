import { ContentEditor } from './ContentEditor'

export default async function EditorPage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params
  return <ContentEditor token={token} />
}
