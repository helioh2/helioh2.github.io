TRABALHO DE OFICINA DE COMPUTAÇÃO

--- JOGO EM RACKET/SCHEME ----

(Vale 70% da nota, sendo 30% os exercícios)

Vocês podem fazer em duplas um dentre os possíveis jogos:

    Space Invaders
        Permitir múltiplos tiros seguidos no canhão
    Corrida (estilo Enduro).
        Especificações:
            Velocidade aumenta de acordo com a distância percorrida pelo carro;
            Carros adversários aparecem a uma taxa constante na tela (ou seja, podem ter vários carros inimigos na tela). Ex: carros novos sempre aparecem a cada 0,5 segundo
            Bateu perde uma vida, mas continua com velocidade diminuída. O carro terá três vidas e depois de acabadas é Game Over.
            Podem aparecer vidas no meio da estrada (a cada 10 segundos, por exemplo)
    PacMan
        Especificações:
            Pode ser feito com mapa reduzido (mostrar ao professor o desenho do mapa para ajustes)
            Fantasmas não precisam ter algum tipo de inteligência (se tiver ganha nota extra). Façam eles ficarem andando seguindo algum padrão (pra frente/trás, por exemplo) em diferentes corredores.
            Bolinhas dão pontos, e bolas maiores fazem os fantasmas ficarem assustados, permitindo comê-los
            Quando fantasma é comido, fazer voltar para uma posição inicial
    Sapinho que atravessa a rua (Frogger)
        Com diferentes fases e níveis de dificuldade
    Arkanoid
    Flappy Bird
        Pode ser com fase menor, mas acrescente obstáculos móveis (inimigos)
        Física deve ser parecida com o original (com aceleração na queda e o efeito da batida da asa)
    Bomberman
        Versão simplificada (mapa menor, inimigos sem inteligência)
        Inserir inimigos que machucam ao colidir, mas que apenas andam para frente e para trás em um corredor
        Matar os inimigos colocando as bombas
    Jogo de tiro/luta com inimigos que aparecem na tela
    Outra ideia? Apresente ao professor!!

Para quem quiser elaborar um jogo mais elaborado e que envolva matrizes, podem tentar os seguintes jogos (apresentar ideia ao professor antes). Quem fizer um dos seguintes jogos ganhará nota extra (por exemplo, se nota final for 8,0, poderá ficar com 9,0) :

    Tetris (obs: quem quiser fazer este terá acesso a um template inicial do programa)
    Minhoquinha (Snake)
    Sokoban

INSTRUÇÕES:

    1. Primeira parte:
        Escolha um jogo e apresente a ideia ao professor;
        Escreva uma especificação mais detalhada (o que o jogo vai ter?)
        Faça a análise de domínio inicial utilizando a receita Como Projetar Mundos
        Entregue ao professor a especificação e análise de domínio na data definida (abaixo).
    2. Crie um repositório Mercurial no Bitbucket para o seu projeto ou faça um fork do projeto inicial fornecido pelo professor. Todo o trabalho deverá ser feito utilizando o controle de versão. A utilização desta ferramenta contará pontos na avaliação do trabalho.
    3. Mãos ao código. Escreva o código seguindo as receitas de projeto, com base na análise de domínio realizada.
    4. Apresentação de acompanhamento: em data definida (abaixo), deverá apresentar uma versão em funcionamento básica (no mínimo 70% feito), mas ainda em desenvolvimento.
    5. Entrega e apresentação final

    OBS: Cada dupla deverá desenvolver um jogo diferente! Portanto peço que aqueles que tem preferência por um jogo específico já me informem qual desejam fazer. Acima tem sugestões de possíveis jogos que vocês podem fazer com algumas especificações mínimas (o jogo não poderá ser nem muito simples nem muito complexo, por isso deverão me apresentar a especificação e análise de domínio com antecedência).

DATAS:

DATA DA ENTREGA DA ESPECIFICAÇÃO E ANÁLISE DE DOMÍNIO: 13/11/2015

