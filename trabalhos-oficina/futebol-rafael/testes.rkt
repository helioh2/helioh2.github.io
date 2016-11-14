;; The first three lines of this file were inserted by DrRacket. They record metadata
;; about the language level of this file in a form that our tools can easily process.
#reader(lib "htdp-beginner-reader.ss" "lang")((modname testes) (read-case-sensitive #t) (teachpacks ()) (htdp-settings #(#t constructor repeating-decimal #f #t none #f ())))
#lang racket

;;Arquivo de tipos de dados do jogo.
(require 2htdp/image)
(require 2htdp/universe)
(require rackunit)
(require "constantes.rkt")  ;inclui arquivo de "constantes.rkt"
(require "dados.rkt") ;importa as definições de dados definidas no arquivo "dados.rkt"
(provide (all-defined-out)) ;permite que outros arquivos importem deste

;;; EXEMPLOS DE TESTES DE COLISAO BOLA LIMITE-CAMPO
;(check-equal? <chamada da funçao> <retorno esperado>)
(check-equal? (proxima-bola (make-bola 200 5 300 0 #f)) ;BOLA SOB DOMINIO DE ALGUM JOGADOR
              (make-bola 200 5 300 0 #f))
(check-equal? (proxima-bola (make-bola 200 5 300 0 #t))
              (make-bola 205 5 300 0 #t))  ;; NO MEIO DO CAMPO-AUMENTA X
(check-equal? (proxima-bola (make-bola 200 0 300 5 #t))
              (make-bola 200 0 305 5 #t))  ;;NO MEIO DO CAMPO-AUMENTA Y
(check-equal? (proxima-bola (make-bola LIMITE-CAMPO-DIR 5 100 0 #t))
              (make-bola LIMITE-CAMPO-DIR -5 100 0 #t)) ;;PASSANDO DO LIMITE DIREITO
(check-equal? (proxima-bola (make-bola (- LIMITE-CAMPO-DIR 5) 5 200 0 #t))
              (make-bola LIMITE-CAMPO-DIR -5 200 0 #t)) ;;NO LIMITE DIREITO
(check-equal? (proxima-bola (make-bola (+ LIMITE-CAMPO-ESQ 1) -5 200 0 #t))
              (make-bola LIMITE-CAMPO-ESQ 5 200 0 #t)) ;;PASSANDO DO LIMITE ESQ
(check-equal? (proxima-bola (make-bola 250 0 LIMITE-CAMPO-CIMA -5 #t))
              (make-bola 250 0 LIMITE-CAMPO-CIMA 5 #t));;PASSANDO LIMITE CIMA
(check-equal? (proxima-bola (make-bola 250 0 LIMITE-CAMPO-BAIXO 5 #t))
              (make-bola 250 0 LIMITE-CAMPO-BAIXO -5 #t));PASSANDO LIMITE BAIXO

;EXEMPLOS/ TESTES DE PROXIMO-JOGADOR
(check-equal? (proximo-jogador (make-jogador LIMITE-CAMPO-DIR 5 100 0 #t #f))
              (make-jogador LIMITE-CAMPO-DIR 5 100 0 #t #f)) ;;PASSANDO DO LIMITE DIREITO
(check-equal? (proximo-jogador (make-jogador LIMITE-CAMPO-ESQ -5 100 0 #t #f))
              (make-jogador LIMITE-CAMPO-ESQ -5 100 0 #t #f)) ;;PASSANDO LIMITE-CAMPO-ESQUERDA
(check-equal? (proximo-jogador (make-jogador LIMITE-CAMPO-CIMA -5 100 0 #t #f))
              (make-jogador LIMITE-CAMPO-CIMA -5 100 0 #t #f)) ;; PASSANDO LIMITE-CAMPO-CIMA


;EXEMPLOS/TESTES desenha-mundo
(check-equal? (desenha-mundo (make-jogador 100 5 200 0 #t #f))
         (place-image IMG-JOGADOR 100 200 CENARIO))
(check-equal?(desenha-mundo (make-jogador 200 -5 200 0 #t #f))
         (place-image IMG-BOLA 200 200 CENARIO))


