import { createNode } from './createNode';

export const FilterNode = createNode({
  title: 'Filter',
  subtitle: 'Filter data by condition',
  icon: '⛁',
  fields: [
    {
      key: 'condition',
      label: 'Condition',
      type: 'text',
      default: 'value > 0',
      placeholder: 'e.g. value > 0',
    },
  ],
  targets: [{ name: 'data' }],
  sources: [
    { name: 'passed' },
    { name: 'rejected' },
  ],
  minHeight: 110,
});
