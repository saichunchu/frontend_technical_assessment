import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const createNode = ({
  title,
  subtitle,
  icon,
  fields = [],
  targets = [],
  sources = [{ name: 'output' }],
  minWidth = 200,
  minHeight = 80,
  renderBody,
}) => {
  const NodeComponent = ({ id, data }) => {
    const [fieldValues, setFieldValues] = useState(() => {
      const initial = {};
      fields.forEach((field) => {
        const defaultValue =
          field.default !== undefined
            ? typeof field.default === 'function'
              ? field.default(id, data)
              : field.default
            : field.type === 'select'
            ? field.options[0]?.value ?? ''
            : '';
        initial[field.key] = data?.[field.key] ?? defaultValue;
      });
      return initial;
    });

    const handleFieldChange = (key, value) => {
      setFieldValues((prev) => ({ ...prev, [key]: value }));
    };

    const resolvedTargets = targets.map((t) => ({
      ...t,
      id: t.id ?? `${id}-${t.name}`,
    }));

    const resolvedSources = sources.map((s) => ({
      ...s,
      id: s.id ?? `${id}-${s.name}`,
    }));

    const bodyContent = renderBody ? (
      renderBody({ id, data, fieldValues, handleFieldChange })
    ) : (
      <div className="base-node__fields">
        {fields.map((field) => (
          <label key={field.key} className="base-node__field">
            <span className="base-node__field-label">{field.label}</span>
            {field.type === 'select' ? (
              <select
                value={fieldValues[field.key]}
                onChange={(e) => handleFieldChange(field.key, e.target.value)}
                className="base-node__input nodrag"
              >
                {field.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type === 'number' ? 'number' : 'text'}
                value={fieldValues[field.key]}
                onChange={(e) => handleFieldChange(field.key, e.target.value)}
                placeholder={field.placeholder}
                className="base-node__input nodrag"
              />
            )}
          </label>
        ))}
      </div>
    );

    return (
      <BaseNode
        id={id}
        title={title}
        subtitle={subtitle}
        icon={icon}
        targets={resolvedTargets}
        sources={resolvedSources}
        minWidth={minWidth}
        minHeight={minHeight}
      >
        {bodyContent}
      </BaseNode>
    );
  };

  NodeComponent.displayName = `${title.replace(/\s/g, '')}Node`;
  return NodeComponent;
};
