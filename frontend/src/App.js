import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import './App.css';

function App() {
  return (
    <div className="app">
      <PipelineToolbar />
      <main className="app__main">
        <PipelineUI />
      </main>
      <SubmitButton />
    </div>
  );
}

export default App;
