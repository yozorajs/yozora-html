import type {
  Admonition,
  Definition,
  EcmaImport,
  FootnoteDefinition,
  FootnoteReference,
  InlineMath,
  Math,
} from '@yozora/ast'
import {
  AdmonitionType,
  EcmaImportType,
  FootnoteDefinitionType,
  FootnoteReferenceType,
  FootnoteType,
  InlineMathType,
  MathType,
} from '@yozora/ast'
import type {
  INodeRendererMap as IBaseNodeRendererMap,
  INodeRenderer,
  INodeRendererContext,
} from '@yozora/core-html-renderer'
import {
  createNodeRendererContext as baseCreateNodeRendererContext,
  defaultRendererMap as baseDefaultRendererMap,
} from '@yozora/core-html-renderer'
import { renderAdmonition } from './renderer/admonition'
import { renderFootnoteDefinition } from './renderer/footnoteDefinition'
import { renderFootnoteReference } from './renderer/footnoteReference'
import { renderInlineMath } from './renderer/inlineMath'
import { renderMath } from './renderer/math'

export interface INodeRendererMap extends IBaseNodeRendererMap {
  [AdmonitionType]: INodeRenderer<Admonition>
  [FootnoteDefinitionType]: INodeRenderer<FootnoteDefinition>
  [FootnoteReferenceType]: INodeRenderer<FootnoteReference>
  [InlineMathType]: INodeRenderer<InlineMath>
  [MathType]: INodeRenderer<Math>
  [EcmaImportType]: INodeRenderer<EcmaImport>
}

export const defaultRendererMap: INodeRendererMap = {
  ...baseDefaultRendererMap,
  [AdmonitionType]: renderAdmonition,
  [FootnoteType]: () => '',
  [FootnoteReferenceType]: renderFootnoteReference,
  [FootnoteDefinitionType]: renderFootnoteDefinition,
  [InlineMathType]: renderInlineMath,
  [MathType]: renderMath,
  [EcmaImportType]: () => '',
}

export function createNodesRendererContext(
  definitionMap: Readonly<Record<string, Readonly<Definition>>>,
  footnoteDefinitionMap: Readonly<Record<string, Readonly<FootnoteDefinition>>>,
  rendererMap: INodeRendererMap = defaultRendererMap,
): INodeRendererContext {
  return baseCreateNodeRendererContext(definitionMap, footnoteDefinitionMap, rendererMap)
}
