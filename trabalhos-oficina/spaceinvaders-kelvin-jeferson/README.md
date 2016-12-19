TRABALHO DE OFICINA DE COMPUTAÇÃO

--- JOGO EM RACKET/SCHEME ----

(Vale 70% da nota, sendo 30% os exercícios)

Vocês podem fazer em duplas um dentre os possíveis jogos:

    Bejeweled, Bomberman, Columns, Same, Minhoquinha (Snake), Sokoban, Tetris, Corrida (estilo Enduro), PacMan, Flappy Bird, Space Invaders, Campo Minado, Batalha Naval, Sapinho que atravessa rua, Arkanoid, Pong (com alguma novidade)

Recomendo a escolha dos seguintes jogos, por serem mais simples de fazer e não precisarem envolver uso de matrizes:

    Corrida (estilo Enduro)
    PacMan (pode ser com mapa menor do que o original)
    Flappy Bird (pode ser com fase menor, mas acrescente obstáculos móveis)
    Space Invaders
    Sapinho que atravessa a rua (Frogger) (com fases e aumento de nível de dificuldade)
    Arkanoid
    Pong (com alguma novidade, pois o original é muito simples)
    Batalha Naval (usa matrizes mas é mais simples)

Para quem quiser elaborar um jogo mais elaborado e que envolva matrizes, podem tentar os seguintes jogos. Quem fizer um dos seguintes jogos ganhará nota extra (por exemplo, se nota final dor 8,0, poderá ficar com 9,0) :

    Tetris (obs: quem quiser fazer este terá acesso a um template do programa)
    Bejeweled
    Bomberman
    Columns
    Same
    Minhoquinha (Snake)
    Sokoban
    Campo Minado (com gerador de campo aleatório)

Podem mandar mais sugestões de jogos caso queiram.

Me mandem assim que puderem uma proposta de como será o jogo que vocês pretendem desenvolver para eu avaliar a viabilidade e nível de dificuldade.

 

--- DATAS: ---

DATA DE APRESENTAÇÃO DE PROPOSTA: 20/10/2014

DATA DE ENTREGA: 10/11/2014

DATA DE APRESENTAÇÃO INDIVIDUAL: 11/11/2014

    A proposta deve consistir em um documento explicando o objetivo do jogo, os elementos da tela, assim como uma análise de domínio inicial (incluindo alguns cenários)
    Na apresentação individual, cada aluno deverá explicar ao professor como o programa foi desenvolvido e responder questionamentos do professor sobre o programa.

 

--- CRITÉRIOS DE AVALIAÇÃO: ---

    Clareza lógica: a lógica nos programas deve ser clara.
    Utilização das receitas de projeto: as funções devem ser escritas utilizando as receitas de projeto. Todas as funções devem ter testes.
    Corretude e completude: os programas têm quer passar em todos os testes (e os testes devem estar corretos e com 100% de cobertura de código – exceto para função main / big-bang, que não precisa fazer teste unitário).
    Boas práticas de programação: o código deve estar bem escrito e organizado; os recursos da linguagem devem ser usados corretamente.


--- INSTRUÇÕES PARA DESENVOLVIMENTO ---

Vocês podem desenvolver o programa tanto na linguagem Advanced Student Language (AST) quanto diretamente na linguagem Racket. De qualquer modo, o ideal (contará mais nota) se o trabalho final for entregue na linguagem Racket seguindo o padrão de separação dos arquivos do projeto inicial. Ou seja, a função main / big-bang deverá estar definida em "main-racket.rkt", as demais funções do jogo deverão estar definidas em "jogo.rkt", as constantes em "constantes.rkt", as definições de tipos de dados em "dados.rkt", e os testes em "testes.rkt". Todos os arquivos já possuem um template que incluem as importações entre arquivos. 

A separação modular do programa, que deixa o código mais limpo, só é possível se o programa estiver implementado na linguagem Racket (vejam o exemplo da vaca em Racket disponível no site).

Portanto, existem duas formas: 

	- implementar diretamente na linguagem Racket utilizando os templates presentes no projeto inicial;
	
	- implementar primeiro em AST de maneira semelhante ao que foi feito em sala de aula utilizando o arquivo "main-ast.rkt" e depois "traduzir" o que foi feito ali para a linguagem Racket. Isto não é uma tarefa muito difícil, basicamente será copiar as partes dos programas equivalentes (ex: a parte das constantes para o arquivo "constantes.rkt"). Se houver imagens dentro do arquivo de código fonte, deverá substituir por uma chamada à função (bitmap ...), similar ao que foi feito no exemplo da Vaca. Outra mudança deve ser feita nos testes. No AST, utilizamos a função (check-expect ...) para testar os arquivos, enquanto que utilizando o pacote 'rackunit' da linguagem Racket a função equivalente é (check-equal? ...), portanto basta utilizar o Replace. Outra modificação pe na definição de estruturas comparáveis, onde deve ser adicionado um "#:transparent", como no exemplo da vaca: "(define-struct vaca (x dx y dy)  #:transparent)"
	
RECOMENDO TAMBÉM UTILIZAREM O GitHub PARA FAZEREM O TRABALHO EM CONJUNTO E EU PODER ACOMPANHAR. BASTA ABRIR UM FORK DO PROJETO INICIAL: 



--- INSTRUÇÕES PARA ENTREGA ---

O Trabalho deverá ser entregue até a data marcada, até 23:59, por e-mail. Vocês deverão criar um pacote .zip com os arquivos do projeto com o nome da dupla, dessa maneira: Fulano_Beltrano.zip. Caso faça sozinho, coloque somente seu nome.

