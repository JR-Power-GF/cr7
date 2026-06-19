import { h } from 'vue'

/**
 * 维度线性图标（24x24，stroke 风格，currentColor 继承父级颜色）
 * 数据驱动：每个图标是一组 SVG 节点 { tag, attrs }
 */
const icons = {
  finance: [
    { tag: 'circle', attrs: { cx: 12, cy: 12, r: 8.5 } },
    { tag: 'path', attrs: { d: 'M9 7.8l3 2.6 3-2.6' } },
    { tag: 'path', attrs: { d: 'M12 10.4V17' } },
    { tag: 'path', attrs: { d: 'M9 12.8h6' } },
    { tag: 'path', attrs: { d: 'M9 15.3h6' } },
  ],
  compliance: [
    {
      tag: 'path',
      attrs: {
        d: 'M12 3l7 2.4v5.6c0 4.2-2.9 7.8-7 9.3-4.1-1.5-7-5.1-7-9.3V5.4L12 3z',
      },
    },
    { tag: 'path', attrs: { d: 'M9 12l2 2 4-4.5' } },
  ],
  tax: [
    {
      tag: 'path',
      attrs: {
        d: 'M7 3h7l4 4v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z',
      },
    },
    { tag: 'path', attrs: { d: 'M14 3v4h4' } },
    { tag: 'path', attrs: { d: 'M9 12h5' } },
    { tag: 'path', attrs: { d: 'M9 15h5' } },
  ],
  credit: [
    { tag: 'rect', attrs: { x: 3, y: 6, width: 18, height: 12, rx: 2 } },
    { tag: 'path', attrs: { d: 'M3 10h18' } },
    { tag: 'path', attrs: { d: 'M6.5 14.5h3' } },
  ],
  operation: [
    { tag: 'path', attrs: { d: 'M4 9l1.5-4h13L20 9' } },
    { tag: 'path', attrs: { d: 'M5 9v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9' } },
    { tag: 'path', attrs: { d: 'M4 9h16' } },
    { tag: 'path', attrs: { d: 'M10 19v-5h4v5' } },
  ],
}

export default {
  name: 'DimIcon',
  props: {
    name: { type: String, required: true },
  },
  setup(props) {
    return () =>
      h(
        'svg',
        {
          viewBox: '0 0 24 24',
          width: '100%',
          height: '100%',
          fill: 'none',
          stroke: 'currentColor',
          'stroke-width': 1.7,
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          'aria-hidden': 'true',
        },
        (icons[props.name] || []).map((node, i) =>
          h(node.tag, { key: i, ...node.attrs })
        )
      )
  },
}
