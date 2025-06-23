// src/components/toasts/CustomToast.tsx
import { toast } from "sonner";
import type { LucideIcon } from "lucide-react";

type ShowCustomToastProps = {
  title: string;
  description?: string;
  icon: LucideIcon;
  iconColor?: string;
};

export function showCustomToast({
  title,
  description,
  icon: Icon,
  iconColor = "text-primary",
}: ShowCustomToastProps) {
  toast.custom((id) => (
    <div
      className="flex items-start gap-4 p-4 bg-background border border-border rounded-md shadow-md max-w-md"
      role="alert"
    >
      <Icon className={`h-5 w-5 mt-1 ${iconColor}`} />
      <div className="flex-1 space-y-1">
        <p className="font-medium text-foreground">{title}</p>
        {description && <p className="text-sm text-foreground">{description}</p>}
      </div>
      <button
        onClick={() => toast.dismiss(id)}
        className="text-muted-foreground hover:text-foreground transition"
      >
        ×
      </button>
    </div>
  ));
}
