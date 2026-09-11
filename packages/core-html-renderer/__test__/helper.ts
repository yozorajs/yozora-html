import type { Node, Text } from '@yozora/ast'
import { createNodeRendererContext } from '../src'

export const text = (value: string): Text => ({ type: 'text', value })

export const render = <T extends Node>(node: T): string =>
  createNodeRendererContext({}, {}).renderChildren([node])
