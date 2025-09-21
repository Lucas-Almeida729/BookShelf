// src/app/page.tsx
import { initialBooks } from "@/lib/mock-data";

export default function HomePage() {
  const totalLivros = initialBooks.length;
  
  const livrosLendo = initialBooks.filter(book => book.status === 'LENDO').length;

  const livrosFinalizados = initialBooks.filter(book => book.status === 'LIDO').length;
 
  return (
    <main className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Meu Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card para Total de Livros */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700">Total de Livros</h2>
          <p className="text-4xl font-bold text-blue-600 mt-2">{totalLivros}</p>
        </div>
 
        {/* Card para Livros Lendo */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700">Lendo Atualmente</h2>
          <p className="text-4xl font-bold text-yellow-600 mt-2">{livrosLendo}</p>
        </div>
 
        {/* Card para Livros Finalizados */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700">Livros Finalizados</h2>
          <p className="text-4xl font-bold text-green-600 mt-2">{livrosFinalizados}</p>
        </div>
      </div>
    </main>
  );
}