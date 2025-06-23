import { FileSearch } from "lucide-react";

const EmptyAnalystList = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-12 text-center text-muted-foreground space-y-4">
      <FileSearch className="w-10 h-10 text-destructive" />
      <div>
        <h2 className="text-xl font-semibold">Nenhum analista encontrado</h2>
        <p className="text-sm">Ainda não há analistas registrados no sistema.</p>
      </div>
    </div>
  );
};

export default EmptyAnalystList;
