"use client";

import * as React from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="icon" onClick={() => setTheme("light")}>
        <Sun className="h-5 w-5" />
        <span className="sr-only">Mudar para tema claro</span>
      </Button>
      <Button variant="outline" size="icon" onClick={() => setTheme("dark")}>
        <Moon className="h-5 w-5" />
        <span className="sr-only">Mudar para tema escuro</span>
      </Button>
      <Button variant="outline" size="icon" onClick={() => setTheme("system")}>
        <Monitor className="h-5 w-5" />
        <span className="sr-only">Mudar para tema do sistema</span>
      </Button>
    </div>
  );
}
