import { Handle, Position } from 'reactflow';

const distributeHandlePositions = (count) => {
  if (count === 0) return [];
  if (count === 1) return ['50%'];
  return Array.from({ length: count }, (_, i) => `${((i + 1) / (count + 1)) * 100}%`);
};

export const BaseNode = ({
  id,
  title,
  subtitle,
  icon,
  children,
  targets = [],
  sources = [],
  className = '',
  style = {},
  minWidth = 200,
  minHeight = 80,
}) => {
  const targetPositions = distributeHandlePositions(targets.length);
  const sourcePositions = distributeHandlePositions(sources.length);

  return (
    <div
      className={`base-node ${className}`}
      style={{ minWidth, minHeight, ...style }}
    >
      {targets.map((handle, index) => (
        <Handle
          key={handle.id}
          type="target"
          position={Position.Left}
          id={handle.id ?? `${id}-${handle.name}`}
          style={{ top: handle.top ?? targetPositions[index] }}
          className="base-node__handle"
        />
      ))}

      <div className="base-node__header">
        {icon && <span className="base-node__icon">{icon}</span>}
        <div className="base-node__titles">
          <span className="base-node__title">{title}</span>
          {subtitle && <span className="base-node__subtitle">{subtitle}</span>}
        </div>
      </div>

      {children && <div className="base-node__body">{children}</div>}

      {sources.map((handle, index) => (
        <Handle
          key={handle.id}
          type="source"
          position={Position.Right}
          id={handle.id ?? `${id}-${handle.name}`}
          style={{ top: handle.top ?? sourcePositions[index] }}
          className="base-node__handle"
        />
      ))}
    </div>
  );
};
