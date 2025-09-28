// src/app/biblioteca/page.tsx
import { fetchBooks } from "@/lib/data";
import BookCard from "@/components/BookCard";
import BookFilters from "@/components/BookFilters"; // Nosso novo componente de cliente
import { Status, Genre } from "@/types/book";

// A página da biblioteca agora recebe 'searchParams' como prop
type PageProps = {
  searchParams?: {
    query?: string;
    genre?: Genre;
    status?: Status;
  };
};

export default async function BibliotecaPage({ searchParams }: PageProps) {
  // 1. Busca todos os livros no servidor
  const allBooks = await fetchBooks();

  // 2. Pega os valores dos filtros da URL (ou usa valores padrão)
  const query = searchParams?.query || '';
  const selectedGenre = searchParams?.genre;
  const selectedStatus = searchParams?.status;

  // 3. Aplica a lógica de filtro no servidor
  const filteredBooks = allBooks.filter(book => {
    const matchesSearchTerm = 
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase());
    
    const matchesGenre = selectedGenre ? book.genre === selectedGenre : true;
    const matchesStatus = selectedStatus ? book.status === selectedStatus : true;

    return matchesSearchTerm && matchesGenre && matchesStatus;
  });

  return (
    <main className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Minha Biblioteca</h1>
      
      {/* Renderiza o componente de cliente para os filtros interativos */}
      <BookFilters />
      
      {filteredBooks.length === 0 ? (
        <p className="text-center text-gray-500 mt-12">Nenhum livro encontrado com os filtros atuais.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map(book => (
            <BookCard 
              key={book.id} 
              book={book} 
            />
          ))}
        </div>
      )}
    </main>
  );
}