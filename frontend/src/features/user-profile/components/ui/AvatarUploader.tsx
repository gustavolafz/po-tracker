import { useState } from "react";
import { CameraIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getInitials } from "@/utils/getInitials.ts";
import type { PropsAvatarUploader } from "../../types.ts";

export const AvatarUploader = ({ name, onAvatarChange }: PropsAvatarUploader) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        onAvatarChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex mt-2 flex-col items-center gap-4">
      {preview ? (
        <img src={preview} alt="Avatar" className="h-24 w-24 rounded-full object-cover border-2 border-primary shadow" />
      ) : (
        <div className="h-24 w-24 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold shadow">
          {getInitials(name)}
        </div>
      )}
      <label className="cursor-pointer text-sm text-primary hover:underline inline-flex items-center gap-1">
        <CameraIcon className="h-4 w-4" />
        Editar avatar
        <Input type="file" accept="image/*" className="hidden" onChange={handleChange} />
      </label>
    </div>
  );
};
