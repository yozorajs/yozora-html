import type {
  Admonition,
  FootnoteDefinition,
  FootnoteReference,
  LinkReference,
  Node,
  Parent,
} from '@yozora/ast'
import type { INodeRendererContext } from '@yozora/core-html-renderer'

const containers = new Set([
  'blockquote',
  'delete',
  'emphasis',
  'heading',
  'link',
  'linkReference',
  'list',
  'listItem',
  'paragraph',
  'strong',
  'table',
  'tableRow',
  'tableCell',
  'admonition',
])

export function definitionId(identifier: string): string {
  return `footnote-${encodeURIComponent(identifier)}`
}

function referenceId(identifier: string, occurrence: number): string {
  return `reference-${encodeURIComponent(identifier)}-${occurrence}`
}

class FootnoteContext {
  private readonly references = new Map<string, number>()
  private readonly plannedReferences = new Set<string>()

  public constructor(private readonly context: INodeRendererContext) {}

  public prepareDocument(children: Node[], definitions: FootnoteDefinition[]): void {
    this.collectReferences(children)
    for (const definition of definitions) this.collectReferences(definition.children)
  }

  public reference(identifier: string): string {
    const occurrence = (this.references.get(identifier) ?? 0) + 1
    this.references.set(identifier, occurrence)
    return referenceId(identifier, occurrence)
  }

  public backlink(identifier: string): string {
    if (!this.plannedReferences.has(identifier) && !this.references.has(identifier)) return ''
    return `<a href="#${encodeURIComponent(referenceId(identifier, 1))}">&uarr;</a>`
  }

  private collectReferences(nodes: Node[]): void {
    for (const node of nodes ?? []) {
      if (node.type === 'footnoteReference') {
        this.plannedReferences.add((node as FootnoteReference).identifier)
        continue
      }
      if (
        node.type === 'linkReference' &&
        this.context.getDefinition((node as LinkReference).identifier) === undefined
      )
        continue
      // Match the standard renderers: definition nodes and ignored node types are not traversed.
      if (containers.has(node.type)) this.collectReferences((node as Parent).children)
      if (node.type === 'admonition') this.collectReferences((node as Admonition).title)
    }
  }
}

const contexts = new WeakMap<INodeRendererContext, FootnoteContext>()

export function footnoteContext(context: INodeRendererContext): FootnoteContext {
  let state = contexts.get(context)
  if (state === undefined) {
    state = new FootnoteContext(context)
    contexts.set(context, state)
  }
  return state
}