DATA DE APRESENTAÇÃO DE ACOMPANHAMENTO (MÍNIMO 70% FEITO E FUNCIONANDO BOA PARTE DAS COISAS): 15/12 e 18/12/2015

DATA DE ENTREGA E APRESENTAÇÃO FINAL: Janeiro

    A proposta deve consistir em um documento explicando o objetivo do jogo, os elementos da tela, assim como uma análise de domínio inicial (conforme receita Como Projetar Mundos)
    Na apresentação individual, cada aluno deverá explicar ao professor como o programa foi desenvolvido e responder questionamentos do professor sobre o programa.

CRITÉRIOS DE AVALIAÇÃO:

    Clareza lógica: a lógica nos programas deve ser clara.
    Utilização das receitas de projeto: as funções devem ser escritas utilizando as receitas de projeto. Todas as funções devem ter testes.
    Corretude e completude: os programas têm quer passar em todos os testes (e os testes devem estar corretos e com 100% de cobertura de código – exceto para função main / big-bang, que não precisa fazer teste unitário).
    Boas práticas de programação: o código deve estar bem escrito e organizado; os recursos da linguagem devem ser usados corretamente.
    Utilização do controle de versão: o histórico de commits será avaliado pelo professor a fim de verificar se o controle de versão foi utilizado corretamente.


--- INSTRUÇÕES DE PREPARAÇÃO DE AMBIENTE DE DESENVOLVIMENTO E USO DO MERCURIAL ---

O projeto deverá ser feito utilizando o SCV (Sistema de Controle de Versão) Mercurial hospedado no Bitbucket. Para isso o recomendado é seguir os seguintes passos:

0. Primeiro é necessário se cadastrar no Bitbucket. Cada membro da equipe deve se cadastrar. Um dos membros (o que for fazer o fork, vide passo 1) deverá compartilhar o projeto para escrita ou administrar.

1. Criar um fork. Fazer um fork (do inglês, "garfo") de um projeto é pegar um projeto de código aberto existente e copiá-lo como um projeto próprio. Assim, é possível modificá-lo como se fosse seu próprio projeto. Um outro nome para isso seria 'ramificação'. Quando você faz um fork de um projeto existente, vocês está criando uma nova ramificação dele.
	1.1 No Bitbucket, entre na página do projeto e clique em Fork. Coloque o nome da dupla em Description e deixe as demais opções como estão. Clique em 'Fork repository'. 
	1.2 Pronto! Você já criou se projeto. Explore a página do Bitbucket do seu projeto.
	1.3 Compartilhe o projeto com seu colega: No Bitbucket, no canto superior direito da página do projeto, clique em Share. Digite o nome de usuário ou email (usado no cadastro) do seu colega e clique em Add. Selecione as opções WRITE (permissão de escrita, isto é, de modificação do código, o que será obviamente necessário) ou ADMIN (além de permitir escrita, permite configurar o projeto, e.g., mudar nome e outras configurações).

2. Clone seu projeto.
	2.1 Na página do seu projeto "forkado", clique em Clone. Um comando aparecerá. Copie e cole no terminal.
		1.1.1. Se estiver usando TortoiseHg, clique com o botão direito na pasta e procure a opção Clone. Cole o endereço do projeto onde for pedido. O mesmo se aplica aos demais comandos do Mercurial: procure o equivalente na interface gráfica do TortoiseHg.
	2.2 Pronto! Seu repositório com o projeto já está em sua máquina.
