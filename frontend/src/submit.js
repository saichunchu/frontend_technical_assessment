import { useState } from 'react';
import { useStore } from './store';

const API_URL = 'https://frontendtechnicalassessment-production.up.railway.app/pipelines/parse';

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      setError('');
      setResult(null);

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
      setDialogOpen(true);
    } catch (err) {
      setError(
        `Failed to submit pipeline.\nMake sure the backend is running at http://localhost:8000\n\nError: ${err.message}`
      );
      setDialogOpen(true);
    }
  };

  return (
    <>
      <div className="submit-bar">
        <button
          type="button"
          className="submit-bar__button"
          onClick={handleSubmit}
        >
          Submit Pipeline
        </button>
      </div>

      {dialogOpen && (
        <div className="dialog-overlay" onClick={() => setDialogOpen(false)}>
          <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
            <div className="dialog-header">
              <h2 className="dialog-title">Pipeline Analysis</h2>
              <button
                className="dialog-close"
                onClick={() => setDialogOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="dialog-content">
              {error ? (
                <p className="dialog-error">{error}</p>
              ) : (
                result && (
                  <div className="dialog-results">
                    <div className="dialog-row">
                      <span className="dialog-label">Nodes</span>
                      <span className="dialog-value">{result.num_nodes}</span>
                    </div>
                    <div className="dialog-row">
                      <span className="dialog-label">Edges</span>
                      <span className="dialog-value">{result.num_edges}</span>
                    </div>
                    <div className="dialog-row">
                      <span className="dialog-label">Is DAG</span>
                      <span className="dialog-value">
                        {result.is_dag ? 'Yes ' : 'No '}
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>

            <div className="dialog-actions">
              <button
                className="dialog-button"
                onClick={() => setDialogOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};