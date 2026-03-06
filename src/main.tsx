import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Amplify } from "aws-amplify";

import amplifyOutputs from "../amplify_outputs.json";

import App from "./App.tsx";
import ErrorBoundary from "./components/ErrorBoundary";
import "./index.css";

Amplify.configure(amplifyOutputs);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
