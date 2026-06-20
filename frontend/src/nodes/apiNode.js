import { createNode } from './createNode';

export const ApiNode = createNode({
  title: 'API Call',
  subtitle: 'HTTP request',
  icon: '⇄',
  fields: [
    {
      key: 'url',
      label: 'URL',
      type: 'text',
      default: 'https://api.example.com',
      placeholder: 'https://...',
    },
    {
      key: 'method',
      label: 'Method',
      type: 'select',
      options: [
        { value: 'GET', label: 'GET' },
        { value: 'POST', label: 'POST' },
        { value: 'PUT', label: 'PUT' },
        { value: 'DELETE', label: 'DELETE' },
      ],
    },
  ],
  targets: [{ name: 'body' }],
  sources: [{ name: 'response' }],
  minWidth: 240,
  minHeight: 130,
});