3. Trabalhe no projeto
	3.1 No decorrer do projeto, é importante dar commit (consolidar) nas mudanças realizadas. Prefira dar commit sempre que você adiciona algo relevante, mesmo que seja mínimo.
		3.1.1. Primeiro, entre na pasta raiz de seu projeto e rode o comando 'hg addremove *'. Este comando fará o Mercurial considerar todas as mudanças realizadas no projeto.
		3.1.2. Em seguida, rode o comando 'hg commit -m "Mensagem de commit" -u <SeuNome>'. Este é o comando que efetivamente fará o Commit. A mensagem de commit é muito importante. Escreva nela resumidamente o que foi modificado neste último commit.
	3.2 Após dar commit, suas alterações ainda não estarão no repositório do Bitbucket. É necessário fazer um Push (empurrar, "mandar pra frente"). Para isto, logo após realizar o commit, digite o comando 'hg push'. Digite sua senha do Bitbucket. Confira se a alteração chegou no Bitbucket acessando a seção Commits do site.
4. Trabalhando em equipe
	4.1 Os commits e pushs constantes são necessários para coordenar o trabalho em equipe. Por isso, revisem o passo 3.
	4.2 Quando seu colega fez um commit e push, é necessário que você puxe suas alterações. Para isso, é necessário dar um Pull (puxar). Rode o comando 'hg pull'.
	4.3 Se não houver nenhum conflito, rode o comando 'hg update'. Pronto! As alterações do seu colega já estarão atualizadas na sua máquina e vocês estarão sincronizados.
	4.4 Se houver conflito, o Mercurial irá avisar. Será necessário fazer um Merge (mesclar). 
		4.4.1. Rode o comando 'hg merge'. Se as duas cabeças (as duas "linhas do tempo" do projeto conflitantes) não tiverem código com linhas conflitantes, o Merge será bem sucedido. Basta agora dar um Commit com uma mensagem dizendo que foi necessario fazer um merge. Enfim, dê um Push para mandar a mesclagem para o Bitbucket.
		4.4.2. Se ao rodar o comando Merge, aparecer que não foi possível mesclar e que será necessário resolver o conflito: 
			4.4.2.1. Rode o comando 'hg resolve'. Ele irá mostrar a diferença entre as duas versões conflitantes.
			4.4.2.2. Abra o arquivo do DrRacket e edite o arquivo de modo que fique a versão correta (por exemplo, se a sua versão for correta, deixe como está, se a versão do colega for a correta, coloque a versão do colega). Salve.
			4.4.2.3. Rode o comando 'hg resolve -m <nomedoarquivo>', trocando <nomedoarquivo> pelo nome do arquivo em que houve conflito.
			4.4.2.4. Dê um Commit explicando como foi resolvido o conflito, e enfim dê Push para mandar a versão resolvida para o Bitbucket.

OBS: É possível executar todas as ações (e até utilizar mais recursos visuais) por meio do TortoiseHg. No Linux, basta instalar com 'sudo apt-get install tortoisehg' e rodar (dentro da pasta do projeto) o Workbench com o comando 'thg'. No Windows é necessário baixar o instalador. É possível acessar os comandos e o Workbench clicando com o botão direito sobre a pasta do projeto.



--- INSTRUÇÕES PARA DESENVOLVIMENTO ---

Vocês podem desenvolver o programa em um único arquivo durante o desenvolvimento. No entanto, o ideal (contará mais nota) é se o trabalho final for entregue na linguagem Racket seguindo o padrão de separação dos arquivos do projeto inicial. Ou seja, a função main / big-bang deverá estar definida em "main.rkt", as demais funções do jogo (lógica e visão do jogo) deverão estar definidas em "jogo.rkt", as constantes em "constantes.rkt", as definições de tipos de dados em "dados.rkt", e os testes em "testes.rkt". Todos os arquivos já possuem um template que incluem as importações entre arquivos. 

A separação modular do programa, que deixa o código mais limpo, só é possível se o programa estiver implementado na linguagem Racket.



--- INSTRUÇÕES PARA ENTREGA ---

O Trabalho deverá ser entregue até a data marcada, até 23:59, por e-mail. Vocês deverão criar um pacote .zip com os arquivos do projeto com o nome da dupla, dessa maneira: Fulano_Beltrano.zip. Caso faça sozinho, coloque somente seu nome.

