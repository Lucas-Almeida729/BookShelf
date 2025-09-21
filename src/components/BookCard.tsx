// src/components/BookCard.tsx
import { Book } from "@/types/book"; 
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BookActions from "./BookActions"; 
import StarRating from "./StarRating"; // <-- Importe o StarRating

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg">
      <img 
        src={book.cover || 'https://via.placeholder.com/300x00.png?text=Sem+Capa'} 
        alt={`Capa do livro ${book.title}`} 
        className="rounded-t-md w-full h-full object-cover" 
      />
      <div className="p-4 flex flex-col flex-grow">
        <CardHeader className="p-0">
          <CardTitle className="text-lg font-bold line-clamp-2">{book.title}</CardTitle>
          <p className="text-sm text-muted-foreground">{book.author}</p>
        </CardHeader>
        <CardContent className="p-0 mt-4 flex-grow">
          {book.genre && <Badge className="mr-2">{book.genre}</Badge>} {/* Adicione mr-2 para espaçamento */}
          {book.year && <span className="text-sm text-muted-foreground">{book.year}</span>} {/* <-- Adicione o ano */}
          
          {/* Adicione o componente StarRating se houver uma avaliação */}
          {book.rating !== undefined && book.rating > 0 && (
            <div className="mt-2">
              <StarRating rating={book.rating} />
            </div>
          )}
        </CardContent>
        <CardFooter className="p-0 mt-4">
          <BookActions bookId={book.id} />
        </CardFooter>
      </div>
    </Card>
  );
}