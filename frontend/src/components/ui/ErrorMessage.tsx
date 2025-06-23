// src\components\ui\ErrorMessage.tsx

import { AlertTriangle } from "lucide-react";

type Props = {
  message: string;
  onRetry?: () => void;
};

const ErrorMessage = ({ message, onRetry }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-[40vh] text-center text-muted-foreground space-y-4">
      <AlertTriangle className="w-10 h-10 text-destructive" />
      <div>
        <h2 className="text-xl font-semibold text-destructive">Algo deu errado</h2>
        <p className="text-sm max-w-md">
          {message || "Ocorreu um erro inesperado ao carregar as informações. Tente novamente mais tarde."}
        </p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 inline-flex items-center rounded-md border border-input bg-background px-4 py-1.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
