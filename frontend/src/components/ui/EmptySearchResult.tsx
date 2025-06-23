// src/components/ui/EmptySearchResult.tsx

import { FileSearch } from "lucide-react";

type Props = {
  title?: string;
  description?: string;
  onClear?: () => void;
};

const EmptySearchResult = ({
  title = "Nenhum resultado encontrado",
  description = "Tente ajustar os termos da busca ou verifique possíveis erros de digitação.",
  onClear,
}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-[40vh] text-center text-muted-foreground space-y-4">
      <FileSearch className="w-10 h-10 text-yellow-500" />
      <div>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm">{description}</p>
      </div>
      {onClear && (
        <button
          onClick={onClear}
          className="mt-2 inline-flex items-center rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          Limpar busca
        </button>
      )}
    </div>
  );
};

export default EmptySearchResult;
