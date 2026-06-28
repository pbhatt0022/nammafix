/**
 * Catches any unexpected render error so a crash shows a friendly recovery card
 * instead of a blank white screen during the demo. Error boundaries must be class
 * components — this is the one place a class is required.
 *
 * ponytail: this project ships without @types/react, so React.Component is untyped
 * here; we cast `this` to read props/state rather than pull in @types/react (which
 * would surface many pre-existing type gaps across the app). Upgrade path: add
 * @types/react + @types/react-dom and clean the resulting errors, then drop the cast.
 */
import React from "react";

interface State { hasError: boolean; message?: string; }

export default class ErrorBoundary extends React.Component {
  state: State = { hasError: false };

  static getDerivedStateFromError(err: Error): State {
    return { hasError: true, message: err.message };
  }

  componentDidCatch(err: Error, info: unknown) {
    console.error("Unhandled UI error:", err, info);
  }

  render() {
    const self = this as any; // see file header note
    if (!self.state.hasError) return self.props.children;
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-6 font-body text-ink">
        <div className="max-w-md w-full rounded-2xl border-2 border-dashed border-ink/30 bg-white p-8 text-center shadow-[6px_6px_0_0_rgba(58,31,27,0.12)]">
          <div className="text-4xl mb-3">🛠️</div>
          <h1 className="font-display text-2xl font-extrabold text-indigoc">Something hiccuped</h1>
          <p className="mt-2 text-sm text-ink/70">
            NammaFix hit an unexpected error. Your data is safe — reloading usually clears it.
          </p>
          {self.state.message && (
            <p className="mt-3 font-mono text-[10px] text-ink/40 break-words">{self.state.message}</p>
          )}
          <button
            onClick={() => window.location.reload()}
            className="mt-5 rounded-xl bg-saffron px-6 py-2.5 font-display font-bold text-white shadow-[3px_3px_0_0_rgba(58,31,27,0.25)] transition-transform hover:-translate-y-0.5"
          >
            Reload
          </button>
        </div>
      </div>
    );
  }
}
