import { BaseNode } from './BaseNode';

export const LLMNode = ({ id }) => (
  <BaseNode
    id={id}
    title="LLM"
    subtitle="Language model"
    icon="✦"
    targets={[
      { name: 'system', id: `${id}-system` },
      { name: 'prompt', id: `${id}-prompt` },
    ]}
    sources={[{ name: 'response', id: `${id}-response` }]}
    minHeight={100}
  >
    <p className="base-node__description">
      Connect system and prompt inputs to generate a response.
    </p>
  </BaseNode>
);
