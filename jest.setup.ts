import type { YastNode } from '@yozora/ast'
import { createNodesRenderer } from '@yozora/html-markdown'

export { createNodesRenderer }

export const renderChildren: (nodes: YastNode[]) => string =
  createNodesRenderer({}, {})
