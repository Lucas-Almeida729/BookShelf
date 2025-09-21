// src/components/StarRating.tsx
import { Star } from "lucide-react"; // Iremos instalar 'lucide-react' para ícones

interface StarRatingProps {
  rating: number; // A nota de 1 a 5
  maxRating?: number; // Opcional, padrão 5
  size?: number; // Opcional, tamanho do ícone, padrão 20
}

export default function StarRating({ rating, maxRating = 5, size = 20 }: StarRatingProps) {
  return (
    <div className="flex items-center">
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1;
        return (
          <Star
            key={index}
            size={size}
            // A estrela é preenchida se o seu valor for menor ou igual à avaliação
            className={
              starValue <= rating
                ? "text-yellow-500 fill-current" // Estrela preenchida
                : "text-gray-300" // Estrela vazia
            }
          />
        );
      })}
    </div>
  );
}