#lang whalesong

;;Arquivo funções do jogo.
(require whalesong/image)
(require whalesong/world)
(require "constantes.rkt")  ;inclui arquivo de constantes.rkt
(require "dados.rkt")       ;inclui arquivo dados.rkt
(provide (all-defined-out)) ;permite que outros arquivos importem deste


;; Bola -> Bola
;;Move Bola DX passos no X e DY passos no Y
;(define (proxima-bola b) (make-bola 50 5 60 0))  ;;stub
(define (proxima-bola b)
  (local [
  (define proximo-x
    (+ (bola-x b) (bola-dx b)))  ;;Soma X + DX da Bola atual
  (define proximo-y
    (+ (bola-y b) (bola-dy b)))  ;;Soma Y + DY da Bola atual
  (define colisao-campo-dir?      ;;bola ultrapassa limite esquerda
    (>= proximo-x LIMITE-CAMPO-DIR))
  (define colisao-campo-esq?      ;;bola ultrapassa limite direita
    (<= proximo-x LIMITE-CAMPO-ESQ))
  (define colisao-campo-cima?     ;;bola ultrapassa limite cima
    (<= proximo-y LIMITE-CAMPO-CIMA))
  (define colisao-campo-baixo?    ;;bola ultrapassa limite baixo
    (>= proximo-y LIMITE-CAMPO-BAIXO)) ]
    
  (cond [(bola-livre? b)
      (cond 
        [colisao-campo-dir?  ;;INVERTE SINAL DX Ex:(Bola dx 5) -> (Bola dx -5)
         (make-bola LIMITE-CAMPO-DIR (- (bola-dx b)) (bola-y b)
                                        (bola-dy b) (bola-livre? b))]
        [colisao-campo-esq?  ;;inverte sinal DX da bola
         (make-bola LIMITE-CAMPO-ESQ (- (bola-dx b)) (bola-y b)
                                        (bola-dy b) (bola-livre? b))]
        [colisao-campo-cima? ;;inverte sinal DY da bola
         (make-bola (bola-x b) (bola-dx b) LIMITE-CAMPO-CIMA 
                    (- (bola-dy b)) (bola-livre? b))]
        [colisao-campo-baixo?;;inverte sinal DY da bola
         (make-bola (bola-x b) (bola-dx b) LIMITE-CAMPO-BAIXO
                    (- (bola-dy b)) (bola-livre? b))]
        [else
         (make-bola proximo-x (bola-dx b) proximo-y (bola-dy b)
                    (bola-livre? b))])]
  [else ;;bola nao esta livre
   (make-bola (bola-x b) (bola-dx b) (bola-y b) (bola-dy b) #f)]
  )))


;; Jogador -> Jogador
;;Move Jogador DX passos no eixo X e DY passos no eixo Y
;(define proximo-jogador (make-jogador 270 5 200 0 #f #f)); stub
(define (proximo-jogador j)
  (local [
  (define proximo-x
    (+ (jogador-x j) (jogador-dx j)))
  (define proximo-y
    (+ (jogador-y j) (jogador-dy j)))
  (define colisao-campo-dir?      ;;jogador ultrapassa limite esquerda
    (>= proximo-x LIMITE-CAMPO-DIR))
  (define colisao-campo-esq?      ;;jogador ultrapassa limite direita
    (<= proximo-x LIMITE-CAMPO-ESQ))
  (define colisao-campo-cima?     ;;jogador ultrapassa limite cima
    (<= proximo-y LIMITE-CAMPO-CIMA))
  (define colisao-campo-baixo?    ;;jogador ultrapassa limite baixo
    (>= proximo-y LIMITE-CAMPO-BAIXO)) ]
  
  (cond [colisao-campo-dir?
         (make-jogador LIMITE-CAMPO-DIR (- (jogador-dx j)) (jogador-y j)
                                        (jogador-dy j) (jogador-comABola? j) (jogador-maisProximo? j))]
        [colisao-campo-esq?
         (make-jogador LIMITE-CAMPO-ESQ (- (jogador-dx j)) (jogador-y j)
                                        (jogador-dy j) (jogador-comABola? j) (jogador-maisProximo? j))]
        [colisao-campo-cima?
         (make-jogador (jogador-x j) (jogador-dx j) LIMITE-CAMPO-CIMA 
                    (- (jogador-dy j)) (jogador-comABola? j) (jogador-maisProximo? j))]
        [colisao-campo-baixo?
         (make-jogador (jogador-x j) (jogador-dx j) LIMITE-CAMPO-BAIXO
                    (- (jogador-dy j)) (jogador-comABola? j) (jogador-maisProximo? j))]
        [else
         (make-jogador proximo-x (jogador-dx j) proximo-y (jogador-dy j)
                    (jogador-comABola? j) (jogador-maisProximo? j))])
))

(define (proximos-jogadores ldj)
  (map proximo-jogador ldj))



;; Jogo KeyEvent -> Jogo
;; Manipula eventos do teclado
(define (trata-tecla jogo ke)
  (make-jogo
   (trata-tecla-jogador jogo ke)
   (jogo-jogadores2 jogo)
;   (trata-tecla-jogador (first (jogo-jogadores jogo)) ke)
   (trata-tecla-bola (jogo-bola jogo) (first(jogo-jogadores jogo)) ke)
   (jogo-acabou? jogo)
))

;; Bola KeyEvent -> Bola
;; Quando espaço for pressionado(L) ganha velocidade do jogador
(define (trata-tecla-bola b j ke)
  (cond [(and (not(bola-livre? b)) (key=? ke "l"))
         (make-bola (+ (bola-x b)70) (*(jogador-dx j) 2) (+ (bola-y b) 70) (* (jogador-dy j) 2) #t)]
  [else b]))

;; Jogador KeyEvent -> Jogador
;; Quando espaço for pressionado mude direcao dx para -dx
;(define (trata-tecla v ke) (make-vaca 0 0))
(define (trata-tecla-jogador j ke)
  (define mais-proximo
    (jogador-mais-proximo-bola (jogo-jogadores j) (jogo-bola j)))
  (define lista-sem-proximo (remove mais-proximo (jogo-jogadores j)))
  
  (cond [(key=? ke "w") 
         (append (list (make-jogador (jogador-x mais-proximo) (jogador-dx mais-proximo) (jogador-y mais-proximo) -5
                       (jogador-comABola? mais-proximo) (jogador-maisProximo? mais-proximo)))
                 lista-sem-proximo)]
        [(key=? ke "s")
         (append (list (make-jogador (jogador-x mais-proximo) (jogador-dx mais-proximo) (jogador-y mais-proximo) 5
                       (jogador-comABola? mais-proximo) (jogador-maisProximo? mais-proximo)))
                 lista-sem-proximo)]
        [(key=? ke "a")
         (append (list (make-jogador (jogador-x mais-proximo) -5 (jogador-y mais-proximo) (jogador-dy mais-proximo)
                       (jogador-comABola? mais-proximo) (jogador-maisProximo? mais-proximo)))
                 lista-sem-proximo)]
        [(key=? ke "d")
         (append (list (make-jogador (jogador-x mais-proximo) 5 (jogador-y mais-proximo) (jogador-dy mais-proximo)
                       (jogador-comABola? mais-proximo) (jogador-maisProximo? mais-proximo)))
                 lista-sem-proximo)]
        [(key=? ke "p")
         (append (list (make-jogador (jogador-x mais-proximo) 0 (jogador-y mais-proximo) 0
                       (jogador-comABola? mais-proximo) (jogador-maisProximo? mais-proximo)))
                 lista-sem-proximo)]
        [else (append (list mais-proximo) lista-sem-proximo)]))

;; Jogo -> Jogo
;; Retorna o próximo estado do jogo
;(define (proximo-jogo j)
  ;(make-jogo (proximo-jogador (jogo-jogador j)) BOLA-NICIAL #f)) ;stub
(define (proximo-jogo j)
  (local
    [
     (define possiveis-prox-jogadores
       (proximos-jogadores (jogo-jogadores j)))
     (define possiveis-prox-jogadores2
       (proximos-jogadores (jogadores2-persegue-bola j)))
     (define possivel-prox-bola
       (proxima-bola (jogo-bola j)))
     ]
  (cond 
;    [(colisao-jogador-bola? (jogo-jogador j) (jogo-bola j))
;         (make-jogo (proximo-jogador(jogo-jogador j))
;                    (make-bola (jogador-x(jogo-jogador j)) (jogador-dx(jogo-jogador j)) (jogador-y(jogo-jogador j))
;                               (jogador-dy(jogo-jogador j)) #f)
;                    #f
;                    )]
    [(colisao-bola-todos-jogadores? j)
     (make-jogo possiveis-prox-jogadores
                possiveis-prox-jogadores2
                ;(bola-colidida(jogo-jogadores j)(jogo-bola j))
                (proxima-bola (bola-colidida-todos j))
                (jogo-acabou? j))]
 
         
        [else 
         (make-jogo possiveis-prox-jogadores
                    ;(jogadores2-persegue-bola j)
                    possiveis-prox-jogadores2
                    possivel-prox-bola
                    (jogo-acabou? j)
                    )]
        )))
  
;; Numero, Numero, Numero, Numero -> Numero
;; retorna a distancia entre os dois pontos 
;; (define (soma-cartesiana x y) (+ (dobro x) (dobro y))
(define (distancia-cartesiana x1 y1 x2 y2)
  (local 
    [(define (quadrado x)
      (* x x ))]
  (sqrt ( + (quadrado (- x2 x1)) (quadrado (- y2 y1))))))

(define (colisao-jogador-bola? j b)
  (local
    [(define distancia 
       (distancia-cartesiana 
             (jogador-x j) (jogador-y j) (bola-x b) (bola-y b)))
     ]
    (<= distancia (+ METADE-JOGADOR METADE-BOLA))))


;; DISTANCIA COM LISTA
;; ListaDeJogadores Bola -> Jogador
;; Recebe a lista dos jogadores e a bola, retornando o jogador mais próximo da bola
(define (jogador-mais-proximo-bola jogadores bola)
  (local
    [
     (define (distancia-jogador-bola jogador)
       (distancia-cartesiana (jogador-x jogador) (jogador-y jogador)
                             (bola-x bola) (bola-y bola)))
     ]
  (argmin distancia-jogador-bola jogadores)))

;(define (desenha-mundo j)
;  (cond [(>= (jogador-dx(first ldj) j) 0)
;         (place-image IMG-JOGADOR (jogador-x j) (jogador-y j) CENARIO)]
;        [else
;         (place-image IMG-BOLA (jogador-x j) (jogador-y j) CENARIO)]
;  ))



(define (desenha-jogo j)
  (place-image IMG-BOLA (bola-x (jogo-bola j))
               (bola-y (jogo-bola j))
               (desenha-todos-jogadores j)))


;; Jogador -> Image
;; Desenha o cenário com o jogador
;(define (desenha-mundo j) empty-image) ;STUB
(define (desenha-jogador j)
  (cond [(>= (jogador-dx j) 0)
         (place-image IMG-JOGADOR-DIREITA (jogador-x j) (jogador-y j) CENARIO)]
        [else
         (place-image IMG-JOGADOR-ESQUERDA (jogador-x j) (jogador-y j) CENARIO)]
  ))


;; ListaDeJogadores -> Imagem
;; Desenha o cenario com jogadores
;;(define (desenha-jogadores ldj) empty-image) stub;
(define (desenha-todos-jogadores jogo)
   (local [
           (define lista1 (jogo-jogadores jogo))
           (define lista2 (jogo-jogadores2 jogo))]
     (desenha-jogadores lista1 lista2)))
 ;        (define mais-proximo
  ;         (jogador-mais-proximo-bola (jogo-jogadores j) (jogo-bola j)))] 
;  (local [
;    (define jogador-parado?
;    (= (jogador-dx (first ldj)) 0))
;  (define jogador-correndo-direita?
;    (> (jogador-dx (first ldj)) 0))
;  (define jogador-correndo-esquerda?
;    (< (jogador-dx (first ldj)) 0)) ]
(define (desenha-jogadores lista1 lista2)
  (cond [(empty? lista1) (desenha-jogadores2 lista2) ]
;        [(= (mais-proximo) (first ldj))
           
        [(= (jogador-dx (first lista1)) 0)
         (place-image IMG-JOGADOR-PARADO
                      (jogador-x (first lista1)) (jogador-y(first lista1))
                      (desenha-jogadores (rest lista1) lista2))]
        [(> (jogador-dx (first lista1)) 0)
         (place-image IMG-JOGADOR-DIREITA
                      (jogador-x (first lista1)) (jogador-y (first lista1))
                      (desenha-jogadores (rest lista1) lista2))]
        [(< (jogador-dx (first lista1)) 0)
         (place-image IMG-JOGADOR-ESQUERDA
                       (jogador-x (first lista1)) (jogador-y(first lista1))
                       (desenha-jogadores (rest lista1) lista2))]
))
(define (desenha-jogadores2 ldj)
;  (local [
 ;        (define mais-proximo
  ;         (jogador-mais-proximo-bola (jogo-jogadores j) (jogo-bola j)))] 
;  (local [
;    (define jogador-parado?
;    (= (jogador-dx (first ldj)) 0))
;  (define jogador-correndo-direita?
;    (> (jogador-dx (first ldj)) 0))
;  (define jogador-correndo-esquerda?
;    (< (jogador-dx (first ldj)) 0)) ]
    
  (cond [(empty? ldj) CENARIO]
;        [(= (mais-proximo) (first ldj))
           
        [(= (jogador-dx (first ldj)) 0)
         (place-image IMG2-JOGADOR-PARADO
                      (jogador-x (first ldj)) (jogador-y(first ldj))
                      (desenha-jogadores2 (rest ldj)))]
        [(> (jogador-dx (first ldj)) 0)
         (place-image IMG2-JOGADOR-DIREITA
                      (jogador-x (first ldj)) (jogador-y (first ldj))
                      (desenha-jogadores2 (rest ldj)))]
        [(< (jogador-dx (first ldj)) 0)
         (place-image IMG2-JOGADOR-ESQUERDA
                       (jogador-x (first ldj)) (jogador-y(first ldj))
                       (desenha-jogadores2 (rest ldj)))]
))


;; ListaDeJogadores Bola -> Booleano
;; Verifica se há colisão da bola com algum jogador
;; ListaDeJogadores Bola -> Booleano
(define (colisao-bola-todos-jogadores? jogo)
   (local [
           (define lista1 (jogo-jogadores jogo))
           (define lista2 (jogo-jogadores2 jogo))
           (define bola (jogo-bola jogo))]
     (colisao-bola-algum-jogador? lista1 lista2 bola)))

(define (colisao-bola-algum-jogador? lista1 lista2 bola)
  (cond [(empty? lista1) (colisao-bola-algum-jogador2? lista2 bola)]
        [else (if (colisao-jogador-bola? (first lista1) bola)
                  #t 
                  (colisao-bola-algum-jogador? (rest lista1) lista2 bola))]))

(define (colisao-bola-algum-jogador2? lista2 bola)
  (cond [(empty? lista2) #f]
        [else (if (colisao-jogador-bola? (first lista2) bola)
                  #t 
                  (colisao-bola-algum-jogador2? (rest lista2) bola))]))

;; Retorna a bola, colidida com algum jogador da lista
;; ListaDeJogadores Bola -> Bola
(define (bola-colidida-todos jogo)
   (local [
           (define lista1 (jogo-jogadores jogo))
           (define lista2 (jogo-jogadores2 jogo))
           (define bola (jogo-bola jogo))]
     (bola-colidida lista1 lista2 bola)))
     
(define (bola-colidida lista1 lista2 bola)
  (cond [(empty? lista1) (bola-colidida2 lista2 bola)]
        [else (if (colisao-jogador-bola? (first lista1) bola)
                  (make-bola (jogador-x (first lista1)) (jogador-dx (first lista1))
                             (jogador-y (first lista1)) (jogador-dy (first lista1))
                             #f)
                  (bola-colidida (rest lista1) lista2 bola)
                  )]))

(define (bola-colidida2 lista2 bola)
  (cond [(empty? lista2) bola]
        [else (if (colisao-jogador-bola? (first lista2) bola)
                  (make-bola (jogador-x (first lista2)) (jogador-dx (first lista2))
                             (jogador-y (first lista2)) (jogador-dy (first lista2))
                             #f)
                  (bola-colidida2 (rest lista2) bola)
                  )]))

;;ListaDeJogadores2 -> ListaDeJogadores2
;Função retorna ListaDeJogadores2 com o JogadorMaisProximo da bola indo na direção da bola
(define (jogadores2-persegue-bola j)
  (local [
          (define mais-proximo
            (jogador-mais-proximo-bola (jogo-jogadores2 j) (jogo-bola j)))
          (define lista-sem-proximo (remove mais-proximo (jogo-jogadores2 j)))
          (define bola(jogo-bola j))
          (define bola-acima-jogador?
            (< (bola-y bola)(jogador-y mais-proximo)))
          (define bola-abaixo-jogador?
            (> (bola-y bola)(jogador-y mais-proximo)))
          (define bola-direita-jogador?
            (> (bola-x bola)(jogador-x mais-proximo)))
          (define bola-esquerda-jogador?
            (< (bola-x bola)(jogador-x mais-proximo)))
          (define bola-quadrante1?
            (and bola-acima-jogador? bola-direita-jogador?))
          (define bola-quadrante2?
            (and bola-acima-jogador? bola-esquerda-jogador?))
          (define bola-quadrante3?
            (and bola-abaixo-jogador? bola-esquerda-jogador?))
          (define bola-quadrante4?
            (and bola-abaixo-jogador? bola-direita-jogador?))
          ]
    
    
    (cond [(colisao-jogador-bola? mais-proximo bola)
           (append (list mais-proximo) lista-sem-proximo)]    ;;JOGADOR DA LISTA 2 ESTA COM A BOLA
          
          [bola-acima-jogador?
           (append (list (make-jogador (jogador-x mais-proximo) (jogador-dx mais-proximo)
                                     (jogador-y mais-proximo) -5 
                                     (jogador-comABola? mais-proximo) #f)) lista-sem-proximo)]
          [bola-abaixo-jogador?
           (append (list (make-jogador (jogador-x mais-proximo) (jogador-dx mais-proximo)
                                     (jogador-y mais-proximo) 5 
                                     (jogador-comABola? mais-proximo) #f)) lista-sem-proximo)]
          [bola-direita-jogador?
           (append (list (make-jogador (jogador-x mais-proximo) 5
                                     (jogador-y mais-proximo) (jogador-dy mais-proximo) 
                                     (jogador-comABola? mais-proximo) #f)) lista-sem-proximo)]
          [bola-esquerda-jogador?
           (append (list (make-jogador (jogador-x mais-proximo) -5
                                     (jogador-y mais-proximo) (jogador-dy mais-proximo) 
                                     (jogador-comABola? mais-proximo) #f)) lista-sem-proximo)]
          [bola-quadrante1?
           (append (list (make-jogador (jogador-x mais-proximo) 5
                                     (jogador-y mais-proximo) -5 
                                     (jogador-comABola? mais-proximo) #f)) lista-sem-proximo)]
          
          [bola-quadrante2?
           (append (list (make-jogador (jogador-x mais-proximo) -5
                                     (jogador-y mais-proximo) -5
                                     (jogador-comABola? mais-proximo) #f)) lista-sem-proximo)]
          [bola-quadrante3?
           (append (list (make-jogador (jogador-x mais-proximo) -5
                                     (jogador-y mais-proximo) 5
                                     (jogador-comABola? mais-proximo) #f)) lista-sem-proximo)]
          [bola-quadrante4?
           (append (list (make-jogador (jogador-x mais-proximo) 5
                                     (jogador-y mais-proximo) 5
                                     (jogador-comABola? mais-proximo) #f)) lista-sem-proximo)]
          [else (append (list mais-proximo) lista-sem-proximo)]
          )))
 ;;SE COMENTAR NO COND BOLA-ABIXO-JOGADOR;
;BOLA-ACIMA-JOGADOR
;BOLA-DIREITA-JOGADOR
;BOLA-ESQUERDA-JOGADOR
;FICA DIFICIL PRA CARAMBA
