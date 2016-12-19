; Este arquivo deve conter as definições das funções do jogo (com exceção da main).
; As definições devem incluir assinatura, propósito, protótipo e templates utilizados.

#lang racket

(require 2htdp/image)
(require 2htdp/universe)
(provide (all-defined-out)) ;permite que outros arquivos importem deste
(require "constantes.rkt") ;importa as constantes definidas no arquivo "constantes.rkt"
(require "dados.rkt") ;importa as definições de dados definidas no arquivo "dados.rkt"

;; Funções:
;; INICIO DA PARTE LÓGICA DO JOGO
;; Colisao-tiros-bruxas? : ListaDeTiro ListaDeBruxas -> (list Tiro Bruxa) | false
;; verifica se tiros acertaram bruxas

(define (colisao-tiros-bruxas? ldt ldb)
  (local
    [
     (define (colisao-tiro-bruxa? t b)       
       (if (<= (distancia (tiro-x t) (tiro-y t)
                          (bruxa-x b) (bruxa-y b))
               (+ MEIO-W-TIRO MEIO-W-ARMA))
           (list t b)
           #false))

     (define (cria-pares item lista) 
       (map (lambda (item2) (list item item2)) lista))

     (define (produto-cartesiano list1 list2)
       (cond [(empty? list1) empty]
             [else
              (append (cria-pares (first list1) list2)
                      (produto-cartesiano (rest list1) list2))]))

     (define busca 
       (memf (lambda (par) (colisao-tiro-bruxa? (first par) (second par))) 
           (produto-cartesiano ldt ldb)))
     
     ]
    (if (false? busca)
        #false
        (first busca)))) 
;;********************************************
;; Colisao-tiros-morcegos? : ListaDeTiro ListaDeMorcegos -> (list Tiro Morcego) | false
;; verifica se tiros acertaram morcegos

(define (colisao-tiros-morcegos? ldt ldm) 
  (local
    [
     (define (colisao-tiro-morcego? t m)       
       (if (<= (distancia (tiro-x t) (tiro-y t)
                          (morcego-x m) (morcego-y m))
               (+ MEIO-W-TIRO MEIO-H-MOR))
           (list t m)
           #false))

     (define (cria-pares item lista)
       (map (lambda (item2) (list item item2)) lista))

     (define (produto-cartesiano list1 list2)
       (cond [(empty? list1) empty]
             [else
              (append (cria-pares (first list1) list2)
                      (produto-cartesiano (rest list1) list2))]))

     (define busca
       (memf (lambda (par) (colisao-tiro-morcego? (first par) (second par)))
             (produto-cartesiano ldt ldm)
            ))
     
     ]
    (if (false? busca)
        #false
        (first busca)))) 
;;*********************************************
;; colisao-tiros-corvos? : ListaDeTiro ListaCorvos -> (list Tiro Corvo) | false
;; verifica se tiros acertaram corvos

(define (colisao-tiros-corvos? ldt ldc) 
  (local
    [
     (define (colisao-tiros-corvos? t c)       
       (if (<= (distancia (tiro-x t) (tiro-y t)
                          (corvo-x c) (corvo-y c))
               (+ MEIO-W-TIRO MEIO-H-COR))
           (list t c)
           #false))

     (define (cria-pares item lista)
       (map (lambda (item2) (list item item2)) lista))

     (define (produto-cartesiano list1 list2)
       (cond [(empty? list1) empty]
             [else
              (append (cria-pares (first list1) list2)
                      (produto-cartesiano (rest list1) list2))]))

     (define busca
       (memf (lambda (par) (colisao-tiros-corvos? (first par) (second par)))
           (produto-cartesiano ldt ldc)))
     
     ]
    (if (false? busca)
        #false
        (first busca))))
;;***************************************************
;; colisao-tiros-fadas? : ListaDeTiro ListaFadas -> (list Tiro Fadas) | false
;; verifica se tiros acertaram fadas

(define (colisao-tiros-fadas? ldt ldf) 
  (local
    [
     (define (colisao-tiros-fadas? t f)       
       (if (<= (distancia (tiro-x t) (tiro-y t)
                          (fada-x f) (fada-y f))
               (+ MEIO-W-TIRO MEIO-H-FAD))
           (list t f)
           #false))

     (define (cria-pares item lista)
       (map (lambda (item2) (list item item2)) lista))

     (define (produto-cartesiano list1 list2)
       (cond [(empty? list1) empty]
             [else
              (append (cria-pares (first list1) list2)
                      (produto-cartesiano (rest list1) list2))]))

     (define busca
       (memf (lambda (par) (colisao-tiros-fadas? (first par) (second par)))
           (produto-cartesiano ldt ldf)))
     
     ]
    (if (false? busca)
        #false
        (first busca))))
;;***************************************************
;; proxima-arma :ARMA ->ARMA
;; recebe uma arma na posicao x e retorna uma arma com posição
;; x atualizada com o dx

;(define (proxima-arma a) a)

(define (proxima-arma a)
  (cond
    [(> (arma-x a) LIMITE-DIREITO)
     (make-arma LIMITE-DIREITO (- (arma-dx a))
                      (arma-y a))]
    [(< (arma-x a) LIMITE-ESQUERDO) 
     (make-arma LIMITE-ESQUERDO (- (arma-dx a))
                      (arma-y a))]
   
    [else
     (make-arma (+ (arma-x a) (arma-dx a)) (arma-dx a)
                      (arma-y a))]))  
;;********************************************
;; proximo-morcego : Morcego -> Morcego
;; recebe uma morcego na posicao x e retorna uma morcego com posição
;; x atualizada com o dx
 
;(define (proximo-morcego m) m)
(define (proximo-morcego m)
  (cond 
        [(> (morcego-x m) LIMITE-DIR-MOR)
         (make-morcego LIMITE-DIR-MOR (- (morcego-dx m)) (morcego-y m))] 
        [(< (morcego-x m) 0)
         (make-morcego 0 (- (morcego-dx m))(morcego-y m))]
        [else
         (make-morcego (+ (morcego-x m) (morcego-dx m))
             (morcego-dx m)(morcego-y m))])
 )
;;********************************************
;; proxima-bruxa : Bruxa -> Bruxa
;; faz bruxa andar no eixo x, e se trombar nos limites,
;; inverte dx
;; (define (proxima-bruxa b) b)

(define (proxima-bruxa b)
  (cond
    [(> (bruxa-x b) LIMITE-DIREITO)
     (make-bruxa LIMITE-DIREITO (- (bruxa-dx b))
                      (bruxa-y b) (bruxa-dy b) )]
    [(< (bruxa-x b) LIMITE-ESQUERDO)
     (make-bruxa LIMITE-ESQUERDO (- (bruxa-dx b))
                      (bruxa-y b) (bruxa-dy b) )] 
    [else
     (make-bruxa (+ (bruxa-x b) (bruxa-dx b)) (bruxa-dx b) 
                      (bruxa-y b) (bruxa-dy b) )]))

;*******************************************
;; proximo-corvo : Corvo -> Corvo
;; recebe uma corvo na posicao x e retorna uma corvo com posição
;; x atualizada com o dx
;(define (proxima-corvo c) c)

(define (proximo-corvo c)
  (cond 
        [(> (corvo-x c) LIMITE-DIR-COR)
         (make-corvo LIMITE-DIR-COR (- (corvo-dx c)) (corvo-y c))]
         [(< (corvo-x c) 0)
         (make-corvo 0 (- (corvo-dx c))(corvo-y c))]
        [else
         (make-corvo (+ (corvo-x c) (corvo-dx c)) 
             (corvo-dx c)(corvo-y c))])
 ) 
;;********************************************
;; proxima-fada : Fada -> Fada
;; recebe uma fada na posicao x e retorna uma fada com posição
;; x atualizada com o dx
;(define (proxima-fada f) f)

(define (proxima-fada f)
  (cond 
        [(> (fada-x f) LIMITE-DIR-FAD)
         (make-fada LIMITE-DIR-FAD (- (fada-dx f)) (fada-y f))]
         [(< (fada-x f) 0)
         (make-fada 0 (- (fada-dx f))(fada-y f))]
        [else
         (make-fada (+ (fada-x f) (fada-dx f)) 
             (fada-dx f)(fada-y f))])
 )
;;********************************************
;; proximas-bruxas : ListaDeBruxa -> ListaDeBruxa
;; proximas bruxas
;; (define (proximas-bruxas ldb) ldb)

 (define (proximas-bruxas ldb) 
  (map proxima-bruxa ldb))
;;*******************************************
;; proximos-morcegos : ListaDeMorcegos -> ListaDeMorcegos
;; proximos morcegos
;;(define (proximos-morcegos ldm) ldm)

 (define (proximos-morcegos ldm) 
  (map proximo-morcego ldm))

;;*******************************************
;; proximos-corvos : ListaDeCorvos -> ListaDeCorvos
;; proximos-corvos
;;(define (proximos-corvos ldc) ldc)

 (define (proximos-corvos ldc) 
  (map proximo-corvo ldc))
;;*******************************************
;; proximas-fadas : ListaDeFadas -> ListaDeFadas
;; proximas-fadas
;;(define (proximas-fadas ldf) ldf)

 (define (proximas-fadas ldf) 
  (map proxima-fada ldf))

;;*******************************************
;; distancia : Numero Numero Numero Numero -> Numero
;; calcula distancia
(define (distancia x1 y1 x2 y2)
  (sqrt (+ (sqr (- x2 x1)) (sqr (- y2 y1)))))
;;*******************************************
 ;; proximo-tiro : Tiro -> Tiro
 ;;;; recebe proximo tiro
 ;;define (proximo-tiro t) t)

 (define (proximo-tiro t)
  (make-tiro (tiro-x t) (- (tiro-y t) 20) (tiro-dy t)))
;;*******************************************
;; proximos-tiros : Tiros -> Tiros
;; recebe uma lista de tiros
;;(define (proximos-tiros ldt) ldt)

 (define (proximos-tiros ldt)
  (filter (lambda (t) (and (<= (tiro-y t) ALTURA-CENARIO) (>= (tiro-y t) 0)))  
          (map proximo-tiro ldt)))

;;*******************************************
;; proximo-jogo : Jogo -> Jogo
;; atualiza o jogo
; (define (proximo-jogo j)  j)

(define (proximo-jogo j) 
  (local 
    [
     (define surgi? (= (jogo-tsurgi j) 0))
     (define acertou-bruxa? (colisao-tiros-bruxas? (jogo-tiros j) (jogo-bruxas j)))
     (define acertou-morcego? (colisao-tiros-morcegos? (jogo-tiros j) (jogo-morcegos j)))     
     (define acertou-corvo? (colisao-tiros-corvos? (jogo-tiros j) (jogo-corvos j)))
     (define surgif? (= (jogo-tsurgif j) 0))
     (define acertou-fada? (colisao-tiros-fadas? (jogo-tiros j) (jogo-fadas j)))
     ]

   (make-jogo (proxima-arma (jogo-arma j))
                   (cond
                     [surgi? 
                          (surgi-bruxa (proximas-bruxas (jogo-bruxas j)))]
                     [(list? acertou-bruxa?)
                          (proximas-bruxas 
                           (remove (second acertou-bruxa?) (jogo-bruxas j)))
                          ]                           
                     [else
                      (proximas-bruxas (jogo-bruxas j))])
                   (cond
                     [surgi? 
                          (surgi-morcego (proximos-morcegos (jogo-morcegos j)))]
                     [(list? acertou-morcego?)
                          (proximos-morcegos
                           (remove (second acertou-morcego?) (jogo-morcegos j)))]                          
                     [else
                      (proximos-morcegos (jogo-morcegos j))])
                   (cond
                     [surgi? 
                          (surgi-corvo (proximos-corvos (jogo-corvos j)))]
                     [(list? acertou-corvo?)
                          (proximos-corvos
                           (remove (second acertou-corvo?) (jogo-corvos j)))]                          
                     [else
                      (proximos-corvos (jogo-corvos j))])
                   (cond
                     [surgif? 
                          (surgif-fada (proximas-fadas (jogo-fadas j)))]
                     [(list? acertou-fada?)
                          (proximas-fadas
                           (remove (second acertou-fada?) (jogo-fadas j)))]                           
                     [else
                      (proximas-fadas (jogo-fadas j))])
                   
                   (cond [(list? acertou-fada?) 
                          #true 
                          ]
                     [else (jogo-game-over? j)])                     
                   
                   (remainder (+ (jogo-tsurgi j) 1) 40)  
                   (if (list? acertou-bruxa?) 
                       (proximos-tiros
                        (remove (first acertou-bruxa?) (jogo-tiros j)))   
                       (proximos-tiros (jogo-tiros j)))
                       (remainder (+ (jogo-tsurgif j) 1) 200)))) 

;;*******************************************
;; surgi-bruxa : ListaDeBruxa -> ListaDeBruxa
;; cria novo bruxa no local especificado
  
 (define (surgi-bruxa ldb)
  (cons (make-bruxa X-SURGIR (random 50) (random 250) (random 100)) ldb))
;;*******************************************
;; surgi-morcego : ListaDeMorcegos -> ListaDeMorcegos
;; cria novo morcego no local especificado

 (define (surgi-morcego ldm)
  (cons (make-morcego X-SURGIR (random 30) (random 40)) ldm))
;;*******************************************
;; surgi-corvo : ListaDeCorvos -> ListaDeCorvos
;; cria novo corvo no local especificado

 (define (surgi-corvo ldc)
  (cons (make-corvo X-SURGIR (random 50) (random 400)) ldc))
;;*******************************************
;; surgi-fada : ListaDeFadas -> ListaDeFadas
;; cria novo fada no local especificado

 (define (surgif-fada ldf)
  (cons (make-fada X-SURGIR (random 10) (random 300)) ldf))
 ;; FIM DA PARTE LÓGICA
;;==============================================================================================================================            
;; INICIO DA PARTE VISUAL
;; desenha-jogo : Jogo -> Image 
;; desenha o jogo

 (define (desenha-jogo j)
   (cond [ (jogo-game-over? j)
           GAME-OVER]
  [else (overlay
   (desenha-tiros (jogo-tiros j))
   (desenha-bruxas (jogo-bruxas j))
   (desenha-morcegos (jogo-morcegos j))   
   (desenha-corvos (jogo-corvos j))
   (desenha-fadas (jogo-fadas j))
   (desenha-arma (jogo-arma j)))]))
;;*******************************************
;; Desenha-morcego: Morcego -> Image
;; retorna a representação do cenário com a morcego
 (define (desenha-morcego m)
  (place-image 
   (if (< (morcego-dx m) 0)
       IMG-MOR-VOLTANDO
       IMG-MOR-INO)
   (morcego-x m)
  (random 60)
   CENARIO)
  )
;;*******************************************
;; desenha-morcegos : ListaDeMorcegos -> Image
;; desenha morcegos
 (define (desenha-morcegos ldm)
  (foldl overlay CENARIO (map desenha-morcego ldm))) 
;;*******************************************
;; desenha-bruxa : Bruxa -> Image
;; desenha o bruxa
 (define (desenha-bruxa b)
  (place-image
  (if (< (bruxa-dx b) 1)
     IMG-BRUXA-VOLTANDO
     IMG-BRUXA-INO)
  (bruxa-x b)
  (bruxa-y b)
  CENARIO))
;;*******************************************
;; desenha-bruxas : ListaDeBruxa -> Image
;; desenha bruxas
 (define (desenha-bruxas ldb)
  (foldl overlay CENARIO (map desenha-bruxa ldb))) 
;;*******************************************
;; Desenha-corvo: Corvo -> Image
;; retorna a representação do cenário com a corvo

(define (desenha-corvo c)
  (place-image
   (if (< (corvo-dx c) 0) 
       IMG-CORVO-VOLTANDO
       IMG-COR-INO)
   (corvo-x c) 
   (corvo-y c)
     CENARIO)
  )
;;*******************************************
;; Desenha-fada: fada -> Image
;; retorna a representação do cenário com a fada

(define (desenha-fada f)
  (place-image
   (if (< (fada-dx f) 0) 
       IMG-FAD-VOLTANDO
       IMG-FAD-INO)
   (fada-x f) 
   (fada-y f)
     CENARIO)
  )
;;*************************************************
;; desenha-corvos : ListaDecorvos -> Image
;; desenha corvos
 (define (desenha-corvos ldc)
  (foldl overlay CENARIO (map desenha-corvo ldc)))
;;*************************************************
;; desenha-fadas : ListaDefadas -> Image
;; desenha fadas
 (define (desenha-fadas ldf)
  (foldl overlay CENARIO (map desenha-fada ldf))) 
;;************************************************
;; desenha-tiro : Tiro -> Image
;; desenha o tiro
 (define (desenha-tiro t) 
  (place-image IMG-TIRO (tiro-x t) (tiro-y t) CENARIO))
;;*******************************************
;; desenha-tiros : ListaDeTiros -> Image
;; desenha tiross
 (define (desenha-tiros ldt)
  (foldl overlay CENARIO (map desenha-tiro ldt)))
;;*******************************************
;; desenha-arma: arma -> Image
;; retorna a representação do cenário com a arma
#;
(define (fn-para-arma a)
  (... (arma-x v) (arma-dx a)
       (arma-y a))
  )

(define (desenha-arma a) 
  (place-image
            (if (< (arma-dx a) 0)
                IMG-ARMA-VOLTANDO
                IMG-ARMA-INO)
   (arma-x a)
   (arma-y a)
   TELA-JOGO)   
  )

;; FIM DA PARTE VISUAL
;;=============================================================================================================================
;; INICIO DA LOGICA DE INTERAÇÃO

;; trata-tecla : Jogo KeyEvent -> Jogo
;; trata tecla usando trata-tecla-arma
(define (trata-tecla j ke)
  (cond
    [(and (jogo-game-over? j) (key=? ke "\r"))
         JOGO-INICIAL-SURGINDO]
    [(key=? ke " ") 
     (make-jogo
           (trata-tecla-arma (jogo-arma j) ke) 
           (jogo-bruxas j)
           (jogo-morcegos j)
           (jogo-corvos j)
           (jogo-fadas j)
           (jogo-game-over? j)
           (jogo-tsurgi j)
           (cons (make-tiro (arma-x (jogo-arma j))                           
                            (arma-y (jogo-arma j))
                            0)
                 (jogo-tiros j)
                 )
           (jogo-tsurgif j)
           )]
    [else (make-jogo
           (trata-tecla-arma (jogo-arma j) ke)
           (jogo-bruxas j)
           (jogo-morcegos j)
           (jogo-corvos j)
           (jogo-fadas j)
           (jogo-game-over? j)
           (jogo-tsurgi j)
           (jogo-tiros j)
           (jogo-tsurgif j) 
           )]))
;;*******************************************
;; trata-tecla-arma: arma KeyEvent -> arma
;; quando tecla seta é pressionada, arma deve inverter direção(x)
;;(define (trata-tecla-arma a ke) a)

(define (trata-tecla-arma a ke)
  (cond [(key=? ke "right")
         (make-arma (arma-x a) D-ARMA-DEFAULT (arma-y a))]
        [(key=? ke "left")
         (make-arma (arma-x a) (- D-ARMA-DEFAULT) (arma-y a))]
        [else a])) 

(define (trata-tecla-release j ke)
  (make-jogo
    (trata-tecla-arma-release (jogo-arma j) ke) 
    (jogo-bruxas j)
    (jogo-morcegos j)
    (jogo-corvos j)
    (jogo-fadas j) 
    (jogo-game-over? j)    
    (jogo-tsurgi j)
    (jogo-tiros j)
    (jogo-tsurgif j)
    ))

(define (trata-tecla-arma-release a ke)
  (if (member ke (list "right" "left"))
      (make-arma (arma-x a) 0 (arma-y a)) 
      a)) 
;;*******************************************  
;; Numero Numero Numero Numero -> Numero
; Calcula angulo entre 2 pontos
(define (calcula-angulo x1 y1 x2 y2)  
  (radians->degrees (atan (- y2 y1) (- x2 x1))))   

(define (inverte-y y)
  (- ALTURA-CENARIO y))  ;INVERTER Y PARA OS CALCULOS FICAREM DE ACORDO COM O PRIMEIRO QUADRANTE DO PLANO CARTESIANO
;;*******************************************
;; FIM DA LOGICA DE INTERAÇÃO 