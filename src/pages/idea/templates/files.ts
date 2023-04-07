/** @satisfies {import('@webcontainer/api').FileSystemTree} */

export const files = {
  'index.tsx': {
    file: {
      contents: `
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.tsx';
ReactDOM.render(
  <React.StrictMode>
    <App/>
    <div>Hello, Sandbox!</div>
  </React.StrictMode>,
  document.getElementById('root')
);`,
    },
  },
  'index.js': {
    file: {
      contents: `
import express from 'express';
const app = express();
const port = 3111;

app.get('/', (req, res) => {
  res.send('Welcome to a WebContainers app! 🥳');
});

app.listen(port, () => {
  console.log(\`App is live at http://localhost:\${port}\`);
});`,
    },
  },
  'package.json': {
    file: {
      contents: `
{
  "name": "example-app",
  "type": "module",
  "dependencies": {
    "express": "latest",
    "nodemon": "latest"
  },
  "scripts": {
    "start": "nodemon --watch './' index.js"
  }
}`,
    },
  },
};
