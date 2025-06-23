// src/components/ui/FeatureComingSoon.tsx

import { AlertTriangle } from "lucide-react";

type Props = {
  title?: string;
  description?: string;
};

const FeatureComingSoon = ({
  title = "Funcionalidade em desenvolvimento",
  description = "Esta seção ainda está sendo implementada. Em breve estará disponível.",
}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center text-center text-muted-foreground space-y-4">
      <AlertTriangle className="w-10 h-10 text-yellow-500" />
      <div>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
};

export default FeatureComingSoon;
