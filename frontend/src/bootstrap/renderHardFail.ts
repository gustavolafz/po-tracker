// src\bootstrap\renderHardFail.ts

export function renderHardFail(msg: string) {
  document.body.innerHTML = `
    <div style="
      display: flex;
      min-height: 100vh;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: #6b7280;
      font-family: ui-sans-serif, system-ui, sans-serif;
      padding: 2.5rem 1rem;
      background-color: #fff;
    ">
      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        max-width: 28rem;
        width: 100%;
      ">
        <h1 style="
          font-size: 2.25rem;
          font-weight: 700;
          color: #dc2626;
          line-height: 1.2;
        ">
          Algo deu errado
        </h1>

        <p style="margin: 0;">${msg}</p>

        <p style="
          font-size: 0.75rem;
          font-style: italic;
          color: #6b7280;
          margin: 0;
        ">
          Verifique o console para mais detalhes técnicos.
        </p>

        <button onclick="window.location.href='/'" style="
          background-color: #4f46e5;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          font-weight: 500;
          cursor: pointer;
          border: none;
          font-size: 0.875rem;
          transition: background-color 0.2s ease-in-out;
        " onmouseover="this.style.backgroundColor='#4338ca'" onmouseout="this.style.backgroundColor='#4f46e5'">
          Ir para página inicial
        </button>
      </div>
    </div>
  `;
}
