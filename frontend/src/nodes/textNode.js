import { useState, useRef, useEffect, useMemo } from 'react';
import { Handle, Position } from 'reactflow';

const VARIABLE_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

const parseVariables = (text) => {
  const variables = [];
  const seen = new Set();
  let match;
  const regex = new RegExp(VARIABLE_REGEX.source, 'g');
  while ((match = regex.exec(text)) !== null) {
    const name = match[1];
    if (!seen.has(name)) {
      seen.add(name);
      variables.push(name);
    }
  }
  return variables;
};

const distributeHandlePositions = (count) => {
  if (count === 0) return [];
  if (count === 1) return ['50%'];
  return Array.from({ length: count }, (_, i) => `${((i + 1) / (count + 1)) * 100}%`);
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [dimensions, setDimensions] = useState({ width: 220, height: 100 });
  const textareaRef = useRef(null);
  const measureRef = useRef(null);

  const variables = useMemo(() => parseVariables(currText), [currText]);
  const targetPositions = distributeHandlePositions(variables.length);

  useEffect(() => {
    if (!measureRef.current) return;
    const measuredWidth = Math.min(Math.max(measureRef.current.scrollWidth + 32, 220), 420);
    const measuredHeight = Math.min(Math.max(measureRef.current.scrollHeight + 72, 100), 320);
    setDimensions({ width: measuredWidth, height: measuredHeight });
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <div
      className="base-node text-node"
      style={{ width: dimensions.width, minHeight: dimensions.height }}
    >
      {variables.map((variable, index) => (
        <Handle
          key={variable}
          type="target"
          position={Position.Left}
          id={`${id}-${variable}`}
          style={{ top: targetPositions[index] }}
          className="base-node__handle"
        />
      ))}

      <div className="base-node__header">
        <span className="base-node__icon">T</span>
        <div className="base-node__titles">
          <span className="base-node__title">Text</span>
          <span className="base-node__subtitle">Use {'{{variable}}'} for inputs</span>
        </div>
      </div>

      <div className="base-node__body">
        <label className="base-node__field text-node__field">
          <span className="base-node__field-label">Text</span>
          <textarea
            ref={textareaRef}
            value={currText}
            onChange={handleTextChange}
            className="base-node__textarea nodrag"
            rows={3}
          />
        </label>
        <div ref={measureRef} className="text-node__measure" aria-hidden="true">
          {currText || ' '}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        className="base-node__handle"
      />
    </div>
  );
};
