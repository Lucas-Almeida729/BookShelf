// src/components/BookForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBooks } from "@/context/BookContext";
import { Book, statuses, genres } from "@/types/book";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star } from "lucide-react";
// 1. Importe os componentes do Dialog
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter} from "@/components/ui/dialog";

interface BookFormProps {
  initialData?: Book;
}

export default function BookForm({ initialData }: BookFormProps) {
  const router = useRouter();
  const { addBook, updateBook } = useBooks();

  // 2. Crie um estado para controlar o modal de sucesso
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [formData, setFormData] = useState<Partial<Book>>({
    title: initialData?.title || '',
    author: initialData?.author || '',
    year: initialData?.year || undefined,
    pages: initialData?.pages || undefined,
    cover: initialData?.cover || '',
    genre: initialData?.genre || undefined,
    status: initialData?.status || 'QUERO_LER',
    rating: initialData?.rating || 0,
    synopsis: initialData?.synopsis || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' && value !== '' ? parseInt(value) : value,
    }));
  };

  const handleSelectChange = (name: 'genre' | 'status') => (value: string) => {
  setFormData(prev => ({ ...prev, [name]: value as Genre | Status }));
  };

  const handleRatingChange = (newRating: number) => {
    setFormData(prev => ({ ...prev, rating: newRating }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (initialData) {
      updateBook({ ...initialData, ...formData });
      setModalMessage("Livro atualizado com sucesso!"); // 3. Define a mensagem e abre o modal
    } else {
      addBook(formData);
      setModalMessage("Livro adicionado com sucesso!"); // 3. Define a mensagem e abre o modal
    }
    setShowSuccessModal(true); // 3. Abre o modal
  };

  return (
    <> {/* Envolvemos o formulário e o modal em um Fragment */}
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
        {/* ... (todo o seu formulário continua aqui, sem alterações) ... */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2"><Label htmlFor="title">Título *</Label><Input id="title" name="title" value={formData.title} onChange={handleChange} required /></div>
          <div className="space-y-2"><Label htmlFor="author">Autor *</Label><Input id="author" name="author" value={formData.author} onChange={handleChange} required /></div>
        </div>
        <div className="space-y-2"><Label htmlFor="cover">URL da Capa</Label><Input id="cover" name="cover" value={formData.cover} onChange={handleChange} /></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2"><Label htmlFor="year">Ano de Publicação</Label><Input id="year" name="year" type="number" value={formData.year || ''} onChange={handleChange} /></div>
          <div className="space-y-2"><Label htmlFor="pages">Nº de Páginas</Label><Input id="pages" name="pages" type="number" value={formData.pages || ''} onChange={handleChange} /></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2"><Label htmlFor="genre">Gênero</Label><Select name="genre" onValueChange={handleSelectChange('genre')} value={formData.genre}><SelectTrigger><SelectValue placeholder="Selecione um gênero" /></SelectTrigger><SelectContent>{genres.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent></Select></div>
          <div className="space-y-2"><Label htmlFor="status">Status</Label><Select name="status" onValueChange={handleSelectChange('status')} value={formData.status}><SelectTrigger><SelectValue placeholder="Selecione o status" /></SelectTrigger><SelectContent>{statuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select></div>
        </div>
        <div className="space-y-2"><Label htmlFor="synopsis">Sinopse</Label><Textarea id="synopsis" name="synopsis" value={formData.synopsis} onChange={handleChange} rows={5} /></div>
        <div className="space-y-2"><Label>Avaliação</Label><div className="flex items-center gap-1">{[1, 2, 3, 4, 5].map((starValue) => (<button type="button" key={starValue} onClick={() => handleRatingChange(starValue)}><Star size={24} className={starValue <= (formData.rating || 0) ? "text-yellow-500 fill-current" : "text-gray-300"} /></button>))}{(formData.rating || 0) > 0 && (<Button variant="ghost" size="sm" onClick={() => handleRatingChange(0)} className="ml-2">Limpar</Button>)}</div></div>
        <Button type="submit" className="w-full">{initialData ? 'Atualizar Livro' : 'Adicionar Livro'}</Button>
      </form>

      {/* 4. Adicione o componente Dialog para o modal de sucesso */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sucesso!</DialogTitle>
          </DialogHeader>
          <p>{modalMessage}</p>
          <DialogFooter>
            <Button onClick={() => {
              setShowSuccessModal(false);
              router.push('/biblioteca'); // Navega para a biblioteca ao fechar
            }}>
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}