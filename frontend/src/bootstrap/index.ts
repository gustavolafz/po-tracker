// src\bootstrap\index.ts

import { renderHardFail } from "./renderHardFail";
import { renderApp } from "./renderApp";

export async function bootstrap() {
  try {
    const [
      ReactDOM,
      ReactErrorBoundary,
      ErrorFallbackModule,
      ThemeProviderModule,
      AppModule,
      ErrorUtils,
    ] = await Promise.all([
      import("react-dom/client"),
      import("react-error-boundary"),
      import("@/components/system/ErrorFallback"),
      import("@/components/layout/theme/theme-provider"),
      import("../App"),
      import("../utils/handleGlobalErrors"),
    ]);

    const { createRoot } = ReactDOM;
    const { ErrorBoundary } = ReactErrorBoundary;
    const { ErrorFallback } = ErrorFallbackModule;
    const { ThemeProvider } = ThemeProviderModule;
    const App = AppModule.default;
    const { setupGlobalErrorHandler } = ErrorUtils;

    setupGlobalErrorHandler();

    renderApp({ createRoot, App, ErrorBoundary, ErrorFallback, ThemeProvider });

  } catch (err) {
    console.error("Erro crítico ao iniciar aplicação:", err);
    if (import.meta.env.DEV) {
      renderHardFail(err instanceof Error ? err.message : "Erro inesperado.");
    } else {
      document.body.innerHTML = `
        <div style="padding: 2rem; font-family: sans-serif; text-align: center;">
          <p>Erro inesperado ao carregar a aplicação.</p>
        </div>
      `;
    }
  }
}
