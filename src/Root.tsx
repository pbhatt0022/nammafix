/**
 * Top-level view switch: the Bharat Civic Folk-Tech landing page fronts the
 * existing dashboard app. Landing CTAs deep-link into the app; the app's logo
 * returns home. No backend or app logic changes.
 */
import React, { useState } from "react";
import Landing from "./landing/Landing";
import App from "./App";
import { LanguageProvider } from "./i18n";
import ErrorBoundary from "./ErrorBoundary";

function RootInner() {
  const [entered, setEntered] = useState(false);
  const [reporting, setReporting] = useState(false);
  const [tab, setTab] = useState("dashboard");

  if (!entered) {
    return (
      <Landing
        onEnter={(intent) => {
          setReporting(intent === "report");
          setTab(intent === "map" ? "map" : "dashboard");
          setEntered(true);
        }}
      />
    );
  }

  return <App initialTab={tab} startReporting={reporting} onHome={() => setEntered(false)} />;
}

export default function Root() {
  return (
    <LanguageProvider>
      <ErrorBoundary>
        <RootInner />
      </ErrorBoundary>
    </LanguageProvider>
  );
}
