// src\features\admin\components\AnalystCardList.tsx

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { AnalystCardListProps } from "@/features/admin/types";
import { getInitials } from "@/utils/getInitials";

const AnalystCardList = ({ analysts, onAnalystOrdersClick }: AnalystCardListProps) => {
  return (
    <div className="space-y-4">
      {analysts.map((analyst) => (
        <Card key={analyst.id}>
          <CardContent className="p-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarFallback>{getInitials(analyst.name)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="text-sm font-medium">{analyst.name}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Pedidos atribuídos: {analyst.pedidosResponsaveis}</span>
                  <span className="border-l pl-2">ID {analyst.id}</span>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAnalystOrdersClick(analyst)}
              className="text-sm font-medium"
            >
              Ver pedidos
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AnalystCardList;
