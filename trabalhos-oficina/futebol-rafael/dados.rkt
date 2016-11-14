#lang whalesong

;;Arquivo de tipos de dados do jogo.
(require whalesong/image)
(require whalesong/world)
(require "constantes.rkt")  ;inclui arquivo de constantes.rkt
(provide (all-defined-out)) ;permite que outros arquivos importem deste

;; =================
;; Definições de dados:

;;JOGADOR;;
(define-struct jogador (x dx y dy comABola? maisProximo?) #:transparent) ;estrutura

;;Jogador é (make-jogador Numero Numero Numero Numero Booleano Booleano)
;;interp. a estrutura representa um jogador com posição x e y
  ;;no cenario
  ;;dx representa a velocidade de deslocamento no eixo X
  ;;dy representa a velocidade de deslocamento no eixo Y
  ;;ComABola? diz se ele tem a posse da bola e
  ;;MaisProximo? se ele é o mais próximo da bola

;;Exemplos
(define JOGADOR-INICIAL (make-jogador 100 0 100 0 #f #f))
(define JOGADOR-INICIAL2(make-jogador (- LIMITE-CAMPO-DIR) -5 100 0 #f #f))
(define JOGADOR-CENTRAL
  (make-jogador MEIO-DO-X 5 MEIO-DO-Y 0 #f #f))
(define JOGADOR-MEIO (make-jogador (+ LIMITE-CAMPO-ESQ 100) 0 MEIO-DO-Y 5 #f #f))
(define JOGADOR-MEIO2(make-jogador (- LIMITE-CAMPO-DIR 100) 0 MEIO-DO-Y -5 #f #f))
(define JOGADOR-EM-BAIXO (make-jogador 100 0 (- COMP 50) 0 #f #f))
(define JOGADOR-EM-BAIXO2(make-jogador (- LIMITE-CAMPO-DIR 100) -5 (- COMP 50) 0 #f #f))

(define JOGADOR11 (make-jogador 150 5 130 0 #f #f))
(define JOGADOR12 (make-jogador 120 0 420 -5 #f #f))
(define JOGADOR13 (make-jogador 260 -5 270 0 #f #f))
(define JOGADOR14 (make-jogador 420 0 210 0 #f #f))
(define JOGADOR15 (make-jogador 420 0 272 5 #f #f))

(define JOGADOR21 (make-jogador 744 0 120 5 #f #f))
(define JOGADOR22 (make-jogador 734 -5 390 0 #f #f))
(define JOGADOR23 (make-jogador 604 5 170 0 #f #f))
(define JOGADOR24 (make-jogador 530 0 350 -5 #f #f))
(define JOGADOR25 (make-jogador 500 -5 205 0 #f #f))
 
#; stub
;(define (fn-para-jogador j)
;  (... (jogador-x j)
;       (jogador-dx j
;       (jogador-y j)
;       (jogador-dy j)
;       (jogador-ComABola? j)
;       (jogador-MaisProximo? j)
;       ))


;;BOLA;;
(define-struct bola(x dx y dy livre?) #:transparent)

;;Bola é (make-bola Numero Numero Numero Numero Booleano)
;;interp. a estrutura representa a bola com posição x e y
;;e velocidade de deslocamento dx no eixo X e dy no eixo Y
  ;;x representa a posiçao no eixo X
  ;;y representa a posição no eixo Y
  ;;dx representa a velocidade de deslocamento no eixo X
  ;;dy representa a velocidade de deslocamento no eixo Y
;;Exemplos
(define BOLA-INICIAL (make-bola 200 5 100 0 #t))
(define BOLA-INICIAL2 (make-bola 115 5 100 0 #t))
(define BOLA-CENTRAL (make-bola MEIO-DO-X 0 MEIO-DO-Y 0 #t))
(define BOLA-EM-BAIXO (make-bola (- LIMITE-CAMPO-BAIXO 10) 0 MEIO-DO-Y 0 #t))
(define BOLA1 (make-bola MEIO-DO-X 0 (- ALTURA 100) 0 #t))
(define BOLA2 (make-bola 420 0 272 0 #f))
  

;(define (fn-para-bola b)
;  (... (bola-x b)
;       (bola-dx b)
;       (bola-y b)
;       (bola-dy b)
;  ))


#;
 (define (fn-para-jogo j)
   (...(jogo-ldj j)
       (jogo-bola j)
       (jogo-acabou? j)))

(define-struct jogo2 (jogador bola acabou?) #:transparent)
;; Jogo é (make-jogo Jogador Bola Boolean)
;; interp. um jogo composto pelo Jogador (personagem), a bola,
;; e um Booleano que indica se jogo acabou (encerra jogo).
;; Exemplos
(define JOGO-INICIAL (make-jogo2 JOGADOR-INICIAL BOLA-INICIAL #f))
(define JOGO-MEIO (make-jogo2 JOGADOR-CENTRAL BOLA-CENTRAL #f))
(define JOGO-GAME-OVER (make-jogo2 JOGADOR-EM-BAIXO BOLA-EM-BAIXO #f))
;#;
; (define (fn-para-jogo j)
;  (... (jogo-jogador j)
;       (jogo-bola j)
;       (jogo-acabou? j))
;=====================================================================

;;ListaDeJogador pode ser um desses:
;; - empty
;; - (cons Jogador ListaDeJogador
;;Exemplos
(define LDJ0 empty)
(define LDJ1 (cons JOGADOR-INICIAL empty))
(define LDJ2 (cons JOGADOR-CENTRAL LDJ1))
(define LDJ3 (cons JOGADOR-MEIO LDJ2))
(define LDJ4 (cons JOGADOR-MEIO2 LDJ3))
(define LDJ5 (cons JOGADOR-EM-BAIXO LDJ4))
(define LDJ6 (cons JOGADOR-EM-BAIXO2 LDJ5))
(define LDJ10 (cons JOGADOR11 (cons JOGADOR12 (cons JOGADOR13
                  (cons JOGADOR14 (cons JOGADOR15 empty))))))
(define LDJ20 (cons JOGADOR21 (cons JOGADOR22 (cons JOGADOR23
                  (cons JOGADOR24 (cons JOGADOR25 empty))))))

;(define LDJ20 (cons JOGADOR-CENTRAL empty))
;(define LDJ10 (list JOGADOR-INICIAL
;                   (make-jogador
;                    (* LIMITE-CAMPO-DIR 0.90) 0 (* LIMITE-CAMPO-BAIXO 0.90) 5 #f #f)
;                   (make-jogador
;                    (* LIMITE-CAMPO-DIR 0.1) 5 (* LIMITE-CAMPO-BAIXO 0.3) 0 #f #f)))

#;
(define (fn-para-ldj ldj)
  (cond [(empty? ldj) (...)]        ;parada da funcao-lista vazia
        [else (... (first ldj)      ;pega primeiro elemento jogador
                   (fn-para-ldj (rest ldj)))])) ;recursao resto-list

(define-struct jogo (jogadores jogadores2 bola acabou?) #:transparent)
(define JOGO1(make-jogo LDJ10 LDJ20 BOLA1 #f))
(define-struct jogo3(jogadores bola acabou?) #:transparent)
;; Jogo é (make-jogo ListaDeJogadores Bola Booleano)
;; Interp. ldj é uma Lista de elementos do tipo Jogadores, bola
;;e um booleano que indica se acabou(encera jogo)
;;Exemplos
(define JOGO-INICIAL1(make-jogo3 LDJ1 BOLA-INICIAL #f))
(define JOGO-INICIAL2(make-jogo3 LDJ2 BOLA-INICIAL #f))
(define JOGO-INICIAL6(make-jogo3 LDJ6 BOLA-INICIAL #f))