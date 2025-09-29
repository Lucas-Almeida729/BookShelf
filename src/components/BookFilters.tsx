// src/components/BookFilters.tsx
"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { genres, statuses } from "@/types/book";

export default function BookFilters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Função para atualizar os parâmetros da URL quando um filtro muda
  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value && value !== "ALL") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    // Navega para a mesma página com os novos parâmetros de busca
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
      {/* Campo de Busca */}
      <div className="md:col-span-1">
        <Input
          id="search"
          type="text"
          placeholder="Buscar por título ou autor..."
          className="w-full"
          defaultValue={searchParams.get("query")?.toString()}
          onChange={(e) => handleFilterChange("query", e.target.value)}
        />
      </div>

      {/* Filtro por Gênero */}
      <div>
        <Select
          onValueChange={(value) => handleFilterChange("genre", value)}
          defaultValue={searchParams.get("genre")?.toString() || "ALL"}
        >
          <SelectTrigger id="genre-filter">
            <SelectValue placeholder="Filtrar por gênero" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Todos os Gêneros</SelectItem>
            {genres.map((g) => (
              <SelectItem key={g} value={g}>
                {g}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Filtro por Status */}
      <div>
        <Select
          onValueChange={(value) => handleFilterChange("status", value)}
          defaultValue={searchParams.get("status")?.toString() || "ALL"}
        >
          <SelectTrigger id="status-filter">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Todos os Status</SelectItem>
            {statuses.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
