// src/components/GenreFilter.tsx
"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GenreFilterProps {
  genres: string[];
}

export default function GenreFilter({ genres }: GenreFilterProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleGenreChange = (genre: string) => {
    const params = new URLSearchParams(searchParams);
    if (genre && genre !== "ALL") {
      params.set('genre', genre);
    } else {
      params.delete('genre');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mb-8 max-w-xs">
      <Select
        onValueChange={handleGenreChange}
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
  );
}