// draggableNode.js

export const DraggableNode = ({ type, label, color = '#6366f1' }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType };
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };

    const onDragEnd = (event) => {
      event.currentTarget.style.cursor = 'grab';
    };
  
    return (
      <div
        className="draggable-node"
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={onDragEnd}
        style={{ '--node-accent': color }}
        draggable
      >
          <span className="draggable-node__label" draggable={false}>{label}</span>
      </div>
    );
  };
  