const codespaceName = process.env.CODESPACE_NAME;

// Use the Codespaces forwarded URL when available, with localhost preserved for local development.
export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';