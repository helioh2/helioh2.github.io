#lang racket
(require rackunit)
(require rackunit/text-ui)
(require "constantes.rkt")
(require "dados.rkt")
(require "jogo.rkt")
(provide (all-defined-out)) ;permite que outros arquivos importem deste

;; Constantes usadas nos testes
;#
(define (colisao-tiros-bruxas? ldt ldb)
   "colisao-tiros-bruxas?"
   )
;;Exemplo/Teste
(check-equal? (colisao-tiros-bruxas? LDT1 LDB1) #false)
;;***********************************************************************************************************************************
;#
(define (colisao-tiros-morcegos? ldt ldm)
   "colisao-tiros-morcegos?"
   )
;;Exemplo/Teste
(check-equal? (colisao-tiros-morcegos? empty LDM-3) #false)
;;***********************************************************************************************************************************
;#
(define (colisao-tiros-corvos? ldt ldc)
   "colisao-tiros-corvos?"
   )
;;Exemplo/Teste
(check-equal? (colisao-tiros-corvos? empty LDC-3) #false)
;;***********************************************************************************************************************************
;#
(define (colisao-tiros-fadas? ldt ldf)
   "colisao-tiros-fadas?"
   )
;;Exemplo/Teste
(check-equal? (colisao-tiros-fadas? empty LDF-3) #false)
;;**********************************************************************************************************************************
;#
(define (proxima-arma a)
   "proxima-arma"
   )
;;Exemplo/Teste
(check-equal? (proxima-arma ARMA-INICIAL) (make-arma 109 10 350))
;;****************************************************************************************************************************   
;#
(define (proximo-morcego m)
   "proximo-morcego"
   )
; exemplos / testes
;casos em que ele anda pra direita sem chegar no limite 
(check-equal? (proximo-morcego (make-morcego 0 10 Y-PADRAO))
              (make-morcego 10 10 Y-PADRAO)) 
(check-equal? (proximo-morcego MOR-MEIO)
              (make-morcego (+ (/ LARGURA-CENARIO 2) 10 ) 
                         10 Y-PADRAO))
; casos em que chega no limite direito e tem que virar
(check-equal? (proximo-morcego MOR-ANTES-VIRAR)
              MOR-VIRADA )
(check-equal? (proximo-morcego MOR-ULTRAPASSOU)
                            MOR-NO-LIMITE)
; caso em que ele anda pra esquerda sem chegar no limite 
(check-equal? (proximo-morcego MOR-MEIO-VOLTANDO)
                            (make-morcego (- (/ LARGURA-CENARIO 2) 10)
                                       -10 Y-PADRAO))

; casos em que chega no limite esquerdo e tem que virar
(check-equal? (proximo-morcego (make-morcego -10 -10 Y-PADRAO))
                           (make-morcego 0 10 Y-PADRAO))
(check-equal? (proximo-morcego (make-morcego -20 -50 Y-PADRAO))
                            (make-morcego 0 50 Y-PADRAO))

;;*******************************************************************************************************************************
;#
(define (proxima-bruxa b)
   "proxima-bruxa"
   )
;exemplos / testes
;casos em que ela anda pra direita sem chegar no limite
(check-equal? (proxima-bruxa BRUXA-MEIO)
             (make-bruxa X 0 (/ ALTURA-CENARIO 2) DY-B-DEFAULT))
; ;casos em que chega no limite direito e tem que virar
(check-equal? (proxima-bruxa BRUXA-ULTRAPASSOU)
              (make-bruxa X 0 (+ LIMITE-DIREITO -5) (- DY-B-DEFAULT)))
;; caso em que ela anda pra esquerda sem chegar no limite 
(check-equal? (proxima-bruxa BRUXA-ANTES-VIRAR)
              (make-bruxa X 0 (+ LIMITE-ESQUERDO  5) DY-B-DEFAULT))

;;*******************************************************************************************************************************
;#
(define (proximo-corvo c)
   "proximo-corvo"
   )
; exemplos / testes
;casos em que ele anda pra direita sem chegar no limite
(check-equal? (proximo-corvo (make-corvo 0 10 Y-PADRAO))
              (make-corvo 10 10 Y-PADRAO)) 
(check-equal? (proximo-corvo CORVO-MEIO)
              (make-corvo (+ (/ LARGURA-CENARIO 2) 10)
                         10 Y-PADRAO))
; casos em que chega no limite direito e tem que virar
(check-equal? (proximo-corvo CORVO-ANTES-VIRAR)
              CORVO-VIRADO)
(check-equal? (proximo-corvo CORVO-ULTRAPASSOU)
                            CORVO-NO-LIMITE)
; caso em que ele anda pra esquerda sem chegar no limite 
(check-equal? (proximo-corvo CORVO-MEIO-VOLTANDO)
                            (make-corvo (- (/ LARGURA-CENARIO 2) 10)
                                       -10 Y-PADRAO))

; casos em que chega no limite esquerdo e tem que virar
(check-equal? (proximo-corvo (make-corvo -10 -10 Y-PADRAO))
                            (make-corvo 0 10 Y-PADRAO))
(check-equal? (proximo-corvo (make-corvo -20 -50 Y-PADRAO))
                            (make-corvo 0 50 Y-PADRAO))
 
;;***********************************************************************************************************************************
;#
(define (proxima-fada f)
   "proximo-fada"
   )
; exemplos / testes
;casos em que ele anda pra direita sem chegar no limite
(check-equal? (proxima-fada (make-fada 0 10 Y-PADRAO))
              (make-fada 10 10 Y-PADRAO)) 
(check-equal? (proxima-fada FADA-MEIO)
              (make-fada (+ (/ LARGURA-CENARIO 2) 10)
                         10 Y-PADRAO))
; casos em que chega no limite direito e tem que virar
(check-equal? (proxima-fada FADA-ANTES-VIRAR)
              FADA-VIRADA)
(check-equal? (proxima-fada FADA-ULTRAPASSOU)
                            FADA-NO-LIMITE)
; caso em que ele anda pra esquerda sem chegar no limite 
(check-equal? (proxima-fada FADA-MEIO-VOLTANDO)
                            (make-fada (- (/ LARGURA-CENARIO 2) 10)
                                       -10 Y-PADRAO))

; casos em que chega no limite esquerdo e tem que virar
(check-equal? (proxima-fada (make-fada -10 -10 Y-PADRAO))
                            (make-fada 0 10 Y-PADRAO))
(check-equal? (proxima-fada (make-fada -20 -50 Y-PADRAO))
                            (make-fada 0 50 Y-PADRAO))
;;********************************************************************************************************************************
;#
(define (proximo-tiro t)
   "proximo-tiro"
   )
 ;; exemplos / testes
(check-equal? (proximo-tiro (make-tiro 100 100 0)) (make-tiro 100 80 0)) 
(check-equal? (proximo-tiro (make-tiro 10 80 0)) (make-tiro 10 60 0))
(check-equal? (proximo-tiro (make-tiro 15 50 0)) (make-tiro 15 30 0))
(check-equal? (proximo-tiro TIRO-PADRAO) (make-tiro 600 180 0))

;;**************************************************************************************************************************
;#
(define (proximo-jogo j)
   "proximo-jogo"
   )
;;****************************************************************************************************************************
;#
(define (proximos-morcegos ldm)
   "proximos-morcegos"
   )
 ;; exemplos / testes
(check-equal? (proximos-morcegos LDM-3) (list (make-morcego 610 10 200) (make-morcego 610 10 200)))
;;******************************************************************************************************************************
;#
(define (proximas-bruxas b)
   "proximas-bruxas"
   )
 ;; exemplos / testes
(check-equal? (proximas-bruxas LDB1) empty)
;;******************************************************************************************************************************
(define (proximos-corvos ldc)
   "proximas-corvos"
   )
; exemplos / testes
(check-equal? (proximos-corvos LDC-3) (list (make-corvo 610 10 200) (make-corvo 610 10 200)))
;;******************************************************************************************************************************
(define (proximas-fadas ldf)
   "proximas-fadas"
   )
; exemplos / testes
(check-equal? (proximas-fadas LDF-3) (list (make-fada 610 10 200) (make-fada 610 10 200)))

;;******************************************************************************************************************************
;#
(define (proximos-tiros ldt)
   "proximos-tiros"
   )
 ;; exemplos / testes
(check-equal? (proximos-tiros LDT1) (list (make-tiro 600 180 0)))
;;*****************************************************************************************************************************
#;
(define desenha-arma
   "desenha-arma"
   )
   
;;****************************************************************************************************************************
#;
(define (trata-tecla j ke)
   "trata-tecla"
   )
 ;;Exemplo/Teste
 (check-equal? (trata-tecla JOGO-ALVOS-MOVEL "\r")
              JOGO-INICIAL-SURGINDO)
 ;;********************************************************************************************************************************
#;
(define trata-tecla-arma a ke
   "trata-tecla-arma a ke"
   )
;exemplos
(check-equal? (trata-tecla-arma ARMA-MEIO "right")
              (make-arma (arma-x ARMA-MEIO) D-ARMA-DEFAULT (arma-y ARMA-MEIO))) 
(check-equal? (trata-tecla-arma ARMA-INICIAL "0") ARMA-INICIAL)
;;*******************************************  
;;**************************************************************************************************************************   

#;
(define trata-mouse-tests
   "trata-mouse tests"
   )

#;
(define terminou?-tests
   "terminou? tests"
   )

;; Adicione os testes restantes
;; ---------------------------------------------------------------------

;; Função que executa um grupo de testes.
(define (executar-testes . testes)
  (run-tests (test-suite "Todos os testes" testes))
  (void))

;; Chama a função para executar os testes.
#;
(executar-testes tock-tests
                 desenha-tests
                 trata-tecla-tests
                 trata-mouse-tests
                 terminou?-tests)

