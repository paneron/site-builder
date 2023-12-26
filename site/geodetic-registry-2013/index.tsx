import React from 'react';
import ReactDOM from 'react-dom/client';

const container = ReactDOM.createRoot(document.getElementById('app')!);

console.debug("hi");

container.render(<App />);

function App() {
  console.debug("rendering app");
  return <div>fo</div>;
}
