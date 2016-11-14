
;Este arquivo é o arquivo principal de onde o programa deve ser chamado.
;A única modificação que deve ser feita neste arquivo são os nomes finais das funções chamadas
;dentro do big-bang e o nome final do EstadoMundo. As funções em si devem ser implementadas em "jogo.rkt".

#lang whalesong

(require whalesong/world)
(require "jogo.rkt")   ;importa as funções definidas em "jogo.rkt" 
(require "constantes.rkt")
(require "dados.rkt")
;; EstadoMundo -> EstadoMundo
;; inicie o mundo com (main START-GAME)
;; 
(define (main j)
  (big-bang j               ; EstadoMundo
            (on-tick   proximo-jogo)     ; EstadoMundo -> EstadoMundo
            (to-draw   desenha-jogo)  ; EstadoMundo -> Image
            (on-key    trata-tecla)    ; EstadoMundo KeyEvent -> EstadoMundo
           (on-mouse  trata-mouse)))      ; EstadoMundo Integer Integer MouseEvent -> EstadoMundo

(main START-GAME)