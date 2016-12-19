#lang racket

;; Arquivo para definição dos tipos de dados do programa.
(require 2htdp/image)
(require 2htdp/universe)
(require "constantes.rkt") ;importa as constantes definidas no arquivo "constantes.rkt"
(provide (all-defined-out)) ;permite que outros arquivos importem deste

;;DEFINIÇÕES DE DADOS

(define-struct morcego (x dx y))
;;Morcego é (make-morcego Numero+ Numero Numero+)
;;interp. representa a morcego que está numa posição x
;;da tela e anda a uma velocidade dx (dx também indica a direção
;;em que ela está apontando)
;exemplos:
(define MOR-INICIAL (make-morcego (/ LARGURA-CENARIO 2) 10 Y-PADRAO))
(define MOR-MEIO (make-morcego (/ LARGURA-CENARIO 2) 10 Y-PADRAO))
(define MOR-ANTES-VIRAR (make-morcego (+ LIMITE-DIR-MOR 5) 10 Y-PADRAO))
(define MOR-VIRADA (make-morcego LIMITE-DIR-MOR -10 Y-PADRAO))
(define MOR-MEIO-VOLTANDO (make-morcego (/ LARGURA-CENARIO 2) -10 Y-PADRAO))
(define MOR-CHEGANDO (make-morcego 50 -10 Y-PADRAO))
(define MOR-ULTRAPASSOU (make-morcego (+ LIMITE-DIR-MOR 20) 50 Y-PADRAO))
(define MOR-NO-LIMITE (make-morcego LIMITE-DIR-MOR -50 Y-PADRAO))
;;*******************************************                           
(define-struct bruxa (x dx y dy))
;; Bruxa é (make-bruxa Numero+ Numero Numero+ Numero)
;; interp. representa o bruxa que está numa posição x
;; da tela e anda a uma velocidade dx (dx também indica a direção
;; em que ele está apontando)

;exemplos:
(define BRUXA-INICIAL (make-bruxa X 0 LIMITE-DIREITO DY-B-DEFAULT))
(define BRUXA-MEIO (make-bruxa X 0 (/ ALTURA-CENARIO 2) DY-B-DEFAULT))
(define BRUXA-ANTES-VIRAR (make-bruxa X 0 (+ LIMITE-ESQUERDO  5) DY-B-DEFAULT))
(define BRUXA-VIRADA (make-bruxa X 0 LIMITE-ESQUERDO  (- DY-B-DEFAULT)))
(define BRUXA-MEIO-VOLTANDO (make-bruxa X 0 (/ LARGURA-CENARIO 2) DY-B-DEFAULT))
(define BRUXA-ULTRAPASSOU (make-bruxa X 0 (+ LIMITE-DIREITO -5) (- DY-B-DEFAULT)))
(define BRUXA-NO-LIMITE (make-bruxa X 0 LIMITE-DIREITO DY-B-DEFAULT))

#;
(define (fn-para-bruxa b)
  (... (bruxa-y b) (bruxa-dy b))
  )
;;*******************************************
(define-struct corvo (x dx y))
;;Corvo é (make-corvo Numero+ Numero Numero+)
;;interp. representa a corvo que está numa posição x
;;da tela e anda a uma velocidade dx (dx também indica a direção
;;em que ela está apontando)

;exemplos:
(define CORVO-INICIAL  (make-corvo (/ LARGURA-CENARIO 2) 10 Y-PADRAO))
(define CORVO-MEIO (make-corvo (/ LARGURA-CENARIO 2) 10 Y-PADRAO))
(define CORVO-ANTES-VIRAR (make-corvo (+ LIMITE-DIR-COR 5) 10 Y-PADRAO))
(define CORVO-VIRADO (make-corvo LIMITE-DIR-COR -10 Y-PADRAO))
(define CORVO-MEIO-VOLTANDO (make-corvo (/ LARGURA-CENARIO 2) -10 Y-PADRAO))
(define CORVO-ULTRAPASSOU (make-corvo (+ LIMITE-DIR-COR 20) 50 Y-PADRAO))
(define CORVO-NO-LIMITE (make-corvo LIMITE-DIR-COR -50 Y-PADRAO))

;;*******************************************
(define-struct fada (x dx y))
;;Fada é (make-fada Numero+ Numero Numero+)
;;interp. representa a fada que está numa posição x
;;da tela e anda a uma velocidade dx (dx também indica a direção
;;em que ela está apontando)

;exemplos:
(define FADA-INICIAL  (make-fada (/ LARGURA-CENARIO 2) 10 Y-PADRAO))
(define FADA-MEIO (make-fada (/ LARGURA-CENARIO 2) 10 Y-PADRAO))
(define FADA-ANTES-VIRAR (make-fada (+ LIMITE-DIR-FAD 5) 10 Y-PADRAO))
(define FADA-VIRADA (make-fada LIMITE-DIR-FAD -10 Y-PADRAO))
(define FADA-MEIO-VOLTANDO (make-fada (/ LARGURA-CENARIO 2) -10 Y-PADRAO))
(define FADA-ULTRAPASSOU (make-fada (+ LIMITE-DIR-FAD 20) 50 Y-PADRAO))
(define FADA-NO-LIMITE (make-fada LIMITE-DIR-FAD -50 Y-PADRAO))

;;*******************************************
; ListaDebruxa, ListaDemorcegos, ListaDecorvo e ListaDefada é um desses:
;; - empty
;; - (cons bruxas, morcegos, corvos e fadas  ListaDebruxa/morcegos/corvos e fadas)
;; interp. um da listas de bruxas, morcegos, corvos e fadas
(define LDM-1 empty)
(define LDM-2 (cons MOR-INICIAL empty))
(define LDM-3 (cons MOR-INICIAL (cons MOR-MEIO empty)))
(define LDM-J1 (list MOR-INICIAL MOR-MEIO))
                      
