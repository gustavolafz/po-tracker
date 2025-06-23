// src\features\purchase-order\components\AddCommentDialog.tsx

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RichTextEditor } from "@/features/messages/components/new-message/RichTextEditor";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSubmit: (html: string) => void;
};

export function AddCommentDialog({ open, onOpenChange, onSubmit }: Props) {
  const [content, setContent] = useState("");

  const handleSave = () => {
    if (!content.replace(/<[^>]+>/g, "").trim()) return;
    onSubmit(content);
    setContent("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Adicionar Comentário</DialogTitle>
        </DialogHeader>

        <RichTextEditor
          content={content}
          onChange={setContent}
          placeholder="Digite seu comentário..."
        />

        <DialogFooter className="pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={handleSave}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
