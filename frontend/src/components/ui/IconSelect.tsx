// src\components\ui\IconSelect.tsx

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";

type Option = {
  label: string;
  value: string;
  color?: string;
  dotColor?: string;
};

type IconSelectProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: Option[];
  showDot?: boolean;
  useNeutralDefault?: boolean;
};

const IconSelect = ({
  value,
  onChange,
  placeholder,
  options,
  showDot = false,
  useNeutralDefault = false,
}: IconSelectProps) => {
  const selected = options.find((opt) => opt.value === value);
  const iconColor = selected?.color ?? (useNeutralDefault ? "text-gray-400" : "text-foreground");

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full sm:w-64">
        <Filter className={`w-4 h-4 mr-2 ${iconColor}`} />
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        {options.map(({ label, value, color, dotColor }) => (
          <SelectItem key={value} value={value}>
            <div
              className={`flex items-center gap-2 ${color ?? "text-foreground"}`}
            >
              {showDot && dotColor && (
                <span className={`w-2.5 h-2.5 rounded-full ${dotColor}`} />
              )}
              {label}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default IconSelect;
