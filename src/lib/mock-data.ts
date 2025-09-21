// src/lib/mock-data.ts
import { Book } from "@/types/book"; 

export const initialBooks: Book[] = [
  { 
    id: '1', 
    title: 'Dom Casmurro', 
    author: 'Machado de Assis', 
    year: 1899, 
    pages: 288, 
    genre: 'Literatura Brasileira', 
    status: 'LIDO', 
    rating: 5, 
    synopsis: 'Bentinho e Capitu são criados juntos e se apaixonam na adolescência. Mas a mãe dele, por força de uma promessa, decide enviá-lo ao seminário para que se torne padre. Lá o garoto conhece Escobar, de quem fica amigo íntimo. Algum tempo depois, tanto um como outro deixam a vida eclesiástica e se casam. Escobar com Sancha, e Bentinho com Capitu. Os dois casais vivem tranquilamente até a morte de Escobar, quando Bentinho começa a desconfiar da fidelidade de sua esposa e percebe a assombrosa semelhança do filho Ezequiel com o ex-companheiro de seminário. A capa pode variar',
    cover:'https://m.media-amazon.com/images/I/81XpG2iKTlL.jpg'
  },
  { 
    id: '2', 
    title: 'O Guia do Mochileiro das Galáxias', 
    author: 'Douglas Adams', 
    year: 1979, 
    pages: 193,
    genre: 'Ficção Científica', 
    status: 'LENDO', 
    rating: 4, 
    synopsis: 'A saga hilária de Arthur Dent...',
    cover: 'https://m.media-amazon.com/images/I/51B7vacPfEL._SY445_SX342_ControlCacheEqualizer_.jpg' 
  },
  { 
    id: '3', 
    title: '1984', 
    author: 'George Orwell', 
    year: 1949, 
    pages: 328,
    genre: 'Ficção Científica', 
    status: 'QUERO_LER', 
    rating: 3, // Ou undefined
    synopsis: 'Um clássico distópico que explora as consequências do totalitarismo...',
    cover: 'https://cdn.awsli.com.br/1304/1304678/produto/85900220/61b06e91a9.jpg' 
  },
   { 
    id: '4', 
    title: 'Harry Potter e a Pedra Filosofal', 
    author: 'J.K. Rowling', 
    year: 1997, 
    pages: 264,
    genre: 'Fantasia', 
    status: 'LENDO', 
    rating: 5, 
    synopsis: 'Deveria ser um livro só para o público infanto-juvenil. Mas, no mundo inteiro, gente de idades variadas lê Harry Potter - um fenômeno da literatura mundial que desafia crenças e estimativas. Harry Potter é um garoto cujos pais, feiticeiros, foram assassinados por um poderosíssimo bruxo quando ele ainda era um bebê. Ele foi levado, então, para a casa dos tios que nada tinham a ver com o sobrenatural. Pelo contrário. Até os 10 anos, Harry foi uma espécie de gata borralheira: maltratado pelos tios, herdava roupas velhas do primo gorducho, tinha óculos remendados e era tratado como um estorvo.No dia de seu aniversário de 11 anos, entretanto, ele parece deslizar por um buraco sem fundo, como o de Alice no país das maravilhas, que o conduz a um mundo mágico. Descobre sua verdadeira história e seu destino: ser um aprendiz de feiticeiro até o dia em que terá que enfrentar a pior força do mal, o homem que assassinou seus pais. O menino de olhos verde, magricela e desengonçado, tão habituado à rejeição, descobre, também, que é um herói no universo dos magos. Potter fica sabendo que é a única pessoa a ter sobrevivido a um ataque do tal bruxo do mal e essa é a causa da marca em forma de raio que ele carrega na testa. Ele não é um garoto qualquer, ele sequer é um feiticeiro qualquer, ele é Harry Potter, símbolo de poder, resistência e um líder natural entre os sobrenaturais. A fábula, recheada de fantasmas, paredes que falam, caldeirões, sapos, unicórnios, dragões e gigantes, não é, entretanto, apenas um passatempo. Harry Potter conduz a discussões metafísicas, aborda o eterno confronto entre o bem e o mal, evidencia algumas mazelas da sociedade, como o preconceito, a divisão de classes através do dinheiro e do berço, a inveja, o egoísmo, a competitividade exacerbada, a busca pelo ideal - a necessidade de aprender, nem que seja à força, que a vida é feita de derrotas e vitórias e que isso é importante para a formação básica de um adulto.',
    cover: 'https://static.stealthelook.com.br/wp-content/uploads/2021/02/livros-mais-vendidos-do-mundo-harry-potter-e-a-pedra-filosofal-20210223153910.jpg' 
  },
  { 
    id: '5', 
    title: 'O Leão, a Feiticeira e o Guarda-Roupa', 
    author: 'C.S. Lewis', 
    year: 1950, 
    pages: 560,
    genre: 'Fantasia', 
    status: 'LENDO', 
    rating: 5, 
    synopsis: 'Viagens ao fim do mundo, criaturas fantásticas e batalhas épicas entre o bem e o mal - o que mais um leitor poderia querer de um livro? O livro que tem tudo isso é O leão, a feiticeira e o guarda-roupa, escrito em 1949 por Clive Staples Lewis. MasLewis não parou por aí. Seis outros livros vieram depois e, juntos, ficaram conhecidos como As crônicas de Nárnia. Nos últimos cinqüenta anos, As crônicas de Nárnia transcenderam o gênero da fantasia para se tornar parte do cânone da literaturaclássica. Cada um dos sete livros é uma obra-prima, atraindo o leitor para um mundo em que a magia encontra a realidade, e o resultado é um mundo ficcional que tem fascinado gerações. Esta edição apresenta todas as sete crônicas integralmente, num único volume. Os livros são apresentados de acordo com a ordem de preferência de Lewis, cada capítulo com uma ilustração do artista original, Pauline Baynes. Enganosamente simples e direta, As crônicas de Nárnia continuam cativando os leitores com aventuras, personagens e fatos que falam a pessoas de todas as idades.',
    cover: 'https://m.media-amazon.com/images/I/71yJLhQekBL._SY466_.jpg' 
  },
  { 
    id: '6', 
    title: 'Sapiens: Uma Breve História da Humanidade', 
    author: 'Yuval Noah Harari', 
    year: 2011, 
    pages: 464,
    genre: 'História', 
    status: 'PAUSADO', 
    rating: 4, 
    synopsis: 'O planeta Terra tem cerca de 4,5 bilhões de anos. Numa fração ínfima desse tempo, uma espécie entre incontáveis outras o dominou: nós, humanos. Somos os animais mais evoluídos e mais destrutivos que jamais viveram. Sapiens é a obra-prima de Yuval Noah Harari e o consagrou como um dos pensadores mais brilhantes da atualidade. Num feito surpreendente, que já fez deste livro um clássico contemporâneo, o historiador israelense aplica uma fascinante narrativa histórica a todas as instâncias do percurso humano sobre a Terra. Da Idade da Pedra ao Vale do Silício, temos aqui uma visão ampla e crítica da jornada em que deixamos de ser meros símios para nos tornarmos os governantes do mundo. Harari se vale de uma abordagem multidisciplinar que preenche as lacunas entre história, biologia, filosofia e economia, e, com uma perspectiva macro e micro, analisa não apenas os grandes acontecimentos, mas também as mudanças mais sutis notadas pelos indivíduos.',
    cover: 'https://m.media-amazon.com/images/I/71-ghLb8qML._SY425_.jpg' 
  },

  
];