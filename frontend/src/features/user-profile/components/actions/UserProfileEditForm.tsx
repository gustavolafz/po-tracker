import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { PropsUserProfileEditForm } from "../../types";

export const UserProfileEditForm = ({ newName, setNewName, onSave, onCancel }: PropsUserProfileEditForm) => (
  <div className="space-y-4">
    <div className="space-y-2">
      <label htmlFor="name" className="text-sm font-medium">
        Novo Apelido
      </label>
      <Input
        id="name"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        placeholder="Digite seu novo nome"
      />
    </div>

    <div className="flex justify-end gap-2">
      <Button variant="outline" onClick={onCancel}>
        Cancelar
      </Button>
      <Button onClick={onSave}>Salvar</Button>
    </div>
  </div>
);
