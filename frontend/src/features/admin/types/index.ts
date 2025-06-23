// src\features\admin\types\index.ts

export type Analyst = {
  id: string;
  name: string;
  email: string;
  pedidosResponsaveis: number;
};

export type AnalystListSectionProps = {
  analysts: Analyst[];
};

export type AnalystCardListProps = {
  analysts: Analyst[];
  onAnalystOrdersClick: (analyst: Analyst) => void;
};
