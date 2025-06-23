// src/bootstrap/renderApp.tsx

import type { Root } from "react-dom/client";
import type { FC, ComponentType } from "react";
import type { FallbackProps, ErrorBoundaryProps } from "react-error-boundary";
import { ThemeProvider } from "@/components/layout/theme/theme-provider";

type RenderAppProps = {
  createRoot: (container: Element | DocumentFragment) => Root;
  App: FC;
  ErrorBoundary: ComponentType<Partial<ErrorBoundaryProps>>;
  ErrorFallback: FC<FallbackProps>;
  ThemeProvider: FC<React.ComponentProps<typeof ThemeProvider>>;
};

export function renderApp({
  createRoot,
  App,
  ErrorBoundary,
  ErrorFallback,
  ThemeProvider,
}: RenderAppProps) {
  const rootElement = document.getElementById("root");
  if (!rootElement) throw new Error("Elemento #root não encontrado");

  const root = createRoot(rootElement);
  root.render(
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => window.location.reload()}
      >
        <App />
      </ErrorBoundary>
    </ThemeProvider>
  );

  rootElement.setAttribute("data-app-loaded", "true");
}
