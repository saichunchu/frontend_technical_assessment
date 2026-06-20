import { createNode } from './createNode';

export const OutputNode = createNode({
  title: 'Output',
  icon: '⬢',
  fields: [
    {
      key: 'outputName',
      label: 'Name',
      type: 'text',
      default: (id) => id.replace('customOutput-', 'output_'),
    },
    {
      key: 'outputType',
      label: 'Type',
      type: 'select',
      options: [
        { value: 'Text', label: 'Text' },
        { value: 'Image', label: 'Image' },
      ],
    },
  ],
  targets: [{ name: 'value' }],
});
