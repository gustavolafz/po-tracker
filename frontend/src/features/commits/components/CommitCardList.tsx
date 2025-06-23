// src\features\commits\components\CommitCardList.tsx

import { Card, CardContent } from "@/components/ui/card";
import type { Commit } from "../types";
import { Badge } from "@/components/ui/badge";

interface Props {
  commits: Commit[];
}

const CommitCardList = ({ commits }: Props) => {
  return (
    <div className="space-y-4">
      {commits.map((commit) => {
        const [type = "", message = ""] = commit.title.split(":").map((s) => s.trim());
        const shortSha = commit.sha.slice(0, 7);

        return (
          <Card key={commit.sha} className="border-l-4 pl-4" style={{ borderColor: getColorByType(type) }}>
            <CardContent className="py-6 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-semibold">{message || commit.title}</h3>
                <Badge variant="outline" className="text-xs">SHA: {shortSha}</Badge>
              </div>
              {commit.description && (
                <p className="text-muted-foreground text-sm whitespace-pre-line">{commit.description}</p>
              )}
              <div className="text-sm text-muted-foreground flex justify-between flex-wrap gap-2">
                <span><strong>Autor:</strong> {commit.author}</span>
                <span><strong>Data:</strong> {new Date(commit.date).toLocaleString()}</span>
              </div>
              <a
                href={commit.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm underline underline-offset-2 hover:text-blue-800 transition"
              >
                Ver no GitHub
              </a>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default CommitCardList;

function getColorByType(type: string): string {
  switch (type) {
    case "feat": return "#22c55e";    // verde
    case "fix": return "#ef4444";     // vermelho
    case "refactor": return "#3b82f6"; // azul
    case "test": return "#a855f7";    // roxo
    default: return "#d1d5db";        // cinza
  }
}
