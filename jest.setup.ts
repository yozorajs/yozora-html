import type { YastNode } from '@yozora/ast'
import { createNodesRenderer } from '@yozora/html-markdown'

export { createRenderer } from './packages/markdown'

export const renderChildren: (nodes: YastNode[]) => string =
  createNodesRenderer({}, {})
