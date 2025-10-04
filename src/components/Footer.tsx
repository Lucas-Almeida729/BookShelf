// src/components/Footer.tsx

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="container mx-auto py-6 px-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} BookShelf. Todos os direitos reservados.</p>
        <p className="mt-2 md:mt-0">
          Desenvolvido por{" "}
          <Link 
            href="https://github.com/lucas-almeida729/bookshelf_fase3" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Lucas e Angela Esquadrão DEVS
          </Link>
        </p>
      </div>
    </footer>
  );
}