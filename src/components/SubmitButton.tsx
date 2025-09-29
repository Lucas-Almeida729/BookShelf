// src/components/SubmitButton.tsx
"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

// Estendemos as props do botão padrão para que possamos passar 'variant', 'size', etc.
type SubmitButtonProps = React.ComponentProps<typeof Button> & {
  loadingText?: string;
};

export function SubmitButton({ children, loadingText = "Salvando...", ...props }: SubmitButtonProps) {
  // O hook useFormStatus nos diz se o formulário pai está em processo de envio
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} {...props}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {pending ? loadingText : children}
    </Button>
  );
}