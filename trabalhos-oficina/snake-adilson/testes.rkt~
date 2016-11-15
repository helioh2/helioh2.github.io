#lang racket

(require rackunit)
(require rackunit/text-ui)
(require "constantes.rkt")
(require "dados.rkt")
(require "jogo.rkt")


;; Constantes usadas nos testes
;; ...

#;
(define tock-tests
  (test-suite
   "tock tests"
   ...))

#;
(define desenha-tests
  (test-suite
   "desenha tests"
   ...))

#;
(define trata-tecla-tests
  (test-suite
   "trata-tecla tests"
   ...))

#;
(define trata-mouse-tests
  (test-suite
   "trata-mouse tests"
   ...))

#;
(define terminou?-tests
  (test-suite
   "terminou? tests"
   ...))

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