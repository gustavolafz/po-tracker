// src/features/commits/services/fetchCommits.ts

import { fetchWithAuth } from "@/lib/fetchWithAuth";
import type { CommitResponse } from "../types";

export type FetchCommitsParams = {
  repo: string;
  branch: string;
  page?: number;
  per_page?: number;
};

export const fetchCommits = async ({
  repo,
  branch,
  page = 1,
  per_page = 5,
}: FetchCommitsParams): Promise<CommitResponse> => {
  const query = new URLSearchParams({
    repo,
    branch,
    page: String(page),
    per_page: String(per_page),
  });

  const url = `${import.meta.env.VITE_API_BASE_URL}/api/commits?${query}`;

  const res = await fetchWithAuth(url);

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.error || "Erro ao buscar commits");
  }

  return res.json();
};
