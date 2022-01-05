import type { IYastNode } from '@yozora/ast'
import { createNodesRenderer } from '@yozora/html-markdown'

export { createNodesRenderer }

export const renderChildren: (nodes: IYastNode[]) => string =
  createNodesRenderer({}, {})
