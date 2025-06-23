// src/features/commits/components/CommitListSection.tsx

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CommitCardList from "@/features/commits/components/CommitCardList";
import { fetchCommits } from "@/features/commits/services/fetchCommits";

const CommitListSection = () => {
  const [repo, setRepo] = useState("frontend");
  const [branch] = useState("main");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["commits", repo, branch],
    queryFn: () => fetchCommits({ repo, branch }),
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="w-60">
          <Select value={repo} onValueChange={setRepo}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o repositório" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="frontend">Frontend</SelectItem>
              <SelectItem value="backend">Backend</SelectItem>
              <SelectItem value="dados">Dados</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border rounded-lg p-4 text-sm text-muted-foreground space-y-6">
        {isLoading ? (
          <p>Carregando commits...</p>
        ) : isError || !data ? (
          <p>Erro ao carregar commits.</p>
        ) : (
          <>
            <CommitCardList commits={data.commits} />
          </>
        )}
      </div>
    </div>
  );
};

export default CommitListSection;