(define LDB1 empty)
(define LDB2 (cons BRUXA-INICIAL  empty))
(define LDB3 (cons BRUXA-INICIAL (cons BRUXA-MEIO empty)))
(define LDB-J1 (list BRUXA-INICIAL
                      (make-bruxa (/ LARGURA-CENARIO 4) 0 (/ ALTURA-CENARIO 2) DY-B-DEFAULT)
                      (make-bruxa (/ LARGURA-CENARIO 4/3) 0 (/ ALTURA-CENARIO 3/2) DY-B-DEFAULT)))

(define LDC-1 empty)
(define LDC-2 (cons CORVO-INICIAL empty))
(define LDC-3 (cons CORVO-INICIAL (cons CORVO-MEIO empty)))
(define LDC-J1 (list CORVO-INICIAL MOR-MEIO))

(define LDF-1 empty)
(define LDF-2 (cons FADA-INICIAL empty))
(define LDF-3 (cons FADA-INICIAL (cons FADA-MEIO empty)))
(define LDF-J1 (list FADA-INICIAL FADA-MEIO))
                      
#;
(define (fn-for-ldb ldb)
  (cond [(empty? ldb) (...)]                    ;CASO BASE (CONDIÇÃO DE PARADA)
        [else (... (first ldb)                  ;ListaDEbruxa
                   (fn-for-ldb (rest ldb)))])) ;RECURSÃO EM CAUDA

;;*************************************************
(define-struct arma (x dx y))
;;Arma é (make-arma Numero+ Numero Numero+)
;;interp. representa a arma que está numa posição x
;;da tela e anda a uma velocidade dx (dx também indica a direção
;;em que ela está apontando)

;exemplos:
(define ARMA-INICIAL (make-arma LIMITE-ESQUERDO 10 Y))
(define ARMA-MEIO (make-arma (/ LARGURA-CENARIO 2) 10 Y ))
(define ARMA-ANTES-VIRAR (make-arma (+ LIMITE-DIREITO 5) 10 Y ))
(define ARMA-PARADA (make-arma (/ LARGURA-CENARIO 2) 0 LIMITE-BAIXO )) 

#;
(define (fn-para-arma a)
  (... (arma-x a) (arma-dx a)
       (arma-y a)) 
  )
;;*********************************************
(define-struct tiro (x y dy))
;; Tiro é (make-tiro Numero+ Numero+ Numero-)
;; interp. um tiro que apenas na horizontal
(define TIRO-PADRAO (make-tiro 600 200 0))
(define LDT1 (list TIRO-PADRAO))

#;
(define (fn-para-tiro t)
  (... (tiro-x t) (tiro-y t)
       (tiro-dy t))
  )
;;***********************************************
(define-struct jogo (arma bruxas morcegos corvos fadas game-over? tsurgi tiros tsurgif))
;; Jogo é (make-jogo Arma ListaDeBruxa ListaDemorcegos ListaDeCorvos ListaDeFadas Boolean Numero+ ListaDetiros Numero+)
;; interp. representa um jogo que tem uma arma
;; e bruxa, morgegos, corvos, fadas, Boolean,tsurgi,tiros e tsurgifadas.

(define JOGO-INICIAL (make-jogo ARMA-INICIAL
                                (list BRUXA-INICIAL)
                                LDM-J1
                                LDC-J1
                                LDF-J1
                                #false
                                1
                                empty
                                1))
(define JOGO-MEIO (make-jogo ARMA-ANTES-VIRAR
                                (list BRUXA-MEIO)
                                LDM-J1
                                LDC-J1
                                LDF-J1
                                #false
                                1
                                empty
                                1))
(define JOGO-ALVOS (make-jogo
                   (make-arma (- (/ LARGURA-CENARIO 2) MEIO-W-ARMA -5) 10 Y)
                   (list BRUXA-MEIO)
                   LDM-J1
                   LDC-J1
                   LDF-J1
                   #false
                   1
                   empty
                   1))
(define JOGO-ALVOS-MOVEL (make-jogo
                   (make-arma (- (/ LARGURA-CENARIO 2) MEIO-W-ARMA -5) 10 Y)
                   (list BRUXA-MEIO)
                   LDM-J1
                   LDC-J1
                   LDF-J1
                   #true
                   1
                   empty
                   1))
(define JOGO-ACABOU (make-jogo ARMA-MEIO
                               (list BRUXA-MEIO)
                               LDM-J1
                               LDC-J1
                               LDF-J1 
                               #true
                               1
                               empty
                               1))

(define JOGO-INICIAL-N-ALVOS (make-jogo ARMA-INICIAL
                                LDB-J1
                                LDM-J1
                                LDC-J1
                                LDF-J1
                                #false
                                1
                                empty
                                1))

(define JOGO-INICIAL-SURGINDO (make-jogo ARMA-PARADA
                                empty         
                                empty
                                empty
                                empty
                                #false 
                                0
                                empty
                                1))

#;
(define (fn-para-jogo j)
  (... (jogo-arma j)
       (jogo-bruxas j)
       (jogo-morcegos j)
       (jogo-corvos j)
       (jogo-fadas j)
       (jogo-game-over? j)
       (jogo-tsurgi j)
       (jogo-tiros j)
       (jogo-tsurgif j)))

;; =================================================================================================================================================