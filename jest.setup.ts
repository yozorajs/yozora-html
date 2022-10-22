import type { Node as INode } from '@yozora/ast'
import { createNodesRendererContext } from '@yozora/html-markdown'

export { createNodesRendererContext as createNodesRenderer }

export const renderChildren: (nodes: INode[]) => string = createNodesRendererContext({}, {})
