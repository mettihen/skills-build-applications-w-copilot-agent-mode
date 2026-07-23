# Octofit Tracker Frontend

React 19 and Vite presentation tier for the Octofit Tracker multi-tier application.

## Environment

Define `VITE_CODESPACE_NAME` before running the frontend so API requests use the forwarded backend URL:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

For local development, place it in `octofit-tracker/frontend/.env.local`. When set, the app calls:

```text
https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

If `VITE_CODESPACE_NAME` is unset, the app safely falls back to `http://localhost:8000/api` instead of building an `https://undefined-8000...` URL.
