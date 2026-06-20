import { createNode } from './createNode';

export const DelayNode = createNode({
  title: 'Delay',
  subtitle: 'Wait before continuing',
  icon: '⏱',
  fields: [
    {
      key: 'delayMs',
      label: 'Delay (ms)',
      type: 'number',
      default: '1000',
      placeholder: '1000',
    },
  ],
  targets: [{ name: 'input' }],
  sources: [{ name: 'output' }],
});
