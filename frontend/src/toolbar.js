// toolbar.js

import { DraggableNode } from './draggableNode';

const NODE_PALETTE = [
  { type: 'customInput', label: 'Input', color: '#10b981' },
  { type: 'llm', label: 'LLM', color: '#6366f1' },
  { type: 'customOutput', label: 'Output', color: '#f59e0b' },
  { type: 'text', label: 'Text', color: '#3b82f6' },
  { type: 'delay', label: 'Delay', color: '#8b5cf6' },
  { type: 'filter', label: 'Filter', color: '#ec4899' },
  { type: 'merge', label: 'Merge', color: '#14b8a6' },
  { type: 'api', label: 'API', color: '#f97316' },
  { type: 'conditional', label: 'If/Else', color: '#ef4444' },
];

export const PipelineToolbar = () => {
    return (
        <div className="toolbar">
            <div className="toolbar__header">
                <h1 className="toolbar__title">VectorShift</h1>
                <span className="toolbar__subtitle">Pipeline Builder</span>
            </div>
            <div className="toolbar__nodes">
                {NODE_PALETTE.map((node) => (
                  <DraggableNode
                    key={node.type}
                    type={node.type}
                    label={node.label}
                    color={node.color}
                  />
                ))}
            </div>
        </div>
    );
};
