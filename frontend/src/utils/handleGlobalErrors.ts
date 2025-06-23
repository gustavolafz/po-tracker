// utils/handleGlobalErrors.ts
// Descrição: Captura qualquer falha de inicialização e exibe um fallback amigável mesmo para erros fora do React.

export function setupGlobalErrorHandler() {
  window.addEventListener("error", (event) => {
    console.error("Global error:", event.error || event.message);

    if (shouldRenderFallback()) {
      renderErrorFallback(event.error?.message || event.message || "Erro desconhecido.");
    }
  });

  window.addEventListener("unhandledrejection", (event) => {
    console.error("Unhandled rejection:", event.reason);

    if (shouldRenderFallback()) {
      const msg =
        typeof event.reason === "string"
          ? event.reason
          : event.reason?.message || "Rejeição de promessa não tratada.";
      renderErrorFallback(msg);
    }
  });
}

function shouldRenderFallback() {
  return document.body.innerHTML.trim() === "" || !document.querySelector("[data-app-loaded]");
}

export function renderErrorFallback(message: string) {
  document.body.innerHTML = `
    <div style="padding: 2rem; font-family: sans-serif; background: #fffbe6; color: #333;">
      <h2 style="color: #d32f2f;">Erro na inicialização da aplicação</h2>
      <p>${message}</p>
      <p style="font-size: 0.875rem; font-style: italic;">Verifique o console para mais detalhes técnicos.</p>
      <button onclick="window.location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem;">🔄 Recarregar</button>
    </div>
  `;
}
