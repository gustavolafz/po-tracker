// src\features\user-profile\components\ui\StatusFilterSelect.tsx

import IconSelect from "@/components/ui/IconSelect";

type Props = {
  statusSelecionado: string | null;
  onChange: (status: string) => void;
};

const statusOptions = [
  {
    label: "Todos",
    value: "Todos",
    color: "text-gray-400",
  },
  {
    label: "Em Andamento",
    value: "Em Andamento",
    color: "text-yellow-500",
    dotColor: "bg-yellow-400",
  },
  {
    label: "Atrasado",
    value: "Atrasado",
    color: "text-red-500",
    dotColor: "bg-red-500",
  },
  {
    label: "Resolvido",
    value: "Resolvido",
    color: "text-green-600",
    dotColor: "bg-green-500",
  },
];

const StatusFilterSelect = ({ statusSelecionado, onChange }: Props) => {
  return (
    <IconSelect
      value={statusSelecionado || "Todos"}
      onChange={(val) => onChange(val === "Todos" ? "" : val)}
      placeholder="Filtrar por status..."
      options={statusOptions}
      showDot
      useNeutralDefault
    />
  );
};

export default StatusFilterSelect;
