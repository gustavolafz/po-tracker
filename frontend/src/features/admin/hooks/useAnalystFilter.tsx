// src\features\admin\hooks\useAnalystFilter.tsx

import { useState, useMemo } from "react";
import type { Analyst } from "@/features/admin/types";

export function useAnalystFilter(analysts: Analyst[]) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAnalysts = useMemo(() => {
    const termo = searchTerm.trim().toLowerCase();

    return analysts.filter((analyst) =>
      analyst.name.toLowerCase().includes(termo) ||
      analyst.id.toLowerCase().includes(termo) ||
      analyst.email.toLowerCase().includes(termo)
    );
  }, [searchTerm, analysts]);

  return { searchTerm, setSearchTerm, filteredAnalysts };
}
