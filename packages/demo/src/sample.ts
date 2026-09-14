import type {
  Admonition,
  Blockquote,
  Code,
  FootnoteDefinition,
  FootnoteReference,
  Heading,
  Image,
  InlineCode,
  InlineMath,
  Link,
  List,
  ListItem,
  Math as MathNode,
  Node,
  Paragraph,
  Root,
  Strong,
  Table,
  Text,
} from '@yozora/ast'
import { TaskStatus } from '@yozora/ast'

function text(value: string): Text {
  return { type: 'text', value }
}

function paragraph(...children: Node[]): Paragraph {
  return { type: 'paragraph', children }
}

function heading(value: string, depth: Heading['depth'] = 2): Heading {
  return { type: 'heading', depth, children: [text(value)] }
}

function listItem(value: string, status?: ListItem['status']): ListItem {
  return { type: 'listItem', status, children: [text(value)] }
}

const strong: Strong = { type: 'strong', children: [text('清晰、稳定的阅读体验')] }
const link: Link = {
  type: 'link',
  url: 'https://github.com/yozorajs/yozora-html',
  children: [text('Yozora HTML')],
}
const inlineCode: InlineCode = { type: 'inlineCode', value: 'renderMarkdown()' }
const reference: FootnoteReference = { type: 'footnoteReference', identifier: 'design', label: '1' }
const quote: Blockquote = {
  type: 'blockquote',
  children: [
    paragraph(text('好的排版让内容自然流动。颜色、节奏和留白，共同决定一篇文章是否容易阅读。')),
  ],
}
const lists: List[] = [
  {
    type: 'list',
    ordered: false,
    marker: 45,
    spread: false,
    children: [
      listItem('普通列表保留圆点与缩进。'),
      listItem('长内容会自然换行，同时维持清晰的层级。'),
    ],
  },
  {
    type: 'list',
    ordered: true,
    start: 3,
    marker: 46,
    spread: false,
    children: [listItem('有序列表从指定序号 3 开始。'), listItem('下一项接续编号。')],
  },
  {
    type: 'list',
    ordered: false,
    marker: 45,
    spread: false,
    children: [
      listItem('已完成：检查明暗主题', TaskStatus.DONE),
      listItem('待完成：审阅实际内容', TaskStatus.TODO),
    ],
  },
]
const code: Code = {
  type: 'code',
  lang: 'typescript',
  meta: null,
  value: `const html = renderMarkdown(root, {}, footnotes, undefined, {
  className: 'mx-auto max-w-3xl [&_h2]:text-xl',
})`,
}
const admonitions: Admonition[] = [
  ['note', '说明', '同一份内容，用两套样式独立呈现。'],
  ['info', '信息', '主题颜色和字体可以由宿主应用统一设置。'],
  ['tip', '建议', '切换窄栏预览，检查表格、代码和长文本的边界。'],
  ['caution', '注意', 'Tailwind 和 Standalone 分页加载，避免默认样式叠加。'],
  ['danger', '重要', '发布前同时检查内容结构与视觉表现。'],
].map(([keyword, title, value]) => ({
  type: 'admonition',
  keyword,
  title: [text(title)],
  children: [paragraph(text(value))],
}))
const table: Table = {
  type: 'table',
  columns: [{ align: 'left' }, { align: 'center' }, { align: 'right' }],
  children: [
    ['内容', '检查点', '示例值'],
    ['列表', 'marker 与缩进', '3'],
    ['表格', '左 / 中 / 右对齐', '128'],
    ['代码', '横向滚动与等宽字体', '1,024'],
  ].map(cells => ({
    type: 'tableRow',
    children: cells.map(value => ({ type: 'tableCell', children: [text(value)] })),
  })),
}
const image: Image = {
  type: 'image',
  url: './landscape.svg',
  alt: '暖色天空与层叠山峦的插画',
  title: '留白，让阅读有呼吸感。',
}
const inlineMath: InlineMath = { type: 'inlineMath', value: 'a² + b² = c²' }
const math: MathNode = { type: 'math', value: 'E = mc²' }

export const sampleRoot: Root = {
  type: 'root',
  children: [
    heading('让 Markdown 自然融入你的界面', 1),
    paragraph(
      text('从一段文字到完整文档，'),
      strong,
      text('始于细节。这个示例由 '),
      link,
      text(' 渲染，展示中文、English、链接和 '),
      inlineCode,
      text(' 的组合。'),
      reference,
    ),
    heading('01 / 文字与节奏'),
    paragraph(
      text(
        '正文应该有适当的行高与行长。在不同屏幕、主题和字体下，段落、引用与标题都应保持可读。试着打开 utilities 覆盖，比较标题字号、链接下划线和引用边框的变化。',
      ),
    ),
    quote,
    heading('02 / 列表与任务'),
    ...lists,
    heading('03 / 代码与数据'),
    code,
    table,
    heading('04 / 需要被看见的信息'),
    ...admonitions,
    heading('05 / 图像与公式'),
    image,
    paragraph(text('直角三角形的三边满足 '), inlineMath, text('。下面是质能关系式：')),
    math,
    paragraph(text('同一条脚注可以再次引用，便于检查前向链接和返回链接。'), reference),
  ],
}

export const sampleFootnotes: Record<string, FootnoteDefinition> = {
  design: {
    type: 'footnoteDefinition',
    identifier: 'design',
    label: '1',
    children: [
      paragraph(text('阅读体验是内容结构与样式共同作用的结果。此示例同时用于检查重复脚注引用。')),
    ],
  },
}
