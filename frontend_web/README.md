# Notes Frontend (React)

A lightweight React UI for the Note Keeper app. It connects to the FastAPI backend to perform CRUD operations on notes.

## Run Locally

1) Install dependencies
```
npm install
```

2) Configure environment (optional)
- By default, the frontend will use `http://localhost:3001` as the API base.
- To override, create `.env` in this directory and set:
```
REACT_APP_API_BASE=http://localhost:3001
```

Other container-friendly environment variables (available for future use):
- REACT_APP_API_BASE
- REACT_APP_BACKEND_URL
- REACT_APP_FRONTEND_URL
- REACT_APP_WS_URL
- REACT_APP_NODE_ENV
- REACT_APP_NEXT_TELEMETRY_DISABLED
- REACT_APP_ENABLE_SOURCE_MAPS
- REACT_APP_PORT
- REACT_APP_TRUST_PROXY
- REACT_APP_LOG_LEVEL
- REACT_APP_HEALTHCHECK_PATH
- REACT_APP_FEATURE_FLAGS
- REACT_APP_EXPERIMENTS_ENABLED

Note: The app currently only uses `REACT_APP_API_BASE`.

3) Start the app
```
npm start
```
Open http://localhost:3000

## E2E and CORS

- Ensure the backend runs at http://localhost:3001
- CORS on the backend allows `http://localhost:3000` and `http://127.0.0.1:3000`
- In the app:
  - Click + to create a note (POST /notes)
  - Edit a note (PUT /notes/{id})
  - Delete a note (DELETE /notes/{id})
  - List updates automatically (GET /notes)
- Verify in DevTools Network tab that requests from http://localhost:3000 to http://localhost:3001 succeed without CORS errors.

## Scripts

- `npm start` — start dev server at port 3000
- `npm test` — run tests in watch mode
- `npm run build` — production build to `build/`

## Project Style

Colors and styles are defined in `src/App.css`. Components are simple, framework-agnostic HTML/CSS.

To learn React, visit https://reactjs.org/
