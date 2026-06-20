import { createNode } from './createNode';

export const ConditionalNode = createNode({
  title: 'Conditional',
  subtitle: 'Branch on condition',
  icon: '◇',
  fields: [
    {
      key: 'expression',
      label: 'Expression',
      type: 'text',
      default: 'value === true',
      placeholder: 'e.g. score > 50',
    },
  ],
  targets: [{ name: 'value' }],
  sources: [
    { name: 'true' },
    { name: 'false' },
  ],
  minHeight: 110,
});
