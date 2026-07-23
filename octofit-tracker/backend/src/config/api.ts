const apiPort = 8000;
const activeCodespaceName = process.env.CODESPACE_NAME;
const localhostUrl = `http://localhost:${apiPort}`;

function buildCodespaceApiUrl(name: string) {
  const hostname = [name, apiPort].join('-');
  return `https://${hostname}.app.github.dev`;
}

// Use the Codespaces forwarded URL when available, with localhost preserved for local development.
export const apiBaseUrl = activeCodespaceName
  ? buildCodespaceApiUrl(activeCodespaceName)
  : localhostUrl;