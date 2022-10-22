import type { Node as INode } from '@yozora/ast'
import { createNodesRenderer } from '@yozora/html-markdown'

export { createNodesRenderer }

export const renderChildren: (nodes: INode[]) => string = createNodesRenderer({}, {})
