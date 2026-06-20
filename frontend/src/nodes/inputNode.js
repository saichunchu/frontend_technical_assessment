import { createNode } from './createNode';

export const InputNode = createNode({
  title: 'Input',
  icon: '⬡',
  fields: [
    {
      key: 'inputName',
      label: 'Name',
      type: 'text',
      default: (id) => id.replace('customInput-', 'input_'),
    },
    {
      key: 'inputType',
      label: 'Type',
      type: 'select',
      options: [
        { value: 'Text', label: 'Text' },
        { value: 'File', label: 'File' },
      ],
    },
  ],
  sources: [{ name: 'value' }],
});
