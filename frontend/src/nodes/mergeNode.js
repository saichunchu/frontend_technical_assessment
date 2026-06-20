import { createNode } from './createNode';

export const MergeNode = createNode({
  title: 'Merge',
  subtitle: 'Combine two streams',
  icon: '⊕',
  targets: [
    { name: 'inputA' },
    { name: 'inputB' },
  ],
  sources: [{ name: 'merged' }],
  minHeight: 100,
  renderBody: () => (
    <p className="base-node__description">
      Waits for both inputs and merges them into a single output.
    </p>
  ),
});
