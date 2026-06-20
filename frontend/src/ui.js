
// ui.js

import { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  Controls,
  Background,
  ReactFlowProvider,
} from 'reactflow';
import { useStore } from './store';

import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { DelayNode } from './nodes/delayNode';
import { FilterNode } from './nodes/filterNode';
import { MergeNode } from './nodes/mergeNode';
import { ApiNode } from './nodes/apiNode';
import { ConditionalNode } from './nodes/conditionalNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

// // Temporary test node
// const TestNode = ({ id }) => (
//   <div
//     style={{
//       background: 'white',
//       border: '2px solid red',
//       borderRadius: '8px',
//       padding: '20px',
//       minWidth: '150px',
//     }}
//   >
//     TEST NODE ({id})
//   </div>
// );

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  delay: DelayNode,
  filter: FilterNode,
  merge: MergeNode,
  api: ApiNode,
  conditional: ConditionalNode,
};

const FlowCanvas = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const getNodeID = useStore((state) => state.getNodeID);
  const addNode = useStore((state) => state.addNode);
  const onNodesChange = useStore((state) => state.onNodesChange);
  const onEdgesChange = useStore((state) => state.onEdgesChange);
  const onConnect = useStore((state) => state.onConnect);

  console.log('Nodes from store:', nodes);

  const getInitNodeData = (nodeID, type) => ({
    id: nodeID,
    nodeType: type,
  });

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      console.log('DROP FIRED');

      const rawData = event.dataTransfer.getData(
        'application/reactflow'
      );

      if (!rawData || !reactFlowInstance) {
        console.log('Missing data or reactFlowInstance');
        return;
      }

      let type;

      try {
        const appData = JSON.parse(rawData);
        type = appData?.nodeType;
      } catch {
        type = rawData;
      }

      console.log('Dropped type:', type);

      const bounds =
        reactFlowWrapper.current.getBoundingClientRect();

      const position = reactFlowInstance.project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      console.log('Position:', position);

      const nodeID = getNodeID(type);

      const newNode = {
        id: nodeID,
        type,
        position,
        data: getInitNodeData(nodeID, type),
      };

      console.log('Adding node:', newNode);

      addNode(newNode);
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  return (
    <div
      ref={reactFlowWrapper}
      className="pipeline-canvas"
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={(instance) => {
          console.log('ReactFlow initialized:', instance);
          setReactFlowInstance(instance);
        }}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        snapToGrid
        fitView
        style={{ width: '100%', height: '100%' }}
      >
        <Background color="#cbd5e1" gap={gridSize} />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export const PipelineUI = () => (
  <ReactFlowProvider>
    <FlowCanvas />
  </ReactFlowProvider>
);
