// src\features\commits\types.ts

export interface Commit {
  title: string;
  description: string;
  author: string;
  date: string;
  sha: string;
  url: string;
}

export interface CommitResponse {
  repo: string;
  branch: string;
  page: number;
  per_page: number;
  count: number;
  commits: Commit[];
}
